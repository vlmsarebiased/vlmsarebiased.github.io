#!/usr/bin/env python3
"""Weekly update for the VLMBias adoption tracker (static/js/adoption-data.js).

What it does automatically:
  * refreshes the citation counts from Semantic Scholar and OpenAlex;
  * sets "updated" to today's date whenever at least one source answered.

What it only reports (a human decides, then edits adoption-data.js):
  * new citing papers, with how often their full text mentions VLMBias and a snippet;
  * Hugging Face model cards that mention VLMBias.
New items are added to scripts/adoption_reviewed.json so they are reported once.

Usage:
  python3 scripts/update_adoption.py --report report.md
  S2_API_KEY=... python3 scripts/update_adoption.py      # higher Semantic Scholar rate limit
Needs only the Python standard library; `pdftotext` (poppler-utils) is used if present
to read arXiv full texts.
"""
import argparse
import concurrent.futures as cf
import datetime as dt
import json
import os
import re
import shutil
import subprocess
import tempfile
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'static', 'js', 'adoption-data.js')
REVIEWED = os.path.join(ROOT, 'scripts', 'adoption_reviewed.json')
ARXIV_ID = '2505.23941'
OPENALEX_ID = 'W4414855608'
UA = 'vlmsarebiased-adoption-tracker (https://vlmsarebiased.github.io)'
MENTION = re.compile(r'vlms?[\s_-]*are[\s_-]*biased|vlm[\s_-]?bias\b', re.I)
USE_WORDS = re.compile(r'evaluat|accura|table|subset|we use|benchmark|score|results?', re.I)
HF_ORGS = ('Qwen moonshotai zai-org THUDM stepfun-ai XiaomiMiMo OpenGVLab google meta-llama mistralai '
           'deepseek-ai baidu tencent ByteDance-Seed nvidia allenai microsoft vikhyatk moondream MiniMaxAI '
           'inclusionAI rednote-hilab openbmb LiquidAI HuggingFaceTB apple ibm-granite internlm Kwai-Keye '
           'meituan-longcat ServiceNow-AI CohereLabs xai-org openai Skywork lmms-lab').split()


def get(url, headers=None, tries=4, binary=False):
    h = {'User-Agent': UA}
    h.update(headers or {})
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=60) as r:
                b = r.read()
                return b if binary else b.decode('utf-8', 'replace')
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and i < tries - 1:
                time.sleep(5 * 2 ** i)
                continue
            raise
        except urllib.error.URLError:
            if i < tries - 1:
                time.sleep(5 * 2 ** i)
                continue
            raise


def load_data():
    text = open(DATA, encoding='utf-8').read()
    body = text[text.index('= {') + 2:].rstrip().rstrip(';')
    return text, json.loads(body)


def s2_headers():
    key = os.environ.get('S2_API_KEY')
    return {'x-api-key': key} if key else {}


def semantic_scholar():
    base = f'https://api.semanticscholar.org/graph/v1/paper/arXiv:{ARXIV_ID}'
    count = json.loads(get(base + '?fields=citationCount', s2_headers()))['citationCount']
    cites, offset = [], 0
    while True:
        page = json.loads(get(f'{base}/citations?fields=title,year,externalIds,url,contexts,venue,publicationDate'
                              f'&limit=500&offset={offset}', s2_headers()))
        cites += page.get('data', [])
        if 'next' not in page:
            break
        offset = page['next']
    return count, cites


def openalex():
    return json.loads(get(f'https://api.openalex.org/works/{OPENALEX_ID}?select=cited_by_count'))['cited_by_count']


def arxiv_mentions(arxiv_id):
    """Count VLMBias mentions in the arXiv full text; return (count, snippet) or (None, '')."""
    if not shutil.which('pdftotext'):
        return None, ''
    try:
        pdf = get(f'https://arxiv.org/pdf/{arxiv_id}', binary=True)
    except Exception:
        return None, ''
    with tempfile.TemporaryDirectory() as d:
        p = os.path.join(d, 'p.pdf')
        open(p, 'wb').write(pdf)
        try:
            txt = subprocess.run(['pdftotext', '-q', p, '-'], capture_output=True, timeout=120).stdout.decode('utf-8', 'replace')
        except Exception:
            return None, ''
    txt = re.sub(r'\s+', ' ', txt)
    hits = list(MENTION.finditer(txt))
    snippet = ''
    for m in hits:
        s = txt[max(0, m.start() - 160): m.end() + 160]
        if USE_WORDS.search(s):
            snippet = s
            break
    if hits and not snippet:
        snippet = txt[max(0, hits[0].start() - 160): hits[0].end() + 160]
    return len(hits), snippet.strip()


def hf_model_cards(seen):
    ids = []
    for org in HF_ORGS:
        for tag in ('image-text-to-text', 'any-to-any', 'video-text-to-text'):
            try:
                ids += [m['id'] for m in json.loads(get(
                    f'https://huggingface.co/api/models?author={org}&pipeline_tag={tag}&limit=300&sort=createdAt'))]
            except Exception:
                pass
    ids = sorted(set(ids) - set(seen))

    def scan(mid):
        try:
            t = get(f'https://huggingface.co/{mid}/raw/main/README.md', tries=2)
        except Exception:
            return None
        lines = [l.strip()[:240] for l in t.splitlines() if MENTION.search(l)]
        return (mid, lines) if lines else None

    with cf.ThreadPoolExecutor(12) as ex:
        return len(ids), [r for r in ex.map(scan, ids) if r]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--report', help='write a Markdown report (used as the pull-request body)')
    ap.add_argument('--skip-hf', action='store_true', help='skip the Hugging Face model-card scan')
    args = ap.parse_args()

    text, data = load_data()
    reviewed = json.load(open(REVIEWED))
    known_ids = set(reviewed['semantic_scholar_paper_ids'])
    tracked_urls = {p['url'] for p in data['papers']}
    report, changed = [], False
    today = dt.date.today().isoformat()

    # 1. Citation counts (automatic).
    old = data['citations']
    new = {}
    try:
        new['semantic_scholar'], cites = semantic_scholar()
    except Exception as e:
        cites = []
        report.append(f'> Semantic Scholar failed ({e}); its count was not changed.\n')
    try:
        new['openalex'] = openalex()
    except Exception as e:
        report.append(f'> OpenAlex failed ({e}); its count was not changed.\n')
    names = {'semantic_scholar': 'Semantic Scholar', 'openalex': 'OpenAlex'}
    rows, changes = [], []
    for k, v in new.items():
        if v != old.get(k):
            text = re.sub(rf'("{k}":\s*)\d+', rf'\g<1>{v}', text, count=1)
            changed = True
            changes.append(f'{names[k]} {old.get(k)} → {v}')
        rows.append(f'| {names[k]} | {old.get(k)} | {v} |')
    if changes:  # record what changed in the site's "Update history"
        entry = json.dumps({'date': today, 'text': 'Citations: ' + ', '.join(changes) + '.'}, ensure_ascii=False)
        text = text.replace('  "log": [\n', '  "log": [\n    ' + entry + ',\n', 1)
    report += ['## Citation counts (updated automatically)', '', '| Source | Before | Now |', '|---|---|---|'] + rows + ['']

    # 2. New citing papers (human review).
    fresh = [c for c in cites if c['citingPaper'].get('paperId') and c['citingPaper']['paperId'] not in known_ids]
    report += [f'## New citing papers: {len(fresh)}', '']
    if fresh:
        report += ['Add a paper to `papers` in `static/js/adoption-data.js` only if it runs experiments on VLMBias data '
                   '(copy its ready-made line; use "arXiv" as the venue for preprints and check the venue on the paper itself).',
                   'A high mention count with an evaluation snippet is a good sign; a single mention is usually just a citation.', '']
    for c in fresh:
        p = c['citingPaper']
        ax = (p.get('externalIds') or {}).get('ArXiv')
        url = f'https://arxiv.org/abs/{ax}' if ax else p.get('url', '')
        n, snip = arxiv_mentions(ax) if ax else (None, '')
        ctx = ' … '.join(c.get('contexts') or [])[:400]
        flag = '**likely uses it**' if (n or 0) >= 3 else ('maybe' if n else 'check')
        venue = p.get('venue') or 'no venue listed'
        report.append(f'- [{p.get("title")}]({url}), {p.get("publicationDate") or p.get("year") or "n.d."}, '
                      f'{venue}, full-text mentions: {n if n is not None else "n/a"}, {flag}'
                      + (' (already tracked)' if url in tracked_urls else ''))
        report.append(f'  `{{"title": {json.dumps(p.get("title"))}, "url": "{url}", '
                      f'"date": "{p.get("publicationDate") or ""}", "venue": "{p.get("venue") or ""}"}}`')
        if snip:
            report.append(f'  > {snip[:400]}')
        elif ctx:
            report.append(f'  > {ctx}')
        reviewed['semantic_scholar_paper_ids'].append(p['paperId'])
    report.append('')

    # 3. Hugging Face model cards (human review).
    if not args.skip_hf:
        scanned, hits = hf_model_cards(reviewed['huggingface_model_ids'])
        report += [f'## Hugging Face model cards mentioning VLMBias: {len(hits)} (of {scanned} new cards scanned)', '']
        for mid, lines in hits:
            report.append(f'- [{mid}](https://huggingface.co/{mid}): `{lines[0]}`')
            reviewed['huggingface_model_ids'].append(mid)
        report.append('')

    report += ['## Still manual',
               'Model cards published only as PDFs, blog posts or images (e.g., Gemini, Seed, Qwen blogs) are not scanned. '
               'Check new frontier releases by hand and add them to `model_cards`.',
               'When you add a model card or paper, also add a line to `log` (e.g., '
               '`{"date": "YYYY-MM-DD", "text": "Added paper: ..."}`) so the site shows what changed.', '']

    # "updated" is the date of the last successful check, shown on the site as "Last updated".
    if new:
        text = re.sub(r'("updated":\s*)"[^"]*"', rf'\g<1>"{today}"', text, count=1)
        open(DATA, 'w', encoding='utf-8').write(text)
    reviewed['semantic_scholar_paper_ids'] = sorted(set(reviewed['semantic_scholar_paper_ids']))
    reviewed['huggingface_model_ids'] = sorted(set(reviewed['huggingface_model_ids']))
    json.dump(reviewed, open(REVIEWED, 'w'), indent=2)
    open(REVIEWED, 'a').write('\n')

    out = '\n'.join([f'# VLMBias adoption update, {today}', ''] + report)
    if args.report:
        open(args.report, 'w', encoding='utf-8').write(out)
    print(out)


if __name__ == '__main__':
    main()

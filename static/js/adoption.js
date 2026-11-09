// Renders the adoption stat strip and the "Who uses VLMBias" chart, table and lists
// from window.VLMBIAS_ADOPTION (static/js/adoption-data.js).
(function () {
  var D = window.VLMBIAS_ADOPTION;
  if (!D) return;

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // "2026-11-09" -> "Nov 9, 2026"; "2026-11" -> "Nov 2026"; "2026" -> "2026".
  function fmtDate(s) {
    if (!s) return '';
    var p = s.split('-');
    if (p.length === 1) return p[0];
    var m = MONTHS[parseInt(p[1], 10) - 1];
    return p.length > 2 ? m + ' ' + parseInt(p[2], 10) + ', ' + p[0] : m + ' ' + p[0];
  }
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'className') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function link(href, text) {
    return el('a', {href: href, target: '_blank', rel: 'noopener noreferrer', text: text});
  }
  function byDateAsc(a, b) { return (a.date || '').localeCompare(b.date || ''); }

  var cards = D.model_cards.slice().sort(byDateAsc);
  var models = {};
  cards.forEach(function (c) { c.scores.forEach(function (s) { models[s.model] = true; }); });
  var cites = Math.max(D.citations.semantic_scholar || 0, D.citations.openalex || 0);

  var stats = {
    cards: String(cards.length),
    models: String(Object.keys(models).length),
    citations: (cites >= 20 ? Math.floor(cites / 10) * 10 : cites) + '+',
    papers: String(D.papers.length),
    frameworks: String(D.frameworks.length),
    updated: fmtDate(D.updated)
  };
  document.querySelectorAll('[data-adopt]').forEach(function (n) {
    var k = n.getAttribute('data-adopt');
    if (k === 'citations-exact') n.textContent = cites;
    else if (stats[k] !== undefined) n.textContent = stats[k];
  });

  // Chart: one bar per model card, the lab's own headline model, in release order.
  var chart = document.getElementById('adoption-chart');
  if (chart) {
    chart.textContent = '';
    cards.forEach(function (c) {
      var head = c.scores.filter(function (s) { return s.model === c.headline; })[0];
      var others = c.scores.filter(function (s) { return s.model !== c.headline; })
        .map(function (s) { return s.model + ' ' + s.score.toFixed(1); }).join(', ');
      var tip = c.headline + ': ' + head.score.toFixed(1) + ' (' + c.lab + ', ' + fmtDate(c.date) + ').' +
        (others ? ' Also scored in this card: ' + others + '.' : '');
      chart.appendChild(el('div', {className: 'adopt-row', role: 'listitem', title: tip}, [
        el('div', {className: 'adopt-label'}, [
          el('img', {src: c.icon, alt: ''}),
          el('span', {}, [
            el('b', {text: c.headline}),
            el('span', {className: 'adopt-sub', text: c.lab + ' · ' + fmtDate(c.date)})
          ])
        ]),
        el('div', {className: 'adopt-track'}, [
          el('div', {className: 'adopt-bar', style: 'width:' + head.score + '%'}),
          el('span', {className: 'adopt-val', style: 'left:' + head.score + '%', text: head.score.toFixed(1)})
        ])
      ]));
    });
    chart.appendChild(el('div', {className: 'adopt-row adopt-axis', 'aria-hidden': 'true'}, [
      el('div', {className: 'adopt-label'}),
      el('div', {className: 'adopt-ticks'}, [0, 25, 50, 75, 100].map(function (t) {
        return el('span', {style: 'left:' + t + '%', text: String(t)});
      }))
    ]));
  }

  // Table: every score printed in each card.
  var tbody = document.getElementById('adoption-table');
  if (tbody) {
    tbody.textContent = '';
    cards.forEach(function (c) {
      var others = c.scores.filter(function (s) { return s.model !== c.headline; })
        .map(function (s) { return s.model + ' ' + s.score.toFixed(1); }).join(' · ');
      var head = c.scores.filter(function (s) { return s.model === c.headline; })[0];
      tbody.appendChild(el('tr', {}, [
        el('td', {text: fmtDate(c.date)}),
        el('td', {}, [el('img', {className: 'source-icon', src: c.icon, alt: ''}), c.lab]),
        el('td', {}, [link(c.url, c.source)]),
        el('td', {className: 'adopt-model', text: c.headline}),
        el('td', {className: 'is-best adopt-score', text: head.score.toFixed(1)}),
        el('td', {className: 'adopt-others', text: others})
      ]));
    });
  }

  // Benchmarks built from VLMBias (not counted as model cards), placed above the static entries.
  var derived = document.getElementById('adoption-derived');
  if (derived) {
    D.derived.slice().reverse().forEach(function (d) {
      derived.insertBefore(el('li', {}, [
        el('img', {className: 'source-icon', src: d.icon, alt: ''}),
        el('b', {text: d.lab}), ' ' + d.before + ' ', link(d.url, d.name),
        d.after + ' (' + fmtDate(d.date) + ').'
      ]), derived.firstChild);
    });
  }

  // Papers that evaluate on VLMBias, newest first.
  var papers = document.getElementById('adoption-papers');
  if (papers) {
    papers.textContent = '';
    D.papers.slice().sort(function (a, b) { return byDateAsc(b, a); }).forEach(function (p) {
      var isPreprint = !p.venue || p.venue === 'arXiv';
      papers.appendChild(el('li', {}, [
        link(p.url, p.title), ' ',
        p.venue ? el('span', {className: 'adopt-venue' + (isPreprint ? ' is-preprint' : ''), text: p.venue}) : null,
        p.date ? el('span', {className: 'adopt-date', text: ' ' + fmtDate(p.date)}) : null
      ]));
    });
  }

  // Update history, newest first.
  var log = document.getElementById('adoption-log');
  if (log && D.log) {
    log.textContent = '';
    D.log.slice().sort(function (a, b) { return byDateAsc(b, a); }).forEach(function (e) {
      log.appendChild(el('li', {}, [el('span', {className: 'adopt-log-date', text: fmtDate(e.date)}), el('span', {text: e.text})]));
    });
  }

  var fw = document.getElementById('adoption-frameworks');
  if (fw) {
    fw.textContent = '';
    D.frameworks.forEach(function (f, i) {
      if (i) fw.appendChild(document.createTextNode(i === D.frameworks.length - 1 ? ', and ' : ', '));
      fw.appendChild(link(f.url, f.name));
    });
  }
})();

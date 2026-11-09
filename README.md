# Nerfies

This is the repository that contains source code for the [Nerfies website](https://nerfies.github.io).

If you find Nerfies useful for your work please cite:
```
@article{park2021nerfies
  author    = {Park, Keunhong and Sinha, Utkarsh and Barron, Jonathan T. and Bouaziz, Sofien and Goldman, Dan B and Seitz, Steven M. and Martin-Brualla, Ricardo},
  title     = {Nerfies: Deformable Neural Radiance Fields},
  journal   = {ICCV},
  year      = {2021},
}
```

# Website License
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.

## Keeping the adoption numbers up to date

The stat strip and the "Who uses VLMBias" section are rendered from `static/js/adoption-data.js`.

- **Every Monday**, the GitHub Action `.github/workflows/update-adoption.yml` runs `scripts/update_adoption.py`.
  It refreshes the Semantic Scholar and OpenAlex citation counts and opens a pull request listing new citing
  papers and Hugging Face model cards that mention VLMBias. Run it any time from the Actions tab ("Run workflow").
- **Review the pull request**: add papers that run experiments on VLMBias to `papers`, then merge.
  Count changes are logged automatically in `log` (shown as "Update history" on the site); when you add a
  model card or paper by hand, add a `log` line too, e.g. `{"date": "2026-11-16", "text": "Added paper: ..."}`.
  Reported items are recorded in `scripts/adoption_reviewed.json` so they appear only once.
- **By hand**: model cards published only as PDFs, blog posts or images are not scanned. When a frontier
  model is released, check its card and add it to `model_cards`.
- One-time setup: add a free Semantic Scholar API key as the repository secret `S2_API_KEY`
  (Settings → Secrets and variables → Actions), and enable "Allow GitHub Actions to create and approve
  pull requests" (Settings → Actions → General).

Run locally: `python3 scripts/update_adoption.py --report report.md` (add `--skip-hf` for a faster run).

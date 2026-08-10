# Veterans Benefits Capacity and Due Process Observatory

An accessible, bilingual, reproducible research preview examining VA claims workload, staffing, appeals, accredited representation, and artificial-intelligence governance.

## Live preview

- English: <https://alonsobrx.github.io/founder-architect/observatory/>
- Spanish: <https://alonsobrx.github.io/founder-architect/observatory/es/>

The preview is intentionally marked `noindex` until substantive, legal, accessibility, and Spanish-language review is complete.

## Evidence rules

Every quantitative statement is labeled as one of four classes:

1. **Official** — published by an identified authoritative source.
2. **Calculated** — derived from official inputs with the formula disclosed.
3. **Scenario** — an editable planning assumption.
4. **Unknown** — a material fact not established by the public record.

## Repository contents

- `index.html`: authoritative English HTML publication.
- `es/index.html`: complete Spanish publication path.
- `styles.css`: black-and-white, high-contrast responsive design.
- `app.js`: dependency-free calculators and AI-registry filtering.
- `data/metrics.json` and `data/metrics.csv`: official, calculated, and scenario inputs.
- `data/sources.json` and `data/sources.csv`: source ledger, limitations, and checksums.
- `data/model-assumptions.json`: model formulas and caveats.
- `data/va-ai-vba-use-cases.json`: reproducible VBA subset of the official VA AI inventory.
- `scripts/recalculate_metrics.py`: dependency-free recalculation of every derived metric.
- `scripts/validate_observatory.py`: standard-library checks for formulas, data, HTML, controls, and links.
- `GOVERNANCE.md`: correction, review, independence, and release controls.
- `petition/README.md`: publication gates for the future living petition.
- `STATUS.md`: completed automated checks and unresolved manual review gates.

## Accessibility

Accessible HTML is authoritative. The project targets WCAG 2.2 Level AA, but does not claim certified conformance. Automated semantic, formula, link, and browser checks are necessary but insufficient. Required manual acceptance testing includes TalkBack, NVDA, VoiceOver, keyboard-only operation, and zoom at 200 and 400 percent.

## Privacy and legal boundary

Do not submit or commit medical records, VA file numbers, Social Security numbers, addresses, passwords, private correspondence, individual claim files, Ayala client data, proprietary Ayala logic, or patent-sensitive material.

This is independent public-interest research. It is not affiliated with VA and is not legal advice. Veterans Defense Fund is an initiative in development and is not represented as an incorporated nonprofit in this preview.

## Licenses

- Code: MIT License.
- Project-created research text and data: Creative Commons Attribution 4.0 International.
- U.S. government source materials retain their applicable public-domain or source-specific status.

## Maintainer

Arnoldo A. Alonso — [LinkedIn](https://www.linkedin.com/in/alonsobrx)

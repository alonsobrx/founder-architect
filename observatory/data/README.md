# Data Directory

This directory contains only public, aggregated, or project-created data. It must never contain individual claim files, medical records, VA file numbers, Social Security numbers, addresses, credentials, private correspondence, or proprietary Ayala information.

## Files

- `metrics.json` and `metrics.csv`: official inputs, calculations, and editable scenario defaults.
- `sources.json` and `sources.csv`: authoritative source metadata, reporting periods, retrieval dates, limitations, and checksums.
- `model-assumptions.json`: formulas and caveats for the public calculators.
- `va-ai-vba-use-cases.json`: rows assigned to the Veterans Benefits Administration in VA's official 2025 AI inventory.

## Evidence classes

- Official: published by the identified institution.
- Calculated: derived from official values using a disclosed formula.
- Scenario: nonofficial planning input that the user may change.
- Unknown: not established by the available public record.

## Update control

Before changing a number, update its source record, reporting period, retrieval date, limitation, and downstream calculations. Run:

```bash
python observatory/scripts/validate_observatory.py
```

Static government source files are not republished here. Their official locations and SHA-256 values are recorded in the source ledger.

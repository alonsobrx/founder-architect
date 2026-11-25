# Arnoldo A. Alonso

**Founder-Architect · U.S. Army Combat Veteran · Data Scientist · Neuromorphic Computing Engineer**

I build accessible, auditable systems at the intersection of public administration, disability justice, data science, economics, and neuromorphic computing. My work is shaped by military logistics, veteran advocacy, legal-medical systems analysis, and the practical requirements of blind and visually impaired users.

I am the founder of Brasidas Strategies and the principal architect of Ayala. Public repositories are used for reproducible research, accessibility-first software, and institutional analysis. Confidential veteran records, proprietary Ayala logic, credentials, and patent-sensitive materials do not belong in public source control.

## Flagship public research

### Veterans Benefits Capacity and Due Process Observatory

A bilingual, accessible, reproducible analysis of VA claims workload, appeals, accredited representation, workforce capacity, and artificial-intelligence governance.

- [English publication source](observatory/index.html)
- [Publicación en español](observatory/es/index.html)
- [Source, data, methodology, and validation](observatory/)

### The People's Brief: Saronic Technologies and Port Alpha

A public-interest analysis of a major Cameron County economic-development proposal, including mathematical assumptions, fiscal exposure, historical comparisons, and questions for public officials.

- [Read the publication source](reports/saronic-port-alpha.html)

## Engineering and research standards

- Accessible HTML is the authoritative publication format.
- Official facts, calculations, scenarios, and unknowns are labeled separately.
- Material claims must identify their source, date, unit, denominator, and limitation.
- Public systems must not expose veteran medical, claim, identity, or authentication data.
- Corrections are documented through version history rather than silently overwritten.

## Public profile

- [LinkedIn](https://www.linkedin.com/in/alonsobrx)


## Run and verify locally

Serve the repository root with `python -m http.server 8000`. Open [the local portfolio](http://localhost:8000/) or [the local Observatory](http://localhost:8000/observatory/).

Run these checks with Python 3.12 from the root of a complete Git clone.

```sh
python observatory/scripts/recalculate_metrics.py --check
python observatory/scripts/validate_observatory.py
python observatory/scripts/security_audit.py --repository-root . --history
```

For corrections and accessibility feedback, read the [contribution guide](observatory/CONTRIBUTING.md). See the [security policy](SECURITY.md) and [licensing notice](LICENSE).

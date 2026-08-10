# Founder-Architect Site Architecture

## Purpose

`alonsobrx/founder-architect` is the canonical public portfolio and GitHub Pages website for Arnoldo Alonso. It presents professional identity, verified experience, current systems, publications, and contact channels in a form designed for screen-reader users, keyboard users, mobile devices, low-bandwidth connections, and multilingual audiences.

The separate GitHub profile repository `alonsobrx/alonsobrx`, when created, should remain a short profile README that links to this site. The full website and its source of truth stay in `founder-architect`.

## Information Architecture

| Route | English purpose | Spanish equivalent |
|---|---|---|
| `/index.html` | Founder landing page | `/es/index.html` |
| `/bio.html` | Biography and professional identity | `/es/bio.html` |
| `/resume.html` | Experience, education, and capabilities | `/es/resume.html` |
| `/tools.html` | Systems, maturity labels, and boundaries | `/es/tools.html` |
| `/publications.html` | Research standards and publications | `/es/publications.html` |
| `/blog.html` | Corrections, outcomes, and field notes | `/es/blog.html` |
| `/connect.html` | Verified LinkedIn profile and inquiry guidance | `/es/connect.html` |

Long-form archival reports may remain in their original publication language. Their language and revision status must be stated explicitly.

## Technical Structure

```text
founder-architect/
├── index.html
├── bio.html
├── resume.html
├── tools.html
├── publications.html
├── blog.html
├── connect.html
├── es/
│   ├── index.html
│   ├── bio.html
│   ├── resume.html
│   ├── tools.html
│   ├── publications.html
│   ├── blog.html
│   ├── connect.html
│   └── blog/
│       └── port-alpha-update.html
├── blog/
│   └── saronic-vote-june16.html
├── reports/
│   └── saronic-port-alpha.html
├── assets/
│   ├── config.js
│   ├── nav.js
│   ├── site.js
│   └── style.css
├── .github/workflows/
│   └── quality.yml
├── ARCHITECTURE.md
└── README.md
```

## Design System

- Black is the default page background.
- White is the primary text color.
- Cyan is a limited navigation and focus accent, not decorative text.
- No essential meaning is communicated through color alone.
- Typography is the primary visual system; the site does not depend on large images, video, or animation.
- A light theme remains available as a user preference.
- All layouts remain usable at 200 percent browser zoom and on narrow screens.

## Accessibility Requirements

The implementation targets WCAG 2.2 Level AA. Targeting a standard is not a certification.

- One descriptive `h1` per page and sequential heading levels.
- Semantic `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks.
- A visible-on-focus skip link.
- Full keyboard access with persistent, high-contrast focus indicators.
- No autoplaying audio, animation, or video.
- `prefers-reduced-motion` support.
- Text resizing controls from 14 to 24 pixels, with the preference stored locally.
- Read-aloud support using the browser speech API as an optional enhancement.
- Static content remains readable when JavaScript is unavailable.
- Tables use headers and captions; visual information must also be described in text.
- Language is declared at the document level, and language switching uses real links to static translated pages.
- External links use descriptive names instead of raw URLs.

## Multilingual Model

English and Spanish pages are separate static documents. This provides reliable screen-reader language switching, works without JavaScript, allows search engines to index both languages, and prevents partially translated pages.

Each translated page must include:

- the correct `lang` attribute;
- a canonical URL;
- `hreflang="en"` and `hreflang="es"` alternate links;
- an explicit language-switch link to the equivalent page;
- equivalent facts, status labels, and correction notices.

Additional languages should be added as complete route sets only after qualified translation review. Machine-generated translations must not be presented as professionally reviewed translations.

## Professional-Link Governance

Verified professional links are centralized in `assets/config.js`. LinkedIn is intentionally the only external account promoted by the website:

- LinkedIn: `https://www.linkedin.com/in/alonsobrx`

Other social platforms remain unpublished to preserve a focused professional identity.

## Content Governance

Every system and publication uses an explicit status:

- `Operational workflow`
- `Active development`
- `Research prototype`
- `Planned`
- `Current publication`
- `Historical draft`
- `Archive`

Metrics must state their scope and date. Forecasts must be distinguished from observed outcomes. Corrections should preserve the historical record while directing readers to the current version.

## Security and Privacy

- No analytics, advertising pixels, trackers, or third-party JavaScript.
- No veteran records, medical information, credentials, access tokens, or private evidence in the public repository.
- External fonts are optional; system-font fallbacks preserve the entire experience.
- External professional links use `rel="noopener"` when opening a new tab.
- No public contact form until a privacy notice, retention policy, abuse controls, and secure backend exist.

## Quality Gate

Pull requests should pass:

1. JavaScript syntax validation.
2. HTML structural validation.
3. Internal-link checks.
4. Manual keyboard review.
5. Screen-reader landmark and heading review.
6. English-Spanish route parity review.
7. Content-accuracy confirmation for personal credentials and impact metrics.

# Arnoldo Alonso — Founder Profile

**Public Profile Site for Arnoldo Alonso**

Combat Veteran · Founder · Neurointelligent Systems Architect

Brownsville, Texas — Rio Grande Valley

**Live Site:** [alonsobrx.github.io/founder-architect](https://alonsobrx.github.io/founder-architect)

---

## About This Repository

This repository contains the public founder profile and biography site for Arnoldo Alonso. It is a static HTML site designed to function without JavaScript frameworks or external dependencies where possible.

The site is built to the following accessibility standards:

- WCAG 2.1 AA compliant
- Screen reader optimized (tested with NVDA and VoiceOver)
- Keyboard navigable throughout
- High-contrast color scheme
- Bilingual: English and Spanish throughout
- No auto-playing media

---

## About Arnoldo Alonso

I am a combat-decorated United States Army veteran (Staff Sergeant, 13 years active service), a service-connected disabled veteran, a former Deputy Sheriff, and the founder of Brasidas Strategies.

I build high-assurance AI and neurointelligent systems designed to serve disabled users, degraded environments, and communities historically excluded from advanced technology.

**Core Work:**

- **Ayala** — Patented neurointelligent claims-preparation engine for veterans and disabled users
- **Neuromorphic Computing Research** — Spiking neural networks, offline edge AI, low-power architectures
- **Accessibility Engineering** — Blind and low-vision user systems, WCAG 2.1 AA, bilingual interfaces
- **Ethical Command Architecture** — Constraint-aligned AI for defense and governance applications

---

## Site Structure

| File | Purpose |
|---|---|
| `index.html` | Entry point — redirects to bio |
| `bio.html` | Full biography and credentials |
| `resume.html` | Professional experience and technical skills |
| `publications.html` | Published research and reports |
| `blog.html` | Articles and long-form writing |
| `store.html` | Publications and resources |
| `contact.html` | Contact information and accessible links |
| `tools.html` | Research tools and resources |
| `assets/` | Stylesheets, scripts, and static assets |
| `reports/` | Downloadable report files |
| `blog/` | Blog article files |

---

## Technical Stack

- Plain HTML5 with semantic markup
- CSS3 — no external CSS framework dependencies for core layout
- Vanilla JavaScript for language switching and navigation
- Google Fonts (Roboto, Roboto Mono) loaded via preconnect for performance
- Bilingual i18n implemented inline without a build step

---

## Accessibility Commitment

This site treats blind and low-vision users as primary stakeholders, not an edge case.

Every page includes:

- Proper `lang` attribute on the `html` element
- Logical heading hierarchy (h1 → h2 → h3)
- `aria-labelledby` on all major sections
- Skip navigation support
- Descriptive `alt` text on all images
- No content conveyed by color alone
- Focus indicators visible on all interactive elements
- Bilingual content (English / Español) switchable without page reload

**If you find an accessibility barrier, open an issue. It will be treated as a critical bug.**

---

## Bilingual Support

All user-facing content is available in English and Spanish. Language preference is stored in `localStorage` and persists across pages.

The bilingual system uses inline `data-i18n` attributes and a plain JavaScript switcher. No build step required. No framework dependency.

---

## Deployment

This site is deployed via GitHub Pages from the `main` branch.

To run locally:

```bash
# Clone the repository
git clone https://github.com/alonsobrx/founder-architect.git

# Navigate into the directory
cd founder-architect

# Serve locally (Python 3)
python3 -m http.server 8080

# Open in browser
# http://localhost:8080
```

No build step. No package install. Open the HTML files directly or serve with any static file server.

---

## Contact

- **Telegram (Accessible):** [t.me/alonsobrx](https://t.me/alonsobrx)
- **Email:** arnoldo@brasidasstrategies.com
- **GitHub:** [github.com/alonsobrx](https://github.com/alonsobrx)

---

## License

Content in this repository is the intellectual property of Arnoldo Alonso and Brasidas Strategies.

The biography, resume, and personal narrative content are All Rights Reserved.

The HTML and CSS structure may be referenced for educational purposes with attribution.

---

*Brasidas Strategies — Independent. Auditable. Accessible.*

*Serving veterans, disabled users, and the Rio Grande Valley community.*

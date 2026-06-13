## East End Systems — Static Site Design Prompt

### Brand Identity
- **Company:** East End Systems
- **Domain:** eastendsystems.com
- **Tagline:** Software engineering consultancy specializing in enterprise architecture, developer tooling, and AI-integrated systems
- **Tone:** Professional, technical, understated. Not startup-flashy. Think boutique firm with deep expertise. Clean, confident, minimal.
- **Audience:** Enterprise engineering leaders, startup CTOs, recruiters, potential consulting clients

---

### Site Structure (Single Page or 4 sections max)

**1. Hero**
- Company name + tagline
- One CTA: "Get in touch" (mailto or contact form)
- No stock photography. Abstract geometric or dark minimal aesthetic.

**2. Services**
- Enterprise Architecture & System Design
- AI-Integrated Systems & Agentic Workflows
- Developer Tooling & Internal Platform Engineering
- Technical Advisory (confidential engagements available)

**3. Projects / Work**
Four project cards:
- **SpaceTag** — macOS productivity suite. Swift menu bar app + open-source CLI. Surfaces LLM completion notifications (Claude Code, Codex) via color-coded per-space indicators. [Link to spacetag.com]
- **Golden Tests** — Immutable testing framework preventing AI agents from gaming test suites during automated development workflows.
- **Vector Recommendation Engine** — pgVector + Postgres + Nomic embeddings recommendation system seeded from structured public API data. In development.
- **Shared Design System** — CSS-based theming system consumed across multiple production projects. Open source.

**4. Contact**
- Simple form or mailto link
- Location: Sag Harbor, New York (remote-friendly)
- No phone number

---

### Design Direction
- Color palette: dark background (#0d0d0d or deep navy), neutral grays, one accent color (consider a muted teal or electric blue — nothing neon)
- Typography: clean sans-serif (Inter, Geist, or similar)
- No animations beyond subtle hover states
- Mobile responsive
- Fast load — static only, no JS frameworks required
- Optional: subtle East End / coastal texture or wave element in hero — understated, not literal

---

### Technical Requirements
- Static HTML/CSS or lightweight framework (Astro, 11ty, or plain HTML)
- No CMS needed
- Deploy target: Vercel or Netlify
- Contact form: Formspree or similar no-backend solution

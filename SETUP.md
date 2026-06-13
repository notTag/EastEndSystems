# Setup & Go-Live Checklist

Most of the build is automated. The items below need a human — they require
account access, DNS control, or third-party signups that can't be scripted.

## 1. Enable GitHub Pages (required)

The deploy workflow is committed, but Pages must be told to use it.

- Repo → **Settings → Pages**
- **Build and deployment → Source → "GitHub Actions"**

> Attempted automatically via `gh api`. If the site 404s, set this manually.

The first deploy runs automatically on push to `main`. Watch it under the repo
**Actions** tab. Once green, the site is live.

## 2. Live URL (works now)

The site ships configured for the **GitHub Pages project URL**:

> **https://nottag.github.io/EastEndSystems/**

Vite `base` defaults to `/EastEndSystems/` so all assets resolve there. No
further action needed for this URL.

## 3. Custom domain — eastendsystems.com (opt-in)

Switching to the bare domain takes three steps — two are scripted-friendly, the
**DNS step needs you** (registrar access):

**a. Point DNS at GitHub Pages** (at your domain registrar):

```
# Apex (eastendsystems.com) — four A records
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153

# www subdomain
CNAME   www   nottag.github.io.
```

(Optional IPv6: AAAA `@` → `2606:50c0:8000::153` … `:8003::153`.)

**b. Tell the build to serve from root.** A custom domain serves at `/`, so set
the base back to `/`:

- In `.github/workflows/deploy.yml`, change the build step to:
  `run: VITE_BASE=/ bun run build`
- Re-add the domain file: `echo eastendsystems.com > public/CNAME`

**c. Set the domain in GitHub.** Repo **Settings → Pages → Custom domain** →
enter `eastendsystems.com`, save, and tick **Enforce HTTPS** once the cert
provisions (~15 min–24 h). Commit + push to redeploy.

## 4. Contact form (Formspree)

The form falls back to a `mailto:` button until you connect Formspree:

1. Sign up at <https://formspree.io> (free tier is fine).
2. Create a form; copy its ID (the part after `/f/`, e.g. `xyzabcd`).
3. Edit `src/views/HomeView.vue`: `const FORMSPREE_ID = 'xyzabcd'`.
4. Commit + push. Submissions arrive in your Formspree inbox / forwarded email.

> Also update the fallback `mailto:hello@eastendsystems.com` in the same file if
> you want a different address.

## 5. Footer / project links (optional polish)

- The footer GitHub link points at `https://github.com` — swap in the real org.
- Project cards: `SpaceTag` links to `spacetag.com`; the other three have no
  link yet. Add `href` values in the `projects` array in `HomeView.vue`.

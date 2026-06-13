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

## 2. Custom domain — eastendsystems.com (optional but configured)

`public/CNAME` already contains `eastendsystems.com`, so GitHub will request the
domain. To make it resolve, add these DNS records at your registrar:

**Apex domain (eastendsystems.com) — four A records:**

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

(Optionally add the AAAA records `2606:50c0:8000..8003::153` for IPv6.)

**www subdomain:**

```
CNAME   www   notTag.github.io.
```

Then in **Settings → Pages → Custom domain**, confirm `eastendsystems.com` and
tick **Enforce HTTPS** once the certificate provisions (can take ~15 min–24 h).

> **Not using a custom domain?** Delete `public/CNAME`, then set
> `base: '/EastEndSystems/'` in `vite.config.ts` so asset paths resolve under
> `https://nottag.github.io/EastEndSystems/`. Commit + push to redeploy.

## 3. Contact form (Formspree)

The form falls back to a `mailto:` button until you connect Formspree:

1. Sign up at <https://formspree.io> (free tier is fine).
2. Create a form; copy its ID (the part after `/f/`, e.g. `xyzabcd`).
3. Edit `src/views/HomeView.vue`: `const FORMSPREE_ID = 'xyzabcd'`.
4. Commit + push. Submissions arrive in your Formspree inbox / forwarded email.

> Also update the fallback `mailto:hello@eastendsystems.com` in the same file if
> you want a different address.

## 4. Footer / project links (optional polish)

- The footer GitHub link points at `https://github.com` — swap in the real org.
- Project cards: `SpaceTag` links to `spacetag.com`; the other three have no
  link yet. Add `href` values in the `projects` array in `HomeView.vue`.

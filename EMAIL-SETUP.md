# East End Systems — Email & Calendar Setup

> Snapshot of how email + calendar are wired for `eastendsystems.com` as of **June 2026**.
> Not expected to change for a while. This doc is the map for future-you when you revisit.

---

## TL;DR architecture

Three loosely-coupled parts held together (works, but it's a patchwork):

1. **Inbound/outbound email** → Namecheap **Private Email** mailbox + Gmail "send as".
2. **Reading/sending mail day-to-day** → all funneled into the Gmail account `nick.tagliasacchi@gmail.com`.
3. **Calendar invites branded as the domain** → a separate **free Google account** logged in as `nicktag@eastendsystems.com`.

There is **no Google Workspace** subscription. Email does **not** run through Google for the domain — it runs through Namecheap Private Email.

---

## Accounts map (don't mix these up)

| Identity | Type | Role |
|---|---|---|
| `admin@eastendsystems.com` | **Private Email mailbox** (the one real paid mailbox) | The actual inbox/storage. Login + SMTP username for everything. Set as **catch-all**. |
| `info@eastendsystems.com` | Private Email **alias** → admin@ | Public contact address (listed on website). |
| `nick.tagliasacchi@eastendsystems.com` | Private Email **alias** → admin@ | Long-form personal address (kept for people who guess the full-name format). |
| `nicktag@eastendsystems.com` | Private Email **alias** → admin@ | **Primary personal/public address** — easier to say/type. |
| `nick.tagliasacchi@gmail.com` | Existing **Gmail account** | **Business-email hub.** Holds the forwarding target + all "send as" identities. This is where business mail is read/sent. |
| `nicktag@eastendsystems.com` (Google account) | **Free standalone Google account** (non-Gmail login) | **Calendar only.** Sends invites branded as the domain. Has NO gmail.com inbox (intentional). |
| `wakelax@gmail.com` | Separate Gmail account | **Deliberately NOT connected to any of this.** Keep it out. |

> Note the address `nicktag@eastendsystems.com` appears twice: once as a Private Email *alias* (for mail) and once as the login of a *standalone Google account* (for calendar). Different systems, same address — this is fine and intentional.

---

## Namecheap — domain + Private Email

- **Registrar:** Namecheap. Domain registered **2026-06-12**. Domain privacy (WhoisGuard / Withheld for Privacy) is **ON** — name/address/email redacted in WHOIS.
- **Private Email plan:** Launch tier (~$14.88/yr), auto-renew on. ~5 GB mailbox, 10 aliases allowed (using ~4).
- **Spam filter:** Jellyfish (default).
- **Catch-all:** set to `admin@eastendsystems.com` → any `*@eastendsystems.com` lands in admin@ even without an explicit alias.
- **Webmail:** https://privateemail.com (log in with full address `admin@eastendsystems.com` + mailbox password).

### Mail client / SMTP settings (used by Gmail send-as)
- **SMTP (sending):** `mail.privateemail.com`, port **465** SSL (fallback 587 TLS)
- **IMAP (receiving):** `mail.privateemail.com`, port **993** SSL
- **POP3:** `mail.privateemail.com`, port **995** SSL
- **Username** for all of the above = the real mailbox `admin@eastendsystems.com` (aliases ride on this login; they are NOT separate SMTP users).

> `mx1/mx2.privateemail.com` are INBOUND MX targets only — never typed into a mail client.

---

## DNS records (Namecheap → Advanced DNS)

Mail Settings dropdown was set to **Custom MX** (this is what exposes the Priority field; "Private Email" auto-mode hid it).

| Type | Host | Value | Priority |
|---|---|---|---|
| MX | `@` | `mx1.privateemail.com` | 10 |
| MX | `@` | `mx2.privateemail.com` | 10 |
| TXT (SPF) | `@` | `v=spf1 include:spf.privateemail.com ~all` | — |
| TXT (DKIM) | `privateemail._domainkey` (approx) | `v=DKIM1;k=rsa;p=...` | — |

DKIM is managed via the Private Email panel (Email Security → SHOW/REMOVE DKIM). SPF + DKIM together keep outbound from being spam-foldered.

**Unrelated leftovers in DNS** (website, not email — clean up when wiring the real site):
- `CNAME www → parkingpage.namecheap.com` (Namecheap parking)
- `URL Redirect @ → http://www.eastendsystems.com`
- These will conflict with the GitHub Pages site in this repo when the domain is pointed at it.

---

## Gmail config (in `nick.tagliasacchi@gmail.com`)

1. **Forwarding:** Private Email (admin@ mailbox) forwards all incoming → `nick.tagliasacchi@gmail.com`. Combined with catch-all, every domain address ends up here.
2. **Send mail as:** three identities added — `admin@`, `info@`, `nicktag@` (and/or `nick.tagliasacchi@`). Each uses SMTP `mail.privateemail.com:465 SSL`, username `admin@eastendsystems.com`, admin@ password.
3. **Reply behavior:** Settings → Accounts and Import → "When replying to a message" = **"Reply from the same address the message was sent to"** (makes alias replies seamless).

**Header check:** because send-as uses Private Email's SMTP (not Gmail's), outbound shows no "via gmail.com" tag and DKIM passes for `eastendsystems.com`. Clean/professional.

---

## Calendar (standalone Google account)

- Free Google account, login = `nicktag@eastendsystems.com`, created via "use my current email" (NOT a gmail.com signup).
- Used at https://calendar.google.com — invites show organizer as `nicktag@eastendsystems.com`.
- **No gmail.com inbox** on this account — intentional. Do NOT "Add Gmail" to it (that sneaky flow demotes the domain address to an alias and would re-brand invites with a gmail address).
- **Phone:** verified with an alt/borrowed number due to Google's "number used too many times" limit on the primary number. Phone is swappable later (myaccount → Personal info → Contact info). Set a **recovery email** before removing the borrowed number so you can't get locked out.
- Use **separate Chrome profiles** to keep this account, the gmail hub, and wakelax@ from entangling. Be deliberate about which account you're in when creating an invite.

---

## What's externally visible (and what isn't)

Visible to anyone via public lookup:
- **MX/SPF** (DNS) → reveals "uses Namecheap Private Email" (mxtoolbox.com, `dig MX`).
- **WHOIS** → registrar (Namecheap) + creation date (2026-06-12). who.is, lookup.icann.org, `whois`.

NOT visible: your identity (privacy on), that it's one person, that mail forwards to a gmail inbox, or that the calendar account is free/non-Workspace.

---

## Known gotchas / gotchas avoided

- Gmail "send as" does **NOT** extend to Google Calendar — that's *why* the separate calendar account exists.
- "Add Gmail to your Google Account" screen is a trap: it makes a gmail.com address primary and demotes the domain address. **Never complete it** on the calendar account.
- Removing your phone from an old account does **not** immediately free Google's number-reuse quota (it's historical, resets in ~weeks). Borrow a number instead.

---

## Eventual migration (when the patchwork annoys you more than the cost)

Target end-state to collapse all three parts into one real account:

- **Google Workspace (~$6/mo)** — `nicktag@eastendsystems.com` becomes a real account; Gmail + Calendar + Docs all natively branded; kills send-as gymnastics, the forwarding, and the separate calendar account. Natural endpoint given the Google-centric usage.
- **Fastmail (~$5/mo)** — non-Google alternative; clean custom-domain mail + calendar, no upsell games; weaker native Google Calendar integration.

Migration involves: repoint MX away from Private Email → new provider, import existing mail, move calendar data. Straightforward but do it deliberately, not mid-stream.

**No action needed now — current setup works at ~$15/yr.**

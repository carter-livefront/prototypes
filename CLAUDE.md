# Prototypes repo

A private home for AI-generated HTML prototypes, served at unguessable 32-char URLs so they can be shared link-only without being indexed or discoverable.

## Folder structure (strict — do not deviate)

```
/
├── public/                    ← THE ONLY THING THE HOST SERVES
│   ├── p/<32-char-id>/        ← one folder per prototype, fully isolated
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── assets/            ← optional, prototype-local only
│   ├── _headers               ← noindex + referrer-policy headers
│   ├── robots.txt             ← Disallow: /
│   └── index.html             ← intentional dead-end ("Nothing here.")
│
├── _index/
│   └── prototypes.json        ← human-readable index: id → title, date, tags
│
├── _scripts/
│   └── new.sh                 ← scaffolds a new prototype
│
├── _templates/
│   └── blank/                 ← starter template — copy, don't edit in place
│
├── CLAUDE.md
├── README.md
└── .gitignore
```

### Why this layout

- **`public/` is the deploy root.** Configure the host (Cloudflare Pages / Netlify) to serve `public/` and nothing else. `_index/`, `_scripts/`, `_templates/`, and `CLAUDE.md` never reach the internet.
- **Flat `public/p/<id>/`.** No category nesting. Random IDs don't sort meaningfully — `_index/prototypes.json` handles human organization.
- **One folder = one prototype.** No shared CSS, no shared JS, no shared assets across prototypes. This is the only way 20 prototypes with different design languages coexist without style bleed.

## Adding a new prototype

**Always use the script.** It generates the ID, copies the template, and updates the index in one step:

```bash
./_scripts/new.sh "Checkout flow v2"
# or with a non-default template:
./_scripts/new.sh "Dashboard concept" blank
```

Output gives you the ID and URL path. Open `public/p/<id>/index.html` and start building.

### If you must do it by hand

1. Generate ID: `openssl rand -hex 16` (must be exactly 32 hex chars, lowercase)
2. `cp -r _templates/blank public/p/<id>`
3. Add an entry to `_index/prototypes.json`:
   ```json
   { "id": "<id>", "title": "...", "template": "blank", "created": "<ISO date>", "tags": [], "notes": "" }
   ```

## Hard rules

1. **Never share files between prototypes.** No `public/shared/`, no symlinks, no relative imports across `p/<id>/` boundaries. If two prototypes need the same library, each gets its own copy (or each loads it from a CDN). Isolation is the point.

2. **Never link prototypes from anywhere public.** No listing in `public/index.html`, no sitemap, no README mention by ID. The repo itself must stay **private** on GitHub — the URLs are in the commit history.

3. **Every prototype's `<head>` must include:**
   ```html
   <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
   <meta name="referrer" content="no-referrer">
   ```
   The template already has these. Don't strip them.

4. **IDs are immutable.** Once a prototype has an ID and has been shared, never rename the folder — the share link breaks. To "replace" a prototype, create a new one and update the index `notes` on the old one.

5. **Use CDN links for libraries** (Tailwind Play CDN, React UMD, etc.) rather than committing `node_modules` per prototype. Keeps the repo small.

6. **Don't put anything in `public/` other than `p/`, `_headers`, `robots.txt`, and `index.html`.** No top-level prototype files, no stray test pages.

## Privacy / no-index setup

Four layers, all already wired up:

| Layer | File | Effect |
|---|---|---|
| HTTP header | `public/_headers` | `X-Robots-Tag: noindex, nofollow, noarchive` on every response — strongest signal, works even if someone links to a prototype |
| robots.txt | `public/robots.txt` | Tells compliant crawlers not to fetch anything |
| Meta tag | template `<head>` | Backup if headers misconfigure |
| Referrer policy | `_headers` + meta | Prevents 32-char URLs from leaking to external sites via Referer header when a prototype links out |

This stops Google, Bing, Archive.org, GPTBot, etc. from indexing or caching. It does **not** stop a recipient from re-sharing a URL — assume URLs are only as private as the people you send them to.

## Hosting

Designed for **Cloudflare Pages** or **Netlify**. Both auto-detect `_headers`. Deploy config:

- **Build command:** none
- **Publish directory:** `public`
- **Branch:** main

Once connected, every push to `main` redeploys. New prototype URLs are live in seconds.

## When working on a prototype

- All paths inside a prototype must be relative (`./style.css`, not `/style.css`) so the prototype works regardless of its `<id>`.
- Test locally by opening `public/p/<id>/index.html` directly, or run `python3 -m http.server` from `public/` and visit `http://localhost:8000/p/<id>/`.
- If you add a new template, mirror the `blank/` structure and include the noindex meta tags.

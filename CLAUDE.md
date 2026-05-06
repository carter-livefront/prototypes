# Prototypes repo

A home for AI-generated HTML prototypes, served at unguessable 32-char URLs so they can be shared link-only without being indexed by search engines.

Hosted on **GitHub Pages** at `https://prototypes.cartershades.com/` — publish source is the `docs/` folder on `main`.

## Folder structure (strict — do not deviate)

```
/
├── docs/                      ← GitHub Pages serves this folder
│   ├── p/<32-char-id>/        ← one folder per prototype, fully isolated
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── assets/            ← optional, prototype-local only
│   ├── _headers               ← (unused on GitHub Pages, kept for host portability)
│   ├── robots.txt             ← Disallow: /
│   ├── CNAME                  ← custom domain, GitHub-managed
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

- **`docs/` is the deploy root.** GitHub Pages can only serve from the repo root or `/docs`; we use `/docs` so `_index/`, `_scripts/`, `_templates/`, and `CLAUDE.md` stay out of the served output.
- **Flat `docs/p/<id>/`.** No category nesting. Random IDs don't sort meaningfully — `_index/prototypes.json` handles human organization.
- **One folder = one prototype.** No shared CSS, no shared JS, no shared assets across prototypes. This is the only way 20 prototypes with different design languages coexist without style bleed.

## Adding a new prototype

**Always use the script.** It generates the ID, copies the template, and updates the index in one step:

```bash
./_scripts/new.sh "Checkout flow v2"
# or with a non-default template:
./_scripts/new.sh "Dashboard concept" blank
```

Output gives you the ID and URL path. Open `docs/p/<id>/index.html` and start building. Commit and push — GitHub Pages redeploys in ~1 min.

### If you must do it by hand

1. Generate ID: `openssl rand -hex 16` (must be exactly 32 hex chars, lowercase)
2. `cp -r _templates/blank docs/p/<id>`
3. Add an entry to `_index/prototypes.json`:
   ```json
   { "id": "<id>", "title": "...", "template": "blank", "created": "<ISO date>", "tags": [], "notes": "" }
   ```

## Hard rules

1. **Never share files between prototypes.** No `docs/shared/`, no symlinks, no relative imports across `p/<id>/` boundaries. If two prototypes need the same library, each gets its own copy (or each loads it from a CDN). Isolation is the point.

2. **Every prototype's `<head>` must include:**
   ```html
   <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
   <meta name="referrer" content="no-referrer">
   ```
   The template already has these. Don't strip them. On GitHub Pages these meta tags are the primary noindex signal (HTTP headers from `_headers` are ignored).

3. **IDs are immutable.** Once a prototype has an ID and has been shared, never rename the folder — the share link breaks. To "replace" a prototype, create a new one and update the index `notes` on the old one.

4. **Use CDN links for libraries** (Tailwind Play CDN, React UMD, etc.) rather than committing `node_modules` per prototype. Keeps the repo small.

5. **Don't put anything in `docs/` other than `p/`, `_headers`, `robots.txt`, `CNAME`, and `index.html`.** No top-level prototype files, no stray test pages.

6. **Use relative paths inside prototypes** (`./style.css`, not `/style.css`) so each prototype works regardless of its `<id>` and is portable.

## Privacy / no-index setup

| Layer | File | Active on GitHub Pages? | Effect |
|---|---|---|---|
| Meta tag | template `<head>` | ✅ yes | Strongest available signal on GH Pages — tells crawlers not to index |
| robots.txt | `docs/robots.txt` | ✅ yes | Tells compliant crawlers not to fetch anything |
| HTTP header | `docs/_headers` | ❌ no | GitHub Pages ignores `_headers`. Kept in repo for portability if we ever switch hosts (Cloudflare Pages / Netlify both honor it) |
| Referrer policy | meta tag | ✅ yes | Prevents URLs from leaking to external sites via Referer header |

This stops Google, Bing, Archive.org, GPTBot, etc. from indexing or caching.

### Important caveat: this repo is public

Because GitHub Pages on free accounts requires public repos, **the 32-char IDs are not actually unguessable** — anyone who finds this repo on GitHub can browse `docs/p/` and `_index/prototypes.json` to enumerate every prototype. The URLs are still hard to *guess*, but trivial to *list* by anyone who reaches the repo.

Practical implications:
- Don't put truly sensitive content in prototypes here
- Don't link this repo from your public GitHub profile/README if you want even casual obscurity
- For genuinely private hosting, switch to Cloudflare Pages or Netlify (both accept private repos for free)

## Hosting (GitHub Pages)

Already configured. For reference:

- **Settings → Pages → Source:** Deploy from a branch
- **Branch:** `main` / `/docs`
- **Custom domain:** `prototypes.cartershades.com` (CNAME at `docs/CNAME`)
- **Build command:** none — GitHub Pages serves `docs/` as-is

Every push to `main` triggers a redeploy (~1 min).

## Local preview

```bash
cd docs && python3 -m http.server 8000
# then open http://localhost:8000/p/<id>/
```

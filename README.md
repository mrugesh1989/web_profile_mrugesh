# Mrugesh Patel — Portfolio

Personal portfolio site for **AI Data Engineering** roles. Static HTML/CSS/JS, optimized for [GitHub Pages](https://pages.github.com/).

## Local preview

```bash
cd mrugesh-portfolio
python3 -m http.server 8080
# Open http://localhost:8080
```

## Deploy to GitHub Pages

### Option A — User site (`mrugesh1989.github.io`)

1. Create repo `mrugesh1989.github.io` on GitHub (if it does not exist).
2. Copy the contents of this folder to the repo root (not the folder itself).
3. Push to `main`.
4. In repo **Settings → Pages**, set source to **Deploy from branch** → `main` → `/ (root)`.
5. Site URL: `https://mrugesh1989.github.io/`

### Option B — Project site

1. Push this folder to any repo.
2. Enable Pages from `/` on `main`, or move files to `/docs` and select `/docs` as the source.

## Structure

```
mrugesh-portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/profile.png
└── .nojekyll
```

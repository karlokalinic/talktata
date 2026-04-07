# Engleski za Tatu

Static English-learning web app for a Croatian beginner, built around practical travel phrases, short lessons, review, and simple gamification.

## Project structure

- `engleski/` - the actual app
- `engleski/index.html` - main app entry point
- `engleski/css/style.css` - styling
- `engleski/js/data.js` - lesson and achievement data
- `engleski/js/app.js` - app logic
- `claude/` - curriculum and product skills
- `index.html` - root redirect for static hosting from repository root

## Run locally

Open `engleski/index.html` directly in a browser, or serve the repository root with any static server.

Example with Python:

```powershell
python -m http.server 8000
```

Then open:

- `http://localhost:8000/`
- or `http://localhost:8000/engleski/`

## Deployment

This repository is set up to work as a static site.

### Vercel

- Import the repository
- No build command required
- No output directory required
- Deploy from the repository root

### Netlify

- New site from Git
- Publish directory: repository root
- No build command required

### Cloudflare Pages

- Connect the repository
- No build command required
- Deploy the repository root as static files

### GitHub Pages

- Publish from the repository root branch contents
- The root `index.html` forwards users into `engleski/`

## Notes

- The app is intentionally framework-free and build-free.
- `engleski/js/data.js` must load before `engleski/js/app.js`.
- Speech recognition support depends on browser support and usually requires HTTPS.
- Text-to-speech availability depends on installed browser voices.

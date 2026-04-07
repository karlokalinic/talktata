# Copilot instructions for this workspace

Purpose: Provide concise guidance for AI assistants and Copilot on how to work productively in this repo.

## Quick start

- This is a small static site + content repo. Preview by opening `engleski/index.html` in a browser or run a local static server:

```powershell
python -m http.server 8000
```

- No build system or tests detected (no `package.json`, CI, or test runner).

## Agent guidelines (short)

- Make small, incremental changes and prefer edits as focused patches.
- Preserve `engleski/js/data.js` and the global `CURRICULUM` object unless asked to change them.
- When modifying JavaScript, ensure `data.js` loads before `app.js` (script order matters).
- Respect Croatian UI/content; ask before translating or mixing languages.
- Ask clarifying questions for ambiguous requests (which file, target language, browser support).

## Repo overview (key files)

- [claude/SkillA.txt](../claude/SkillA.txt)
- [claude/SkillB.txt](../claude/SkillB.txt)
- [engleski/index.html](../engleski/index.html)
- [engleski/css/style.css](../engleski/css/style.css)
- [engleski/js/data.js](../engleski/js/data.js)
- [engleski/js/app.js](../engleski/js/app.js)

## Example prompts

- Add a responsive navbar to `engleski/index.html` and update `engleski/css/style.css`.
- Refactor `engleski/js/app.js` to remove globals while keeping `data.js` as the single source of lesson data.
- Summarize `claude/SkillA.txt` and propose a tidy folder structure for lessons and assets.

## Suggested next customizations

- Add a minimal `README.md` with run instructions and key file descriptions.
- Create `AGENTS.md` or applyTo-based instructions for frontend vs. content tasks.

If you'd like, I can (1) start a local static server, (2) add the README, or (3) scaffold an `AGENTS.md` now.

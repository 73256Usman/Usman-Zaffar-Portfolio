# How the site works

For future you, or anyone helping you maintain it.

## Overview

A static site. The browser loads `index.html`, which loads `assets/css/style.css` and `assets/js/main.js`. `main.js` imports `data.js` (all content) and `scene.js` (the 3D hero). There is no server code and no build step.

## The Cyber / IT switch

- The current view is stored on the `<html>` element as `data-track="cyber"` or `"it"`. CSS reads it to change the accent color.
- `setTrack()` in `main.js` re-renders every section from `data.js` for the chosen view and saves the choice in the browser's localStorage.
- A link with `?track=it` at the end opens the IT view directly. Handy for putting different links on your two resumes.
- Facts that are the same for both views (experience bullets, About, education, certifications) are stored once, so the two views never disagree. Only emphasis changes: which projects and tools show, the section headings, and the process steps.

## Content model

`data.js` exports plain objects and arrays. `main.js` turns them into HTML. All text is escaped before it is inserted, so special characters in your text cannot break the page.

## The 3D hero (`scene.js`)

A Three.js network of 96 connected nodes with small data packets moving along the links.

- Cyber view: random nodes flash red (an alert) then turn the accent color (contained), and a scan ring sweeps the network.
- IT view: the same network with calm pulses.
- It starts only after the page has painted, pauses when scrolled out of view or when the tab is hidden, and releases the graphics context on refresh.
- If WebGL is unavailable, or the visitor prefers reduced motion, the page falls back gracefully (a soft glow, or a still frame).
- Tuning: node count `N`, radius `R`, packet count `P`, and `COLORS` are at the top of the file.

## Caching and the version tag

GitHub Pages lets browsers cache each file for about 10 minutes. To stop visitors getting a mix of old and new files, the CSS and JavaScript links carry a version, like `main.js?v=202610311813`. `bump-version.sh` changes that version everywhere, and `publish.sh` runs it for you. If you edit files and push without it, visitors may see old scripts for a few minutes.

`main.js` is also written defensively: if a section's HTML is missing, that section is skipped instead of breaking the whole page.

## Accessibility and devices

- Fully keyboard usable. A skip link, visible focus outlines, toggle buttons with proper states, and a command palette (Ctrl K or Cmd K).
- Respects the visitor's reduced motion setting.
- Layout tested from 360 pixel wide phones to 2560 pixel monitors, including iPad portrait and landscape. Touch screens get larger tap targets.
- The page needs no external requests. Fonts, icons and the 3D library are all stored in the repo.

## Hosting

GitHub Pages, deploying from the `master` branch root. Settings, Pages, Source: "Deploy from a branch", branch `master`, folder `/ (root)`. The same files also work on Vercel or Netlify with no changes.

## Things deliberately left out

- No analytics or tracking.
- No contact form (it would need a backend). Visitors use the email link or LinkedIn.
- No sound toggle.

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

## Interactive extras (`extras.js`)

The lab map, the example walkthrough, the scroll progress bar, the switch sweep and the count up live in `assets/js/extras.js`. It is loaded by `main.js` and wrapped so that if it ever fails, the rest of the site still works. The moving packets and the walkthrough pause when they are off screen, and every animation is turned off for visitors who prefer reduced motion.

## Tab icon and link preview

Files in the project root: `favicon.ico`, `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest` and `og-image.png` (the 1200x630 preview card shown when the link is shared).

Some browsers and apps ask for `/favicon.ico` first and show a grey letter if it is missing, which is why the ICO is included next to the SVG. The `<head>` in `index.html` points to these files with full web addresses and the version tag, so `bump-version.sh` refreshes them on every publish.

If you ever move to a custom domain, replace `https://73256usman.github.io/Usman-Zaffar-Portfolio/` in the `<head>` of `index.html` (canonical, og:url, og:image, twitter:image and the icon links) with the new address.

Browsers cache tab icons for a long time. To check a change, open the site in a private window. To refresh the LinkedIn preview card, paste the link into the LinkedIn Post Inspector (linkedin.com/post-inspector) and press Inspect.

## Hosting

GitHub Pages, deploying from the `master` branch root. Settings, Pages, Source: "Deploy from a branch", branch `master`, folder `/ (root)`. The same files also work on Vercel or Netlify with no changes.

## Things deliberately left out

- No analytics or tracking.
- No contact form (it would need a backend). Visitors use the email link or LinkedIn.
- No sound toggle.

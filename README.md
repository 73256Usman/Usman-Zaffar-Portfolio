# Usman Zaffar | Identity & Access Management Portfolio

Live site: https://73256usman.github.io/Usman-Zaffar-Portfolio/

A personal portfolio with an **IAM / IT switch**. One person, one set of facts, two lenses. The switch changes what leads (projects, tools, the process section, the resume button), not who I am.

Everything is plain HTML, CSS and JavaScript. There is no build step and no framework, so it can be edited with any text editor and hosted for free on GitHub Pages.

## Page order

1. Snapshot (name, summary, four quick facts)
2. Work experience
3. Education and certifications
4. Skills and tools
5. Projects and labs
6. How I work
7. About
8. Contact

## Quick reference: where to change things

| I want to change | File | Section to look for |
| --- | --- | --- |
| Name, email, links, summary, quick facts | `assets/js/data.js` | `profile` |
| A job or experience entry | `assets/js/data.js` | `experience` |
| Degree or school | `assets/js/data.js` | `education` |
| Certifications (mark SC-300 earned when you pass) | `assets/js/data.js` | `credentials` |
| Projects and labs (and their links) | `assets/js/data.js` | `projects` |
| Tools and their icons | `assets/js/data.js` and `assets/icons/` | `toolkit` |
| Key skills chips | `assets/js/data.js` | `methods` |
| About text | `assets/js/data.js` | `bio` |
| IAM / IT headings and the process steps | `assets/js/data.js` | `tracks` |
| Resume PDFs | `resume/` folder | file names below |
| Colors, fonts, spacing | `assets/css/style.css` | `:root` at the top |
| Page structure and section order | `index.html` | |

Step by step instructions with copy and paste examples are in [docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md).
How the site works under the hood is in [docs/HOW-IT-WORKS.md](docs/HOW-IT-WORKS.md).

## Resumes

Put your two PDFs in the `resume/` folder with these exact names:

- `Usman-Zaffar-IAM-Resume.pdf`
- `Usman-Zaffar-IT-Resume.pdf`

The download buttons appear on their own once the files exist. Until then they stay hidden.

## Publishing changes

After you edit files, run this from the project folder:

```bash
bash publish.sh "short note about what you changed"
```

It updates the cache version, commits, and pushes. The live site refreshes in about a minute. Open it in a private window to skip any old cached copy.

## Run it on your own computer first

Modules need a web server, so double clicking `index.html` will not work.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. Press Ctrl+C in Terminal to stop it.

## Project layout

```
index.html              Page structure and sections
favicon.*, icon-*.png   Tab icons (also apple-touch-icon.png, site.webmanifest)
og-image.png            Preview card shown when the link is shared
assets/
  css/style.css         All styling and colors
  js/data.js            All content (edit this most often)
  js/main.js            Page logic: filters, view switch, search palette
  js/scene.js           The 3D network in the hero
  js/extras.js          Lab map, example walkthrough, progress bar
  js/icons.js           Small inline icons
  icons/                Tool logos and icons (SVG)
  fonts/                Self-hosted fonts
  vendor/               Three.js (3D library) and its license
resume/                 Your resume PDFs go here
docs/                   Guides for future you
publish.sh              One command publish
bump-version.sh         Cache busting (called by publish.sh)
CHANGELOG.md            A running log of changes
```

## Credits

- Fonts: Montserrat, Barlow Condensed and JetBrains Mono (SIL Open Font License)
- 3D: Three.js (MIT license), included in `assets/vendor`
- Icons: Simple Icons (CC0), Devicon (MIT) and Lucide (ISC)
- Brand logos belong to their owners and are shown only to identify the tools used

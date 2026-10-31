# Usman Zaffar | Cybersecurity & IT Portfolio

A static portfolio with a **Cyber / IT switch**. Flip the toggle in the header and the hero, projects, experience, tools and bio all change to match the track.

Live site: https://73256usman.github.io/Usman-Zaffar-Portfolio/

## Features

- Dark, terminal inspired design with a self-hosted Space Grotesk and JetBrains Mono pairing
- Original animated 3D hero shape (Three.js), with a CSS fallback if WebGL is unavailable
- Cyber and IT views, remembered between visits and shareable with `?track=it`
- Filterable project case studies, searchable toolkit, experience timeline
- Ctrl K command palette
- Resume download buttons that appear automatically when the PDFs exist
- No build step and no external requests: plain HTML, CSS and JavaScript

## Update the content

Everything lives in `assets/js/data.js`: projects, experience, tools, education and links. Edit it, commit, push.

## Add your resumes

Put your two PDFs in the `resume/` folder with these exact names:

- `Usman-Zaffar-Cybersecurity-Resume.pdf`
- `Usman-Zaffar-IT-Resume.pdf`

The download buttons show up on their own once the files are there.

## Before every push

Run `bash bump-version.sh` once before you commit. It changes the version tag on the site files so visitors' browsers fetch the newest scripts and styles instead of an old cached copy.

## Run it locally

Modules need a web server, so opening the file directly will not work.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Hosted on GitHub Pages straight from the `master` branch (Settings, Pages, Deploy from a branch, `/root`). Every push updates the live site in about a minute. It also works unchanged on Vercel or Netlify.

## Credits

Fonts: Space Grotesk and JetBrains Mono (SIL Open Font License). 3D: Three.js (MIT), included in `assets/vendor` with its license.

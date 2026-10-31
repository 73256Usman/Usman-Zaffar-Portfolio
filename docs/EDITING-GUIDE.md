# Editing guide

Everything you will normally change lives in one file: `assets/js/data.js`. Open it in any text editor (VS Code is a good free choice). Save, then publish with `bash publish.sh "what you changed"`.

Rules that keep the site from breaking:

- Keep the quotation marks, commas and brackets exactly as they are. Copy an existing entry and change the words inside the quotes.
- Every entry in a list ends with a comma.
- Inside text, avoid typing a double quote character. Use an apostrophe instead.
- Test locally first if you are unsure (see "Preview before publishing" at the bottom).

---

## 1. Add a certification (CySA+, SC-200, and so on)

Find `export const credentials` and add an entry:

```js
{
  name: "CompTIA CySA+",
  issuer: "CompTIA",
  area: "Cybersecurity",
  status: "Earned",
  earned: true,
},
```

When you pass the Azure exam, find the AZ-900 entry and change `status: "Planned"` to `status: "Earned"` and `earned: false` to `earned: true`.

Also update the snapshot tiles near the top of the site: in `profile`, edit the `facts` list (for example change "CompTIA Security+" to "Security+ and CySA+").

## 2. Add a job

Find `export const experience` and copy one block. Put the newest at the top.

```js
{
  id: "new-job",                 // any short unique name
  dates: "Jan 2027 to Present",
  kind: "Full time",
  role: "Security Analyst",
  org: "Company Name",
  place: "City, ST",
  stat: ["5", "what this number means"],   // the big number on the right
  bullets: [
    "Start with an action verb and include a number when you can.",
    "Keep each bullet to one or two lines.",
    "Three bullets is plenty.",
  ],
},
```

## 3. Add a project or lab

Find `export const projects` and copy one block.

```js
{
  id: "my-new-lab",              // unique, no spaces
  title: "Project Name",
  meta: "Home lab",              // small line above the title
  track: "cyber",                // "cyber", "it", or "both"
  tags: ["Blue team"],           // must match a filter name (see below)
  flow: ["Step one", "Step two", "Step three", "Step four"],
  summary: "One plain sentence anyone can understand.",
  did: [
    "What you did, in a short sentence.",
    "Another short sentence.",
  ],
  tools: ["Tool A", "Tool B"],
  links: [
    { label: "View on GitHub", url: "https://github.com/73256Usman/your-repo" },
  ],
},
```

- `links` is optional. Delete the whole `links` part if you have none. This is where App Store links go for your iOS apps.
- Filter names live in `export const filters`. For a project to appear under a filter button, one of its `tags` must match a name in that list exactly.
- Use `track: "both"` for work that fits both sides, such as Active Directory.

## 4. Add your iOS apps

Add one project per app, using `track: "it"` (or `"both"`), a one line summary, and a link:

```js
links: [{ label: "App Store", url: "https://apps.apple.com/us/app/your-app/id000000000" }],
```

## 5. Add a tool and its icon

Find `export const toolkit`. Each line is `[name, group, track, icon]`:

```js
["Splunk", "Detection", "cyber", "scan"],
```

- Groups must match the names in `toolFilters` (Detection, Offensive, Training, Systems, Support, Scripting, Dev and AI).
- The last value is an icon file name from `assets/icons/`, without `.svg`.

To use the real logo of a tool:

1. Download the SVG from https://simpleicons.org (free, CC0).
2. Save it as `assets/icons/splunk.svg`.
3. Open the file and add a color to the `<svg` tag, for example `<svg fill="#e9eee7" ...`. Light colors look best on the dark background.
4. Use `"splunk"` as the icon name in the toolkit line.

Other free icon sources: https://lucide.dev (simple line icons) and https://devicon.dev (technology logos).

## 6. Change the key skills chips

Find `export const methods`. There is one list for `cyber` and one for `it`. Keep each chip short. Use the same words that appear in job postings, since recruiters and applicant tracking systems search for them.

## 7. Change the main summary or snapshot tiles

In `profile`:

- `intro` is the two line summary under your name.
- `badge` is the "Open to work" tag.
- `facts` are the four snapshot tiles. Each is `[LABEL, headline, detail]`.
- `contactLine` is the sentence in the contact section.
- `email`, `github`, `linkedin` are your links.

## 8. Change the About section

Find `export const bio`. Each string in the list is one paragraph. Two short paragraphs works best.

## 9. Change the headings and process steps for each view

Find `export const tracks`. The `cyber` and `it` blocks hold the tagline, the section headings, the strip of keywords under your name, and the process steps in "How I work" (`cycle` and `caps`).

## 10. Add or update resumes

1. Export your resumes as PDF.
2. Name them exactly `Usman-Zaffar-Cybersecurity-Resume.pdf` and `Usman-Zaffar-IT-Resume.pdf`.
3. Drop them in the `resume/` folder (replace the old ones).
4. Publish. Buttons appear in the header, hero and contact section.

## 11. Change colors

Open `assets/css/style.css`. At the top, in `:root`:

- `--accent` is the highlight color for the Cyber view. `:root[data-track="it"]` right below it sets the IT view color.
- `--bg`, `--surface` and `--text` control the dark theme.

The 3D network colors are in `assets/js/scene.js` at `const COLORS`. Keep them matching the CSS accent colors.

## 12. Reorder or remove a section

Sections live in `index.html` inside `<main>`, in this order: experience, credentials, toolkit, work, capabilities, about, contact. Cut and paste a whole `<section>...</section>` block to move it. If you move sections, also update the menu links at the top of the file and the small numbers in each `kicker` line (`/01`, `/02`, ...).

---

## Preview before publishing

```bash
cd Usman-Zaffar-Portfolio
python3 -m http.server 8000
```

Open http://localhost:8000. If the page looks empty, open the browser developer tools (right click, Inspect, Console tab). A red error message will name the file and line of the typo, usually a missing comma or quote in `data.js`.

## Publish

```bash
bash publish.sh "Added CySA+ certification"
```

## If something looks wrong on the live site

- Open it in a private window, or hard refresh (Cmd+Shift+R). Browsers can hold an old copy for about 10 minutes.
- If you changed a file but forgot `publish.sh`, run it. It bumps the version tag that forces browsers to fetch the new files.
- Check the repo on GitHub, Actions tab. A green check next to "pages build and deployment" means the update is live.
- To undo your last change: `git revert HEAD` then `git push origin master`.

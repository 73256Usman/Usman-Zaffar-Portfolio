# Changelog

Keep a short note here each time you make a meaningful change. It helps future you remember what changed and why.

## IAM view and black and grey colors

- The Cyber view is now an **IAM view** (Identity and Access Management). The switch has two views: IAM and IT. The IT view is unchanged except for the new colors.
- New IAM content: hero summary and facts, six IAM projects (Entra ID and Conditional Access, Okta SSO and API security, joiner-mover-leaver automation, privileged access, access review, iOS authentication), IAM skills and tools, the access lifecycle section with its example request, and an IAM lab map.
- Work experience now has IAM wording for Geeks On Site, the iOS apps and Metro One. Each job field can be a plain value or one value per view.
- Removed the Cyber only projects and tools (Nessus, TryHackMe, Kali, malware, USB research, secure AI agent) from the site.
- Certification: AZ-900 replaced by SC-300 (in progress).
- Colors now match the LinkedIn cover: black, light grey, mid grey and white. Updated the preview image, tab icons and manifest.

## Layout stability and hero sizing

- Nothing on the page moves when you click. Project cards now open in a dialog instead of expanding in the grid, filters dim the cards and tools that do not match instead of removing them, and every lab map panel shares one fixed-size box.
- Hero: the 3D globe is anchored to the right edge of the content column at a size set by `--globe` in `assets/css/style.css`, so it looks the same on every desktop resolution. On tablet and phone it is a faint backdrop behind the headline.
- Hero type and spacing also scale with screen height, so the first screen fits on common laptop and desktop sizes.
- Education and certification tags use one shared style.

## 2026-10-31

- Rebuilt the portfolio with a Cyber / IT switch.
- Recruiter-first order: snapshot, experience, education and certifications, skills and tools, projects and labs, how I work, about, contact.
- New 3D network hero that reacts to the selected view.
- Tool icons, filterable projects, command palette (Ctrl K).
- Fixed caching and refresh issues, added version tags and the publish script.
- Added a clickable lab map (Projects), an animated example walkthrough of the security and support cycle (How I work), a scroll progress bar, a sweep animation when switching Cyber / IT, a count up on the 150+ stat, and optional screenshots inside project cards. All animation switches off for visitors who have reduced motion turned on.
- New look based on the Pinterest design: navy colors, bold condensed uppercase headlines (Barlow Condensed), Montserrat body text, cleaner hero (no terminal line, cursor glow or grain), gentle entrance and scroll animations, hover lift on cards. The hero now states the roles you want (it changes with the Cyber / IT switch) and the tab icon, link preview and LinkedIn banner use the new colors.
- Added an optional About photo: save a headshot as assets/img/usman.jpg and it appears automatically.
- Removed the "switch" hint line under the hero. Replaced the rounded pill look with plain text (Open to work) and small square tags and labels.
- Rewrote stiff copy to sound more like a person (taglines, intro lines, About, process text). The resume card on the contact section now stays hidden until a resume PDF exists.
- Added logo style icon tiles to experience, education and certifications, and line icons to project cards, process steps, How I work cards and contact links. Process steps become a tidy grid on tablets and phones.
- Added a full tab icon set (favicon.ico, favicon.svg, 32px PNG, Apple touch icon, web manifest) and a link preview image (og-image.png) so the site shows its own icon and a preview card when opened from LinkedIn, email or chat.

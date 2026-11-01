import {
  profile, tracks, projects, filters, toolkit, methods, toolFilters,
  experience, education, bio, aboutTitle, credentials,
} from "./data.js?v=202610312359";
import { ico } from "./icons.js?v=202610312359";
import { initScene } from "./scene.js?v=202610312359";
import { initExtras, countUp } from "./extras.js?v=202610312359";

const ghost = document.createElement("div"); // stands in for any element missing from the HTML, so one mismatch can never blank the page
const $ = (s, r = document) => r.querySelector(s) || ghost;
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const state = { track: "cyber", workFilter: "All work", toolFilter: "All tools", toolQuery: "" };

/* ---------- helpers ---------- */
function showFor(item) { return item.track === "both" || item.track === state.track; }
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2000);
}
function swapAnim(el) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }

/* ---------- static links ---------- */
function initLinks() {
  $("#ghLink").href = profile.github;
  $("#ghLink2").href = profile.github;
  $("#liLink").href = profile.linkedin;
  $("#liLink2").href = profile.linkedin;
  const mail = $("#emailLink");
  mail.href = `mailto:${profile.email}`;
  mail.textContent = profile.email;
  $("#ghLink2").innerHTML = `${ico("github", 18)}GitHub`;
  $("#liLink2").innerHTML = `${ico("contact-round", 18)}LinkedIn`;
  $(".email-ico").innerHTML = ico("mail", 20);
  $("#year").textContent = `© ${new Date().getFullYear()}`;
  $("#copyEmail").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(profile.email); toast("Email copied"); }
    catch { toast("Press Ctrl C to copy the address"); }
  });
}

/* ---------- resume files (buttons appear only if the PDFs exist) ---------- */
const resumeOk = { cyber: false, it: false };
const probed = {};
async function probeResume(k) {
  if (probed[k]) return;
  probed[k] = true;
  try {
    const r = await fetch(profile.resumes[k], { method: "HEAD" });
    const type = r.headers.get("content-type") || "";
    resumeOk[k] = r.ok && !type.includes("text/html");
  } catch { resumeOk[k] = false; }
  if (k === state.track) renderResume();
}
function renderResume() {
  const url = profile.resumes[state.track];
  const ok = resumeOk[state.track];
  const label = state.track === "cyber" ? "Cybersecurity resume" : "IT resume";
  for (const id of ["#cvTop", "#cvHero"]) {
    const a = $(id);
    a.hidden = !ok;
    a.href = url;
  }
  $("#cvHeroLabel").textContent = `Download ${label.toLowerCase()}`;
  $("#fileName").textContent = url.split("/").pop();
  const actions = $("#fileActions");
  actions.innerHTML = ok
    ? `<a class="btn btn-primary" href="${esc(url)}" download>Download resume</a><a class="btn btn-ghost" href="${esc(url)}" target="_blank" rel="noopener">View PDF</a>`
    : "";
  $("#fileNote").hidden = true;
  $("#fileCard").hidden = !ok;
}

/* ---------- hero ---------- */
function renderHero() {
  const t = tracks[state.track];
  $("#promptText").textContent = t.prompt;
  $("#tagline").textContent = t.tagline;
  $("#intro").textContent = profile.intro;
  $("#badge").textContent = t.badge || profile.badge;
  $("#facts").innerHTML = profile.facts.map(([k, a, b]) =>
    `<li><span class="fact-k mono">${esc(k)}</span><b>${esc(a)}</b><span class="fact-s">${esc(b)}</span></li>`).join("");
  $("#strip").innerHTML = t.strip.map((x) => `<li>${esc(x)}</li>`).join("");
  ["#badge", "#strip"].forEach((x) => swapAnim($(x)));
}

/* ---------- work ---------- */
function renderFilters() {
  const list = filters[state.track];
  if (!list.includes(state.workFilter)) state.workFilter = list[0];
  $("#workFilters").innerHTML = list.map((f) =>
    `<button class="chip" type="button" aria-pressed="${f === state.workFilter}" data-f="${esc(f)}">${esc(f)}</button>`).join("");
}
function renderWork() {
  const t = tracks[state.track];
  $("#workTitle").textContent = t.workTitle;
  $("#workIntro").textContent = t.workIntro;
  const mine = projects.filter(showFor);
  const match = (p) => state.workFilter === "All work" || p.tags.includes(state.workFilter);
  const n = mine.filter(match).length;
  $("#workCount").textContent = `${n} ${n === 1 ? "project" : "projects"}`;
  const arrow = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
  // Every project card always stays in the grid (cards that don't match the filter are dimmed),
  // and the details open in a dialog, so nothing on the page ever moves when you click.
  $("#cards").innerHTML = mine.map((p) => `
    <article class="card${match(p) ? "" : " dim"}" id="card-${p.id}"${match(p) ? "" : " inert"}>
      <button class="card-head" type="button" aria-haspopup="dialog" data-id="${p.id}">
        <span class="card-top"><span class="card-ico">${ico(PROJECT_ICONS[p.id], 20)}</span><span class="card-meta">${esc(p.meta)}</span></span>
        <span class="card-title-row"><span class="card-title">${esc(p.title)}</span>${arrow}</span>
        <ul class="flow" aria-hidden="true">${p.flow.map((s, i) => `<li><b>0${i + 1}</b>${esc(s)}</li>`).join("")}</ul>
        <ul class="tags">${p.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </button>
    </article>`).join("");
}

function projectDialogHtml(p) {
  return `
    <div class="pd-top"><span class="card-ico">${ico(PROJECT_ICONS[p.id], 20)}</span><span class="card-meta">${esc(p.meta)}</span>
      <button class="pd-close" type="button" data-close aria-label="Close project details">${ico("x", 18)}</button></div>
    <h3 class="pd-title" id="pdTitle">${esc(p.title)}</h3>
    <ul class="flow" aria-hidden="true">${p.flow.map((s, i) => `<li><b>0${i + 1}</b>${esc(s)}</li>`).join("")}</ul>
    <div class="card-inner-grid">
      <div><p>${esc(p.summary)}</p>${(p.shots || []).length ? `<div class="shots">${p.shots.map((x) => `<figure><img src="${esc(x.src)}" alt="${esc(x.alt || "")}" loading="lazy" decoding="async" onerror="this.parentNode.remove()" />${x.caption ? `<figcaption>${esc(x.caption)}</figcaption>` : ""}</figure>`).join("")}</div>` : ""}<h4>TOOLS</h4>
      <ul class="tags">${p.tools.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div><h4>WHAT I DID</h4>
      <ul class="did">${p.did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
      ${(p.links || []).length ? `<h4>LINKS</h4><ul class="card-links">${p.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} <span aria-hidden="true">↗</span></a></li>`).join("")}</ul>` : ""}</div>
    </div>`;
}
let dialogOpener = null;
function showProject(p, opener) {
  const dlg = $("#projDialog"); if (!dlg || !dlg.showModal) return;
  dialogOpener = opener || document.activeElement;
  dlg.innerHTML = `<div class="pd-box">${projectDialogHtml(p)}</div>`;
  dlg.setAttribute("aria-labelledby", "pdTitle");
  dlg.scrollTop = 0;
  if (!dlg.open) dlg.showModal();
  root.classList.add("modal-open");
}
function closeProject() { const dlg = $("#projDialog"); if (dlg?.open) dlg.close(); }

/* ---------- capabilities ---------- */
function renderCaps() {
  const t = tracks[state.track];
  $("#capTitle").textContent = t.capTitle;
  $("#capIntro").textContent = t.capIntro;
  $("#cycle").innerHTML = t.cycle.map((c, i) => `<li>${ico((CYCLE_ICONS[state.track] || [])[i], 16)}<span>0${i + 1}</span>${esc(c)}</li>`).join("");
  $("#caps").innerHTML = t.caps.map((c, i) => `
    <div class="col"><div class="col-top"><span class="n">${esc(c.n)}</span><span class="col-ico">${ico((CAP_ICONS[state.track] || [])[i], 22)}</span></div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`).join("");
  swapAnim($("#caps")); swapAnim($("#cycle"));
}

/* ---------- toolkit ---------- */
function renderToolFilters() {
  const list = toolFilters[state.track];
  if (!list.includes(state.toolFilter)) state.toolFilter = list[0];
  $("#toolFilters").innerHTML = list.map((f) =>
    `<button class="chip" type="button" aria-pressed="${f === state.toolFilter}" data-f="${esc(f)}">${esc(f)}</button>`).join("");
}
function renderTools() {
  const q = state.toolQuery.trim().toLowerCase();
  const mine = toolkit.filter(([, , tr]) => tr === "both" || tr === state.track);
  const match = ([n, g]) => (state.toolFilter === "All tools" || g === state.toolFilter) &&
    (!q || n.toLowerCase().includes(q) || g.toLowerCase().includes(q));
  const count = mine.filter(match).length;
  $("#toolCount").textContent = `${count} tool${count === 1 ? "" : "s"}`;
  // Same idea as the project cards: tools that don't match are dimmed, not removed, so the grid never reflows.
  $("#tools").innerHTML = mine.map((t) => { const [n, g, , icon] = t, on = match(t); return `
    <li class="tool${on ? "" : " dim"}"${on ? "" : ' aria-hidden="true"'}>
      <span class="tool-icon" aria-hidden="true"><img src="assets/icons/${esc(icon)}.svg" alt="" width="40" height="40" loading="lazy" decoding="async" onerror="this.remove()" /></span>
      <span class="tool-name">${esc(n)}</span>
      <span class="tool-group">${esc(g.toUpperCase())}</span>
    </li>`; }).join("");
  $("#methods").innerHTML = methods[state.track].map((m) => `<li>${esc(m)}</li>`).join("");
}

/* ---------- icon choices (names come from assets/js/icons.js) ---------- */
const CYCLE_ICONS = {
  cyber: ["scan-search", "filter", "search", "lock", "rotate-ccw", "trending-up"],
  it: ["inbox", "stethoscope", "wrench", "circle-check", "file-text", "shield-check"],
};
const CAP_ICONS = {
  cyber: ["scan-search", "siren", "shield-check"],
  it: ["stethoscope", "wrench", "file-text"],
};
const PROJECT_ICONS = {
  "ad-lab": "network", wazuh: "scan-eye", nessus: "scan-search", thm: "flag", "secure-ai": "bot",
  "kali-lab": "terminal", malware: "bug", usb: "keyboard", helpdesk: "headset", automation: "workflow", ios: "smartphone",
};

/* ---------- logo tile (experience, education, certifications) ---------- */
function logo(name) {
  return name ? `<span class="logo" aria-hidden="true"><img src="assets/icons/${esc(name)}.svg" alt="" width="28" height="28" loading="lazy" decoding="async" onerror="this.parentNode.remove()" /></span>` : "";
}

/* ---------- experience ---------- */
function renderExperience() {
  const t = tracks[state.track];
  $("#expTitle").textContent = t.expTitle;
  $("#timeline").innerHTML = experience.map((j) => `
    <li class="job">
      <div><span class="job-date">${esc(j.dates)}</span><span class="job-kind mono">${esc(j.kind)}</span></div>
      <div>
        <div class="head">${logo(j.logo)}<div><h3>${esc(j.role)}</h3>
        <p class="job-org">${esc(j.org)} <span>· ${esc(j.place)}</span></p></div></div>
        <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
      <div class="job-stat"><b>${esc(j.stat[0])}</b><span>${esc(j.stat[1])}</span></div>
    </li>`).join("");
  swapAnim($("#timeline"));
  $$(".job-stat b").forEach(countUp);
}

/* ---------- about ---------- */
function renderAbout() {
  $("#aboutTitle").textContent = aboutTitle;
  $("#bio").innerHTML = bio.map((p) => `<p>${esc(p)}</p>`).join("");
  // optional photo: shown only if the file exists
  if (!profile.photo) return;
  const probe = new Image();
  probe.onload = () => {
    const fig = $("#aboutPhoto"), img = $("img", fig);
    img.src = profile.photo; img.alt = profile.photoAlt || "";
    fig.hidden = false; $(".about-wrap").classList.add("has-photo");
  };
  probe.src = profile.photo;
}

/* ---------- education + certifications ---------- */
function renderCreds() {
  $("#education").innerHTML = education.map((e) => `
    <li class="reveal"><div class="head">${logo(e.logo)}<div><b>${esc(e.degree)}</b><p class="school">${esc(e.school)}</p></div></div><p class="note">${esc(e.note)}</p>
    <p class="edu-meta">${esc(e.dates)}${e.extra ? ` <span aria-hidden="true">·</span> ${esc(e.extra)}` : ""}</p></li>`).join("");
  $("#creds").innerHTML = credentials.map((c) => `
    <div class="cred reveal">
      <div class="cred-top"><span class="cred-issuer">${logo(c.logo)}${esc(c.issuer.toUpperCase())}</span><span class="pill ${c.earned ? "on" : ""}">${esc(c.status)}</span></div>
      <h3>${esc(c.name).replace(/(\S*-\S*)/g, '<span class="nb">$1</span>')}</h3><p class="cred-area">${esc(c.area)}</p>
    </div>`).join("");
}
function renderContact() {
  const t = tracks[state.track];
  $("#contactTitle").textContent = t.contactTitle;
  $("#contactLine").textContent = profile.contactLine;
}

/* ---------- track switching ---------- */
function setTrack(next, { initial = false } = {}) {
  if (!tracks[next]) next = "cyber";
  state.track = next;
  root.dataset.track = next;
  store.set("track", next);
  $$("[data-track-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.trackBtn === next)));
  closeProject();
  renderHero(); renderFilters(); renderWork(); renderCaps(); renderToolFilters();
  renderTools(); renderExperience(); renderAbout(); renderContact(); renderResume();
  probeResume(next);
  window.dispatchEvent(new CustomEvent("trackchange", { detail: next }));
  if (!initial) {
    const url = new URL(location.href);
    url.searchParams.set("track", next);
    history.replaceState(null, "", url);
    toast(`${tracks[next].label} view`);
  }
}

/* ---------- command palette ---------- */
function initPalette() {
  const pal = $("#palette"), input = $("#paletteInput"), list = $("#paletteList");
  let items = [], sel = 0, lastFocus = null;
  const sections = [["Experience", "#experience"], ["Education and certifications", "#credentials"], ["Skills and tools", "#toolkit"], ["Projects and labs", "#work"], ["How I work", "#capabilities"], ["About", "#about"], ["Contact", "#contact"]];
  function build(q) {
    q = q.trim().toLowerCase();
    items = [
      ...sections.map(([n, h]) => ({ label: n, hint: "Section", run: () => { location.hash = h; } })),
      ...projects.map((p) => ({ label: p.title, hint: p.track === "both" ? "Project" : `Project · ${p.track === "cyber" ? "Cyber" : "IT"}`, run: () => openProject(p) })),
      { label: "Switch to Cyber view", hint: "Track", run: () => setTrack("cyber") },
      { label: "Switch to IT view", hint: "Track", run: () => setTrack("it") },
    ].filter((i) => !q || i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q));
    sel = 0; paint();
  }
  function paint() {
    list.innerHTML = items.map((i, n) => `<li role="option" aria-selected="${n === sel}" data-n="${n}">${esc(i.label)}<small>${esc(i.hint)}</small></li>`).join("") || `<li style="cursor:default">No matches</li>`;
    $(`[data-n="${sel}"]`, list)?.scrollIntoView({ block: "nearest" });
  }
  function open() { lastFocus = document.activeElement; pal.hidden = false; input.value = ""; build(""); input.focus(); }
  function close() { pal.hidden = true; lastFocus?.focus?.(); }
  function choose(n) { const it = items[n]; if (!it) return; close(); it.run(); }

  $("#openSearch").addEventListener("click", open);
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? open() : close(); }
    else if (e.key === "Escape" && !pal.hidden) close();
  });
  input.addEventListener("input", () => build(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, items.length - 1); paint(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); paint(); }
    else if (e.key === "Enter") { e.preventDefault(); choose(sel); }
  });
  list.addEventListener("click", (e) => { const li = e.target.closest("[data-n]"); if (li) choose(Number(li.dataset.n)); });
  pal.addEventListener("click", (e) => { if (e.target === pal) close(); });
}
function openProject(p) {
  if (p.track !== "both" && p.track !== state.track) setTrack(p.track);
  showProject(p, $(`#card-${p.id} .card-head`));
}

/* ---------- events ---------- */
function bindEvents() {
  $$("[data-track-btn]").forEach((b) => b.addEventListener("click", () => { if (b.dataset.trackBtn !== state.track) setTrack(b.dataset.trackBtn); }));

  $("#workFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return;
    state.workFilter = b.dataset.f; renderFilters(); renderWork();
  });
  $("#cards").addEventListener("click", (e) => {
    const h = e.target.closest(".card-head"); if (!h) return;
    const p = projects.find((x) => x.id === h.dataset.id); if (p) showProject(p, h);
  });
  const dlg = $("#projDialog");
  if (dlg) {
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-close]")) closeProject(); });
    dlg.addEventListener("close", () => { root.classList.remove("modal-open"); try { dialogOpener?.focus({ preventScroll: true }); } catch { /* ignore */ } });
  }
  $("#toolFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return;
    state.toolFilter = b.dataset.f; renderToolFilters(); renderTools();
  });

  const menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  const closeMenu = () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); };
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", (e) => { if (nav.classList.contains("open") && !e.target.closest("#nav, #menuBtn")) closeMenu(); });

  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });

  // active nav link
  const links = $$(".nav a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["experience", "credentials", "toolkit", "work", "about", "contact"].forEach((id) => spy.observe($(`#${id}`)));

  // cursor glow (fine pointers only)
  const glow = $("#glow");
  if (matchMedia("(pointer: fine)").matches) {
    addEventListener("pointermove", (e) => { glow.classList.add("on"); glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, { passive: true });
  }
}

/* ---------- reveal ---------- */
function initReveal() {
  if (!("IntersectionObserver" in window)) return; // content simply stays visible
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.08 });
  $$(".wrap, .contact-grid").forEach((w) => { let i = 0; [...w.children].forEach((ch) => { const items = ch.classList.contains("reveal") ? [ch] : []; items.forEach((el) => el.style.setProperty("--i", Math.min(i++, 4))); }); });
  $$(".reveal").forEach((el) => io.observe(el));
  root.classList.add("js-reveal");
  // safety net: never leave content hidden
  setTimeout(() => $$(".reveal:not(.in)").forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 1.5) el.classList.add("in"); }), 2500);
}

/* ---------- boot ---------- */
function safe(label, fn) { try { fn(); } catch (err) { console.error(`[portfolio] ${label} failed:`, err); } }

safe("links", initLinks);
safe("credentials", renderCreds);
const urlTrack = new URLSearchParams(location.search).get("track");
safe("content", () => setTrack(tracks[urlTrack] ? urlTrack : store.get("track") || "cyber", { initial: true }));
safe("events", bindEvents);
safe("palette", initPalette);
safe("extras", () => initExtras({ getTrack: () => state.track, openProject: (id) => { const p = projects.find((x) => x.id === id); if (p) openProject(p); } }));
safe("reveal", initReveal);

// smooth scrolling only after load, so a refresh never animates the page
addEventListener("load", () => setTimeout(() => root.classList.add("ready"), 400));

// the 3D scene is decoration: load it after the content has painted
const startScene = () => initScene($("#scene"), $("#heroFallback"), $(".hero"));
if ("requestIdleCallback" in window) requestIdleCallback(startScene, { timeout: 1500 });
else setTimeout(startScene, 400);

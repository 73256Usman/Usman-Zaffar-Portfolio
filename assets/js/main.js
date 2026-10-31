import {
  profile, tracks, projects, filters, toolkit, methods, toolFilters,
  experience, education, skillGroups, bio, aboutTitle, credentials, labsList,
} from "./data.js";
import { initScene } from "./scene.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const state = { track: "cyber", workFilter: "All work", toolFilter: "All tools", toolQuery: "", openCard: null };

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
  $("#year").textContent = `© ${new Date().getFullYear()}`;
  $("#copyEmail").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(profile.email); toast("Email copied"); }
    catch { toast("Press Ctrl C to copy the address"); }
  });
}

/* ---------- resume files (buttons appear only if the PDFs exist) ---------- */
const resumeOk = { cyber: false, it: false };
async function probeResumes() {
  await Promise.all(Object.entries(profile.resumes).map(async ([k, url]) => {
    try {
      const r = await fetch(url, { method: "HEAD", cache: "no-store" });
      const type = r.headers.get("content-type") || "";
      resumeOk[k] = r.ok && !type.includes("text/html");
    } catch { resumeOk[k] = false; }
  }));
  renderResume();
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
  $("#fileNote").hidden = ok;
}

/* ---------- hero ---------- */
function renderHero() {
  const t = tracks[state.track];
  $("#promptText").textContent = t.prompt;
  $("#tagline").textContent = t.tagline;
  $("#intro").textContent = profile.intro;
  $("#badge").textContent = t.badge;
  $("#pillars").innerHTML = t.pillars.map(([a, b]) => `<li><span>${esc(a)}</span><p>${esc(b)}</p></li>`).join("");
  $("#strip").innerHTML = t.strip.map((s) => `<li>${esc(s)}</li>`).join("");
  ["#tagline", "#pillars", "#strip"].forEach((s) => swapAnim($(s)));
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
  const items = projects.filter(showFor).filter((p) =>
    state.workFilter === "All work" || p.tags.includes(state.workFilter));
  $("#workCount").textContent = `${items.length} case ${items.length === 1 ? "study" : "studies"}`;
  const chev = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
  $("#cards").innerHTML = items.length ? items.map((p) => `
    <article class="card" open-state="${state.openCard === p.id}" id="card-${p.id}">
      <button class="card-head" aria-expanded="${state.openCard === p.id}" aria-controls="body-${p.id}" data-id="${p.id}">
        <span class="card-meta">${esc(p.meta)}</span>
        <span class="card-title-row"><span class="card-title">${esc(p.title)}</span>${chev}</span>
        <ul class="flow" aria-hidden="true">${p.flow.map((s, i) => `<li><b>0${i + 1}</b>${esc(s)}</li>`).join("")}</ul>
        <ul class="tags">${p.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </button>
      <div class="card-body" id="body-${p.id}"><div><div class="card-inner">
        <div class="card-inner-grid">
          <div><p>${esc(p.summary)}</p><h4>TOOLS</h4>
          <ul class="tags">${p.tools.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
          <div><h4>WHAT I DID</h4>
          <ul class="did">${p.did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>
        </div>
      </div></div></div>
    </article>`).join("") : `<p class="empty">Nothing matches that filter yet.</p>`;
}

/* ---------- capabilities ---------- */
function renderCaps() {
  const t = tracks[state.track];
  $("#capTitle").textContent = t.capTitle;
  $("#capIntro").textContent = t.capIntro;
  $("#cycle").innerHTML = t.cycle.map((c, i) => `<li><span>0${i + 1}</span>${esc(c)}</li>`).join("");
  $("#caps").innerHTML = t.caps.map((c) => `
    <div class="col"><span class="n">${esc(c.n)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>
    <ul class="tags">${c.tags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
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
  const items = toolkit.filter(([n, g, tr]) =>
    (tr === "both" || tr === state.track) &&
    (state.toolFilter === "All tools" || g === state.toolFilter) &&
    (!q || n.toLowerCase().includes(q) || g.toLowerCase().includes(q)));
  $("#toolCount").textContent = `${items.length} tool${items.length === 1 ? "" : "s"}`;
  $("#tools").innerHTML = items.map(([n, g, , icon]) => `
    <li class="tool">
      <span class="tool-icon" aria-hidden="true"><img src="assets/icons/${esc(icon)}.svg" alt="" width="40" height="40" loading="lazy" decoding="async" onerror="this.remove()" /></span>
      <span class="tool-name">${esc(n)}</span>
      <span class="tool-group">${esc(g.toUpperCase())}</span>
    </li>`).join("");
  $("#methods").innerHTML = methods[state.track].map((m) => `<li>${esc(m)}</li>`).join("");
}

/* ---------- experience ---------- */
function renderExperience() {
  const t = tracks[state.track];
  $("#expTitle").textContent = t.expTitle;
  $("#timeline").innerHTML = experience.map((j) => `
    <li class="job">
      <div><span class="job-date">${esc(j.dates)}</span><span class="job-kind mono">${esc(j.kind)}</span></div>
      <div>
        <h3>${esc(j.role)}</h3>
        <p class="job-org">${esc(j.org)} <span>· ${esc(j.place)}</span></p>
        <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
      <div class="job-stat"><b>${esc(j.stat[0])}</b><span>${esc(j.stat[1])}</span></div>
    </li>`).join("");
  swapAnim($("#timeline"));
}

/* ---------- about ---------- */
function renderAbout() {
  $("#aboutTitle").textContent = aboutTitle;
  $("#bio").innerHTML = bio.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#education").innerHTML = education.map((e) => `
    <li><b>${esc(e.degree)}</b><p class="school">${esc(e.school)}</p><p class="note">${esc(e.note)}</p>
    <div class="row"><span class="pill on">${esc(e.dates)}</span>${e.extra ? `<span class="pill">${esc(e.extra)}</span>` : ""}</div></li>`).join("");
  $("#skills").innerHTML = skillGroups.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("");
}

/* ---------- credentials + contact ---------- */
function renderCreds() {
  $("#creds").innerHTML = credentials.map((c) => `
    <div class="cred reveal in">
      <div class="cred-top"><span class="cred-issuer">${esc(c.issuer.toUpperCase())}</span><span class="pill ${c.earned ? "on" : ""}">${esc(c.status)}</span></div>
      <h3>${esc(c.name)}</h3><p class="cred-area">${esc(c.area)}</p>
    </div>`).join("");
  $("#labs").innerHTML = labsList.map((l) => `<li>${esc(l)}</li>`).join("");
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
  state.openCard = null;
  renderHero(); renderFilters(); renderWork(); renderCaps(); renderToolFilters();
  renderTools(); renderExperience(); renderAbout(); renderContact(); renderResume();
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
  const sections = [["Work", "#work"], ["Toolkit", "#toolkit"], ["Experience", "#experience"], ["About", "#about"], ["Credentials", "#credentials"], ["Contact", "#contact"]];
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
  state.workFilter = "All work"; renderFilters();
  state.openCard = p.id; renderWork();
  $(`#card-${p.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ---------- events ---------- */
function bindEvents() {
  $$("[data-track-btn]").forEach((b) => b.addEventListener("click", () => { if (b.dataset.trackBtn !== state.track) setTrack(b.dataset.trackBtn); }));

  $("#workFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return;
    state.workFilter = b.dataset.f; state.openCard = null; renderFilters(); renderWork();
  });
  $("#cards").addEventListener("click", (e) => {
    const h = e.target.closest(".card-head"); if (!h) return;
    state.openCard = state.openCard === h.dataset.id ? null : h.dataset.id;
    $$(".card").forEach((c) => {
      const on = c.id === `card-${state.openCard}`;
      c.setAttribute("open-state", String(on));
      $(".card-head", c).setAttribute("aria-expanded", String(on));
    });
  });
  $("#toolFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return;
    state.toolFilter = b.dataset.f; renderToolFilters(); renderTools();
  });
  $("#toolSearch").addEventListener("input", (e) => { state.toolQuery = e.target.value; renderTools(); });

  const menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

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
  ["work", "toolkit", "experience", "about", "credentials", "contact"].forEach((id) => spy.observe($(`#${id}`)));

  // cursor glow (fine pointers only)
  const glow = $("#glow");
  if (matchMedia("(pointer: fine)").matches) {
    addEventListener("pointermove", (e) => { glow.classList.add("on"); glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, { passive: true });
  }
}

/* ---------- reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- boot ---------- */
initLinks();
renderCreds();
const urlTrack = new URLSearchParams(location.search).get("track");
setTrack(tracks[urlTrack] ? urlTrack : store.get("track") || "cyber", { initial: true });
bindEvents();
initPalette();
initReveal();
probeResumes();
initScene($("#scene"), $("#heroFallback"), $(".hero"));

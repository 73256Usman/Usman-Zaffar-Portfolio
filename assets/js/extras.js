// Interactive extras: the lab map, the example walkthrough, the scroll progress bar and the view switch sweep.
// Everything here is decoration or explanation. If any part fails, the rest of the site is unaffected.
// To change the text of the lab map or the walkthrough, edit the LABS and WALK objects below.
import { ico } from "./icons.js?v=202611021847";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =====================================================================
   LAB MAP
   Each layout has its own positions so it reads well on wide and narrow screens.
   w = [x, y] node centre on the wide layout, t = same on the tall (phone) layout.
   ===================================================================== */
const LABS = {
  iam: {
    title: "How my IAM lab connects.",
    intro: "Select a part to see what it does and which project it belongs to.",
    wide: { vb: [760, 330], zones: [[10, 10, 470, 310, "ON-PREMISES"], [510, 10, 240, 310, "CLOUD IDENTITY"]] },
    tall: { vb: [360, 430], zones: [[8, 8, 344, 266, "ON-PREMISES"], [8, 292, 344, 130, "CLOUD IDENTITY"]] },
    nodes: [
      { id: "ad", name: "Active Directory", sub: "Users and groups", icon: "server", w: [110, 100], t: [92, 88], project: "iam-jml",
        text: "The on-premises directory. Fake employees sit in OUs by department and are mapped to role groups.", tools: ["Active Directory", "Windows Server", "Group Policy"] },
      { id: "jml", name: "JML script", sub: "Joiner, mover, leaver", icon: "workflow", w: [375, 100], t: [268, 88], project: "iam-jml",
        text: "Reads an HR file and creates, changes or disables accounts. It has a dry run mode, runs safely twice and writes an audit log.", tools: ["PowerShell", "RBAC"] },
      { id: "pam", name: "Privileged access", sub: "LAPS, JIT, Vault", icon: "lock", w: [110, 250], t: [92, 212], project: "iam-pam",
        text: "Separate admin accounts, rotating local admin passwords, access that expires on its own and a vault that enforces least privilege.", tools: ["Windows LAPS", "HashiCorp Vault"] },
      { id: "review", name: "Access review", sub: "Findings and tickets", icon: "clipboard-check", w: [375, 250], t: [268, 212], project: "iam-review",
        text: "A script flags orphaned and dormant accounts, excess privilege and separation of duties conflicts. Each one gets fixed and tracked.", tools: ["PowerShell", "ServiceNow", "Power BI"] },
      { id: "entra", name: "Entra ID", sub: "MFA and Conditional Access", icon: "shield-check", w: [630, 100], t: [92, 366], project: "iam-entra",
        text: "Users sync up from Active Directory. MFA and four Conditional Access policies decide who can sign in and from where.", tools: ["Entra ID", "Entra Connect", "MFA"] },
      { id: "okta", name: "Okta", sub: "SSO and OAuth 2.0", icon: "key-round", w: [630, 250], t: [268, 366], project: "iam-sso",
        text: "Single sign-on over SAML and OIDC, plus a test API that checks every token before it answers.", tools: ["Okta", "SAML", "OIDC", "OAuth 2.0"] },
    ],
    links: [["ad", "jml", "accounts"], ["ad", "pam", "admin"], ["jml", "review", "audit"], ["ad", "entra", "sync"], ["entra", "okta", "sign in"]],
  },
  it: {
    title: "My Windows lab.",
    intro: "Select a part to see what it does and which project it belongs to.",
    wide: { vb: [760, 330], zones: [[10, 10, 740, 310, "WINDOWS DOMAIN LAB"]] },
    tall: { vb: [360, 290], zones: [[8, 8, 344, 274, "WINDOWS DOMAIN LAB"]] },
    nodes: [
      { id: "users", name: "Users and groups", sub: "Accounts and access", icon: "users", w: [115, 100], t: [92, 88], project: "ad-lab",
        text: "Accounts and groups in the domain. I set up who belongs where and what each person can reach.", tools: ["Active Directory"] },
      { id: "dc", name: "Domain controller", sub: "Windows Server · AD", icon: "server", w: [380, 100], t: [268, 88], project: "ad-lab",
        text: "Runs the domain. It holds the accounts and hands out sign ins and policy.", tools: ["Windows Server", "Active Directory"] },
      { id: "gpo", name: "Group Policy", sub: "Settings and rules", icon: "settings", w: [380, 250], t: [92, 212], project: "ad-lab",
        text: "Policy that controls how the Windows machines behave, so settings do not have to be changed by hand.", tools: ["Group Policy"] },
      { id: "ws", name: "Workstations", sub: "Domain joined", icon: "laptop", w: [645, 100], t: [268, 212], project: "helpdesk",
        text: "Windows machines joined to the domain. I use them to practice support, administration and troubleshooting.", tools: ["Windows", "Troubleshooting"] },
    ],
    links: [["users", "dc", "accounts"], ["ws", "dc", "sign in"], ["gpo", "ws", "policy"]],
  },
};

let labState = { track: "iam", sel: null, openProject: () => {}, getTrack: () => "iam" };

function nodeSvg(n, pos, wide, lay) {
  const [cx, cy] = pos, W = wide ? 170 : 160, H = 66, x = cx - W / 2, y = cy - H / 2;
  const icon = ico(n.icon, 18).replace("<svg ", `<svg x="${x + W - 30}" y="${y + 10}" `);
  return `<g class="lab-node" data-id="${n.id}" tabindex="0" role="button" aria-label="${esc(n.name)}, ${esc(n.sub)}">
    <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="10"/>
    ${icon}
    <text class="ln-name" x="${x + 12}" y="${y + 28}">${esc(n.name)}</text>
    <text class="ln-sub" x="${x + 12}" y="${y + 49}">${esc(n.sub)}</text>
  </g>`;
}

function mapSvg(track, layout) {
  const L = LABS[track], wide = layout === "wide", cfg = L[layout], key = wide ? "w" : "t";
  const pos = Object.fromEntries(L.nodes.map((n) => [n.id, n[key]]));
  const zones = cfg.zones.map(([x, y, w, h, label]) =>
    `<g><rect class="lab-zone" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/><text class="lab-zlabel" x="${x + 16}" y="${y + 24}">${label}</text></g>`).join("");
  const links = L.links.map(([a, b, label], i) => {
    const [x1, y1] = pos[a], [x2, y2] = pos[b], id = `p-${track}-${layout}-${i}`;
    const lx = (x1 + x2) / 2, ly = (y1 + y2) / 2;
    const packet = reduced() ? "" : [0, -1.2].map((d) =>
      `<circle class="lab-packet" r="3.2"><animateMotion dur="2.4s" begin="${d}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`).join("");
    const tag = wide ? `<text class="lab-ltag" x="${lx}" y="${ly - 7}" text-anchor="middle">${esc(label)}</text>` : "";
    return `<g class="lab-link" data-a="${a}" data-b="${b}"><path id="${id}" d="M${x1} ${y1} L${x2} ${y2}"/>${packet}${tag}</g>`;
  }).join("");
  const nodes = L.nodes.map((n) => nodeSvg(n, pos[n.id], wide)).join("");
  return `<svg class="lab-svg lab-${layout}" viewBox="0 0 ${cfg.vb[0]} ${cfg.vb[1]}" role="group" aria-label="Lab map" preserveAspectRatio="xMidYMid meet">${zones}${links}${nodes}</svg>`;
}

function paintLab() {
  const host = $("#labmap"); if (!host) return;
  const track = labState.track, L = LABS[track];
  $("#labTitle").textContent = L.title;
  $("#labIntro").textContent = L.intro;
  $("#labSvgs").innerHTML = mapSvg(track, "wide") + mapSvg(track, "tall");
  $("#labPanel").innerHTML = "";
  selectNode(L.nodes[0].id);
}

function panelHtml(n) {
  return `<div class="lab-slide" data-id="${n.id}">
    <div class="lab-panel-head"><span class="lab-panel-ico">${ico(n.icon, 22)}</span><div><h4>${esc(n.name)}</h4><p class="mono">${esc(n.sub)}</p></div></div>
    <p class="lab-text">${esc(n.text)}</p>
    <ul class="tags">${n.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <button class="btn btn-ghost btn-sm" type="button" data-project="${esc(n.project)}" tabindex="-1">View the project</button>
  </div>`;
}

// Every node's panel is rendered once and stacked in the same grid cell, so the box is always as
// tall as the longest one. Clicking a node only changes which one is visible, nothing below moves.
function selectNode(id) {
  const L = LABS[labState.track], n = L.nodes.find((x) => x.id === id); if (!n) return;
  labState.sel = id;
  $$(".lab-node").forEach((g) => g.classList.toggle("on", g.dataset.id === id));
  $$(".lab-link").forEach((g) => g.classList.toggle("on", g.dataset.a === id || g.dataset.b === id));
  const panel = $("#labPanel");
  if (!panel.querySelector(".lab-slide")) panel.innerHTML = L.nodes.map(panelHtml).join("");
  $$(".lab-slide", panel).forEach((el) => {
    const on = el.dataset.id === id;
    el.classList.toggle("on", on);
    if (on) el.removeAttribute("inert"); else el.setAttribute("inert", "");
    el.setAttribute("aria-hidden", on ? "false" : "true");
    const btn = el.querySelector("button"); if (btn) btn.tabIndex = on ? 0 : -1;
  });
}

function initLab(opts) {
  labState = { ...labState, ...opts };
  const host = $("#labmap"); if (!host) return;
  host.addEventListener("click", (e) => {
    const g = e.target.closest(".lab-node"); if (g) { selectNode(g.dataset.id); return; }
    const b = e.target.closest("[data-project]"); if (b) labState.openProject(b.dataset.project);
  });
  host.addEventListener("keydown", (e) => {
    const g = e.target.closest?.(".lab-node");
    if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selectNode(g.dataset.id); }
  });
  // pause the moving packets while the map is off screen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((en) => {
      $$(".lab-svg", host).forEach((s) => { try { en[0].isIntersecting ? s.unpauseAnimations?.() : s.pauseAnimations?.(); } catch { /* not supported */ } });
    }).observe(host);
  }
  labState.track = labState.getTrack();
  paintLab();
}

/* =====================================================================
   EXAMPLE WALKTHROUGH (How I work)
   Made up scenarios that show the process. They are labelled as examples on the page.
   ===================================================================== */
const WALK = {
  iam: {
    head: "access-request-2041",
    badge: "Example request",
    steps: [
      ["Request", "Submitted", "09:02", "A new hire in Finance needs an account and access to the shared finance folder."],
      ["Provision", "Created", "09:10", "Created the account in the Finance group with a temporary password and a forced change at first sign in."],
      ["Authenticate", "MFA on", "09:18", "Registered the authenticator app and confirmed the first sign in with MFA."],
      ["Review", "Approved", "09:30", "The manager approved the folder access. It matches the role and nothing extra was granted."],
      ["Remediate", "Fixed", "09:41", "Found the account also in an old IT group copied from a template and removed it."],
      ["Remove", "Closed", "10:00", "Logged every change. When this person leaves, the same record drives disabling the account."],
    ],
  },
  it: {
    head: "ticket 1042",
    badge: "Example ticket",
    steps: [
      ["Intake", "Open", "09:02", "User cannot sign in after changing their password."],
      ["Diagnose", "In progress", "09:08", "Account is locked out. An old password is saved on their phone and keeps retrying."],
      ["Resolve", "Fixed", "09:15", "Unlocked the account and cleared the saved password on the phone."],
      ["Verify", "Verified", "09:20", "User signed in on the laptop and the phone. Confirmed with them directly."],
      ["Document", "Documented", "09:24", "Wrote the cause and the fix in the ticket notes."],
      ["Prevent", "Closed", "09:40", "Added a short how to guide for changing a password on every device."],
    ],
  },
};

const walk = { track: "iam", step: 5, timer: null, visible: false, hover: false, playing: true };

function paintWalk() {
  const host = $("#walk"); if (!host) return;
  const W = WALK[walk.track], s = W.steps, cur = walk.step;
  $("#walkHead").textContent = W.head;
  $("#walkBadge").textContent = W.badge;
  $("#walkStatus").textContent = s[cur][1];
  $("#walkLog").innerHTML = s.map(([name, , time, text], i) => i <= cur
    ? `<li class="${i === cur ? "now" : ""}"><span class="t">${esc(time)}</span><b>${esc(name.toUpperCase())}</b><span class="m">${esc(text)}</span></li>`
    : `<li class="later" aria-hidden="true"><span class="t">${esc(time)}</span><b>${esc(name.toUpperCase())}</b><span class="m">${esc(text)}</span></li>`).join("");
  $("#walkDots").innerHTML = s.map(([name], i) =>
    `<button type="button" class="wdot ${i === cur ? "on" : ""}" data-i="${i}" aria-label="Step ${i + 1}, ${esc(name)}" aria-pressed="${i === cur}"></button>`).join("");
  $$("#cycle li").forEach((li, i) => li.classList.toggle("on", i === cur));
  const btn = $("#walkPlay");
  btn.innerHTML = walk.playing && !reduced() ? ico("pause", 16) : ico("play", 16);
  btn.setAttribute("aria-label", walk.playing && !reduced() ? "Pause the walkthrough" : "Play the walkthrough");
}

function walkTick() {
  clearTimeout(walk.timer);
  if (!walk.playing || reduced() || !walk.visible || walk.hover || document.hidden) return;
  const last = walk.step >= WALK[walk.track].steps.length - 1;
  walk.timer = setTimeout(() => {
    walk.step = last ? 0 : walk.step + 1;
    paintWalk(); walkTick();
  }, last ? 3200 : 2300);
}

function initWalk(getTrack) {
  const host = $("#walk"); if (!host) return;
  walk.track = getTrack();
  walk.step = reduced() ? WALK[walk.track].steps.length - 1 : 0;
  paintWalk();
  host.addEventListener("click", (e) => {
    const d = e.target.closest(".wdot");
    if (d) { walk.step = Number(d.dataset.i); walk.playing = false; paintWalk(); return; }
    if (e.target.closest("#walkPlay")) { walk.playing = !walk.playing; if (walk.playing && !reduced() && walk.step >= WALK[walk.track].steps.length - 1) walk.step = 0; paintWalk(); walkTick(); }
  });
  host.addEventListener("pointerenter", (e) => { if (e.pointerType !== "mouse") return; walk.hover = true; clearTimeout(walk.timer); });
  host.addEventListener("pointerleave", (e) => { if (e.pointerType !== "mouse") return; walk.hover = false; walkTick(); });
  document.addEventListener("visibilitychange", walkTick);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((en) => { walk.visible = en[0].isIntersecting; if (walk.visible && walk.step >= WALK[walk.track].steps.length - 1 && walk.playing && !reduced()) { walk.step = 0; paintWalk(); } walkTick(); }, { threshold: 0.35 }).observe(host);
  } else { walk.visible = true; }
}

/* =====================================================================
   PROGRESS BAR, COUNT UP, VIEW SWITCH SWEEP
   ===================================================================== */
function initProgress() {
  const bar = $("#progress"); if (!bar) return;
  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
}

export function countUp(el) {
  // animates numbers such as "150+" once, the first time they scroll into view
  const m = /^(\d+)(\+?)$/.exec(el.textContent.trim());
  if (!m || reduced() || !("IntersectionObserver" in window) || el.dataset.counted) return;
  el.dataset.counted = "1";
  const target = Number(m[1]), suffix = m[2];
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  const io = new IntersectionObserver((en) => {
    if (!en[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 1100;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = `${Math.round(target * e)}${p < 1 ? "" : suffix}`;
      if (p < 1) requestAnimationFrame(step); else el.textContent = `${target}${suffix}`;
    };
    el.textContent = `0${suffix}`;
    requestAnimationFrame(step);
  }, { threshold: 0.6 });
  io.observe(el);
}

export function initExtras({ getTrack, openProject }) {
  const run = (label, fn) => { try { fn(); } catch (err) { console.error(`[portfolio] ${label} failed:`, err); } };
  run("progress", initProgress);
  run("lab", () => initLab({ getTrack, openProject }));
  run("walk", () => initWalk(getTrack));
  window.addEventListener("trackchange", (e) => {
    const t = e.detail;
    run("sweep", () => {
      if (reduced()) return;
      const root = document.documentElement;
      root.classList.remove("sweeping"); void root.offsetWidth; root.classList.add("sweeping");
      setTimeout(() => root.classList.remove("sweeping"), 800);
    });
    run("lab repaint", () => { labState.track = t; paintLab(); });
    run("walk repaint", () => { walk.track = t; walk.step = reduced() ? WALK[t].steps.length - 1 : 0; paintWalk(); walkTick(); });
  });
  // the page may already have rendered for a saved track before this module loaded
  run("sync", () => {
    const t = getTrack();
    if (labState.track !== t) { labState.track = t; paintLab(); }
    if (walk.track !== t) { walk.track = t; walk.step = reduced() ? WALK[t].steps.length - 1 : 0; paintWalk(); }
  });
}

// Interactive extras: the lab map, the example walkthrough, the scroll progress bar and the view switch sweep.
// Everything here is decoration or explanation. If any part fails, the rest of the site is unaffected.
// To change the text of the lab map or the walkthrough, edit the LABS and WALK objects below.
import { ico } from "./icons.js?v=202610312359";

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
  cyber: {
    title: "How my labs connect.",
    intro: "Select a part to see what it does and which project it belongs to.",
    wide: { vb: [760, 330], zones: [[10, 10, 470, 310, "ACTIVE DIRECTORY LAB"], [510, 10, 240, 310, "ISOLATED ATTACK LAB"]] },
    tall: { vb: [360, 430], zones: [[8, 8, 344, 266, "ACTIVE DIRECTORY LAB"], [8, 292, 344, 130, "ISOLATED ATTACK LAB"]] },
    nodes: [
      { id: "dc", name: "Domain controller", sub: "Windows Server · AD", icon: "server", w: [110, 100], t: [92, 88], project: "ad-lab",
        text: "Runs the domain. I created users and groups here and used Group Policy to control how the workstations behave.", tools: ["Windows Server", "Active Directory", "Group Policy"] },
      { id: "ws", name: "Workstations", sub: "Domain joined", icon: "laptop", w: [375, 100], t: [268, 88], project: "ad-lab",
        text: "Windows machines joined to the domain. They are the endpoints that Wazuh watches and Nessus scans.", tools: ["Windows", "VirtualBox"] },
      { id: "nessus", name: "Nessus", sub: "Vulnerability scans", icon: "scan-search", w: [110, 250], t: [92, 212], project: "nessus",
        text: "Scans the lab for weaknesses. I fixed the findings, then scanned again to confirm they were closed.", tools: ["Nessus Essentials", "CVE / CVSS"] },
      { id: "wazuh", name: "Wazuh", sub: "Monitoring and alerts", icon: "scan-eye", w: [375, 250], t: [268, 212], project: "wazuh",
        text: "Agents on the workstations send logs here. I investigated the alerts and wrote custom rules for simulated attacks.", tools: ["Wazuh", "Detection rules"] },
      { id: "kali", name: "Kali Linux", sub: "Attacker machine", icon: "terminal", w: [630, 100], t: [92, 366], project: "kali-lab",
        text: "The attacker in a separate lab. I practiced scanning, exploitation, password testing and traffic analysis.", tools: ["Kali Linux", "Nmap", "Metasploit", "Hydra", "Wireshark"] },
      { id: "targets", name: "Targets", sub: "Metasploitable2, DVWA", icon: "crosshair", w: [630, 250], t: [268, 366], project: "kali-lab",
        text: "Deliberately vulnerable machines to practice on. The network is isolated and I reset it with snapshots between runs.", tools: ["Metasploitable2", "DVWA", "VirtualBox"] },
    ],
    links: [["ws", "dc", "sign in"], ["ws", "wazuh", "logs"], ["nessus", "ws", "scans"], ["kali", "targets", "attacks"]],
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

let labState = { track: "cyber", sel: null, openProject: () => {}, getTrack: () => "cyber" };

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
  cyber: {
    head: "example-incident.log",
    badge: "Lab scenario",
    steps: [
      ["Detect", "New", "09:14:02", "Alert: 12 failed logins for one user in 2 minutes."],
      ["Triage", "Triaged", "09:14:40", "Source is inside the network and the account is real. Priority: high."],
      ["Investigate", "Investigating", "09:19:15", "Logs show the attempts came from one workstation, followed by a successful login."],
      ["Contain", "Contained", "09:26:48", "Disabled the account and isolated the workstation from the network."],
      ["Recover", "Recovered", "09:52:30", "Reset the credentials, restored access and confirmed no other machines were affected."],
      ["Improve", "Closed", "10:05:11", "Wrote the report and added a detection rule for repeated failed logins."],
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

const walk = { track: "cyber", step: 5, timer: null, visible: false, hover: false, playing: true };

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

// Hero 3D scene: a rotating network topology.
// IAM and IT views: the network runs calmly with soft pulses, in the grey palette.
// Loaded lazily so the page still works if WebGL is unavailable.

export async function initScene(canvas, fallback, hero) {
  const fail = () => hero.classList.add("no-webgl");
  try {
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return fail();

    const THREE = await import("three");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 9.4);

    const group = new THREE.Group();
    scene.add(group);

    const COLORS = { iam: 0xdadada, it: 0xb8b8b8 };
    const ALERT = 0xff6b5e;
    let track = COLORS[document.documentElement.dataset.track] ? document.documentElement.dataset.track : "iam";

    /* ---------- textures ---------- */
    function canvasTex(draw) {
      const c = document.createElement("canvas"); c.width = c.height = 128;
      draw(c.getContext("2d")); return new THREE.CanvasTexture(c);
    }
    const dotTex = canvasTex((g) => {
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(0.35, "rgba(255,255,255,0.55)"); gr.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    });
    const ringTex = canvasTex((g) => {
      g.strokeStyle = "rgba(255,255,255,1)"; g.lineWidth = 6; g.beginPath(); g.arc(64, 64, 52, 0, Math.PI * 2); g.stroke();
    });

    /* ---------- network ---------- */
    const N = 96, R = 2.3;
    const pos = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      const k = R * (0.95 + Math.random() * 0.1);
      pos.push(new THREE.Vector3(Math.cos(th) * r * k, y * k, Math.sin(th) * r * k));
    }
    const adj = Array.from({ length: N }, () => []);
    const edgeKeys = new Set(), edges = [];
    for (let i = 0; i < N; i++) {
      const near = pos.map((p, j) => [j, p.distanceToSquared(pos[i])]).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]).slice(0, 3);
      for (const [j] of near) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeKeys.has(key)) { edgeKeys.add(key); edges.push([i, j]); }
        if (!adj[i].includes(j)) adj[i].push(j);
        if (!adj[j].includes(i)) adj[j].push(i);
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    const lp = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], e) => { pos[a].toArray(lp, e * 6); pos[b].toArray(lp, e * 6 + 3); });
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: COLORS[track], transparent: true, opacity: 0.3, depthWrite: false });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const nodeGeo = new THREE.BufferGeometry().setFromPoints(pos);
    const nodeMat = new THREE.PointsMaterial({ map: dotTex, size: 0.2, sizeAttenuation: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: COLORS[track] });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    const hubIdx = pos.map((_, i) => i).filter((i) => i % 11 === 0);
    const hubGeo = new THREE.BufferGeometry().setFromPoints(hubIdx.map((i) => pos[i]));
    const hubMat = new THREE.PointsMaterial({ map: dotTex, size: 0.42, sizeAttenuation: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: COLORS[track] });
    group.add(new THREE.Points(hubGeo, hubMat));

    // inner wireframe for depth
    const innerMat = new THREE.LineBasicMaterial({ color: COLORS[track], transparent: true, opacity: 0.12, depthWrite: false });
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.45, 1)), innerMat));

    /* ---------- data packets (random walk along links) ---------- */
    const P = 34;
    const packets = Array.from({ length: P }, () => {
      const from = Math.floor(Math.random() * N);
      return { from, to: adj[from][Math.floor(Math.random() * adj[from].length)], t: Math.random(), speed: 0.35 + Math.random() * 0.5 };
    });
    const packGeo = new THREE.BufferGeometry();
    const packPos = new Float32Array(P * 3);
    packGeo.setAttribute("position", new THREE.BufferAttribute(packPos, 3));
    const packMat = new THREE.PointsMaterial({ map: dotTex, size: 0.26, sizeAttenuation: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xffffff });
    group.add(new THREE.Points(packGeo, packMat));

    function stepPackets(dt) {
      packets.forEach((p, i) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          const prev = p.from; p.from = p.to;
          const opts = adj[p.from].filter((n) => n !== prev);
          p.to = (opts.length ? opts : adj[p.from])[Math.floor(Math.random() * (opts.length || adj[p.from].length))];
          p.t = 0;
        }
        const a = pos[p.from], b = pos[p.to];
        packPos[i * 3] = a.x + (b.x - a.x) * p.t;
        packPos[i * 3 + 1] = a.y + (b.y - a.y) * p.t;
        packPos[i * 3 + 2] = a.z + (b.z - a.z) * p.t;
      });
      packGeo.attributes.position.needsUpdate = true;
    }

    /* ---------- pulses (alerts and resolutions) ---------- */
    const pulses = [];
    function spawnPulse(node, color) {
      const mat = new THREE.SpriteMaterial({ map: ringTex, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const sp = new THREE.Sprite(mat);
      sp.position.copy(pos[node]);
      sp.scale.setScalar(0.2);
      group.add(sp);
      pulses.push({ sp, age: 0, dur: 1.4, color });
    }
    const queue = [];
    let nextEvent = 1.5;
    function scheduleEvent(now) {
      const node = Math.floor(Math.random() * N);
      spawnPulse(node, COLORS[track]);
      nextEvent = now + 2.4 + Math.random() * 1.6;
    }

    /* ---------- scan ring (cyber only) ---------- */
    const scanPts = [];
    for (let i = 0; i <= 120; i++) { const a = (i / 120) * Math.PI * 2; scanPts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a))); }
    const scanMat = new THREE.LineBasicMaterial({ color: COLORS[track], transparent: true, opacity: 0.55, depthWrite: false });
    const scan = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(scanPts), scanMat);
    scan.visible = false;
    group.add(scan);

    function applyTrack(t) {
      track = COLORS[t] ? t : "iam";
      const c = COLORS[track];
      [lineMat, nodeMat, hubMat, innerMat, scanMat].forEach((m) => m.color.setHex(c));
    }
    addEventListener("trackchange", (e) => applyTrack(e.detail));

    /* ---------- sizing, pointer, loop ---------- */
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    resize();
    new ResizeObserver(resize).observe(canvas);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    addEventListener("pointermove", (e) => {
      pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true, raf = 0, last = performance.now(), clock = 0;

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05); last = now; clock += dt;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      group.rotation.y = clock * 0.14 + pointer.x * 0.45;
      group.rotation.x = 0.28 + pointer.y * 0.25;

      stepPackets(dt);

      if (clock >= nextEvent) scheduleEvent(clock);
      for (let i = queue.length - 1; i >= 0; i--) {
        if (clock >= queue[i].at) { spawnPulse(queue[i].node, queue[i].color); queue.splice(i, 1); }
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]; p.age += dt;
        const k = p.age / p.dur;
        if (k >= 1) { group.remove(p.sp); p.sp.material.dispose(); pulses.splice(i, 1); continue; }
        p.sp.scale.setScalar(0.2 + k * 1.1);
        p.sp.material.opacity = 1 - k;
      }
      if (scan.visible) {
        const y = Math.sin(clock * 0.55) * R * 0.92;
        const rad = Math.sqrt(Math.max(R * R - y * y, 0.01)) * 1.02;
        scan.position.y = y; scan.scale.set(rad, 1, rad);
      }
      renderer.render(scene, camera);
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }
    frame(performance.now());

    const resume = () => { if (visible && !reduce) { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame); } };
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; resume(); }).observe(hero);
    document.addEventListener("visibilitychange", () => { visible = !document.hidden; resume(); });
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); fail(); });
    applyTrack(document.documentElement.dataset.track); // in case the visitor switched views while this was loading

    // release the GPU context on refresh or navigation, so many quick reloads cannot exhaust the browser's limit
    addEventListener("pagehide", () => {
      cancelAnimationFrame(raf); visible = false;
      try { renderer.dispose(); renderer.forceContextLoss(); } catch { /* already gone */ }
    });
  } catch (err) {
    console.warn("3D scene disabled:", err);
    fail();
  }
}

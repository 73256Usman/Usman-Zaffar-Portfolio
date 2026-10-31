// Hero 3D shape. Loaded lazily so the page still works if WebGL is unavailable.

export async function initScene(canvas, fallback, hero) {
  const fail = () => hero.classList.add("no-webgl");
  try {
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return fail();

    const THREE = await import("three");
    const { RoomEnvironment } = await import("../vendor/RoomEnvironment.js");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 9.6);

    const group = new THREE.Group();
    scene.add(group);

    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xdfe6e0, metalness: 1, roughness: 0.16, clearcoat: 0.6, clearcoatRoughness: 0.2, envMapIntensity: 1.25,
    });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.45, 0.42, 280, 36, 2, 3), knotMat);
    group.add(knot);

    // Thin orbit rings
    const ringMat = new THREE.LineBasicMaterial({ color: 0xcfe8b0, transparent: true, opacity: 0.35 });
    const rings = [];
    [[2.7, 0.5, 0.2], [3.1, -0.9, 0.7]].forEach(([r, rx, ry]) => {
      const pts = [];
      for (let i = 0; i <= 160; i++) { const a = (i / 160) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.42, 0)); }
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
      line.rotation.set(rx, ry, 0);
      group.add(line); rings.push(line);
    });

    // Accent light follows the active track color
    const accent = new THREE.PointLight(0xcfe8b0, 18, 14, 1.6);
    accent.position.set(-3, 2.5, 3);
    scene.add(accent);
    const accents = { cyber: 0xcfe8b0, it: 0xa8e3d6 };
    addEventListener("trackchange", (e) => {
      const c = accents[e.detail] || accents.cyber;
      accent.color.setHex(c); ringMat.color.setHex(c);
    });
    if (document.documentElement.dataset.track === "it") { accent.color.setHex(accents.it); ringMat.color.setHex(accents.it); }

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
    let visible = true, raf = 0, t0 = performance.now();

    function frame(now) {
      const t = (now - t0) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      knot.rotation.x = t * 0.18 + pointer.y * 0.35;
      knot.rotation.y = t * 0.24 + pointer.x * 0.45;
      group.rotation.z = Math.sin(t * 0.3) * 0.08;
      rings[0].rotation.z = t * 0.12;
      rings[1].rotation.z = -t * 0.09;
      renderer.render(scene, camera);
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }
    frame(performance.now());

    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    }).observe(hero);
    document.addEventListener("visibilitychange", () => {
      visible = !document.hidden;
      if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); fail(); });
  } catch (err) {
    console.warn("3D scene disabled:", err);
    fail();
  }
}

/* =========================================================
   AVINASH.exe — PORTFOLIO INTERACTIONS
   ========================================================= */
"use strict";

// Wait until the DOM and deferred Three.js script are ready.
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile navigation */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "[ CLOSE ]" : "[ MENU ]";
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "[ MENU ]";
  }));

  /* Animated job-role text */
  const roleElement = document.getElementById("typedRole");
  const roles = ["CYBER SECURITY STUDENT", "WEB DEVELOPER", "SECURITY ENTHUSIAST", "LIFELONG LEARNER"];
  let roleIndex = 0, charIndex = roles[0].length, deleting = true;
  function animateRole() {
    const current = roles[roleIndex];
    if (deleting) {
      charIndex--;
      roleElement.textContent = current.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(animateRole, 350); return; }
      setTimeout(animateRole, reduceMotion ? 0 : 35);
    } else {
      const next = roles[roleIndex];
      charIndex++;
      roleElement.textContent = next.slice(0, charIndex);
      if (charIndex >= next.length) { deleting = true; setTimeout(animateRole, reduceMotion ? 3000 : 1700); return; }
      setTimeout(animateRole, reduceMotion ? 0 : 65);
    }
  }
  if (!reduceMotion) setTimeout(animateRole, 1800);

  /* Terminal typewriter: append each character to the live DOM. */
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalLines = [
    ["prompt", "visitor@portfolio:~$ "], ["command", "whoami"],
    ["output", "\nAvinash — B.Tech CSE Cyber Security student."],
    ["prompt", "\nvisitor@portfolio:~$ "], ["command", "cat mission.txt"],
    ["output", "\nLearn by building. Explore security. Improve every day."],
    ["prompt", "\nvisitor@portfolio:~$ "], ["command", "ls interests/"],
    ["output", "\n[ cybersecurity, web development, practical projects ]"],
    ["prompt", "\nvisitor@portfolio:~$ "], ["command", "echo $STATUS"],
    ["output", "\nREADY_TO_LEARN_AND_BUILD"]
  ];
  function runTerminal() {
    terminalOutput.replaceChildren();
    const cursor = document.createElement("span");
    cursor.className = "terminal-cursor";
    if (reduceMotion) {
      terminalLines.forEach(([type, value]) => {
        const span = document.createElement("span");
        span.className = `terminal-${type}`;
        span.textContent = value;
        terminalOutput.appendChild(span);
      });
      terminalOutput.appendChild(cursor);
      return;
    }
    let lineIndex = 0, charIndex = 0, activeSpan = null;
    function typeNext() {
      if (lineIndex >= terminalLines.length) { terminalOutput.appendChild(cursor); return; }
      const [type, value] = terminalLines[lineIndex];
      if (!activeSpan) {
        activeSpan = document.createElement("span");
        activeSpan.className = `terminal-${type}`;
        terminalOutput.appendChild(activeSpan);
      }
      activeSpan.textContent += value.charAt(charIndex);
      charIndex++;
      if (charIndex >= value.length) { lineIndex++; charIndex = 0; activeSpan = null; }
      terminalOutput.appendChild(cursor);
      setTimeout(() => { if (cursor.parentNode) cursor.remove(); typeNext(); }, 23);
    }
    typeNext();
  }
  runTerminal();

  /* Live clock and current year */
  const terminalClock = document.getElementById("terminalClock");
  function updateClock() { terminalClock.textContent = "LOCAL_TIME: " + new Date().toLocaleTimeString([], { hour12: false }); }
  updateClock();
  setInterval(updateClock, 1000);
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  /* Scroll reveal animation */
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("show"); obs.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else revealElements.forEach(el => el.classList.add("show"));

  /* Active navigation and back-to-top button */
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  const backTop = document.getElementById("backTop");
  function updateScrollUI() {
    const marker = window.scrollY + 150;
    sections.forEach(section => {
      if (marker >= section.offsetTop && marker < section.offsetTop + section.offsetHeight) {
        navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${section.id}`));
      }
    });
    backTop.classList.toggle("visible", window.scrollY > 500);
  }
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  /* Three.js particle field. If WebGL/CDN is unavailable, the rest still works. */
  initUniverse(reduceMotion);
});

function initUniverse(reduceMotion) {
  const canvas = document.getElementById("universe");
  if (!window.THREE) { console.warn("Three.js did not load; continuing without the 3D background."); return; }
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch (error) { console.warn("WebGL is unavailable in this browser.", error); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x050711, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 85;
  const world = new THREE.Group();
  scene.add(world);

  const columns = window.innerWidth < 600 ? 37 : 58;
  const rows = window.innerWidth < 600 ? 24 : 34;
  const total = columns * rows;
  const positions = new Float32Array(total * 3);
  const basePositions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const cyan = new THREE.Color(0x00f0ff), magenta = new THREE.Color(0xff0055);
  const spacingX = 3.25, spacingY = 3.15;
  let index = 0;

  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const p = index * 3;
    const px = (x - (columns - 1) / 2) * spacingX;
    const py = (y - (rows - 1) / 2) * spacingY;
    const pz = (Math.random() - 0.5) * 20;
    positions[p] = basePositions[p] = px;
    positions[p + 1] = basePositions[p + 1] = py;
    positions[p + 2] = basePositions[p + 2] = pz;
    const color = Math.random() > 0.82 ? magenta : cyan;
    colors[p] = color.r; colors[p + 1] = color.g; colors[p + 2] = color.b;
    index++;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending });
  world.add(new THREE.Points(geometry, material));

  // Connect neighboring points to create a delicate network grid.
  const linePositions = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
    const current = y * columns + x, p = current * 3;
    if (x < columns - 1) {
      const q = (current + 1) * 3;
      linePositions.push(basePositions[p], basePositions[p + 1], basePositions[p + 2], basePositions[q], basePositions[q + 1], basePositions[q + 2]);
    }
    if (y < rows - 1) {
      const q = (current + columns) * 3;
      linePositions.push(basePositions[p], basePositions[p + 1], basePositions[p + 2], basePositions[q], basePositions[q + 1], basePositions[q + 2]);
    }
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  world.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x00b9d4, transparent: true, opacity: 0.075, depthWrite: false, blending: THREE.AdditiveBlending })));

  const mouse = new THREE.Vector2(9999, 9999);
  const mouseWorld = new THREE.Vector3(9999, 9999, 0);
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hit = new THREE.Vector3();
  let pointerActive = false, frameId = 0, lastTime = 0;

  window.addEventListener("pointermove", event => {
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointerActive = true;
  }, { passive: true });
  window.addEventListener("pointerleave", () => { pointerActive = false; });

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", resize, { passive: true });

  function draw(time) {
    frameId = requestAnimationFrame(draw);
    if (document.hidden) return;
    const elapsed = Math.min((time - (lastTime || time)) / 16.67, 2);
    lastTime = time;
    raycaster.setFromCamera(mouse, camera);
    if (pointerActive && raycaster.ray.intersectPlane(plane, hit)) mouseWorld.lerp(hit, 0.12);
    else mouseWorld.lerp(new THREE.Vector3(9999, 9999, 0), 0.04);

    const currentPositions = geometry.attributes.position.array;
    const radius = 15, radiusSquared = radius * radius;
    for (let i = 0; i < total; i++) {
      const p = i * 3, bx = basePositions[p], by = basePositions[p + 1], bz = basePositions[p + 2];
      let tx = bx, ty = by, tz = bz + Math.sin(time * 0.00055 + i * 0.07) * 0.65;
      const dx = mouseWorld.x - bx, dy = mouseWorld.y - by, d2 = dx * dx + dy * dy;
      if (d2 < radiusSquared) {
        const falloff = 1 - Math.sqrt(d2) / radius;
        tx += dx * falloff * 0.14;
        ty += dy * falloff * 0.14;
        tz += falloff * 2.3;
      }
      const lerp = 1 - Math.pow(0.86, elapsed);
      currentPositions[p] += (tx - currentPositions[p]) * lerp;
      currentPositions[p + 1] += (ty - currentPositions[p + 1]) * lerp;
      currentPositions[p + 2] += (tz - currentPositions[p + 2]) * lerp;
    }
    geometry.attributes.position.needsUpdate = true;
    if (!reduceMotion) {
      world.rotation.y = Math.sin(time * 0.00016) * 0.075;
      world.rotation.x = Math.cos(time * 0.00013) * 0.035;
      world.rotation.z += 0.000045 * elapsed;
    }
    renderer.render(scene, camera);
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && frameId === 0) { lastTime = 0; draw(performance.now()); }
  });
  if (reduceMotion) renderer.render(scene, camera);
  else draw(0);
}

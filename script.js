```javascript
/* ==========================================================
   CYBER ATMOSPHERE — POINTER GLOW + POLISH
   Add at the end of script.js
   ========================================================== */

(() => {
    // Avoid duplicate glow elements
    if (document.querySelector(".cyber-pointer-glow")) return;

    // Respect reduced-motion settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const glow = document.createElement("div");
    glow.className = "cyber-pointer-glow";
    glow.setAttribute("aria-hidden", "true");

    Object.assign(glow.style, {
        position: "fixed",
        width: "260px",
        height: "260px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "0",
        opacity: "0",
        background:
            "radial-gradient(circle, rgba(168,85,247,0.11), rgba(34,211,238,0.045) 35%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease",
        left: "0",
        top: "0"
    });

    document.body.appendChild(glow);

    // Only show the effect where a mouse or trackpad is available
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.addEventListener("pointermove", event => {
            glow.style.left = `${event.clientX}px`;
            glow.style.top = `${event.clientY}px`;
            glow.style.opacity = "1";
        });

        document.addEventListener("pointerleave", () => {
            glow.style.opacity = "0";
        });
    }
})();
```

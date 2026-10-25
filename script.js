
/* ==========================================
   AVINASH PORTFOLIO — CYBER INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const mobileNav = document.getElementById("mobileNav");
    const navbar = document.querySelector(".navbar");

    /* MOBILE NAVIGATION */
    if (menuButton && mobileNav) {
        menuButton.addEventListener("click", () => {
            const isOpen = mobileNav.classList.toggle("active");

            menuButton.textContent = isOpen ? "×" : "☰";
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("active");
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("click", event => {
            if (
                mobileNav.classList.contains("active") &&
                !mobileNav.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                mobileNav.classList.remove("active");
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* NAVBAR SCROLL EFFECT */
    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        }
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    /* SCROLL REVEAL ANIMATIONS */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }

    /* SMOOTH INTERNAL NAVIGATION */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const href = anchor.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    /* ACTIVE NAV LINK */
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
        ".desktop-nav a[href^='#'], .mobile-nav a[href^='#']"
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navLinks.forEach(link => {
                    const active = link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    if (active) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            });
        }, {
            rootMargin: "-25% 0px -60% 0px"
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    /* TERMINAL CURSOR SAFETY */
    document.querySelectorAll(".terminal-cursor").forEach(cursor => {
        cursor.setAttribute("aria-hidden", "true");
    });

    /* SUBTLE CYBER CURSOR GLOW — DESKTOP ONLY */
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    if (!reduceMotion && finePointer) {
        const glow = document.createElement("div");
        glow.className = "cyber-pointer-glow";
        glow.setAttribute("aria-hidden", "true");
        document.body.appendChild(glow);

        let glowVisible = false;

        window.addEventListener("pointermove", event => {
            glow.style.left = `${event.clientX}px`;
            glow.style.top = `${event.clientY}px`;

            if (!glowVisible) {
                glow.style.opacity = "1";
                glowVisible = true;
            }
        }, { passive: true });

        document.addEventListener("pointerleave", () => {
            glow.style.opacity = "0";
            glowVisible = false;
        });
    }

    /* HERO LOAD ANIMATION */
    document.body.classList.add("loaded");
});

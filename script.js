
// =========================================================
// AVINASH PORTFOLIO — INTERACTIONS
// Replace the entire contents of script.js
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const menuButton = document.getElementById("menuButton");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const pointerGlow = document.querySelector(".pointer-glow");
  const year = document.getElementById("year");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Current year in the footer
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------
  // NAVBAR SCROLL EFFECT
  // -------------------------------------------------------

  function updateScrollUI() {
    const scrollY = window.scrollY;

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollY > 30);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollY > 450);
    }
  }

  window.addEventListener("scroll", updateScrollUI, {
    passive: true
  });

  updateScrollUI();

  // -------------------------------------------------------
  // MOBILE NAVIGATION
  // -------------------------------------------------------

  function closeMenu() {
    if (!menuButton || !navLinks) return;

    menuButton.classList.remove("open");
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuButton.classList.toggle("open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedButton = menuButton.contains(event.target);

      if (!clickedInsideMenu && !clickedButton) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  // -------------------------------------------------------
  // SCROLL REVEAL ANIMATIONS
  // HTML uses .reveal; CSS uses .reveal.show
  // -------------------------------------------------------

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  // -------------------------------------------------------
  // ACTIVE NAVIGATION LINK
  // -------------------------------------------------------

  const sections = document.querySelectorAll(
    "main section[id], main section.section-wrap[id]"
  );

  const navItems = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // -------------------------------------------------------
  // SMOOTH SCROLL FOR INTERNAL LINKS
  // -------------------------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      // Keep the URL in sync without a page reload.
      history.replaceState(null, "", targetId);
    });
  });

  // -------------------------------------------------------
  // BACK TO TOP
  // -------------------------------------------------------

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });
  }

  // -------------------------------------------------------
  // POINTER GLOW — DESKTOP ONLY
  // -------------------------------------------------------

  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (pointerGlow && hasFinePointer && !reduceMotion) {
    document.addEventListener("pointermove", (event) => {
      pointerGlow.style.left = `${event.clientX}px`;
      pointerGlow.style.top = `${event.clientY}px`;
      pointerGlow.style.opacity = "1";
    });

    document.addEventListener("pointerleave", () => {
      pointerGlow.style.opacity = "0";
    });
  }

  // -------------------------------------------------------
  // CYBER ROLE TEXT ROTATION
  // -------------------------------------------------------

  const roleElement = document.querySelector(".typed-role");

  if (roleElement && !reduceMotion) {
    const roles = [
      "Cyber Security",
      "Web Development",
      "Security Projects",
      "Continuous Learning"
    ];

    let roleIndex = 0;

    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;

      roleElement.animate(
        [
          { opacity: 0, transform: "translateY(5px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 350,
          easing: "ease-out"
        }
      );

      roleElement.textContent = roles[roleIndex];
    }, 2600);
  }

  console.log(
    "%c AVINASH // PORTFOLIO ONLINE ",
    "background:#11152b;color:#22d3ee;font-weight:bold;padding:8px;"
  );
});

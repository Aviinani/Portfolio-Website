/* =========================================
   AVINASH PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* =========================================
   TERMINAL TYPING EFFECT
========================================= */

const terminalLines = [
    "Cyber Security Student",
    "Python Developer",
    "Security Enthusiast",
    "Problem Solver",
    "Always Learning..."
];

let terminalIndex = 0;
let characterIndex = 0;

const terminalOutput =
    document.querySelector(".terminal-output");


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5, 7, 13, 0.95)";

    } else {

        navbar.style.background =
            "rgba(5, 7, 13, 0.75)";

    }

});


/* =========================================
   PROJECT CARD TILT
========================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

const footerText =
    document.querySelector("footer p");

if (footerText) {

    footerText.innerHTML =
        `© ${new Date().getFullYear()} Avinash. Built with curiosity & code.`;

}


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%c👋 Hey! Welcome to Avinash's portfolio.",
    "color:#00ff9c;font-size:16px;font-weight:bold;"
);

console.log(
    "%cCurrently learning → Cyber Security | Python | AI | Web Development",
    "color:#9aa4b5;font-size:12px;"
);

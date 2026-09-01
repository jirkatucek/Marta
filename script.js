if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const forceScrollTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

forceScrollTop();
requestAnimationFrame(forceScrollTop);

window.addEventListener("load", () => {
  forceScrollTop();
  requestAnimationFrame(forceScrollTop);
  setTimeout(forceScrollTop, 0);
});

window.addEventListener("pageshow", () => {
  forceScrollTop();
  requestAnimationFrame(forceScrollTop);
  setTimeout(forceScrollTop, 0);
});

document.getElementById("year").textContent = new Date().getFullYear();

// mobile nav
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const mobileNav = document.getElementById("mobileNav");

navToggle.addEventListener("click", () => mobileNav.classList.add("open"));
navClose.addEventListener("click", () => mobileNav.classList.remove("open"));
mobileNav.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => mobileNav.classList.remove("open"))
);

// reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// scrollspy: highlight exactly one active nav link based on scroll position
const navLinks = Array.from(document.querySelectorAll(".main-nav a[href^='#']"));
const spyLinks = navLinks
  .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter((item) => item.section);

let spyTicking = false;
const updateActiveLink = () => {
  const markerY = window.scrollY + window.innerHeight * 0.35;
  let current = null;
  spyLinks.forEach(({ link, section }) => {
    if (section.offsetTop <= markerY) current = link;
  });
  navLinks.forEach((link) => link.classList.remove("active"));
  if (current) current.classList.add("active");
  spyTicking = false;
};
window.addEventListener("scroll", () => {
  if (!spyTicking) {
    requestAnimationFrame(updateActiveLink);
    spyTicking = true;
  }
});
updateActiveLink();

// parallax on hero background
const heroBg = document.querySelector(".hero-bg");
if (heroBg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;
  const updateParallax = () => {
    const offset = Math.min(window.scrollY * 0.15, 80);
    heroBg.style.transform = `scale(1.06) translateY(${offset}px)`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

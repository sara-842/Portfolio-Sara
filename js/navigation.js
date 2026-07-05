window.initNavigation = function () {
  const nav = document.querySelector(".site-nav");
  const menu = document.querySelector("[data-menu]");
  const btn = document.querySelector("[data-menu-toggle]");
  const links = document.querySelectorAll(".nav-link");
  const backTop = document.querySelector("[data-back-top]");
  const path = location.pathname.split("/").pop() || "home.html";

  /* ── Active link highlighting + aria-current ──────── */
  links.forEach((link) => {
    if (link.getAttribute("href").endsWith(path)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ── Mobile menu toggle ──────────────────────────── */
  btn?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  /* ── Close mobile menu on link click ─────────────── */
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu?.classList.contains("open")) {
        menu.classList.remove("open");
        btn?.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ── Close mobile menu on click outside ──────────── */
  document.addEventListener("click", (e) => {
    if (menu?.classList.contains("open") && !nav?.contains(e.target)) {
      menu.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
    }
  });

  /* ── Scroll: progress bar, nav state, back-to-top ── */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav?.classList.toggle("scrolled", scrollY > 16);
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll", `${progress * 100}%`);

      /* Back-to-top visibility */
      if (backTop) {
        backTop.classList.toggle("visible", scrollY > 300);
      }
      ticking = false;
    });
  };
  addEventListener("scroll", onScroll, { passive: true });
  /* Run once on load to set initial state */
  onScroll();

  /* ── Back to top click ───────────────────────────── */
  backTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
};

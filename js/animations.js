window.initAnimations = function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll("[data-animate]");
  if (reduce) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px 50px" });

  revealItems.forEach((el, index) => {
    // Skip already visible elements to prevent re-triggering
    if (el.classList.contains("is-visible")) return;

    el.style.setProperty("--delay", `${Math.min(index % 6, 5) * 70}ms`);
    observer.observe(el);
  });

  document.querySelectorAll("[data-parallax]").forEach((el) => {
    window.addEventListener("scroll", () => {
      const speed = Number(el.dataset.parallax || 0.08);
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    }, { passive: true });
  });
};

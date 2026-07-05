document.addEventListener("DOMContentLoaded", () => {
  /* Loader removed — pages now render instantly */
  const loader = document.querySelector(".loader");
  if (loader) loader.classList.add("loaded");
  initTheme?.();
  initNavigation?.();
  initAnimations?.();
  initCounters?.();
  initCursor?.();
  initParticles?.();
  initLightbox?.();
  initPortfolioInteractions?.();
});

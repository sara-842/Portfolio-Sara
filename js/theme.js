(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("sa-theme");
  const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  root.dataset.theme = saved || preferred;

  window.initTheme = function () {
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    const sync = () => {
      const isLight = root.dataset.theme === "light";
      toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
      toggle.dataset.state = root.dataset.theme;
    };
    toggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem("sa-theme", root.dataset.theme);
      sync();
    });
    sync();
  };
})();

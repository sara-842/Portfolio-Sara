window.initParticles = function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  canvas.className = "particle-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  let w, h, particles, animId;
  let isVisible = true;

  function resize() {
    w = canvas.width = innerWidth * devicePixelRatio;
    h = canvas.height = innerHeight * devicePixelRatio;
    particles = Array.from({ length: Math.min(80, Math.floor(innerWidth / 18)) }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .5
    }));
  }

  function tick() {
    if (!isVisible) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--particle");
    particles.forEach((p) => {
      p.x += p.vx * devicePixelRatio; p.y += p.vy * devicePixelRatio;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2); ctx.fill();
    });
    animId = requestAnimationFrame(tick);
  }

  /* Pause canvas when scrolled out of viewport to save CPU/battery */
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible && !animId) tick();
  }, { threshold: 0 });
  observer.observe(canvas);

  addEventListener("resize", resize);
  resize();
  tick();
};

window.initLightbox = function () {
  if (document.querySelector(".lightbox")) return;

  let index = 0;
  let currentGallery = [];
  let touchStartX = 0;
  let touchEndX = 0;
  let isTransitioning = false;

  const modal = document.createElement("div");
  modal.className = "lightbox";
  modal.innerHTML = `
    <div class="lightbox-overlay"></div>
    <button data-close class="lightbox-close" aria-label="Close">×</button>
    <button data-prev class="lightbox-nav prev" aria-label="Previous">
      <svg viewBox="0 0 24 24" width="24" height="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
    </button>
    <div class="lightbox-stage-container">
      <div data-stage class="lightbox-stage"></div>
    </div>
    <button data-next class="lightbox-nav next" aria-label="Next">
      <svg viewBox="0 0 24 24" width="24" height="24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
    </button>
    <div class="lightbox-caption">
      <span class="lightbox-counter"></span>
      <h3 class="lightbox-title"></h3>
    </div>
  `;
  document.body.appendChild(modal);

  const stage = modal.querySelector("[data-stage]");
  const counterEl = modal.querySelector(".lightbox-counter");
  const titleEl = modal.querySelector(".lightbox-title");

  const setupZoomPan = (img) => {
    let isZoomed = false;
    
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      isZoomed = !isZoomed;
      if (isZoomed) {
        img.classList.add("zoomed");
        updateZoomOrigin(e);
      } else {
        img.classList.remove("zoomed");
        img.style.transformOrigin = "center center";
      }
    });

    const updateZoomOrigin = (e) => {
      const rect = img.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
    };

    img.addEventListener("mousemove", (e) => {
      if (isZoomed) {
        updateZoomOrigin(e);
      }
    });

    img.addEventListener("mouseleave", () => {
      if (isZoomed) {
        isZoomed = false;
        img.classList.remove("zoomed");
        img.style.transformOrigin = "center center";
      }
    });
  };

  const render = (direction) => {
    if (currentGallery.length === 0) return;
    isTransitioning = true;
    setTimeout(() => { isTransitioning = false; }, 200);
    const item = currentGallery[index];

    // Preload adjacent images
    const nextIdx = (index + 1) % currentGallery.length;
    const prevIdx = (index - 1 + currentGallery.length) % currentGallery.length;
    new Image().src = currentGallery[nextIdx].src;
    new Image().src = currentGallery[prevIdx].src;

    const existingImg = stage.querySelector("img");
    if (existingImg) {
      existingImg.style.opacity = "0";
      existingImg.style.transform = direction === "next" ? "scale(0.97) translateX(-15px)" : direction === "prev" ? "scale(0.97) translateX(15px)" : "scale(0.95)";
      
      setTimeout(() => {
        stage.innerHTML = `<img src="${item.src}" alt="${item.title}" class="lightbox-img">`;
        const newImg = stage.querySelector("img");
        newImg.style.opacity = "0";
        newImg.style.transform = direction === "next" ? "scale(0.97) translateX(15px)" : direction === "prev" ? "scale(0.97) translateX(-15px)" : "scale(0.95)";
        
        setupZoomPan(newImg);

        requestAnimationFrame(() => {
          setTimeout(() => {
            newImg.style.opacity = "1";
            newImg.style.transform = "scale(1) translateX(0)";
          }, 20);
        });
      }, 150);
    } else {
      stage.innerHTML = `<img src="${item.src}" alt="${item.title}" class="lightbox-img">`;
      const newImg = stage.querySelector("img");
      setupZoomPan(newImg);
      requestAnimationFrame(() => {
        setTimeout(() => {
          newImg.style.opacity = "1";
          newImg.style.transform = "scale(1) translateX(0)";
        }, 20);
      });
    }

    if (counterEl) counterEl.textContent = `${index + 1} / ${currentGallery.length}`;
    if (titleEl) titleEl.textContent = item.title;
  };

  const open = (galleryItems, startIndex) => {
    currentGallery = galleryItems;
    index = startIndex;
    render();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    // Clean up stage to reset zooms
    stage.innerHTML = "";
  };

  const next = () => {
    if (currentGallery.length === 0 || isTransitioning) return;
    index = (index + 1) % currentGallery.length;
    render("next");
  };

  const prev = () => {
    if (currentGallery.length === 0 || isTransitioning) return;
    index = (index - 1 + currentGallery.length) % currentGallery.length;
    render("prev");
  };

  /* ── Click: gallery images ──────────────────────────── */
  document.addEventListener("click", (e) => {
    const img = e.target.closest("[data-gallery-image]");
    if (img) {
      const allImgs = Array.from(document.querySelectorAll("[data-gallery-image]"));
      const items = allImgs.map(el => ({
        src: el.src || el.dataset.src,
        title: el.alt || el.dataset.title || "Gallery Design"
      }));
      open(items, allImgs.indexOf(img));
      return;
    }

    /* Compat: old data-lightbox cards */
    const btn = e.target.closest("[data-lightbox]");
    if (btn) {
      const id = btn.dataset.lightbox;
      const items = portfolioData.projects.map(p => ({
        src: `../assets/images/${p.thumbnail}.jpeg`,
        title: p.title
      }));
      const idx = portfolioData.projects.findIndex(p => p.id === id);
      open(items, Math.max(idx, 0));
    }
  });

  /* ── Close ──────────────────────────────────────────── */
  modal.querySelector("[data-close]").addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("lightbox-overlay") || e.target.classList.contains("lightbox-stage-container") || e.target.classList.contains("lightbox-stage")) {
      close();
    }
  });

  /* ── Navigation ─────────────────────────────────────── */
  modal.querySelector("[data-next]").addEventListener("click", next);
  modal.querySelector("[data-prev]").addEventListener("click", prev);

  /* ── Keyboard ───────────────────────────────────────── */
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  /* ── Touch swipe (mobile) ───────────────────────────── */
  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, { passive: true });
};

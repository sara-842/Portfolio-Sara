/* ═══════════════════════════════════════════════════════════
   portfolio.js — page renderer for Sara Abdelrahman portfolio
   ═══════════════════════════════════════════════════════════ */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* ── helpers ──────────────────────────────────────────────── */

function imagePath(category, fileData) {
  const filename = typeof fileData === 'object' ? fileData.filename : fileData;
  return `../assets/images/${category.folder}/${filename}`;
}

function coverImagePath(cat) {
  let filename = typeof cat.cover === 'object' ? cat.cover.filename : cat.cover;
  if (!filename.includes('.')) filename += '.jpeg';
  return `../assets/images/${filename}`;
}

window.handleImageError = function(img) {
  let index = parseInt(img.dataset.fallbackIndex || "0");
  const fallbacks = [
    (s) => s.replace(/\.(png|jpg|jpeg|webp)$/i, '.jpg'),
    (s) => s.replace(/\.(png|jpg|jpeg|webp)$/i, '.jpeg'),
    (s) => s.replace(/\.(png|jpg|jpeg|webp)$/i, '.png'),
    (s) => s.replace(/\.(png|jpg|jpeg|webp)$/i, '.webp')
  ];
  const src = img.src || img.dataset.src;
  
  if (!src || index >= fallbacks.length) {
    img.style.opacity = '0';
    const card = img.closest('.premium-gallery-card') || img.closest('.gallery-card') || img.closest('.project-card') || img.closest('.showcase-image-wrap');
    if (card) card.remove();
    return;
  }
  
  const newSrc = fallbacks[index](src);
  img.dataset.fallbackIndex = (index + 1).toString();
  
  if (newSrc === src) {
    window.handleImageError(img); // Skip to next if unchanged
    return;
  }
  
  if (img.dataset.src) img.dataset.src = newSrc;
  img.src = newSrc;
};

window.navigateCard = function(event, url) {
  // Allow normal link clicking if it's an anchor tag
  if (event.target.tagName === 'A' && event.target.href) return;
  window.location.href = url;
};

function pageMeta() {
  const name = portfolioData.designer.name;
  const description = `${name} is a graphic designer creating premium social media, logo, brand identity, poster, print, and marketing creative work.`;
  document.title = `${name} - Premium Graphic Designer Portfolio`;
  $("meta[name='description']")?.setAttribute("content", description);
  $("meta[property='og:title']")?.setAttribute("content", document.title);
  $("meta[property='og:description']")?.setAttribute("content", description);
  $("meta[name='twitter:title']")?.setAttribute("content", document.title);
  $("meta[name='twitter:description']")?.setAttribute("content", description);
}

/* ── shell: nav + floating buttons ────────────────────────── */

function navMarkup() {
  return `<div class="progress-line"></div>
  <nav class="site-nav" aria-label="Main navigation">
    <a class="brand" href="home.html" aria-label="Sara Abdelrahman home"><span>SA</span><strong>Sara Abdelrahman</strong></a>
    <button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-label="Open menu"><span></span><span></span></button>
    <div class="nav-menu" data-menu>
      ${["Home", "Portfolio", "Gallery", "About", "Services", "Contact"].map((n) => `<a class="nav-link" href="${n.toLowerCase()}.html">${n}</a>`).join("")}
      <button class="theme-toggle magnetic" data-theme-toggle><span class="sun"></span><span class="moon"></span></button>
    </div>
  </nav>`;
}

function shell() {
  /* Skip-to-content for accessibility */
  document.body.insertAdjacentHTML("afterbegin", `<a href="#app" class="skip-link">Skip to content</a>`);
  $("#app-shell").insertAdjacentHTML("afterbegin", navMarkup());
  document.body.insertAdjacentHTML("beforeend", `
    <div class="mouse-glow" aria-hidden="true"></div>
    <button class="back-top" data-back-top aria-label="Back to top"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18"></circle><path d="M22 29V15m0 0-6 6m6-6 6 6"></path></svg></button>
    <a class="whatsapp-float" href="${portfolioData.socialLinks.whatsapp}" aria-label="WhatsApp Sara" target="_blank" rel="noopener noreferrer"><span>WA</span></a>
  `);
}

/* ── footer ─────────────────────────────────────────────────── */

function footer() {
  const year = new Date().getFullYear();
  const d = portfolioData.designer;
  return `<footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a class="brand" href="home.html" aria-label="Sara Abdelrahman home"><span>SA</span><strong>${d.name}</strong></a>
        <p>${d.role} · ${d.location}</p>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        ${["Home", "Portfolio", "Gallery", "About", "Services", "Contact"].map(n => `<a href="${n.toLowerCase()}.html">${n}</a>`).join("")}
      </nav>
      <div class="footer-social">
        <a href="${d.behance}" target="_blank" rel="noopener noreferrer" aria-label="Behance">Behance</a>
        <a href="${portfolioData.socialLinks.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
        <a href="${portfolioData.socialLinks.email}" aria-label="Email">Email</a>
      </div>
      <p class="footer-copy">© ${year} ${d.name}. All rights reserved.</p>
    </div>
  </footer>`;
}

/* ── hero ──────────────────────────────────────────────────── */

function hero() {
  const d = portfolioData.designer;
  return `<section class="hero section-band">
    <div class="mesh-bg" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="container hero-grid">
      <div class="hero-copy" data-animate="fade-up">
        <p class="badge">${d.availability}</p>
        <h1>${d.name}</h1>
        <h2>${d.role}</h2>
        <p>${d.tagline}</p>
        <div class="button-row">
          <a class="btn primary magnetic" href="portfolio.html">View Portfolio</a>
          <a class="btn ghost magnetic" href="${portfolioData.socialLinks.whatsapp}">WhatsApp Me</a>
          <a class="btn subtle magnetic" href="contact.html">Contact Me</a>
        </div>
      </div>
      <div class="designer-card-wrap" data-animate="scale-in">
        <div class="designer-card tilt-card">
          <div class="ring"></div>
          <div class="card-mark">
            <img class="profile-image" src="${d.profileImage}" alt="${d.name}" onerror="this.outerHTML='<span class=\\'profile-initials\\'>${d.initials}</span>'">
          </div>
          <p>${d.role}</p>
          <div class="mini-stats">
            <span><strong>3</strong>Years</span><span><strong>${portfolioData.totalProjects}+</strong>Projects</span><span><strong>45+</strong>Clients</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── stats ─────────────────────────────────────────────────── */

function stats() {
  return `<section class="stats-strip container">${portfolioData.stats.map((s) => `<article data-animate="fade-up"><strong data-counter="${s.value}" data-suffix="${s.suffix}">0</strong><span>${s.label}</span></article>`).join("")}</section>`;
}

/* ── services ──────────────────────────────────────────────── */

function servicesPreview(limit) {
  const items = limit ? portfolioData.services.slice(0, limit) : portfolioData.services;
  return `<section class="section container"><div class="section-head" data-animate="fade-up"><p class="eyebrow">Services</p><h2>Creative systems built for premium brand moments.</h2></div>
  <div class="service-grid">${items.map((s) => `<article class="glass-card service-card magnetic" data-animate="fade-up">
    <div class="service-icon-wrap">
      <div class="icon-badge">${s.icon.slice(0, 2).toUpperCase()}</div>
    </div>
    <h3><span class="title-underline">${s.title}</span></h3>
    <p>${s.description}</p>
    <div class="service-reveal-btn"><span class="cta-arrow">→</span></div>
  </article>`).join("")}</div></section>`;
}

/* ── category card (for portfolio page) ───────────────────── */

function categoryCard(cat, lazy = true) {
  const totalImages = cat.projects.reduce((s, p) => s + p.images.length, 0);
  const imgAttr = lazy ? `data-src="${coverImagePath(cat)}" class="lazy-image"` : `src="${coverImagePath(cat)}"`;
  return `
  <article class="project-card glass-card category-card cat-${cat.id}" data-category="${cat.name}" data-title="${cat.name.toLowerCase()}" data-animate="fade-up">
    <a href="portfolio.html?category=${cat.id}" class="card-link-overlay" aria-label="View ${cat.name} projects"></a>
    <div class="project-art">
      <div class="visual-asset real-image">
        <img ${imgAttr} alt="${cat.name}" onerror="this.style.opacity='0'">
      </div>
    </div>
    <div class="project-body">
      <span>${cat.name}</span>
      <h3>${cat.name}</h3>
      <p>${cat.projects.length} ${cat.projects.length === 1 ? "Project" : "Projects"} · ${totalImages} Designs</p>
      <div class="card-action"><span>View Collection</span><span class="cta-arrow">→</span></div>
    </div>
  </article>`;
}

/* ── project card (for category detail) ───────────────────── */

function projectCard(project, category, lazy = true) {
  const coverSrc = imagePath(category, project.images[0]);
  const imgAttr = lazy ? `data-src="${coverSrc}" class="lazy-image"` : `src="${coverSrc}"`;
  return `
  <article class="project-card glass-card proj-${project.slug}" data-animate="fade-up">
    <a href="project-details.html?category=${category.id}&project=${project.slug}" class="card-link-overlay" aria-label="View ${project.title}"></a>
    <div class="project-art">
      <div class="visual-asset real-image">
        <img ${imgAttr} alt="${project.title}" onerror="this.style.opacity='0'">
      </div>
    </div>
    <div class="project-body">
      <span>${category.name}</span>
      <h3>${project.title}</h3>
      <p>${project.images.length} ${project.images.length === 1 ? "Design" : "Designs"}</p>
      <div class="card-action"><span>Explore</span><span class="cta-arrow">→</span></div>
    </div>
  </article>`;
}

/* ── featured (home page) ─────────────────────────────────── */

function featured() {
  return `<section class="section container"><div class="section-head split" data-animate="fade-up"><div><p class="eyebrow">Featured Portfolio</p><h2>Selected work with strategy, polish, and presence.</h2></div><a class="text-link" href="portfolio.html">Explore all projects</a></div>
  <div class="project-grid">${portfolioData.categories.map(categoryCard).join("")}</div></section>`;
}

/* ── marquee ───────────────────────────────────────────────── */

function marquee() {
  const words = ["Photoshop", "Illustrator", "Canva", "Branding", "Posters", "Logos", "Social Media", "Print"];
  return `<section class="marquee" aria-label="Creative capabilities"><div>${[...words, ...words, ...words].map((w) => `<span>${w}</span>`).join("")}</div></section>`;
}

/* ── testimonials / clients / awards / faq / cta ──────────── */

function testimonials() {
  return `<section class="section container"><div class="section-head" data-animate="fade-up"><p class="eyebrow">Testimonials</p><h2>Client words with real project momentum.</h2></div>
  <div class="testimonial-slider">${portfolioData.testimonials.map((t) => `
    <article class="glass-card testimonial" data-animate="fade-up">
      <div class="rating-stars">★★★★★</div>
      <p>"${t.quote}"</p>
      <div class="client-meta">
        <div class="client-avatar">${t.name.charAt(0)}</div>
        <div class="client-info">
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </article>`).join("")}</div></section>`;
}

function clientsAwardsFaq() {
  return `<section class="section container"><div class="marquee-logo glass-card" data-animate="fade-up">
    <div class="marquee-track">${[...portfolioData.clients, ...portfolioData.clients, ...portfolioData.clients].map((c) => `<div class="logo-card">${c}</div>`).join("")}</div>
  </div></section>
  <section class="section container two-col"><div data-animate="slide-left"><p class="eyebrow">Recognition</p><h2>Award-minded creative standards.</h2></div><div class="award-grid">${portfolioData.awards.map((a, i) => `<article class="glass-award-card magnetic" data-animate="fade-up"><span class="award-num">0${i + 1}</span><h3>${a}</h3></article>`).join("")}</div></section>
  <section class="section container faq-section"><div class="section-head" data-animate="fade-up"><p class="eyebrow">FAQ</p><h2>Clear answers before we start.</h2></div>${portfolioData.faqs.map((f, i) => `<details class="faq faq-gradient-border" ${i === 0 ? "open" : ""} data-animate="fade-up"><summary>${f.q}<span class="faq-icon">+</span></summary><div class="faq-content"><p>${f.a}</p></div></details>`).join("")}</section>`;
}

function ctaNewsletter() {
  return `<section class="section container"><div class="cta-wrapper" data-animate="scale-in">
    <div class="cta-blob cta-blob-1"></div>
    <div class="cta-blob cta-blob-2"></div>
    <div class="cta glass-card">
      <p class="eyebrow">Ready for a premium look?</p>
      <h2>Let's design visuals your clients remember.</h2>
      <form class="newsletter" data-newsletter>
        <div class="input-glow-wrapper">
          <input type="email" required placeholder="Email address" aria-label="Email address">
        </div>
        <button class="btn primary magnetic"><span>Start Project</span><span class="cta-arrow">→</span></button>
        <small></small>
      </form>
    </div>
  </div></section>`;
}

/* ═══════════════════════════════════════════════════════════
   PAGE RENDERERS
   ═══════════════════════════════════════════════════════════ */

/* ── Home ──────────────────────────────────────────────────── */

function homePage() {
  return `<main>${hero()}${stats()}${servicesPreview(6)}${featured()}${marquee()}${testimonials()}${clientsAwardsFaq()}${ctaNewsletter()}</main>`;
}

/* ── Portfolio ─────────────────────────────────────────────── */

function portfolioPage() {
  const params = new URLSearchParams(location.search);
  const catId = params.get("category");

  /* If a category is selected, show its projects */
  if (catId) {
    const cat = portfolioData.categories.find(c => c.id === catId);
    if (!cat) return portfolioCategoryGrid();
    return categoryDetailPage(cat);
  }

  /* Default: show all category cards */
  return portfolioCategoryGrid();
}

function portfolioCategoryGrid() {
  const cats = portfolioData.categories;
  const allCatNames = ["All", ...cats.map(c => c.name)];

  return `
  <main class="page-top container">
    <div class="page-title portfolio-page-title" data-animate="fade-up">
      <p class="eyebrow">Portfolio</p>
      <h1>Creative Portfolio Collection</h1>
      <p class="portfolio-subtitle">
        Browse ${portfolioData.totalCategories} categories, ${portfolioData.totalProjects} projects and ${portfolioData.totalWorks} designs.
      </p>
    </div>

    <div class="toolbar glass-card" data-animate="fade-up">
      <div class="search-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input data-search type="search" placeholder="Search categories..." aria-label="Search categories">
        <button class="search-clear" aria-label="Clear search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
      <div class="tabs portfolio-filters">
        ${allCatNames.map((c) =>
          `<button data-filter="${c}" class="${c === "All" ? "active" : ""}"><span>${c}</span></button>`
        ).join("")}
      </div>
    </div>

    <section class="project-grid" data-portfolio-grid>
      ${cats.map((c, i) => categoryCard(c, i >= 6)).join("")}
    </section>
  </main>`;
}

function categoryDetailPage(cat) {
  return `
  <main class="page-top container">
    <div class="page-title portfolio-page-title" data-animate="fade-up">
      <p class="eyebrow portfolio-breadcrumb"><a href="portfolio.html" class="text-link">Portfolio</a> / ${cat.name}</p>
      <h1>${cat.name}</h1>
      <p class="portfolio-subtitle">
        ${cat.projects.length} ${cat.projects.length === 1 ? "project" : "projects"} ·
        ${cat.projects.reduce((s, p) => s + p.images.length, 0)} designs
      </p>
    </div>

    <div class="toolbar glass-card" data-animate="fade-up">
      <div class="tabs portfolio-filters">
        <a href="portfolio.html" class="btn subtle btn-back-categories">← All Categories</a>
        ${portfolioData.categories.map(c =>
          `<a href="portfolio.html?category=${c.id}" class="btn ghost ${c.id === cat.id ? "active" : ""}"><span>${c.name}</span></a>`
        ).join("")}
      </div>
    </div>

    <section class="project-grid" data-animate="fade-up">
      ${cat.projects.map((p, i) => projectCard(p, cat, i >= 6)).join("")}
    </section>
  </main>`;
}

/* ── Gallery ───────────────────────────────────────────────── */

function galleryPage() {
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");

  /* Collect images to display */
  let title = "All Designs";
  let subtitle = "Explore Sara's complete design collection.";
  let breadcrumb = "Gallery";

  if (categoryId) {
    const cat = portfolioData.categories.find(c => c.id === categoryId);
    if (cat) {
      title = cat.name + " Gallery";
      subtitle = `Explore Sara's curated creative designs in ${cat.name}.`;
      breadcrumb = `<a href="gallery.html" class="text-link">Gallery</a> / ${cat.name}`;
    }
  }

  return `
  <main class="page-top container">
    <div class="page-title" data-animate="fade-up">
      <p class="eyebrow">${breadcrumb}</p>
      <h1>${title}</h1>
      <p class="portfolio-subtitle">${subtitle}</p>
    </div>

    <div class="toolbar glass-card sticky-toolbar" data-animate="fade-up">
      <div class="search-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input id="gallerySearch" type="search" placeholder="Search designs..." aria-label="Search designs">
        <button class="search-clear" id="gallerySearchClear" aria-label="Clear search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
      <div class="tabs portfolio-filters" id="galleryFilters">
        <button data-filter="All" class="${!categoryId ? 'active' : ''}"><span>All</span></button>
        ${portfolioData.categories.map(c =>
          `<button data-filter="${c.name}" class="${c.id === categoryId ? 'active' : ''}"><span>${c.name}</span></button>`
        ).join("")}
      </div>
    </div>

    <div class="gallery-container" data-animate="fade-up">
      <div class="gallery-grid" id="galleryGrid">
        <div class="gallery-skeleton" aria-hidden="true"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  </main>`;
}

/* ── Project Details (Behance-style) ──────────────────────── */

function detailsPage() {
  const params = new URLSearchParams(location.search);
  const catId = params.get("category");
  const projectSlug = params.get("project");

  const cat = portfolioData.categories.find(c => c.id === catId);
  if (!cat) return fallbackDetails();

  const projectIndex = cat.projects.findIndex(p => p.slug === projectSlug);
  const project = projectIndex !== -1 ? cat.projects[projectIndex] : cat.projects[0];
  if (!project) return fallbackDetails();

  const uniqueImages = [];
  const seenFiles = new Set();
  project.images.forEach(img => {
    const fname = typeof img === 'object' ? img.filename : img;
    if (!seenFiles.has(fname)) {
      seenFiles.add(fname);
      uniqueImages.push(img);
    }
  });
  const coverSrc = imagePath(cat, uniqueImages[0]);

  /* Next / Previous project within category */
  const prevProject = projectIndex > 0 ? cat.projects[projectIndex - 1] : null;
  const nextProject = projectIndex < cat.projects.length - 1 ? cat.projects[projectIndex + 1] : null;

  return `
  <main class="project-showcase proj-${project.slug}">
    <!-- Hero Cover -->
    <section class="showcase-hero section-band">
      <div class="container">
        <div class="showcase-breadcrumb" data-animate="fade-up">
          <a href="portfolio.html" class="text-link">Portfolio</a>
          <span>→</span>
          <a href="portfolio.html?category=${cat.id}" class="text-link">${cat.name}</a>
          <span>→</span>
          <span>${project.title}</span>
        </div>
        <h1 data-animate="fade-up">${project.title}</h1>
        <div class="showcase-meta" data-animate="fade-up">
          <span class="badge">${cat.name}</span>
          <span class="badge">${uniqueImages.length} ${uniqueImages.length === 1 ? "Design" : "Designs"}</span>
        </div>
      </div>
    </section>

    <!-- Full-Width Cover Image -->
    <section class="showcase-cover" data-animate="scale-in">
      <div class="container">
        <img src="${coverSrc}" alt="${project.title} — Design 1" loading="eager" fetchpriority="high" onerror="window.handleImageError(this)" data-gallery-image>
      </div>
    </section>

    <!-- All Project Images (Behance long-scroll) -->
    <section class="showcase-images container">
      ${uniqueImages.slice(1).map((img, i) => `
        <div class="showcase-image-wrap" data-animate="fade-up">
          <img src="${imagePath(cat, img)}" alt="${project.title} — Design ${i + 2}" loading="lazy" onerror="window.handleImageError(this)" data-gallery-image>
        </div>
      `).join("")}
    </section>

    <!-- Design Process -->
    <section class="section container">
      <div class="section-head" data-animate="fade-up">
        <p class="eyebrow">Design Process</p>
        <h2>From research to delivery.</h2>
      </div>
      <div class="process">${["Research", "Concept", "Design", "Refinement", "Delivery"].map((x, i) => `<span data-animate="fade-up"><b>0${i + 1}</b>${x}</span>`).join("")}</div>
    </section>

    <!-- Project Navigation -->
    <section class="section container">
      <div class="project-nav" data-animate="fade-up">
        ${prevProject
          ? `<a href="project-details.html?category=${cat.id}&project=${prevProject.slug}" class="project-nav-link prev">
              <span class="project-nav-label">← Previous</span>
              <span class="project-nav-title">${prevProject.title}</span>
            </a>`
          : `<span></span>`
        }
        <a href="portfolio.html?category=${cat.id}" class="btn ghost">All ${cat.name}</a>
        ${nextProject
          ? `<a href="project-details.html?category=${cat.id}&project=${nextProject.slug}" class="project-nav-link next">
              <span class="project-nav-label">Next →</span>
              <span class="project-nav-title">${nextProject.title}</span>
            </a>`
          : `<span></span>`
        }
      </div>
    </section>

    <!-- More from portfolio -->
    ${featured()}
  </main>`;
}

function fallbackDetails() {
  return `<main class="page-top container">
    <div class="page-title" data-animate="fade-up">
      <p class="eyebrow">Project Not Found</p>
      <h1>This project doesn't exist.</h1>
      <a href="portfolio.html" class="btn primary">Back to Portfolio</a>
    </div>
  </main>`;
}

/* ── About ─────────────────────────────────────────────────── */

function aboutHero() {
  const d = portfolioData.designer;
  return `
    <section class="about-hero" data-animate="fade-up">
      <p class="eyebrow">About</p>
      <h1>Three years of graphic design focused on premium, practical brand communication.</h1>
      <div class="about-meta-badges">
        <span class="badge">${d.availability}</span>
        <span class="badge">Based in ${d.location}</span>
      </div>
    </section>
  `;
}

function aboutBioTimeline() {
  return `
    <section class="two-col section">
      <div class="glass-card editorial-bio" data-animate="slide-left">
        <h2>Professional Biography</h2>
        <p style="margin-top:20px;">Sara Abdelrahman creates brand visuals, social campaigns, posters, logos, and print systems for clients who need design that feels refined, clear, and commercially useful.</p>
        <p>Her approach combines sharp aesthetic judgment with an understanding of what drives actual engagement, resulting in creative assets that stand out in crowded feeds and markets.</p>
      </div>
      <div class="glass-card" style="padding:48px;" data-animate="slide-right">
        <h2>Experience Timeline</h2>
        <ul class="premium-timeline">
          <li class="timeline-node" data-animate="fade-up">
            <span class="timeline-year">2024</span>
            <span class="timeline-desc">Freelance brand and campaign systems</span>
          </li>
          <li class="timeline-node" data-animate="fade-up">
            <span class="timeline-year">2025</span>
            <span class="timeline-desc">Social media and print creative expansion</span>
          </li>
          <li class="timeline-node" data-animate="fade-up">
            <span class="timeline-year">2026</span>
            <span class="timeline-desc">Premium identity and marketing design focus</span>
          </li>
        </ul>
      </div>
    </section>
  `;
}

function aboutStats() {
  return `
    <section class="section" style="padding-top:40px;">
      <div class="stats-strip">
        ${portfolioData.stats.map((s) => `
          <article data-animate="fade-up">
            <strong data-counter="${s.value}" data-suffix="${s.suffix}">0</strong>
            <span>${s.label}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function aboutSkills() {
  return `
    <section class="section">
      <div class="section-head split">
        <div>
          <p class="eyebrow">Skills</p>
          <h2>Tool fluency with design judgment.</h2>
        </div>
      </div>
      <div class="skills">
        ${portfolioData.skills.map((s) => `
          <div class="skill glass-card" data-animate="fade-up">
            <span>${s.name}</span>
            <b>${s.value}%</b>
            <i style="--value:${s.value}%"></i>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function aboutProcess() {
  const steps = ["Research", "Concept", "Design", "Refinement", "Delivery"];
  return `
    <section class="section">
      <div class="section-head" style="text-align: center; margin: 0 auto 40px auto;">
        <p class="eyebrow">Process</p>
        <h2>From concept to final delivery.</h2>
      </div>
      <div class="process-flow">
        ${steps.map((x, i) => `
          <div class="process-step" data-animate="fade-up">
            <div class="glass-card">
              <b>0${i + 1}</b>
              <span>${x}</span>
            </div>
            ${i < steps.length - 1 ? `<span class="process-arrow">→</span>` : ""}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function aboutAwardsClients() {
  return `
    <section class="section about-awards" data-animate="fade-up">
      <div class="section-head split">
        <div>
          <p class="eyebrow">Recognition</p>
          <h2>Award-minded creative standards.</h2>
        </div>
      </div>
      <div class="award-grid">
        ${portfolioData.awards.map((a, i) => `
          <article class="glass-card award" data-animate="fade-up">
            <span>0${i + 1}</span>
            <h3>${a}</h3>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="section" style="padding-top:20px;">
      <div class="logo-loop glass-card" data-animate="fade-up">
        ${[...portfolioData.clients, ...portfolioData.clients].map((c) => `<span>${c}</span>`).join("")}
      </div>
    </section>
  `;
}

function aboutCta() {
  return `
    <section class="about-cta" data-animate="scale-in">
      <p class="eyebrow">Let's collaborate</p>
      <h2 style="margin: 16px 0 32px 0;">Let's shape your next brand moment.</h2>
      <a href="contact.html" class="btn primary">Start your project</a>
    </section>
  `;
}

function aboutPage() {
  return `
    <main class="page-top container">
      ${aboutHero()}
      ${aboutBioTimeline()}
      ${aboutStats()}
      ${aboutSkills()}
      ${aboutProcess()}
      ${aboutAwardsClients()}
      ${aboutCta()}
    </main>
  `;
}

/* ── Services ──────────────────────────────────────────────── */

function getServiceIcon(title) {
  const icons = {
    "Social Media Design": `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    "Logo Design": `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    "Brand Identity": `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
    "Poster Design": `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    "Print Design": `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
    "Marketing Creatives": `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`
  };
  return icons[title] || `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
}

function servicesPage() {
  return `<main class="page-top container">
    <div class="page-title services-page-title" data-animate="fade-up">
      <p class="eyebrow">Services</p>
      <h1>Premium design services with clear deliverables and a smooth process.</h1>
    </div>
    <section class="service-detail-list">
      ${portfolioData.services.map((s) => `
        <article class="service-detail glass-card magnetic" data-animate="fade-up">
          <div class="service-header">
             <div class="service-icon">${getServiceIcon(s.title)}</div>
             <h2>${s.title}</h2>
          </div>
          <p class="service-desc">${s.description}</p>
          <div class="service-features">
            <div class="service-deliverables">
              <strong>Deliverables</strong>
              <div class="tags-wrap">
                ${s.deliverables.map((d) => `<span class="deliverable-tag">${d}</span>`).join("")}
              </div>
            </div>
            <div class="service-benefits">
              <strong>Benefits</strong>
              <div class="benefits-wrap">
                ${s.benefits.map((b) => `<span class="benefit-chip"><svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${b}</span>`).join("")}
              </div>
            </div>
          </div>
          <div class="service-cta">
            <a class="btn primary btn-sm magnetic" href="contact.html">Start Project</a>
          </div>
        </article>
      `).join("")}
    </section>
  </main>`;
}

/* ── Contact ───────────────────────────────────────────────── */

function contactPage() {
  const d = portfolioData.designer;
  return `<main class="page-top container">
    <div class="contact-header" data-animate="fade-up">
      <p class="eyebrow">Contact</p>
      <h1 class="contact-headline">Let's shape your next brand moment.</h1>
      <p class="contact-intro">I help ambitious brands stand out with premium visual identities, campaign creatives, and confident design systems. Reach out directly or use the form below to share your project details.</p>
    </div>
    
    <div class="contact-grid">
      <!-- Left Column: Contact Methods -->
      <section class="contact-methods" data-animate="slide-left">
        <h2 class="contact-section-title">Direct Connection</h2>
        <div class="contact-cards">
          <!-- WhatsApp Card -->
          <a href="${portfolioData.socialLinks.whatsapp}" target="_blank" rel="noopener noreferrer" class="contact-card whatsapp-card" aria-label="Chat on WhatsApp">
            <div class="card-glow"></div>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.635-1.023-5.11-2.884-6.974C16.634 1.909 14.159 1.884 11.516 1.884c-5.44 0-9.866 4.418-9.87 9.856 0 1.638.49 3.23 1.42 4.616l-.995 3.635 3.738-.98h.026zm11.393-7.793c-.3-.149-1.786-.881-2.067-.983-.282-.103-.487-.155-.69.15-.205.304-.79.996-.968 1.2-.178.204-.356.229-.656.08-1.123-.563-1.843-1.002-2.585-2.275-.195-.335-.195-.548-.096-.647.09-.09.204-.237.306-.356.1-.12.135-.203.203-.339.068-.135.034-.254-.017-.356-.05-.101-.487-1.177-.668-1.611-.176-.425-.371-.367-.51-.374l-.434-.008c-.15 0-.395.056-.601.282-.206.226-.785.767-.785 1.87 0 1.104.8 2.167.912 2.318.11.15 1.575 2.406 3.816 3.376.533.23 1.01.38 1.343.485.536.17 1.02.146 1.405.089.429-.064 1.786-.73 2.039-1.435.252-.706.252-1.312.176-1.436-.076-.123-.282-.198-.58-.348z"/>
              </svg>
            </div>
            <div class="card-content">
              <span class="card-label">WhatsApp</span>
              <span class="card-value">${d.phone}</span>
            </div>
            <div class="card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </div>
          </a>
          
          <!-- Email Card -->
          <a href="${portfolioData.socialLinks.email}" class="contact-card email-card" aria-label="Send an Email">
            <div class="card-glow"></div>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <div class="card-content">
              <span class="card-label">Email</span>
              <span class="card-value">${d.email}</span>
            </div>
            <div class="card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </div>
          </a>
          
          <!-- Behance Card -->
          <a href="javascript:void(0)" class="contact-card behance-card" aria-label="Behance Portfolio (Link ready later)" style="cursor: default;">
            <div class="card-glow"></div>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M22 7h-7v1.5h7V7zm-9.3 5.4c.2-.3.3-.8.3-1.3 0-.6-.1-1.1-.4-1.5-.3-.4-.7-.7-1.3-.9-.6-.2-1.3-.3-2.2-.3H4v11.9h5.6c.9 0 1.7-.1 2.3-.3.6-.2 1.1-.6 1.4-1.1.3-.5.5-1.1.5-1.8 0-.8-.2-1.5-.7-2.1-.2-.2-.5-.4-.9-.6zm-5.5-2.6H8.3v1.9H7.2V9.8zm1.9 6.2H7.2v-2.3h1.9v2.3zm8.2-3.4c-.7 0-1.3.2-1.8.6-.5.4-.8 1-1 1.7-.2.7-.3 1.5-.3 2.5 0 .9.1 1.7.3 2.4.2.7.5 1.2 1 1.6.5.4 1.1.6 1.8.6.9 0 1.6-.3 2.1-1 .5-.6.8-1.5.8-2.6h-4.3c0-.7.1-1.3.3-1.7.2-.4.6-.6 1.1-.6.4 0 .7.1.9.4.2.2.3.6.4 1.1h1.5c-.1-1-.4-1.8-1-2.4-.6-.7-1.3-1.1-2.3-1.1z"/>
              </svg>
            </div>
            <div class="card-content">
              <span class="card-label">Behance</span>
              <span class="card-value">Portfolio Showcase</span>
            </div>
            <div class="card-arrow" aria-hidden="true" style="opacity: 0.25;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </div>
          </a>
        </div>
      </section>
      
      <!-- Right Column: Contact Form -->
      <section class="contact-form-container" data-animate="slide-right">
        <h2 class="contact-section-title">Send a Message</h2>
        <form class="contact-form glass-card" data-contact-form aria-label="Project Inquiry Form">
          <div class="form-group">
            <label for="form-name">Name</label>
            <input type="text" id="form-name" name="name" required placeholder="Sara Abdelrahman">
          </div>
          <div class="form-group">
            <label for="form-email">Email Address</label>
            <input type="email" id="form-email" name="email" required placeholder="sara@example.com">
          </div>
          <div class="form-group">
            <label for="form-message">Message Details</label>
            <textarea id="form-message" name="message" required rows="5" placeholder="Tell me about your project, goals, and timeline..."></textarea>
          </div>
          <button class="btn primary btn-submit" type="submit">
            <span class="btn-text">Generate Email</span>
            <span class="btn-spinner" aria-hidden="true"></span>
          </button>
          <p id="form-status" role="status" class="form-status-msg"></p>
        </form>
      </section>
    </div>

    <!-- Centered Final Call to Action -->
    <div class="contact-cta-section" data-animate="fade-up">
      <div class="cta-card glass-card">
        <h3>Ready to work together?</h3>
        <p>Your next great design starts here. Let's build your next brand.</p>
      </div>
    </div>
  </main>`;
}

/* ═══════════════════════════════════════════════════════════
   INIT — PAGE ROUTING
   ═══════════════════════════════════════════════════════════ */

function initPage() {
  pageMeta();
  shell();
  const app = $("#app");
  const page = document.body.dataset.page;
  const pageContent = ({
    home: homePage,
    portfolio: portfolioPage,
    gallery: galleryPage,
    "project-details": detailsPage,
    about: aboutPage,
    services: servicesPage,
    contact: contactPage
  }[page] || homePage)();
  app.innerHTML = pageContent + footer();
}

/* ═══════════════════════════════════════════════════════════
   INTERACTIONS
   ═══════════════════════════════════════════════════════════ */

window.initPortfolioInteractions = function () {
  /* ── Portfolio filter (category grid) ─────────────────── */
  const grid = $("[data-portfolio-grid]");
  if (grid) {
    const cards = $$(".project-card", grid);
    const filterButtons = $$("[data-filter]");
    const search = $("[data-search]");
    const clearBtn = $(".search-clear", grid.closest("main"));
    
    const apply = () => {
      const active = $(".tabs .active")?.dataset.filter || "All";
      const q = (search?.value || "").toLowerCase();
      
      if (clearBtn) {
        clearBtn.style.opacity = q ? "1" : "0";
        clearBtn.style.pointerEvents = q ? "auto" : "none";
      }

      cards.forEach((card) => {
        const okCat = active === "All" || card.dataset.category === active;
        const okText = card.dataset.title.includes(q);
        if (okCat && okText) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
      // Trigger lazy load after filtering
      initLazyLoading();
    };

    filterButtons.forEach((btn) => btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      apply();
    }));

    search?.addEventListener("input", apply);
    
    clearBtn?.addEventListener("click", () => {
      if(search) search.value = "";
      apply();
      search?.focus();
    });
  }

  /* ── Lazy Loading with IntersectionObserver ── */
  initLazyLoading();

  /* ── Tilt card ────────────────────────────────────────── */
  $$(".tilt-card").forEach((card) => card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - .5) * -12}deg`);
    card.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - .5) * 12}deg`);
  }));

  /* ── Newsletter ───────────────────────────────────────── */
  $("[data-newsletter]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    $("small", e.currentTarget).textContent = "Thanks. You are on the creative list.";
    e.currentTarget.reset();
  });

  /* ── Contact form ─────────────────────────────────────── */
  const contactForm = $("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const btn = form.querySelector(".btn-submit");
      const btnText = btn?.querySelector(".btn-text");
      const statusMsg = form.querySelector("#form-status");

      if (btn) btn.disabled = true;
      if (btnText) btnText.textContent = "Opening Mail Client...";
      if (statusMsg) {
        statusMsg.className = "form-status-msg info";
        statusMsg.innerHTML = `<span class="status-icon">✉</span> Opening your email app with the message prepared.`;
      }

      const fd = new FormData(form);
      const emailTo = portfolioData.socialLinks.email.startsWith('mailto:') 
        ? portfolioData.socialLinks.email 
        : `mailto:${portfolioData.socialLinks.email}`;
      const subject = encodeURIComponent(`Portfolio inquiry from ${fd.get("name")}`);
      const body = encodeURIComponent(`${fd.get("message")}\n\nFrom: ${fd.get("name")} <${fd.get("email")}>`);
      
      setTimeout(() => {
        location.href = `${emailTo}?subject=${subject}&body=${body}`;
        
        // After transition, show success state in form
        if (statusMsg) {
          statusMsg.className = "form-status-msg success";
          statusMsg.innerHTML = `<span class="status-icon">✓</span> Email template generated! Feel free to hit send in your email client.`;
        }
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = "Generate Email";
        form.reset();
      }, 1000);
    });
  }

  /* ── Gallery page init ────────────────────────────────── */
  if (document.body.dataset.page === "gallery") {
    initGalleryPage();
  }
};

/* ═══════════════════════════════════════════════════════════
   GALLERY — image loading
   ═══════════════════════════════════════════════════════════ */

function normalizeFilename(filename) {
  let name = filename.substring(0, filename.lastIndexOf("."));
  if (!name) name = filename;
  name = name.toLowerCase();
  // Remove copy indicators only
  name = name.replace(/\b(copy|final)\b/g, '');
  name = name.replace(/[-_]/g, ' ');
  name = name.replace(/\s+/g, ' ');
  return name.trim();
}

function loadNormalizedDesigns(categoryId = null) {
  let designs = [];
  const seenPaths = new Set();
  const seenFilenames = new Set();
  const seenNormalized = new Set();

  portfolioData.categories.forEach(cat => {
    if (categoryId && cat.id !== categoryId) return;

    cat.projects.forEach(project => {
      project.images.forEach((imgObj, idx) => {
        const imgName = typeof imgObj === 'string' ? imgObj : imgObj.filename;
        const width = imgObj.width || 800;
        const height = imgObj.height || 600;
        
        const imagePath = `../assets/images/${cat.folder}/${imgName}`;
        const normName = normalizeFilename(imgName);
        const lowerName = imgName.toLowerCase();
        
        if (seenPaths.has(imagePath) || seenFilenames.has(lowerName) || seenNormalized.has(normName)) {
           return;
        }
        seenPaths.add(imagePath);
        seenFilenames.add(lowerName);
        seenNormalized.add(normName);
        
        designs.push({
          id: `${cat.id}-${project.slug}-${idx + 1}`,
          categoryId: cat.id,
          slug: project.slug,
          project: project.title,
          category: cat.name,
          title: project.title,
          subtitle: project.subtitle || null,
          totalDesigns: project.images.length,
          image: imagePath,
          thumbnail: imagePath,
          width: width,
          height: height,
          filename: imgName,
          designNumber: idx + 1,
          projectUrl: `portfolio.html?category=${cat.id}&project=${project.slug}`
        });
      });
    });
  });

  // Native <img> onerror handles fallbacks automatically and safely.
  // (fetch HEAD was causing CORS issues locally and rate-limiting on GH Pages)
  return designs;
}

function initGalleryPage() {
  const params = new URLSearchParams(location.search);
  const categoryId = params.get("category");
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  // Retain skeleton if it exists, otherwise generate it
  let skeleton = grid.querySelector('.gallery-skeleton');
  if (!skeleton) {
    grid.innerHTML = `<div class="gallery-skeleton" aria-hidden="true">
      <div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div>
    </div>`;
    skeleton = grid.querySelector('.gallery-skeleton');
  }
  
  const validatedDesigns = loadNormalizedDesigns(null);

  if (validatedDesigns.length === 0) {
    grid.innerHTML = `<div class="gallery-status">No designs found.</div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  const tempDiv = document.createElement('div');

  let html = "";
  validatedDesigns.forEach((design, index) => {
    // Eager images 1 and 2, natively eager 3 to 6
    const isEager = index < 6;
    const isPriority = index < 2;
    const loadingAttr = isPriority ? 'loading="eager" fetchpriority="high"' : (isEager ? 'loading="eager"' : 'loading="lazy" decoding="async"');
    const srcAttr = isEager ? `src="${design.image}"` : `data-src="${design.image}"`;
    const clsAttr = isEager ? 'class="gallery-img loaded"' : 'class="gallery-img lazy-image"';
    
    // First 6 cards skip observer animation by starting 'is-visible'
    const cardVisibility = isEager ? 'is-visible' : '';
    
    html += `
      <article class="premium-gallery-card ${cardVisibility}" data-animate="fade-up" data-project-url="${design.projectUrl}" data-category="${design.categoryId}" onclick="const img = this.querySelector('img'); if(img && event.target !== img) img.click();">
        <div class="pgc-image">
          <img ${srcAttr} ${loadingAttr} ${clsAttr} width="${design.width}" height="${design.height}" alt="${design.project}" onerror="window.handleImageError(this)" data-gallery-image>
          <div class="pgc-glass-highlight"></div>
          <div class="pgc-gradient-overlay"></div>
        </div>
        <div class="pgc-info">
          <div class="pgc-info-content">
            <div class="pgc-meta">
              <span class="pgc-badge">${design.category}</span>
            </div>
            <h3 class="pgc-title">${design.project}</h3>
          </div>
          <div class="pgc-button-wrap">
            <span class="pgc-btn">View Design</span>
          </div>
        </div>
      </article>
    `;
  });

  tempDiv.innerHTML = html;
  while (tempDiv.firstChild) {
    frag.appendChild(tempDiv.firstChild);
  }
  
  grid.appendChild(frag);

  // Fade out skeleton smoothly
  if (skeleton) {
    skeleton.style.transition = 'opacity 0.4s ease';
    skeleton.style.opacity = '0';
    setTimeout(() => skeleton.remove(), 400);
  }

  // Init Gallery Filtering & Search
  const filterBtns = document.querySelectorAll('#galleryFilters button');
  const searchInput = document.getElementById('gallerySearch');
  const clearBtn = document.getElementById('gallerySearchClear');
  const cards = document.querySelectorAll('.premium-gallery-card');

  const applyGalleryFilter = () => {
    const activeFilter = document.querySelector('#galleryFilters .active')?.dataset.filter || 'All';
    const query = (searchInput?.value || '').toLowerCase();

    if (clearBtn) {
      clearBtn.style.opacity = query ? "1" : "0";
      clearBtn.style.pointerEvents = query ? "auto" : "none";
    }

    cards.forEach(card => {
      // For searching, we look at the inner text which has category and title
      const text = card.textContent.toLowerCase();
      const category = card.querySelector('span').textContent;
      
      const matchCat = activeFilter === 'All' || category.toLowerCase() === activeFilter.toLowerCase();
      const matchText = text.includes(query);

      if (matchCat && matchText) {
        card.classList.remove('is-hidden');
        if (card._filterTimeout) clearTimeout(card._filterTimeout);
        card.style.display = '';
        // Let CSS animations (.is-visible) handle the opacity
      } else {
        card.classList.add('is-hidden');
        if (card._filterTimeout) clearTimeout(card._filterTimeout);
        card._filterTimeout = setTimeout(() => card.style.display = 'none', 300);
      }
    });
    
    // Re-trigger lazy loading after filter changes
    if (window.initLazyLoading) {
      setTimeout(window.initLazyLoading, 50);
    }
  };

  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyGalleryFilter();
  }));

  searchInput?.addEventListener('input', applyGalleryFilter);
  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    applyGalleryFilter();
    searchInput?.focus();
  });

  if (window.initLazyLoading) {
    window.initLazyLoading();
  }

  if (window.initAnimations) {
    window.initAnimations();
  }

  // Trigger initial filter on page load based on selected tab
  applyGalleryFilter();
}

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — async init removed
   ═══════════════════════════════════════════════════════════ */

/* ── Lazy Loading Logic ────────────────────────────────────── */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy-image');
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('loaded');
        img.classList.remove('lazy-image');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: "200px",
    threshold: 0.01
  });

  // Note: Initial images (above fold) already bypass this via HTML generation
  lazyImages.forEach(img => imageObserver.observe(img));
}
window.initLazyLoading = initLazyLoading;

/* ── Boot ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", initPage);

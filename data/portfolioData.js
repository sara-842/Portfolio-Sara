const portfolioData = {
  designer: {
    name: "Sara Abdelrahman",
    initials: "SA",
    role: "Graphic Designer",
    experience: "3 Years",
    availability: "Available For Freelance Work",
    tagline: "Premium visual identities, social campaigns, and print-ready creative systems for brands that want to look unmistakably confident.",
    email: "saraabdelrahman824@gmail.com",
    phone: "01023769582",
    whatsapp: "https://wa.me/201023769582",
    behance: "#",
    location: "Cairo, Egypt",
    profileImage: "../assets/images/Portfolio.jpg"
  },

  /* ── Categories & Projects ─────────────────────────────── */
  categories: [
    {
      id: "social",
      name: "Social Media",
      folder: "Social",
      cover: "project-social",
      projects: [
        {
          slug: "coffee-campaign",
          title: "Coffee Day Campaign",
          images: [
            { filename: "Coffee Day.jpeg", width: 800, height: 600 }
          ]
        },
        {
          slug: "pizza-campaign",
          title: "Pizza Campaign",
          images: [
            { filename: "PIZZA.jpeg", width: 800, height: 600 }
          ]
        },
        {
          slug: "swiggy-campaign",
          title: "Swiggy Campaign",
          images: [
            { filename: "Swiggy Poster.jpeg", width: 800, height: 600 }
          ]
        },
        {
          slug: "al-wafa-pharmacy",
          title: "Al-Wafa Pharmacy",
          images: [
            { filename: "alwafa-pharmacy.png", width: 800, height: 600 },
            { filename: "اجهزه طبيه (1).png", width: 800, height: 600 },
            { filename: "الوفاء (2).png", width: 800, height: 600 },
            { filename: "الوفاء (3).png", width: 800, height: 600 },
            { filename: "الوفاء.png", width: 800, height: 600 }
          ]
        },
        {
          slug: "al-jam3-academy",
          title: "Al Jam3 Academy",
          images: [
            { filename: "jamea-platform.png", width: 800, height: 600 },
            { filename: "life (3).png", width: 800, height: 600 },
            { filename: "الفقه.png", width: 800, height: 600 },
            { filename: "الفيزياء (3).png", width: 800, height: 600 },
            { filename: "تاريخ.png", width: 800, height: 600 },
            { filename: "تهنئه النجاح .png", width: 800, height: 600 },
            { filename: "صرف (2).png", width: 800, height: 600 }
          ]
        },
        {
          slug: "porto-dental-center",
          title: "Porto Dental Center",
          images: [
            { filename: "porto clinic (1).png", width: 800, height: 600 },
            { filename: "IMG_6643.png", width: 800, height: 600 }
          ]
        },
        {
          slug: "al-mamalik-pie",
          title: "Al-Mamalik Pie",
          images: [
            { filename: "فطيرة المماليك 3.png", width: 800, height: 600 },
            { filename: "قصر المماليك 2 (1).png", width: 800, height: 600 },
            { filename: "قصر المماليك 2 (2).png", width: 800, height: 600 },
            { filename: "IMG_6388.png", width: 800, height: 600 }
          ]
        },
        {
          slug: "eid-campaign",
          title: "Eid Al-Adha Campaign",
          images: [
            { filename: "PHOTO-2026-06-14-20-53-24.jpg", width: 800, height: 600 },
            { filename: "PHOTO-2026-06-14-20-53-25 2.jpg", width: 800, height: 600 },
            { filename: "PHOTO-2026-06-14-20-53-25 3.jpg", width: 800, height: 600 },
            { filename: "PHOTO-2026-06-14-20-53-25.jpg", width: 800, height: 600 }
          ]
        },
        {
          slug: "misc-social-campaigns",
          title: "Misc Campaigns",
          images: [
            { filename: "IMG-20260428-WA0114.jpg", width: 800, height: 600 },
            { filename: "IMG_6496.png", width: 800, height: 600 },
            { filename: "خصم 70% (2).png", width: 800, height: 600 },
            { filename: "كذبه ابريل (1).png", width: 800, height: 600 },
            { filename: "كذبه ابريل.png", width: 800, height: 600 },
            { filename: "مهما احتياجك بيتغير.png", width: 800, height: 600 }
          ]
        }
      ]
    },
    {
      id: "logos",
      name: "Logos",
      folder: "logos",
      cover: "project-logo",
      projects: [
        {
          slug: "logo-collection",
          title: "Logo Collection",
          images: [
            { filename: "project-logo-1.png", width: 800, height: 600 },
            { filename: "project-logo-2.png", width: 800, height: 600 }
          ]
        }
      ]
    },
    {
      id: "branding",
      name: "Branding",
      folder: "branding",
      cover: "project-brand",
      projects: [
        {
          slug: "brand-identity",
          title: "Brand Identity",
          images: [
            { filename: "project-brand-1.png", width: 800, height: 600 },
            { filename: "project-brand-2.png", width: 800, height: 600 }
          ]
        }
      ]
    },
    {
      id: "posters",
      name: "Posters",
      folder: "posters",
      cover: "project-poster",
      projects: [
        {
          slug: "poster-designs",
          title: "Poster Designs",
          images: [
            { filename: "project-poster-1.png", width: 800, height: 600 },
            { filename: "project-poster-2.png", width: 800, height: 600 }
          ]
        },
        {
          slug: "alaska-hotel",
          title: "Alaska Pyramids Hotel",
          images: [
            { filename: "PHOTO-2026-06-14-20-53-25 4.jpg", width: 800, height: 600 }
          ]
        }
      ]
    },
    {
      id: "print",
      name: "Print Design",
      folder: "print",
      cover: "project-print",
      projects: [
        {
          slug: "print-collection",
          title: "Print Collection",
          images: [
            { filename: "project-print-1.png", width: 800, height: 600 },
            { filename: "project-print-2.png", width: 800, height: 600 }
          ]
        }
      ]
    }
  ],

  /* ── Computed helpers ───────────────────────────────────── */
  get totalCategories() {
    return this.categories.length;
  },
  get totalProjects() {
    return this.categories.reduce((sum, c) => sum + c.projects.length, 0);
  },
  get totalWorks() {
    return this.categories.reduce(
      (sum, c) => sum + c.projects.reduce((s, p) => s + p.images.length, 0),
      0
    );
  },

  /** Flat list for backwards-compat with `stats`, `featured`, etc. */
  get projects() {
    return this.categories.map(cat => ({
      id: cat.id,
      title: cat.name + " Design",
      category: cat.name,
      thumbnail: cat.cover,
      count: cat.projects.length + (cat.projects.length === 1 ? " Project" : " Projects"),
      totalImages: cat.projects.reduce((s, p) => s + p.images.length, 0),
      featured: true
    }));
  },

  /* ── Stats (auto-calculated) ───────────────────────────── */
  get stats() {
    return [
      { value: 120, suffix: "+", label: "Projects Completed" },
      { value: 45, suffix: "+", label: "Happy Clients" },
      { value: 3, suffix: "", label: "Years Experience" },
      { value: this.totalCategories, suffix: "", label: "Categories" }
    ];
  },

  /* ── Everything below is UNCHANGED ─────────────────────── */
  services: [
    { title: "Social Media Design", icon: "grid", description: "Campaign-ready posts, stories, carousels, and launch visuals with a sharp brand voice.", deliverables: ["Post sets", "Stories", "Ad creatives", "Templates"], benefits: ["Consistent presence", "Higher engagement", "Fast campaign rollout"] },
    { title: "Logo Design", icon: "spark", description: "Distinctive marks built for memorability, scalability, and confident brand recognition.", deliverables: ["Logo suite", "Usage guide", "Color palette", "File exports"], benefits: ["Clear identity", "Professional perception", "Flexible usage"] },
    { title: "Brand Identity Design", icon: "layers", description: "Complete identity systems that align visuals, tone, and practical business use.", deliverables: ["Brand strategy", "Visual system", "Guidelines", "Assets"], benefits: ["Premium positioning", "Visual consistency", "Launch confidence"] },
    { title: "Poster Design", icon: "frame", description: "Editorial posters for events, campaigns, and promotional moments that need instant attention.", deliverables: ["Key art", "Print versions", "Digital crops", "Source files"], benefits: ["High impact", "Clear hierarchy", "Memorable visuals"] },
    { title: "Print Design", icon: "print", description: "Production-aware brochures, flyers, packaging inserts, and branded print collateral.", deliverables: ["Ready-to-print files", "Mockups", "Bleed setup", "Export package"], benefits: ["Clean production", "Premium finish", "Reliable handoff"] },
    { title: "Marketing Creatives", icon: "target", description: "Conversion-focused design assets for launches, offers, ads, and brand campaigns.", deliverables: ["Ad sets", "Landing graphics", "Offer visuals", "Campaign kits"], benefits: ["Stronger campaigns", "Brand recall", "Faster testing"] }
  ],
  skills: [
    { name: "Adobe Photoshop", value: 95 },
    { name: "Adobe Illustrator", value: 90 },
    { name: "Canva", value: 95 },
    { name: "Brand Systems", value: 88 },
    { name: "Print Production", value: 84 },
    { name: "Art Direction", value: 86 }
  ],
  testimonials: [
    { name: "Mona Hassan", role: "Founder, Luma Beauty", quote: "Sara translated our brand into visuals that felt polished, warm, and instantly trustworthy." },
    { name: "Omar Nabil", role: "Marketing Lead, Orbit Retail", quote: "The campaign assets were fast, consistent, and genuinely elevated our launch." },
    { name: "Nadine Samir", role: "Creative Producer", quote: "Her design process is organized, collaborative, and full of smart visual decisions." }
  ],
  awards: [
    "Best Social Media Campaign",
    "Creative Excellence Award",
    "Top Graphic Designer Recognition"
  ],
  clients: ["Nova", "Luma", "Orbit", "Pulse", "Miro", "Atelier", "Bloom", "Studio X"],
  faqs: [
    { q: "How long does a project take?", a: "Most design projects take 3 to 14 days depending on scope, feedback rounds, and deliverables." },
    { q: "What design services do you offer?", a: "Social media design, logo design, brand identity, posters, print design, and marketing creatives." },
    { q: "Do you offer revisions?", a: "Yes. Projects include structured revision rounds so the final work feels polished and aligned." },
    { q: "How can clients contact you?", a: "Use the contact form, email, Behance, phone, or the floating WhatsApp button." }
  ],
  socialLinks: {
    behance: "#",
    whatsapp: "https://wa.me/201023769582",
    email: "mailto:saraabdelrahman824@gmail.com",
    phone: "tel:01023769582"
  }
};

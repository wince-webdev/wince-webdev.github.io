"use strict";

document.addEventListener("DOMContentLoaded", function () {

  // ── Helpers ──────────────────────────────────────────────────────────
  const select  = (el, all = false) =>
    all ? [...document.querySelectorAll(el)] : document.querySelector(el);

  const isCollection = (el) =>
    el instanceof NodeList || el instanceof HTMLCollection || Array.isArray(el);

  const innerHTML = (els, html) => {
    if (!els) return;
    if (isCollection(els)) els.forEach((el) => (el.innerHTML = html));
    else els.innerHTML = html;
  };

  const innerText = (els, text) => {
    if (!els) return;
    if (isCollection(els)) els.forEach((el) => (el.innerText = text));
    else els.innerText = text;
  };

  const durationTo = (from, to, ongoing) => {
    if (from === to) to = ongoing ? " - présent" : "";
    else to = " - " + (to >= currentYear && ongoing !== false ? "présent" : to);
    return from + to;
  };

  // ── Title ─────────────────────────────────────────────────────────────
  innerText(select("title"), `${profileInfo.firstname} – Portfolio`);

  // ── Sidebar Profile ───────────────────────────────────────────────────
  (function () {
    // favicon
    const headIcon = select("head link.head-icon");
    if (headIcon) headIcon.href = profileInfo.imgSrc;

    // name & degree
    innerText(select(".my-name",   true), profileInfo.fullname());
    innerText(select(".my-degree", true), profileInfo.fulldegree());

    // profile image
    select("img.my-profile", true).forEach((el) => {
      el.src = profileInfo.imgSrc;
      el.alt = profileInfo.fullname();
    });

    // social links
    const socialsEl = select(".sidebar-info_more .social-list");
    socialsEl.innerHTML = profileInfo.social.map((s) => `
      <li class="social-item">
        <a href="${s.url}" class="social-link" target="_blank" rel="noopener noreferrer">
          <ion-icon name="${s.icon}"></ion-icon>
        </a>
      </li>`).join("");

    // contact list
    const contactEl = select(".sidebar-info_more .contacts-list");
    const aboutItems = profileInfo.getAbout();
    const dataKeys   = contactEl.getAttribute("data-contact-info").split(",").map((s) => s.trim());
    contactEl.innerHTML = dataKeys.map((key) => {
      const item = aboutItems.find((i) => i.id === key);
      return item ? `
        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="${item.icon}"></ion-icon>
          </div>
          <div class="contact-info">
            <p class="contact-title">${item.name}</p>
            <span class="${item.class || ""}">${item.text || ""}</span>
          </div>
        </li>` : "";
    }).join("");

    // fill dynamic spans
    select(".my-website", true).forEach((el) =>
      (el.innerHTML = `<a href="https://${profileInfo.website}" class="contact-link" target="_blank">${profileInfo.website}</a>`));
    select(".my-email", true).forEach((el) =>
      (el.innerHTML = `<a href="mailto:${profileInfo.email}" class="contact-link" target="_blank">${profileInfo.email}</a>`));
    select(".my-phone", true).forEach((el) =>
      (el.innerHTML = `<a href="tel:${profileInfo.phone.mobile}" class="contact-link" target="_blank">${profileInfo.phone.mobile}</a>`));
    select(".my-whatsapp", true).forEach((el) =>
      (el.innerHTML = `<a href="https://wa.me/${profileInfo.phone.whatsapp.replace(/\s/g,'')}" class="contact-link" target="_blank">${profileInfo.phone.whatsapp}</a>`));
    select(".my-address", true).forEach((el) =>
      (el.innerHTML = `<address>${profileInfo.fulladdress()}</address>`));
  })();

  // ── About – Interests ─────────────────────────────────────────────────
  (function () {
    const el = select(".service-list");
    if (!el) return;
    el.innerHTML = aboutInfo.interests.map((item) => `
      <li class="service-item">
        <div class="service-icon-box">
          <img src="${item.icon}" alt="${item.title}" width="40" />
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${item.title}</h4>
          <p class="service-item-text text-justify">${item.description}</p>
        </div>
      </li>`).join("");
  })();

  // ── Resume – Education ────────────────────────────────────────────────
  (function () {
    const el = select(".timeline-list.education");
    if (!el) return;
    el.innerHTML = resumeInfo.education.map((item) => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${item.degree}</h4>
        <h5 class="h4 univ-comp">${item.institution}, ${item.city}${item.country ? ", " + item.country : ""}</h5>
        <span>${durationTo(item.duration.from, item.duration.to, item.ongoing)}</span>
        <div class="timeline-text text-justify">${item.description}</div>
      </li>`).join("");
  })();

  // ── Resume – Experience ───────────────────────────────────────────────
  (function () {
    const el = select(".timeline-list.experience");
    if (!el) return;
    el.innerHTML = resumeInfo.experience.map((item) => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${item.position}</h4>
        <h5 class="h4 univ-comp">${item.company} – ${item.city}, ${item.country}</h5>
        <span>${durationTo(item.duration.from, item.duration.to, item.ongoing)}</span>
        <p class="timeline-text text-justify">${item.description}</p>
        ${item.achievements ? `<ul style="margin-top:8px;padding-left:16px;">${item.achievements.map((a)=>
          `<li style="font-size:var(--fs-7);color:var(--light-gray);margin-bottom:4px;list-style:disc;">
            ${a}
          </li>`).join("")}</ul>` : ""}
      </li>`).join("");
  })();

  // ── Resume – Skills (Tech) ────────────────────────────────────────────
  (function () {
    const el = select(".skills-list");
    if (!el) return;
    const skillIcons = {
      "symfony": "https://cdn.simpleicons.org/symfony/ffffff",
      "laravel": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "php": "https://cdn.simpleicons.org/php/8892bf",
      "javascript": "https://cdn.simpleicons.org/javascript/f7df1e",
      "html-css": "https://cdn.simpleicons.org/html5/e34f26",
      "bootstrap": "https://cdn.simpleicons.org/bootstrap/7952b3",
      "postgresql": "https://cdn.simpleicons.org/postgresql/4169e1",
      "mysql": "https://cdn.simpleicons.org/mysql/4479a1",
      "api-rest": "https://cdn.simpleicons.org/openapiinitiative/6ba539",
      "sanctum": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "breeze": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "spatie": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "git": "https://cdn.simpleicons.org/git/f05032",
      "postman": "https://cdn.simpleicons.org/postman/ff6c37",
      "docker": "https://cdn.simpleicons.org/docker/2496ed",
      "linux": "https://cdn.simpleicons.org/linux/fcc624",
      "python": "https://cdn.simpleicons.org/python/3776ab",
      "tailwind": "https://cdn.simpleicons.org/tailwindcss/06b6d4",
      "twig": "https://cdn.simpleicons.org/twig/8bc34a",
      "doctrine": "https://cdn.simpleicons.org/doctrine/fc6a31",
    };
    el.innerHTML = resumeInfo.skills.map((skill) => `
      <li class="skills-item skill-card">
        <div class="skill-card-head">
          <div class="skill-icon-wrap">
            <img src="${skillIcons[skill.id] || skillIcons["api-rest"]}" alt="${skill.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';" />
            <span class="skill-icon-fallback">${skill.name.slice(0, 2).toUpperCase()}</span>
          </div>
          <div class="skill-card-info">
            <h5 class="h5">${skill.name}</h5>
            <data value="${skill.level}">${skill.level}%</data>
          </div>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" style="width:${skill.level}%"></div>
        </div>
      </li>`).join("");
  })();

  // ── Resume – Languages ────────────────────────────────────────────────
  (function () {
    const el = select(".languages-grid");
    if (!el) return;
    el.innerHTML = resumeInfo.languages.map((lang) => `
      <div class="lang-card">
        <span class="lang-flag">${lang.flag}</span>
        <div class="lang-info">
          <h5>${lang.name}</h5>
          <span>${lang.level}</span>
        </div>
      </div>`).join("");
  })();

  // ── Resume – Soft Skills ──────────────────────────────────────────────
  (function () {
    const el = select(".soft-skills-list");
    if (!el) return;
    el.innerHTML = resumeInfo.softSkills.map((s) =>
      `<span class="soft-skill-tag">${s}</span>`).join("");
  })();

  // ── Projects ──────────────────────────────────────────────────────────
  (function () {
    const el = select(".project-list");
    if (!el) return;

    el.innerHTML = projects.map((item) => {

      // Image ou placeholder emoji
      const imgHtml = item.imgSrc
        ? `<img src="${item.imgSrc}" alt="Capture – ${item.title}" loading="lazy" />`
        : `<div class="project-img-placeholder" title="${item.title}">
             ${item.imgPlaceholder || "🖥️"}
           </div>`;

      // Badge GitHub
      const githubBadge = item.githubUrl
        ? `<a href="${item.githubUrl}" target="_blank" rel="noopener" title="Voir sur GitHub">
             <img src="https://img.shields.io/badge/GitHub-Repo-FFBC5E?logo=github" alt="GitHub" style="height:20px;">
           </a>` : "";

      // Bouton Voir → ouvre la lightbox avec les captures du projet
      const imgs = item.previewImages && item.previewImages.length > 0
        ? item.previewImages
        : (item.imgSrc ? [item.imgSrc] : []);
      const liveBtn = imgs.length > 0
        ? `<button class="project-live-link" onclick='winceOpenLightbox(${JSON.stringify(imgs)}, 0)' title="Voir les captures du projet">
             <ion-icon name="eye-outline" style="font-size:12px;"></ion-icon> Voir
           </button>`
        : "";

      // Badges tech
      const tags = item.tags.map(t =>
        `<span class="lang-badge">${t}</span>`).join("");

      // Badge type
      const typeBadge = item.type === "enterprise"
        ? `<span class="lang-badge" style="background:#1a3a5c;color:#7ec8e3;border-color:#2a5a8c;">🏢 Entreprise</span>`
        : `<span class="lang-badge" style="background:#1a3d1a;color:#7ec87e;border-color:#2a6a2a;">👤 Personnel</span>`;

      return `
        <li class="project-item active" data-filter-item data-category="${item.category}">
          <div class="project-inner">

            <!-- IMAGE GAUCHE -->
            <div class="project-img-wrap">${imgHtml}</div>

            <!-- CONTENU DROITE -->
            <div class="project-right">
              <div class="project-content-box">
                <h4 class="h4 project-item-title">${item.title}</h4>
                <p class="project-item-text">${item.description}</p>
              </div>
              <div class="project-item-extra">
                <div class="project-item-tags">
                  <div class="languages">
                    ${typeBadge} ${tags}
                  </div>
                  <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">
                    ${githubBadge}${liveBtn}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </li>`;
    }).join("");
  })();

  // ── Filter buttons ─────────────────────────────────────────────────
  // CORRECTION : document.querySelectorAll() après génération des projets
  // "tout" = afficher tout, "entreprise"/"personnel" = filtrer par catégorie
  (function () {
    const filterBtns  = select("[data-filter-btn]", true);
    const selectEl    = select("[data-select]");
    const selectVal   = select("[data-selecct-value]");
    const selectItems = select("[data-select-item]", true);

    const filterFunc = (value) => {
      const filterItems = document.querySelectorAll("[data-filter-item]");
      const isAll = value === "tout" || value === "all";
      filterItems.forEach((item) => {
        const cat = (item.dataset.category || "").toLowerCase();
        if (isAll || cat === value) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };

    let lastBtn = filterBtns[0];
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const val = this.innerText.toLowerCase().trim();
        if (selectVal) selectVal.innerText = this.innerText;
        filterFunc(val);
        if (lastBtn) lastBtn.classList.remove("active");
        this.classList.add("active");
        lastBtn = this;
      });
    });

    if (selectEl) {
      selectEl.addEventListener("click", () => selectEl.classList.toggle("active"));
    }
    selectItems.forEach((item) => {
      item.addEventListener("click", function () {
        const val = this.innerText.toLowerCase().trim();
        if (selectVal) selectVal.innerText = this.innerText;
        if (selectEl) selectEl.classList.remove("active");
        filterFunc(val);
      });
    });
  })();

});

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
        <li class="project-item active" data-filter-item data-category="${item.type}">
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
        const val = this.dataset.filterValue || this.innerText.toLowerCase().trim();
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
        const val = this.dataset.filterValue || this.innerText.toLowerCase().trim();
        if (selectVal) selectVal.innerText = this.innerText;
        if (selectEl) selectEl.classList.remove("active");
        filterFunc(val);
      });
    });
  })();

  // ── Multilingual portfolio layer ─────────────────────────────
  const cvPaths = {
    fr: "./assets/images/CV_Winceslas_ADJIHANOU_Dev_FullStack_PHP_JS.pdf",
    en: "./assets/images/CV_Winceslas_ADJIHANOU_FullStack_Developer_EN.pdf",
  };
  const i18n = {
    fr: {
      meta: {
        title: `${profileInfo.firstname} – Portfolio`,
        degree: "Développeur FullStack",
        present: "présent",
        see: "Voir",
        github: "Voir sur GitHub",
        enterprise: "Entreprise",
        personal: "Personnel",
      },
      static: {
        "sidebar.contacts": "Contacts",
        "actions.cv": "Télécharger mon CV",
        "nav.about": "À propos",
        "nav.resume": "Résumé",
        "nav.projects": "Projets",
        "nav.contact": "Contact",
        "filters.all": "Tout",
        "filters.enterprise": "Entreprise",
        "filters.personal": "Personnel",
        "filters.category": "Catégorie",
      },
      sections: {
        aboutTitle: "À propos de moi",
        interests: "Centres d'intérêt",
        resume: "Résumé",
        education: "Formation",
        experience: "Expériences Professionnelles",
        skills: "Compétences Techniques",
        languages: "Langues",
        softSkills: "Qualités Personnelles",
        projects: "Projets",
        contact: "Contact",
        quickContact: "Contactez-moi directement",
        formTitle: "Envoyez-moi un message",
      },
      aboutHtml: `
        <p>Bonjour ! Je suis <strong>Noukpo Winceslas ADJIHANOU</strong>, développeur Full Stack PHP basé à Abomey-Calavi, Cotonou (Bénin). Fort de plus de 3 ans d'expérience professionnelle, je conçois et maintiens des applications web robustes pour des institutions publiques et privées béninoises.</p>
        <p>Titulaire d'une Licence Professionnelle en Systèmes Informatiques et Logiciels (IRGIB Africa University), je me suis spécialisé dans l'écosystème <strong>Symfony / Laravel / PHP</strong>. Chez <strong>COSIT Bénin</strong>, je contribue activement à la digitalisation de plusieurs ministères et organismes nationaux via des modules ERP variés : suivi-évaluation, passation des marchés, ressources humaines, comptabilité générale et gestion de stock.</p>
        <p>En parallèle, je développe mes compétences <strong>Laravel 12</strong> à travers des projets personnels concrets, notamment <strong>ExpenseFlow</strong> : application de gestion financière avec API REST Sanctum, rôles et permissions Spatie, dashboard Chart.js et export PDF. Disponible sur GitHub.</p>
        <p>Au-delà du code, je suis <strong>maître de stage</strong> et mentor pour les étudiants des écoles Faucon et INSPEI que j'accompagne dans leurs projets de soutenance et de stage académique. Transmettre, expliquer et faire grandir les autres est pour moi aussi important que la technique.</p>
        <p>Je maîtrise le déploiement sur serveurs Linux (cPanel, Grizzly), la conception d'API REST sécurisées, et continue d'élargir mes compétences (Docker, cloud) pour rester un développeur moderne et efficace.</p>`,
      contact: {
        labels: ["E-mail", "Téléphone", "WhatsApp", "Localisation"],
        whatsapp: "Ouvrir la discussion →",
        location: "Abomey Calavi, Cotonou, Bénin",
        intro: "Vous avez un projet, une opportunité ou une question ? Remplissez ce formulaire et je vous répondrai dans les plus brefs délais.",
        placeholders: {
          name: "Votre nom complet",
          email: "Votre adresse e-mail",
          subject: "Objet du message",
          message: "Votre message…",
        },
        success: "✅ Votre application mail s'est ouverte avec votre message prêt à envoyer. Merci !",
        error: "⚠️ Veuillez remplir tous les champs avant d'envoyer.",
        button: "Envoyer le message",
      },
      projectNote: `Les projets <strong>Entreprise</strong> sont des logiciels internes développés en équipe chez COSIT Bénin pour des institutions publiques béninoises. L'accès est réservé aux utilisateurs autorisés.`,
      footer: `© <span class="footer-year">${currentYear}</span> Winceslas ADJIHANOU · Tous droits réservés`,
      aboutLabels: {
        website: "Site web", degree: "Diplôme", address: "Adresse", phone: "Téléphone", email: "E-mail", whatsapp: "WhatsApp",
      },
    },
    en: {
      meta: {
        title: `${profileInfo.firstname} – Portfolio`,
        degree: "Full-Stack Developer",
        present: "present",
        see: "View",
        github: "View on GitHub",
        enterprise: "Enterprise",
        personal: "Personal",
      },
      static: {
        "sidebar.contacts": "Contacts",
        "actions.cv": "Download my CV",
        "nav.about": "About",
        "nav.resume": "Resume",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "filters.all": "All",
        "filters.enterprise": "Enterprise",
        "filters.personal": "Personal",
        "filters.category": "Category",
      },
      sections: {
        aboutTitle: "About Me",
        interests: "Areas of Interest",
        resume: "Resume",
        education: "Education",
        experience: "Professional Experience",
        skills: "Technical Skills",
        languages: "Languages",
        softSkills: "Personal Strengths",
        projects: "Projects",
        contact: "Contact",
        quickContact: "Contact me directly",
        formTitle: "Send me a message",
      },
      aboutHtml: `
        <p>Hello! I am <strong>Noukpo Winceslas ADJIHANOU</strong>, a PHP Full-Stack Developer based in Abomey-Calavi, Cotonou, Benin. With more than 3 years of professional experience, I design and maintain robust web applications for public institutions and private organizations.</p>
        <p>I hold a Professional Bachelor's Degree in Computer Systems and Software from IRGIB Africa University, and I specialize in the <strong>Symfony / Laravel / PHP</strong> ecosystem. At <strong>COSIT Benin</strong>, I actively contribute to the digital transformation of ministries and national organizations through ERP modules covering monitoring and evaluation, procurement, HR, general accounting and stock management.</p>
        <p>Alongside my professional work, I strengthen my <strong>Laravel 12</strong> skills through concrete personal projects such as <strong>ExpenseFlow</strong>, a financial management application with REST APIs, Sanctum authentication, Spatie roles and permissions, Chart.js dashboards and PDF exports.</p>
        <p>Beyond coding, I serve as a <strong>student internship supervisor</strong> and mentor for students from Faucon and INSPEI schools, helping them with academic internship and graduation projects. Sharing knowledge and helping others grow is an important part of my work.</p>
        <p>I am comfortable with Linux deployment environments (cPanel, Grizzly), secure REST API design, and I keep expanding my skills in Docker, cloud workflows and modern development practices.</p>`,
      contact: {
        labels: ["Email", "Phone", "WhatsApp", "Location"],
        whatsapp: "Open chat →",
        location: "Abomey Calavi, Cotonou, Benin",
        intro: "Have a project, an opportunity or a question? Fill in this form and I will get back to you as soon as possible.",
        placeholders: {
          name: "Your full name",
          email: "Your email address",
          subject: "Message subject",
          message: "Your message…",
        },
        success: "✅ Your email app opened with your message ready to send. Thank you!",
        error: "⚠️ Please fill in all fields before sending.",
        button: "Send message",
      },
      projectNote: `<strong>Enterprise</strong> projects are internal software solutions developed as part of a team at COSIT Benin for public institutions. Access is restricted to authorized users.`,
      footer: `© <span class="footer-year">${currentYear}</span> Winceslas ADJIHANOU · All rights reserved`,
      aboutLabels: {
        website: "Website", degree: "Degree", address: "Address", phone: "Phone", email: "Email", whatsapp: "WhatsApp",
      },
      education: {
        irgib: {
          degree: "Professional Bachelor's Degree – Computer Systems and Software",
          country: "Benin",
          description: "<p>Multidisciplinary training covering software design and development, information system architecture, databases and project management methods. Practical coursework strengthened my skills in Laravel, Symfony, PHP, JavaScript, Java, HTML5, CSS3, C++, MySQL, UML, Merise, as well as fundamentals of cybersecurity and networking.</p>",
        },
        ceg2: {
          degree: "Scientific Baccalaureate – Series D",
          city: "Benin",
          description: "<p>Obtained a scientific high school diploma, Series D.</p>",
        },
      },
      experience: {
        "cosit-dev": {
          position: "Full-Stack Developer & Internship Supervisor",
          country: "Benin",
          description: "Development of ERP modules for national institutions, deployment on Linux servers (cPanel & Grizzly), generation and documentation of Symfony REST APIs, and supervision of student interns.",
          achievements: [
            "Ministry of Health – advanced security, user action tracking and connected-device recognition.",
            "Ministry of Living Environment and Transport (MCVT) – Monitoring & Evaluation module.",
            "Ministry of Planning / PPBSE – Monitoring & Evaluation, Planning and Programming modules.",
            "FNDA – stock management module.",
            "INF (SIG) – materials accounting and employee career management module.",
            "INRAB, PAVICC, PDI-CVA, ONAB, SISE_PREMOPEF – development and integration of business modules.",
            "SIG UNSTIM – complete API documentation.",
            "Deployment of software solutions on Linux servers (cPanel and Grizzly).",
            "Internship supervision: mentoring students from Faucon school and supporting their web graduation projects.",
          ],
        },
        "cosit-pro": {
          position: "Web Developer Intern – Professional Internship",
          country: "Benin",
          description: "Professional internship focused on feature development and data entry/verification for national ERP platforms.",
          achievements: [
            "SIG INF – development of an employee career management feature.",
            "Data entry and verification on ANEPIJ and PAVICC platforms.",
          ],
        },
        "cosit-acad": {
          position: "Web Developer Intern – Academic Internship",
          country: "Benin",
          description: "First company internship with active participation in the development of several national ERP platforms.",
          achievements: [
            "Contribution to INRAB, UNSTIM, ABSSA, ONAB, FNDA, La Poste, PRESREDI, ANEPIJ and SBEE LPEDER platforms.",
            "Front-end integration, data entry and feature development on FNDA, La Poste, INRAB, ABSSA and PRESREDI.",
          ],
        },
      },
      languages: [
        { name: "French", flag: "🇫🇷", level: "Fluent (C1)" },
        { name: "English", flag: "🇬🇧", level: "Intermediate (B1)" },
        { name: "Fon", flag: "🇧🇯", level: "Native language" },
      ],
      softSkills: [
        "Team spirit", "Rigor", "Autonomy", "Curiosity",
        "Organization", "Mentoring", "Dynamism", "Adaptability",
      ],
      interests: {
        dev: { title: "Web Development", description: "Passionate about designing robust and high-performance web applications, from architecture definition to production deployment on Linux servers." },
        api: { title: "APIs & Backend Architecture", description: "Focused on clean and well-documented REST API design with Symfony, enabling interoperability between national information systems." },
        education: { title: "Knowledge Sharing & Mentorship", description: "Committed internship supervisor supporting students in graduation projects and teaching good development practices." },
        community: { title: "Digital Impact in Benin", description: "Convinced that technology can transform public institutions, I contribute to the digitalization of ministries and national organizations." },
        innovation: { title: "Innovation & Tech Watch", description: "Naturally curious, I follow modern technologies such as Docker, Laravel and cloud-oriented architectures to stay sharp." },
        ethics: { title: "Security & Code Quality", description: "Careful about application security and code quality, I apply best practices for traceability, authentication and permission management." },
      },
      projects: {
        anagem: { title: "SIG ANaGeM – National Market Management Agency", description: "Team contribution to an administrative ERP integrating procurement, stock management, accounting, planning, monitoring and evaluation, budget tracking, HR and payroll modules for the National Market Management Agency." },
        unstim: { title: "SIG UNSTIM – National University of Sciences, Technology, Engineering and Mathematics", description: "Contribution to a university ERP system and REST API design for module interoperability: procurement, materials accounting, general accounting, planning, monitoring and evaluation, budget tracking, HR and payroll." },
        abssa: { title: "SISE ABSSA – Beninese Food Safety Agency", description: "Monitoring & Evaluation and Procurement modules for ABSSA, including annual work-plan management and procurement tracking." },
        "ms-sante": { title: "MS – Ministry of Health", description: "Team development of procurement and document-archiving modules. Implementation of advanced security features, user action traceability and connected-device recognition." },
        "ms-cadrevie": { title: "SISE MCVT – Ministry of Living Environment and Transport", description: "Integrated Monitoring and Evaluation System, developed as part of a team for planning, monitoring and evaluation workflows." },
        "fnda-stock": { title: "SIG FNDA – National Fund for Agricultural Development", description: "Development of the stock management module with movement tracking, critical threshold alerts and analytical dashboards." },
        "inf-sig": { title: "SIG INF – National Institute for Women", description: "Materials accounting module and development of an employee career management feature." },
        pavicc: { title: "SIG PAVICC – City Adaptation to Climate Change Program", description: "Contribution to an ERP covering planning, monitoring and evaluation, budget tracking, accounting, HR, stock management and project management." },
        "benin-tourisme": { title: "SIG ABT – Benin Tourism Agency", description: "Team development of an ERP with procurement, materials accounting, general accounting, budget tracking, planning, monitoring and evaluation modules." },
        ppbse: { title: "SIG PPBSE – Ministry of Planning, Statistics and Regional Integration", description: "Team development of Planning, Monitoring & Evaluation and Budgeting modules within the computerized PPBSE management chain." },
        inrab: { title: "SISE INRAB – Monitoring & Evaluation Module", description: "Team development of Monitoring & Evaluation and Procurement modules for the National Institute of Agricultural Research of Benin, including front-end integration." },
        "pdi-cva": { title: "SIGPDI-CVA – Integrated Agricultural Value Chains Development Project", description: "Contribution to an ERP covering procurement, materials accounting, general accounting, planning, monitoring and evaluation, budget tracking, HR and payroll." },
        premopef: { title: "SISE_PREMOPEF – Smallholder and Women Livelihoods Support Project", description: "Integrated Monitoring and Evaluation System developed as part of a team for Monitoring & Evaluation and Procurement modules." },
        "pndf-karite": { title: "SISE_PNDF-KARITE – Shea Value Chain Data Management System", description: "Data management system for the shea value chain, supporting production improvement, product quality and value-chain governance." },
        expenseflow: { title: "ExpenseFlow – Company Financial Management Application", description: "Web application for managing company expenses and revenues, built with Laravel 12. Includes secure REST APIs with Sanctum, roles and permissions, PDF/Excel exports, secure authentication and analytical dashboards." },
        smartcourier: { title: "SmartCourier System – Administrative Mail Management System", description: "Symfony web application for administrative mail tracking. Includes users, departments, mail categories, roles, permissions, incoming/outgoing mail tracking, statistical dashboards and secure access control." },
      },
    },
  };

  const currentLang = () => localStorage.getItem("portfolioLang") || "fr";
  const langPack = () => i18n[currentLang()] || i18n.fr;
  const tr = (key) =>
    (langPack().static && langPack().static[key]) ||
    key.split(".").reduce((obj, part) => obj && obj[part], langPack()) ||
    key;
  const localized = (item, group) => {
    if (currentLang() === "fr") return item;
    return { ...item, ...(langPack()[group] && langPack()[group][item.id] ? langPack()[group][item.id] : {}) };
  };

  const renderSidebarI18n = () => {
    innerText(select(".my-degree", true), langPack().meta.degree);
    const contactEl = select(".sidebar-info_more .contacts-list");
    if (!contactEl) return;
    const dataKeys = contactEl.getAttribute("data-contact-info").split(",").map((s) => s.trim());
    const aboutItems = profileInfo.getAbout();
    contactEl.innerHTML = dataKeys.map((key) => {
      const item = aboutItems.find((i) => i.id === key);
      if (!item) return "";
      const label = langPack().aboutLabels[key] || item.name;
      return `
        <li class="contact-item">
          <div class="icon-box"><ion-icon name="${item.icon}"></ion-icon></div>
          <div class="contact-info">
            <p class="contact-title">${label}</p>
            <span class="${item.class || ""}">${item.text || ""}</span>
          </div>
        </li>`;
    }).join("");
    select(".my-website", true).forEach((el) => (el.innerHTML = `<a href="https://${profileInfo.website}" class="contact-link" target="_blank">${profileInfo.website}</a>`));
    select(".my-email", true).forEach((el) => (el.innerHTML = `<a href="mailto:${profileInfo.email}" class="contact-link" target="_blank">${profileInfo.email}</a>`));
    select(".my-phone", true).forEach((el) => (el.innerHTML = `<a href="tel:${profileInfo.phone.mobile}" class="contact-link" target="_blank">${profileInfo.phone.mobile}</a>`));
    select(".my-whatsapp", true).forEach((el) => (el.innerHTML = `<a href="https://wa.me/${profileInfo.phone.whatsapp.replace(/\s/g,'')}" class="contact-link" target="_blank">${profileInfo.phone.whatsapp}</a>`));
    select(".my-address", true).forEach((el) => (el.innerHTML = `<address>${currentLang() === "en" ? "Cotonou, Benin" : profileInfo.fulladdress()}</address>`));
  };

  const renderResumeI18n = () => {
    const educationEl = select(".timeline-list.education");
    if (educationEl) {
      educationEl.innerHTML = resumeInfo.education.map((original) => {
        const item = localized(original, "education");
        return `
          <li class="timeline-item">
            <h4 class="h4 timeline-item-title">${item.degree}</h4>
            <h5 class="h4 univ-comp">${item.institution}, ${item.city}${item.country ? ", " + item.country : ""}</h5>
            <span>${durationTo(item.duration.from, item.duration.to, item.ongoing).replace("présent", langPack().meta.present)}</span>
            <div class="timeline-text text-justify">${item.description}</div>
          </li>`;
      }).join("");
    }
    const expEl = select(".timeline-list.experience");
    if (expEl) {
      expEl.innerHTML = resumeInfo.experience.map((original) => {
        const item = localized(original, "experience");
        return `
          <li class="timeline-item">
            <h4 class="h4 timeline-item-title">${item.position}</h4>
            <h5 class="h4 univ-comp">${item.company} – ${item.city}, ${item.country}</h5>
            <span>${durationTo(item.duration.from, item.duration.to, item.ongoing).replace("présent", langPack().meta.present)}</span>
            <p class="timeline-text text-justify">${item.description}</p>
            ${item.achievements ? `<ul style="margin-top:8px;padding-left:16px;">${item.achievements.map((a) =>
              `<li style="font-size:var(--fs-7);color:var(--light-gray);margin-bottom:4px;list-style:disc;">${a}</li>`).join("")}</ul>` : ""}
          </li>`;
      }).join("");
    }
    const languages = currentLang() === "en" ? langPack().languages : resumeInfo.languages;
    const langEl = select(".languages-grid");
    if (langEl) {
      langEl.innerHTML = languages.map((lang) => `
        <div class="lang-card">
          <span class="lang-flag">${lang.flag}</span>
          <div class="lang-info"><h5>${lang.name}</h5><span>${lang.level}</span></div>
        </div>`).join("");
    }
    const softSkills = currentLang() === "en" ? langPack().softSkills : resumeInfo.softSkills;
    const softEl = select(".soft-skills-list");
    if (softEl) softEl.innerHTML = softSkills.map((s) => `<span class="soft-skill-tag">${s}</span>`).join("");
  };

  const renderAboutI18n = () => {
    const aboutText = select(".about-text");
    if (aboutText) aboutText.innerHTML = langPack().aboutHtml;
    const el = select(".service-list");
    if (!el) return;
    el.innerHTML = aboutInfo.interests.map((original) => {
      const item = localized(original, "interests");
      return `
        <li class="service-item">
          <div class="service-icon-box"><img src="${item.icon}" alt="${item.title}" width="40" /></div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">${item.title}</h4>
            <p class="service-item-text text-justify">${item.description}</p>
          </div>
        </li>`;
    }).join("");
  };

  const renderProjectsI18n = () => {
    const el = select(".project-list");
    if (!el) return;
    el.innerHTML = projects.map((original) => {
      const item = localized(original, "projects");
      const imgHtml = item.imgSrc
        ? `<img src="${item.imgSrc}" alt="${item.title}" loading="lazy" />`
        : `<div class="project-img-placeholder" title="${item.title}">${item.imgPlaceholder || "🖥️"}</div>`;
      const githubBadge = item.githubUrl
        ? `<a href="${item.githubUrl}" target="_blank" rel="noopener" title="${langPack().meta.github}">
             <img src="https://img.shields.io/badge/GitHub-Repo-FFBC5E?logo=github" alt="GitHub" style="height:20px;">
           </a>` : "";
      const imgs = item.previewImages && item.previewImages.length > 0 ? item.previewImages : (item.imgSrc ? [item.imgSrc] : []);
      const liveBtn = imgs.length > 0
        ? `<button class="project-live-link" onclick='winceOpenLightbox(${JSON.stringify(imgs)}, 0)' title="${langPack().meta.see}">
             <ion-icon name="eye-outline" style="font-size:12px;"></ion-icon> ${langPack().meta.see}
           </button>` : "";
      const tags = item.tags.map((tag) => `<span class="lang-badge">${tag}</span>`).join("");
      const typeBadge = item.type === "enterprise"
        ? `<span class="lang-badge" style="background:#1a3a5c;color:#7ec8e3;border-color:#2a5a8c;">🏢 ${langPack().meta.enterprise}</span>`
        : `<span class="lang-badge" style="background:#1a3d1a;color:#7ec87e;border-color:#2a6a2a;">👤 ${langPack().meta.personal}</span>`;
      return `
        <li class="project-item active" data-filter-item data-category="${item.type}">
          <div class="project-inner">
            <div class="project-img-wrap">${imgHtml}</div>
            <div class="project-right">
              <div class="project-content-box">
                <h4 class="h4 project-item-title">${item.title}</h4>
                <p class="project-item-text">${item.description}</p>
              </div>
              <div class="project-item-extra">
                <div class="project-item-tags">
                  <div class="languages">${typeBadge} ${tags}</div>
                  <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;">${githubBadge}${liveBtn}</div>
                </div>
              </div>
            </div>
          </div>
        </li>`;
    }).join("");
  };

  const applyLanguage = (lang) => {
    localStorage.setItem("portfolioLang", lang);
    document.documentElement.lang = lang;
    innerText(select("title"), langPack().meta.title);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.innerHTML = tr(el.dataset.i18n);
    });
    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.langSwitch === lang);
    });
    const cvBtn = select(".cv-download-btn");
    if (cvBtn) cvBtn.href = cvPaths[lang] || cvPaths.fr;
    const sectionText = langPack().sections;
    const setText = (selector, text) => { const el = select(selector); if (el) el.textContent = text; };
    setText(".about .article-title", sectionText.aboutTitle);
    setText(".service-title", sectionText.interests);
    setText(".resume .article-title", sectionText.resume);
    setText(".timeline:nth-of-type(1) .title-wrapper h3", sectionText.education);
    setText(".timeline:nth-of-type(2) .title-wrapper h3", sectionText.experience);
    const skillTitles = select(".skills-title", true);
    if (skillTitles[0]) skillTitles[0].textContent = sectionText.skills;
    if (skillTitles[1]) skillTitles[1].textContent = sectionText.languages;
    if (skillTitles[2]) skillTitles[2].textContent = sectionText.softSkills;
    setText(".portfolio .article-title", sectionText.projects);
    setText(".contact .article-title", sectionText.contact);
    setText(".contact-section-title", sectionText.quickContact);
    setText(".form-title", sectionText.formTitle);
    const projectNote = select(".projects-info-note");
    if (projectNote) projectNote.innerHTML = `<ion-icon name="information-circle-outline"></ion-icon>${langPack().projectNote}`;
    select(".footer-copy", true).forEach((el) => (el.innerHTML = langPack().footer));
    const c = langPack().contact;
    select(".cq-label", true).forEach((el, i) => { if (c.labels[i]) el.textContent = c.labels[i]; });
    const cqValues = select(".cq-value", true);
    if (cqValues[2]) cqValues[2].textContent = c.whatsapp;
    if (cqValues[3]) cqValues[3].textContent = c.location;
    setText(".contact-form-intro", c.intro);
    const nameInput = document.getElementById("cf-name");
    const emailInput = document.getElementById("cf-email");
    const subjectInput = document.getElementById("cf-subject");
    const messageInput = document.getElementById("cf-message");
    if (nameInput) nameInput.placeholder = c.placeholders.name;
    if (emailInput) emailInput.placeholder = c.placeholders.email;
    if (subjectInput) subjectInput.placeholder = c.placeholders.subject;
    if (messageInput) messageInput.placeholder = c.placeholders.message;
    setText("#cf-success", c.success);
    setText("#cf-error", c.error);
    setText("#cf-btn-text", c.button);
    renderSidebarI18n();
    renderAboutI18n();
    renderResumeI18n();
    renderProjectsI18n();
  };

  document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.langSwitch));
  });
  applyLanguage(currentLang());

});

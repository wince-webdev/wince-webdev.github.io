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
  innerText(select("title"), `${profileInfo.firstname} - Portfolio`);

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

  // ── About - Interests ─────────────────────────────────────────────────
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

  // ── Resume - Education ────────────────────────────────────────────────
  (function () {
    const el = select(".timeline-list.education");
    if (!el) return;
    el.innerHTML = resumeInfo.education.map((item) => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${item.degree}</h4>
        <h5 class="h4 univ-comp">${item.institution}${item.city ? ", " + item.city : ""}${item.country ? ", " + item.country : ""}</h5>
        <span>${durationTo(item.duration.from, item.duration.to, item.ongoing)}</span>
        <div class="timeline-text text-justify">${item.description}</div>
      </li>`).join("");
  })();

  // ── Resume - Experience ───────────────────────────────────────────────
  (function () {
    const el = select(".timeline-list.experience");
    if (!el) return;
    el.innerHTML = resumeInfo.experience.map((item) => `
      <li class="timeline-item">
        <h4 class="h4 timeline-item-title">${item.position}</h4>
        <h5 class="h4 univ-comp">${item.company} - ${item.city}, ${item.country}</h5>
        <span>${durationTo(item.duration.from, item.duration.to, item.ongoing)}</span>
        <p class="timeline-text text-justify">${item.description}</p>
        ${item.achievements ? `<ul style="margin-top:8px;padding-left:16px;">${item.achievements.map((a)=>
          `<li style="font-size:var(--fs-7);color:var(--light-gray);margin-bottom:4px;list-style:disc;">
            ${a}
          </li>`).join("")}</ul>` : ""}
      </li>`).join("");
  })();

  // ── Resume - Skills (Tech) ────────────────────────────────────────────
  (function () {
    const el = select(".skills-list");
    if (!el) return;
    const skillIcons = {
      "symfony": "https://cdn.simpleicons.org/symfony/ffffff",
      "laravel": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "php": "https://cdn.simpleicons.org/php/8892bf",
      "javascript": "https://cdn.simpleicons.org/javascript/f7df1e",
      "typescript": "https://cdn.simpleicons.org/typescript/3178c6",
      "react": "https://cdn.simpleicons.org/react/61dafb",
      "inertia": "https://cdn.simpleicons.org/inertia/929292",
      "html-css": "https://cdn.simpleicons.org/html5/e34f26",
      "bootstrap": "https://cdn.simpleicons.org/bootstrap/7952b3",
      "postgresql": "https://cdn.simpleicons.org/postgresql/4169e1",
      "mysql": "https://cdn.simpleicons.org/mysql/4479a1",
      "api-rest": "https://cdn.simpleicons.org/openapiinitiative/6ba539",
      "sanctum": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "spatie": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "git": "https://cdn.simpleicons.org/git/f05032",
      "postman": "https://cdn.simpleicons.org/postman/ff6c37",
      "docker": "https://cdn.simpleicons.org/docker/2496ed",
      "linux": "https://cdn.simpleicons.org/linux/fcc624",
      "python": "https://cdn.simpleicons.org/python/3776ab",
      "java": "https://cdn.simpleicons.org/openjdk/ffffff",
      "tailwind": "https://cdn.simpleicons.org/tailwindcss/06b6d4",
      "twig": "https://cdn.simpleicons.org/twig/8bc34a",
      "doctrine": "https://cdn.simpleicons.org/doctrine/fc6a31",
      "alpine": "https://cdn.simpleicons.org/alpinedotjs/8bc0d0",
      "vite": "https://cdn.simpleicons.org/vite/646cff",
      "uml": "https://cdn.simpleicons.org/uml/ffffff",
      "mvc": "https://cdn.simpleicons.org/laravel/ff6b4a",
      "genai": "https://cdn.simpleicons.org/googlegemini/8e75b2",
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

  // ── Resume - Languages ────────────────────────────────────────────────
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

  // ── Resume - Soft Skills ──────────────────────────────────────────────
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
        ? `<img src="${item.imgSrc}" alt="Capture - ${item.title}" loading="lazy" />`
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
        title: `${profileInfo.firstname} - Portfolio`,
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
        <p>Bonjour ! Je suis <strong>Noukpo Winceslas ADJIHANOU</strong>, développeur Full Stack PHP spécialisé en Symfony et Laravel, basé à Abomey-Calavi, Cotonou (Bénin). Fort de plus de 3 ans d'expérience professionnelle, je conçois, développe et maintiens des applications web et ERP métiers robustes pour des institutions publiques et privées.</p>
        <p>Titulaire d'une Licence Professionnelle en Systèmes Informatiques et Logiciels (IRGIB Africa University), je me suis spécialisé dans l'écosystème <strong>Symfony / Laravel / PHP</strong>. Chez <strong>COSIT Bénin</strong>, je contribue activement à la digitalisation de plusieurs ministères et organismes nationaux via des modules ERP variés : suivi-évaluation, passation des marchés, ressources humaines, comptabilité générale et gestion de stock - avec des API REST sécurisées et un déploiement Linux.</p>
        <p>En parallèle, je développe des projets personnels concrets en <strong>Laravel 12</strong>, notamment <strong>Locatia</strong> : plateforme multi-tenant de gestion locative (React 19, PostgreSQL, reçus PDF vérifiables par QR, signature électronique) destinée aux propriétaires de la diaspora et aux agences immobilières, et <strong>ExpenseFlow</strong> : application de gestion financière avec API REST Sanctum et permissions Spatie.</p>
        <p>Au-delà du code, je suis <strong>maître de stage et mentor</strong> pour les étudiants des écoles Faucon et INSPEI que j'accompagne dans leurs projets de soutenance et de stage académique. Disponible <strong>full-remote à l'international (GMT+1)</strong>, ouvert aux missions freelance et aux opportunités de relocalisation.</p>
        <p>Je maîtrise le déploiement sur serveurs Linux (SSH, cPanel), la conception d'API REST sécurisées, et continue d'élargir mes compétences (Docker, IA générative, Google Cloud) pour rester un développeur moderne et efficace.</p>`,
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
        title: `${profileInfo.firstname} - Portfolio`,
        degree: "Full Stack PHP Developer",
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
        <p>Hello! I am <strong>Noukpo Winceslas ADJIHANOU</strong>, a PHP Full-Stack Developer specialized in Symfony and Laravel, based in Abomey-Calavi, Cotonou, Benin. With more than 3 years of professional experience, I design, develop and maintain robust web applications and business ERPs for public and private institutions.</p>
        <p>Holding a Professional Bachelor's Degree in Computer Systems and Software (IRGIB Africa University), I specialize in the <strong>Symfony / Laravel / PHP</strong> ecosystem. At <strong>COSIT Benin</strong>, I actively contribute to the digital transformation of ministries and national organizations through ERP modules: monitoring and evaluation, procurement, HR/payroll, general accounting and stock management - with secure REST APIs and Linux deployment.</p>
        <p>Alongside my professional work, I build concrete <strong>Laravel 12</strong> personal projects, notably <strong>Locatia</strong>, a multi-tenant rental management platform (React 19, PostgreSQL, QR-verified PDF receipts, e-signatures) for owners in the diaspora and real estate agencies, and <strong>ExpenseFlow</strong>, a financial management app with Sanctum REST APIs and Spatie roles and permissions.</p>
        <p>Beyond coding, I serve as an <strong>internship supervisor and mentor</strong> for students from Faucon and INSPEI schools, guiding them through academic internships and graduation projects. Available <strong>full-remote internationally (GMT+1)</strong>, open to freelance missions and relocation opportunities.</p>
        <p>I am comfortable with Linux deployment (SSH, cPanel), secure REST API design, and I keep expanding my skills (Docker, Generative AI, Google Cloud) to stay a modern and efficient developer.</p>`,
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
        gcloud: {
          degree: "Google Cloud Skills Certification - Introduction to Generative AI",
          description: "<p>Fundamentals of generative AI, large language models (LLMs) and Google tools for building AI applications.</p>",
        },
        irgib: {
          degree: "Professional Bachelor's Degree - Computer Systems and Software",
          country: "Benin",
          description: "<p>Multidisciplinary training covering software design and development, information system architecture, databases and project management methods. Practical coursework strengthened my skills in Laravel, Symfony, PHP, JavaScript, Java, HTML5, CSS3, C++, MySQL, UML, Merise, as well as fundamentals of cybersecurity and networking.</p>",
        },
        "symfony-formation": {
          degree: "Backend PHP/Symfony Training",
          description: "<p>Web development with PHP / Symfony, SQL queries and backend architecture, development best practices.</p>",
        },
        ceg2: {
          degree: "Scientific Baccalaureate - Series D",
          city: "Benin",
          description: "<p>Obtained a scientific high school diploma, Series D.</p>",
        },
      },
      experience: {
        "cosit-dev": {
          position: "Full-Stack Developer",
          country: "Benin",
          description: "Design, optimization and maintenance of web applications and business ERPs in PHP/Symfony for public and private institutions.",
          achievements: [
            "Business ERP development: General accounting, HR/Payroll, Budget tracking, Stock management (PHP/Symfony).",
            "Institutional deployment: integration and delivery of critical solutions and Monitoring & Evaluation systems for major state and ministerial structures (Ministry of Health, Ministry of Planning - Congo, ABSSA, ABT, ANaGeM, INF, UNSTIM, FNDA, INRAB, MCVT, PAVICC).",
            "Architecture & APIs: design, securing and generation of robust REST APIs with Symfony.",
            "DevOps & Infrastructure: application deployment and maintenance on remote Linux servers (SSH, cPanel).",
            "User training & support: training users, supporting them until full adoption, fixing issues and writing per-module user guides.",
            "Technical mentoring: supervision of final-year projects and internships for 2nd and 3rd year students (INSPEI, FAUCON).",
          ],
        },
        "cosit-pro": {
          position: "Full-Stack Developer Intern - Professional Internship",
          country: "Benin",
          description: "Professional internship focused on feature development and data entry/processing on national ERP platforms.",
          achievements: [
            "Development of an employee career management module for the National Institute for Women (INF) SIG, an existing Symfony project.",
            "Data entry and processing on the ANEPIJ and PAVICC platforms.",
          ],
        },
        "cosit-acad": {
          position: "Web Developer Intern - Academic Internship",
          country: "Benin",
          description: "First company internship with active participation in the development and maintenance of internal web applications.",
          achievements: [
            "Contribution to the development and maintenance of several internal web applications.",
          ],
        },
      },
      languages: [
        { name: "French", flag: "🇫🇷", level: "Advanced" },
        { name: "English", flag: "🇬🇧", level: "Intermediate (B1)" },
        { name: "Fon", flag: "🇧🇯", level: "Native language" },
      ],
      softSkills: [
        "Leadership", "Team management", "Availability", "Rigor",
        "Attention to detail", "Sense of responsibility", "Autonomy",
        "Team spirit", "International & multicultural environment",
        "Professional ethics", "Adaptability",
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
        anagem: { title: "SIG ANaGeM - National Market Management Agency", description: "Team contribution to an administrative ERP integrating procurement, stock management, accounting, planning, monitoring and evaluation, budget tracking, HR and payroll modules for the National Market Management Agency." },
        unstim: { title: "SIG UNSTIM - National University of Sciences, Technology, Engineering and Mathematics", description: "Contribution to a university ERP system and REST API design for module interoperability: procurement, materials accounting, general accounting, planning, monitoring and evaluation, budget tracking, HR and payroll." },
        abssa: { title: "SISE ABSSA - Beninese Food Safety Agency", description: "Monitoring & Evaluation and Procurement modules for ABSSA, including annual work-plan management and procurement tracking." },
        "ms-sante": { title: "MS - Ministry of Health", description: "Team development of procurement and document-archiving modules. Implementation of advanced security features, user action traceability and connected-device recognition." },
        "ms-cadrevie": { title: "SISE MCVT - Ministry of Living Environment and Transport", description: "Integrated Monitoring and Evaluation System, developed as part of a team for planning, monitoring and evaluation workflows." },
        "fnda-stock": { title: "SIG FNDA - National Fund for Agricultural Development", description: "Development of the stock management module with movement tracking, critical threshold alerts and analytical dashboards." },
        "inf-sig": { title: "SIG INF - National Institute for Women", description: "Materials accounting module and development of an employee career management feature." },
        pavicc: { title: "SIG PAVICC - City Adaptation to Climate Change Program", description: "Contribution to an ERP covering planning, monitoring and evaluation, budget tracking, accounting, HR, stock management and project management." },
        "benin-tourisme": { title: "SIG ABT - Benin Tourism Agency", description: "Team development of an ERP with procurement, materials accounting, general accounting, budget tracking, planning, monitoring and evaluation modules." },
        ppbse: { title: "SIG PPBSE - Ministry of Planning, Statistics and Regional Integration", description: "Team development of Planning, Monitoring & Evaluation and Budgeting modules within the computerized PPBSE management chain (Republic of Congo)." },
        inrab: { title: "SISE INRAB - Monitoring & Evaluation Module", description: "Team development of Monitoring & Evaluation and Procurement modules for the National Institute of Agricultural Research of Benin, including front-end integration." },
        "pdi-cva": { title: "SIGPDI-CVA - Integrated Agricultural Value Chains Development Project", description: "Contribution to an ERP covering procurement, materials accounting, general accounting, planning, monitoring and evaluation, budget tracking, HR and payroll." },
        premopef: { title: "SISE_PREMOPEF - Smallholder and Women Livelihoods Support Project", description: "Integrated Monitoring and Evaluation System developed as part of a team for Monitoring & Evaluation and Procurement modules." },
        "pndf-karite": { title: "SISE_PNDF-KARITE - Shea Value Chain Data Management System", description: "Data management system for the shea value chain, supporting production improvement, product quality and value-chain governance." },
        locatia: { title: "Locatia - Rental Management Platform (Benin & Diaspora)", description: "Multi-tenant rental management web app (properties, tenants, leases, rent, payments) for owners - including those in the diaspora - and real estate agencies. Laravel Fortify authentication, strict multi-tenant isolation per organization, Spatie roles and permissions (6 roles, 45 permissions) and audit log. Automatic PDF receipts and contracts (DomPDF) with verification QR codes, amounts in words and electronic signature (SHA-256). 5-step lease assistant with automatic schedules, 3-click payments with automatic allocation to the oldest outstanding balance, WhatsApp reminders, KPI dashboard with charts (Recharts), CSV/PDF reports, tenant portal and global Ctrl+K search. Quality: 100 automated tests (Pest), Laravel Pint, ESLint/Prettier." },
        expenseflow: { title: "ExpenseFlow - Company Financial Management Application", description: "Web application for managing company expenses and revenues, built with Laravel 12. Secure authentication with Laravel Breeze and Sanctum, full CRUD for expenses, revenues, categories and users, token-secured REST APIs, Spatie roles and permissions, PostgreSQL database, DomPDF exports and API testing with Postman." },
        smartcourier: { title: "SmartCourier System - Administrative Mail Management System", description: "Web system for centralizing and tracking incoming/outgoing mail, designed to optimize administrative workflows in public institutions. Secure authentication, strict access control and fine-grained role management (EasyAdmin / Doctrine ORM), analytical dashboard with real-time charts (Chart.js and AJAX)." },
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
            <h5 class="h4 univ-comp">${item.institution}${item.city ? ", " + item.city : ""}${item.country ? ", " + item.country : ""}</h5>
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
            <h5 class="h4 univ-comp">${item.company} - ${item.city}, ${item.country}</h5>
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

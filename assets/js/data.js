"use strict";

const currentYear = new Date().getFullYear();

// ── Helpers ──────────────────────────────────────────────────────────────
const getSocialLink = (username, social) => {
  if (social === "github")   return "https://github.com/" + username;
  if (social === "linkedin") return "https://www.linkedin.com/in/" + username;
  if (social === "twitter")  return "https://twitter.com/" + username;
  throw new Error("Unknown social: " + social);
};

const getRepo = (repoName, username = "wince-webdev") =>
  getSocialLink(username, "github") + "/" + repoName;

// ── Profile ──────────────────────────────────────────────────────────────
const profileInfo = {
  surname:   "ADJIHANOU",
  firstname: "Noukpo Winceslas",
  fullname() { return `${this.firstname} ${this.surname}`; },

  email:   "adjihanounkpwinceslas@gmail.com",
  major:   "Développeur FullStack",
  title:   { short: "Dev.", long: "Développeur FullStack" },
  degree:  "FullStack",
  fulldegree() { return `${this.degree} ${this.title.long}`; },

  imgSrc:  "assets/images/profil_wince.jpg",

  social: [
    { id: "linkedin", name: "LinkedIn", icon: "logo-linkedin",
      url: getSocialLink("winceslas-adjihanou-5a1159273", "linkedin") },
    { id: "github",   name: "GitHub",   icon: "logo-github",
      url: getSocialLink("wince-webdev", "github") },
  ],

  phone: {
    mobile:   "+229 01 96 11 22 47",
    whatsapp: "+229 01 96 11 22 47",
  },

  address: {
    country: "Bénin",
    city:    "Cotonou",
    district:"Abomey Calavi",
  },
  fulladdress(detailled = false) {
    const { address } = this;
    return detailled
      ? `${address.district}, ${address.city}, ${address.country}`
      : `${address.city}, ${address.country}`;
  },

  website: "wince-webdev.github.io",

  getAbout() {
    return [
      { id: "website",  name: "Website",  class: "my-website",  icon: "globe-outline" },
      { id: "degree",   name: "Degree",   text: "Licence Pro.", icon: "school-outline" },
      { id: "address",  name: "Address",  class: "my-address",  icon: "location-outline" },
      { id: "phone",    name: "Phone",    class: "my-phone",    icon: "phone-portrait-outline" },
      { id: "email",    name: "Email",    class: "my-email",    icon: "mail-outline" },
      { id: "whatsapp", name: "WhatsApp", class: "my-whatsapp", icon: "logo-whatsapp" },
    ];
  },
};

// ── Resume ───────────────────────────────────────────────────────────────
const resumeInfo = {

  education: [
    {
      id: "irgib",
      institution: "IRGIB Africa University",
      shortname:   "IRGIB",
      city: "Cotonou", country: "Bénin",
      degree: "Licence Professionnelle d'État – Systèmes Informatiques et Logiciels",
      grade:  null,
      duration: { from: 2020, to: 2023 },
      ongoing: false,
      description:
        "<p>Formation pluridisciplinaire couvrant la conception et le développement de logiciels, l'architecture des systèmes d'information, les bases de données et les méthodes de gestion de projet. Les enseignements pratiques ont permis de maîtriser Laravel, Symfony, PHP, JavaScript, Java, HTML5, CSS3, C++, MySQL, UML et Merise, ainsi que des notions en sécurité informatique et en réseaux.</p>",
    },
    {
      id: "ceg2",
      institution: "CEG Sekandji",
      shortname:   "CEG Sekandji",
      city: "Bénin", country: "",
      degree: "Baccalauréat série D (Sciences)",
      grade:  null,
      duration: { from: 2019, to: 2020 },
      ongoing: false,
      description: "<p>Obtention du baccalauréat scientifique série D.</p>",
    },
  ],

  experience: [
    {
      id: "cosit-dev",
      company:  "COSIT Bénin",
      position: "Développeur FullStack & Maître de Stage",
      duration: { from: 2023, to: currentYear },
      ongoing:  true,
      city: "Cotonou", country: "Bénin",
      description:
        "Développement de modules ERP pour plusieurs structures nationales, déploiement sur serveurs Linux (cPanel & Grizzly), génération et documentation d'API REST Symfony, et encadrement des étudiants stagiaires.",
      achievements: [
        "Ministère de la Santé – Sécurité avancée, traçage des actions par utilisateur avec reconnaissance des appareils connectés.",
        "Ministère du Cadre de Vie et des Transports (MCVT) – Module Suivi & Évaluation.",
        "Ministère du Plan / PPBSE – Modules Suivi & Évaluation, Planification, Programmation.",
        "FNDA – Module de gestion de stock.",
        "INF (SIG) – Comptabilité Matières (gestion de stock) + module gestion de carrière des employés.",
        "INRAB, PAVICC, PDI-CVA, ONAB, SISE_PREMOPEF – Développement et intégration de modules métier variés.",
        "SIG UNSTIM – Documentation complète des API.",
        "Déploiement des logiciels sur serveurs Linux (cPanel et Grizzly).",
        "Maître de stage : encadrement des étudiants de l'école Faucon et accompagnement de leurs projets web de soutenance.",
      ],
    },
    {
      id: "cosit-pro",
      company:  "COSIT Bénin",
      position: "Stagiaire – Développeur Web (Stage Professionnel)",
      duration: { from: 2023, to: 2023 },
      ongoing:  false,
      city: "Cotonou", country: "Bénin",
      description:
        "Stage professionnel axé sur le développement de fonctionnalités spécifiques et l'insertion de données sur des plateformes ERP nationales.",
      achievements: [
        "SIG INF – Développement de la fonctionnalité de gestion de carrière des employés.",
        "Insertion et vérification des données sur les plateformes ANEPIJ et PAVICC.",
      ],
    },
    {
      id: "cosit-acad",
      company:  "COSIT Bénin",
      position: "Stagiaire – Développeur Web (Stage Académique)",
      duration: { from: "09/2022", to: "12/2023" },
      ongoing:  false,
      city: "Cotonou", country: "Bénin",
      description:
        "Premier stage en entreprise : participation active au développement de plusieurs plateformes ERP nationales.",
      achievements: [
        "Contribution aux plateformes : INRAB, UNSTIM, ABSSA, ONAB, FNDA, La Poste, PRESREDI, ANEPIJ, SBEE LPEDER.",
        "Travaux d'intégration front-end, insertion de données et développement de fonctionnalités sur FNDA, La Poste, INRAB, ABSSA et PRESREDI.",
      ],
    },
  ],

  // skills: [
  //   { id: "symfony",    name: "Symfony Framework", level: 85 },
  //   { id: "laravel",    name: "Laravel (Level)", level: 70 },
  //   { id: "laravel", name: "Laravel Framework", level: 70 },
  //   { id: "php",        name: "PHP",            level: 82 },
  //   { id: "javascript", name: "JavaScript",     level: 75 },
  //   { id: "html-css",   name: "HTML / CSS",     level: 90 },
  //   { id: "bootstrap",  name: "Bootstrap",      level: 85 },
  //   { id: "mysql",      name: "MySQL / SQL",    level: 78 },
  //   { id: "api-rest",   name: "API REST",       level: 80 },
  //   { id: "git",        name: "Git / GitHub",   level: 72 },
  //   { id: "docker",     name: "Docker (bases)", level: 40 },
  //   { id: "linux",      name: "Linux / cPanel / Grizzly", level: 65 },
  //   { id: "python",     name: "Python",         level: 40 },
  // ],

  skills: [
  { id: "symfony",        name: "Symfony Framework", level: 85 },
  { id: "laravel",        name: "Laravel Framework", level: 70 },
  { id: "php",            name: "PHP", level: 82 },
  { id: "javascript",     name: "JavaScript", level: 75 },
  { id: "html-css",       name: "HTML / CSS", level: 90 },
  { id: "bootstrap",      name: "Bootstrap", level: 85 },

  { id: "postgresql",     name: "PostgreSQL", level: 72 },
  { id: "mysql",          name: "MySQL / SQL", level: 78 },

  { id: "api-rest",       name: "API REST", level: 80 },
  { id: "sanctum",        name: "Laravel Sanctum", level: 70 },
  { id: "breeze",         name: "Laravel Breeze", level: 68 },
  { id: "spatie",         name: "Spatie Permission", level: 65 },

  { id: "git",            name: "Git / GitHub", level: 72 },
  { id: "postman",        name: "Postman API Testing", level: 70 },

  { id: "docker",         name: "Docker (bases)", level: 40 },
  { id: "linux",          name: "Linux / cPanel / Grizzly", level: 65 },
  { id: "python",         name: "Python", level: 40 },

  { id: "tailwind", name: "Tailwind CSS", level: 72 },
  { id: "twig", name: "Twig", level: 75 },
  { id: "doctrine", name: "Doctrine ORM", level: 78 },
],

  languages: [
    { name: "Français",  flag: "🇫🇷", level: "Courant (C1)" },
    { name: "Anglais",   flag: "🇬🇧", level: "Intermédiaire (B1)" },
    { name: "Fon",       flag: "🇧🇯", level: "Langue maternelle" },
    //{ name: "Yoruba",    flag: "🇧🇯", level: "Notions" },
  ],

  softSkills: [
    "Esprit d'équipe", "Rigueur", "Autonomie", "Curiosité",
    "Organisation", "Pédagogie (Mentorat)", "Dynamisme", "Adaptabilité",
  ],
};

// ── Projects ─────────────────────────────────────────────────────────────
const projects = [
  // ── Entreprise ─────────────────────────────────────────────
    {
    id: "anagem",
    title: "SIG ANaGeM – Agence Nationale de Gestion des Marchés",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/anagemlogin.png",
    previewImages: ["assets/images/anagemlogin.png", "assets/images/anagem accueil.png"],
    tags: ["Symfony", "PHP","JavaScript", "ERP", "MySQL"],
    description:
      "Participation au développement d’un ERP de gestion administrative intégrant les modules suivants: passation des marchés, gestion des stocks, la comptabilité, planification suivi & évaluation, suivi budgétaire, rh et paie pour l’Agence Nationale de Gestion des Marchés.",
  },
   {
    id: "unstim",
    title: "SIG UNSTIM – Université Nationale des Sciences, Technologies, Ingénierie et Mathématiques (UNSTIM)",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/unstim cast login.png",
    previewImages: ["assets/images/unstim cast login.png", "assets/images/unstim accueil.png"],
    tags: ["Symfony", "PHP","JavaScript", "ERP", "MySQL"],
    description:
      "Contribution au développement d’un système ERP universitaire et conception d’API REST pour l’interconnexion des modules suivants: passation des marchés, comptabilité matières(gestion de stock), comptabilité générale, planification suivi & évaluation, suivi budgétaire, rh et paie.",
  },
  {
    id: "abssa",
    title: "SISE ABSSA – Agence Béninoise de Sécurité Sanitaire des Aliments",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/abssa.png",
    previewImages: ["assets/images/abssa.png", "assets/images/abssa accueilpng.png"],
    tags: ["Symfony", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    description:  
      "Modules Suivi & Évaluation et Passation des marchés pour l'Agence Béninoise de Sécurité Sanitaire des Aliments (ABSSA). Gestion du plan de travail annuel, suivi des marchés.",
  },
  {
    id: "ms-sante",
    title: "MS – Ministère de la Santé",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/ms.png",
    previewImages: ["assets/images/ms.png"],
    tags: ["Symfony", "PHP", "MySQL", "JavaScript", "Security"],
    description:
      "Développement en équipe des modules de passation de marchés et d’archivage des documents. Implémentation de fonctionnalités avancées de sécurité, traçabilité des actions utilisateurs et reconnaissance des appareils connectés.",
  },
  {
    id: "ms-cadrevie",
    title: "SISE MCVT – Ministère du Cadre de Vie et des Transports",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/mcvt.png",
    previewImages: ["assets/images/mcvt.png"],
    tags: ["Symfony", "PHP", "JavaScript", "MySQL", "Security"],
    description:
      "Système Intégré de Suivi-Évaluation (développement en équipe du module Planification Suivi & Évaluation).",

  },
  {
    id: "fnda-stock",
    title: "SIG FNDA - Fonds National de Développement Agricole",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/fnda.png",
    previewImages: ["assets/images/fnda.png", "assets/images/fndaaccueil.png"],
    tags: ["Symfony", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    description:
      "Développement du module de gestion de stock avec suivi des mouvements, alertes de seuil critique et tableaux de bord analytiques.",
  },
  {
    id: "inf-sig",
    title: "SIG INF – Institut National de la Femme",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/inflogin.png",
    previewImages: ["assets/images/inflogin.png", "assets/images/infaccueil.png"],
    tags: ["Symfony", "PHP","JavaScript", "MySQL", "GRH"],
    description:
      "Module de comptabilité matières (gestion de stock) et développement d'une fonctionnalité de gestion de carrière des employés.",
  },
   {
    id: "pavicc",
    title: "SIG PAVICC – Programme d'Adaptation des Villes au Changement Climatique(PAVICC)",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/pavicc login.png",
    previewImages: ["assets/images/pavicc login.png", "assets/images/PAVICC1.png"],
    tags: ["Symfony", "PHP","JavaScript", "ERP", "MySQL"],
    description:
      "Contribution à la mise en place d’un système ERP composé des modules de gestion suivant: planification suivi & Évaluation, suivi budgétaire. Il s'agit du logiciel interne PAVICC regroupant les modules suivants : comptabilité, suivi budgétaire, personnel, gestion des stocks, gestion de projet, suivi et évaluation de l'activité annuelle et du marché.",
  },
  {
    id: "benin-tourisme",
    title: "SIG ABT – Agence Bénin Tourisme",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/abt.png",
    previewImages: ["assets/images/abt.png"],
    tags: ["Symfony", "PHP","JavaScript", "ERP", "MySQL"],
    description:
      "Développement en équipe d'ERP composé des modules de gestion suivant: passation des marchés, comptabilité matières(gestion de stock), comptabilité générale, suivi budgétaire, planification suivi & Évaluation.",
  },
  {
    id: "ppbse",
    title: "SIG PPBSE – Ministère du Plan, de la Statistique et de l'Intégration Régionale (MPSIR)",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/PPBSE_MPSIR LOGIN.png",
    previewImages: ["assets/images/PPBSE_MPSIR LOGIN.png", "assets/images/PPBSE_MPSIR accueil.png"],
    tags: ["Symfony", "PHP","JavaScript", "API REST", "MySQL"],
    description:
      " Développement en équipe des modules Planification Suivi & Évaluation et Budgétisation dans le cadre du Système Informatisé de Gestion de la Chaîne PPBSE.",
  },
  {
    id: "inrab",
    title: "SISE INRAB – Module Suivi & Évaluation",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/inrabolgin.png",
    previewImages: ["assets/images/inrabolgin.png", "assets/images/inrab accueil.png"],
    tags: ["Symfony", "PHP", "Bootstrap", "JavaScript", "MySQL"],
    description:
      "Développement en équipe des modules Suivi & Évaluation et Passation des marchés pour l'Institut National des Recherches Agricoles du Bénin (INRAB). Intégration du front-end du projet.",
  },
  {
    id: "pdi-cva",
    title: "SIGPDI-CVA – Projet de Développement Intégré des Chaînes de Valeurs Agricoles au Bénin (PDI-CVA)",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/PDICVA.png",
    previewImages: ["assets/images/PDICVA.png"],
    tags: ["Symfony", "PHP","JavaScript", "Bootstrap", "MySQL"],
    description:
      "Participation au développement d’un ERP composé des modules de gestion suivant: passation des marchés, comptabilité matières(gestion de stock), comptabilité générale, planification suivi & évaluation, suivi budgétaire, rh et paie.",
  },

  {
    id: "premopef",
    title: "SISE_PREMOPEF – Projet de Renforcement des Moyens de subsistance des Petits Exploitants et des Femmes (PREMOPEF)",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/premopef login.png",
    previewImages: ["assets/images/premopef login.png", "assets/images/premopef accueil.png"],
    tags: ["Symfony", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    description:
      "Système Intégré de Suivi-Évaluation (développement en équipe des modules Suivi & Évaluation et Passation des marchés).",

  },
  

  {
    id: "pndf-karite",
    title: "SISE_PNDF-KARITE – Système de Gestion des données de la filière karité",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/pndf_karite.png",
    previewImages: ["assets/images/pndf_karite.png", "assets/images/pndf karité dashboard.png"],
    tags: ["Symfony", "PHP", "MySQL", "JavaScript", "Bootstrap", "Tailwind CSS"],
    description:
      "Système de gestion des données de la filière karité visant à améliorer la production, la qualité des produits dérivés et la gouvernance de la chaîne de valeur.",

  },
  // ── Personnels ─────────────────────────────────────────────
  {
    id: "expenseflow",
    title: "ExpenseFlow – Application de Gestion Financière au sein d’une entreprise",
    category: "Personnel",
    type: "personal",
    imgSrc: "assets/images/expenseflow_login.png",
    previewImages: [
      "assets/images/expenseflow_login.png",
      "assets/images/expenseflow_dashboard.png",
      "assets/images/expenseflow_depenses.png",
      "assets/images/expenseflow_revenues.png",
      "assets/images/expenseflow_categories.png",
      "assets/images/expenseflow_users.png",
    ],
    githubUrl: getRepo("ExpenseFlow"),
    tags: [
      "Laravel 12",
      "PHP",
      "PostgreSQL",
      "API REST",
      "Sanctum",
      "Tailwind CSS",
      "JavaScript"
    ],
    description:
      "Application web de gestion des dépenses et revenus au sein d’une entreprise développée avec Laravel 12. Intégration d’API REST sécurisées avec Sanctum, gestion des rôles et permissions, export PDF et Excel, authentification sécurisée et tableau de bord analytique.",
  },

  {
    id: "smartcourier",
    title: "SmartCourier System – Système de Gestion Administrative du Courrier",
    category: "Personnel",
    type: "personal",
    imgSrc: "assets/images/courier_login.png",
    previewImages: [
      "assets/images/courier_login.png",
      "assets/images/courier_dashboard.png",
      "assets/images/courier_categorie.png",
      "assets/images/courier.png",
      "assets/images/courier_service.png",
      "assets/images/courier_users.png",
    ],
    githubUrl: getRepo("SmartCourier-System"),
    tags: [
      "Symfony",
      "PHP",
      "MySQL",
      "Twig",
      "Bootstrap",
      "Doctrine ORM",
      "JavaScript"
    ],
    description:
      "Application web de gestion et suivi du courrier administratif développée avec Symfony. Gestion des utilisateurs, services, catégories de courriers, rôles et permissions, suivi des courriers entrants/sortants, tableau de bord statistique et sécurisation des accès.",
  },

  // {
  //   id: "portfolio",
  //   title: "Portfolio Personnel",
  //   category: "Personnel",
  //   type: "personal",
  //   imgSrc: "assets/images/sig_demo_express_soft.png",
  //   previewImages: ["assets/images/sig_demo_express_soft.png"],
  //   githubUrl: getRepo("wince-webdev.github.io"),
  //   tags: ["HTML", "CSS", "JavaScript"],
  //   description:
  //     "Site portfolio responsive présentant mes projets, compétences, expériences et coordonnées. Déployé sur GitHub Pages, optimisé mobile-first.",
  // },
  // {
  //   id: "gestion-ecole",
  //   title: "Plateforme de Gestion Scolaire (en développement)",
  //   category: "Personnel",
  //   type: "personal",
  //   imgPlaceholder: "🎓",
  //   previewImages: [],
  //   githubUrl: getRepo("gestion-ecole"),
  //   tags: ["Symfony", "MySQL", "Bootstrap", "Chart.js"],
  //   description:
  //     "Application web complète de gestion d'école : inscriptions, notes, emplois du temps, bulletins automatiques, gestion des rôles (admin, enseignant, étudiant). Projet en cours de développement.",
  // },
];

// ── Interests (About page) ────────────────────────────────────────────────
const aboutInfo = {
  interests: [
    {
      id: "dev",
      title: "Développement Web",
      icon: "./assets/icons/dev.svg",
      description:
        "Passionné par la conception d'applications web robustes et performantes, de la définition de l'architecture à la mise en production sur des serveurs Linux.",
    },
    {
      id: "api",
      title: "API & Architecture Backend",
      icon: "./assets/icons/app.svg",
      description:
        "Fasciné par la conception d'API REST propres et documentées avec Symfony, permettant l'interopérabilité entre systèmes d'information nationaux.",
    },
    {
      id: "education",
      title: "Transmission & Mentorat",
      icon: "./assets/icons/education1.svg",
      description:
        "Maître de stage engagé, j'accompagne les étudiants dans leurs projets de soutenance et leur transmission des bonnes pratiques du développement.",
    },
    {
      id: "community",
      title: "Impact Numérique au Bénin",
      icon: "./assets/icons/community.svg",
      description:
        "Convaincu que la technologie peut transformer les institutions publiques, je contribue à la digitalisation de ministères et d'organismes nationaux.",
    },
    {
      id: "innovation",
      title: "Innovation & Veille Technologique",
      icon: "./assets/icons/design.svg",
      description:
        "Curieux de nature, je m'intéresse aux nouvelles technologies (Docker, Laravel, architectures cloud) pour rester à la pointe des outils du développeur moderne.",
    },
    {
      id: "ethics",
      title: "Sécurité & Qualité du Code",
      icon: "./assets/icons/ethics1.svg",
      description:
        "Soucieux de la sécurité des applications et de la qualité du code, j'applique les bonnes pratiques de traçabilité, d'authentification et de gestion des droits.",
    },
  ],
};

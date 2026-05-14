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
  title:   { short: "Dev.", long: "Developer" },
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
    mobile:   "+229 01 98 13 41 99",
    whatsapp: "+229 01 98 13 41 99",
  },

  address: {
    country: "Bénin",
    city:    "Cotonou",
    district:"PK11",
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
        "<p>Formation pluridisciplinaire couvrant la conception et le développement de logiciels, l'architecture des systèmes d'information, les bases de données et les méthodes de gestion de projet. Les enseignements pratiques ont permis de maîtriser Symfony, PHP, MySQL, UML et Merise, ainsi que des notions en sécurité informatique et en réseaux.</p>",
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
      description: "<p>Obtention du baccalauréat scientifique série D avec mention.</p>",
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
      duration: { from: 2022, to: 2023 },
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

  skills: [
    { id: "symfony",    name: "Symfony",        level: 85 },
    { id: "php",        name: "PHP",            level: 82 },
    { id: "javascript", name: "JavaScript",     level: 75 },
    { id: "html-css",   name: "HTML / CSS",     level: 90 },
    { id: "bootstrap",  name: "Bootstrap",      level: 85 },
    { id: "mysql",      name: "MySQL / SQL",    level: 78 },
    { id: "api-rest",   name: "API REST",       level: 80 },
    { id: "git",        name: "Git / GitHub",   level: 72 },
    { id: "docker",     name: "Docker (bases)", level: 50 },
    { id: "laravel",    name: "Laravel (bases)",level: 45 },
    { id: "linux",      name: "Linux / cPanel / Grizzly", level: 65 },
    { id: "python",     name: "Python",         level: 40 },
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
    id: "ms-sante",
    title: "Plateforme Passation de Marchés – Ministère de la Santé",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/MCVT1.png",
    liveUrl: "https://ppbse.cadredevie.gouv.bj/login", // logiciel interne, pas d'accès public
    loginCapture: null,
    tags: ["Symfony", "PHP", "MySQL", "Security"],
    description:
      "Module de passation de marchés pour le Ministère de la Santé du Bénin. Travail sur la sécurité avancée, le traçage de l'historique de toutes les actions effectuées par chaque utilisateur avec reconnaissance des appareils spécifiques sur lesquels les utilisateurs se connectent.",
  },
  {
    id: "fnda-stock",
    title: "Gestion de Stock – FNDA (Fonds National de Développement Agricole)",
    category: "Entreprise",
    type: "enterprise",
    imgSrc: "assets/images/premopef login.png",
    liveUrl: "https://fnda.bj",
    loginCapture: null,
    tags: ["Symfony", "PHP", "MySQL", "ERP"],
    description:
      "Développement complet du module de gestion de stock pour le FNDA. Suivi des entrées/sorties, alertes de seuil, reporting et tableaux de bord pour les gestionnaires de l'institution.",
  },
  {
    id: "inf-sig",
    title: "SIG Institut National de la Femme – Comptabilité Matières",
    category: "Entreprise",
    type: "enterprise",
    imgPlaceholder: "📊",
    liveUrl: null,
    loginCapture: null,
    tags: ["Symfony", "PHP", "MySQL", "GRH"],
    description:
      "Module de comptabilité matières (gestion de stock) et développement d'une fonctionnalité de gestion de carrière des employés (mobilité, promotions, congés) pour le SIG de l'Institut National de la Femme.",
  },
  {
    id: "ppbse",
    title: "Système PPBSE – Ministère du Plan",
    category: "Entreprise",
    type: "enterprise",
    imgPlaceholder: "📈",
    liveUrl: null,
    loginCapture: null,
    tags: ["Symfony", "PHP", "API REST", "MySQL"],
    description:
      "Travail sur les modules Suivi & Évaluation, Planification et Programmation dans le cadre du Système Informatisé de Gestion de la Chaîne PPBSE (Plan, Programme, Budget, Suivi & Évaluation) du Ministère du Plan, de la Statistique et de l'Intégration Régionale.",
  },
  {
    id: "inrab",
    title: "INRAB – Module Suivi & Évaluation",
    category: "Entreprise",
    type: "enterprise",
    imgPlaceholder: "🔬",
    liveUrl: null,
    loginCapture: null,
    tags: ["Symfony", "PHP", "Bootstrap", "MySQL"],
    description:
      "Développement et intégration du module Suivi & Évaluation pour l'Institut National des Recherches Agricoles du Bénin (INRAB). Intégration du front-end du projet et participation aux tests de recette.",
  },
  {
    id: "pdi-cva",
    title: "PDI-CVA – Gestion de Stock & Ressources Humaines",
    category: "Entreprise",
    type: "enterprise",
    imgPlaceholder: "🏗️",
    liveUrl: null,
    loginCapture: null,
    tags: ["Symfony", "PHP", "ERP", "MySQL"],
    description:
      "Modules de gestion de stock et de Ressources Humaines (RH) pour le Projet de Développement Intégré des Chaînes de Valeurs Agricoles au Bénin (PDI-CVA), en équipe pluridisciplinaire.",
  },
  // ── Personnels ─────────────────────────────────────────────
  {
    id: "portfolio",
    title: "Portfolio Personnel",
    category: "Personnel",
    type: "personal",
    imgPlaceholder: "🌐",
    liveUrl: "https://wince-webdev.github.io",
    githubUrl: getRepo("wince-webdev.github.io"),
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "Site portfolio responsive présentant mes projets, compétences, expériences et coordonnées. Déployé sur GitHub Pages, optimisé mobile-first.",
  },
  {
    id: "gestion-ecole",
    title: "Plateforme de Gestion Scolaire (en développement)",
    category: "Personnel",
    type: "personal",
    imgPlaceholder: "🎓",
    liveUrl: null,
    githubUrl: getRepo("gestion-ecole"),
    tags: ["Symfony", "MySQL", "Bootstrap", "Chart.js"],
    description:
      "Application web complète de gestion d'école : inscriptions, notes, emplois du temps, bulletins automatiques, gestion des rôles (admin, enseignant, étudiant). Projet en cours de développement.",
  },
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

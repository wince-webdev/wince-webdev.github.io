"use strict";

// ── Utilitaire toggle ──────────────────────────────────────────────────
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// ── Sidebar mobile ─────────────────────────────────────────────────────
const sidebar    = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// ── Formulaire contact – validation bouton ─────────────────────────────
const form       = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn    = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  const refreshFormButton = () => {
    formBtn.disabled = [...formInputs].some((input) => !input.checkValidity());
  };

  formInputs.forEach((input) => {
    input.addEventListener("input", refreshFormButton);
  });

  refreshFormButton();
}

// ── Navigation entre pages ─────────────────────────────────────────────
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages           = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, linkIndex) => {
  link.addEventListener("click", function () {
    const clickedLabel = this.innerText.toLowerCase().trim();

    pages.forEach((page, pageIndex) => {
      const pageLabel = page.dataset.page.toLowerCase().trim();
      const isMatch   = pageLabel === clickedLabel;

      page.classList.toggle("active", isMatch);
      navigationLinks[pageIndex]?.classList.toggle("active", isMatch);
    });

    window.scrollTo(0, 0);
  });
});

// ── Année dynamique footer ─────────────────────────────────────────────
const year = new Date().getFullYear();
document.querySelectorAll(".footer-year").forEach((el) => (el.textContent = year));
const fyEl = document.getElementById("footer-year");
if (fyEl) fyEl.textContent = year;

// ── Message de confirmation après envoi (si ?sent=1 dans l'URL) ────────
if (window.location.search.includes("sent=1")) {
  const flash = document.createElement("div");
  flash.className = "form-flash-success";
  flash.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon> Message envoyé avec succès ! Je vous répondrai très bientôt.`;
  const contactArticle = document.querySelector("[data-page='contact']");
  if (contactArticle) {
    contactArticle.querySelector("header").after(flash);
    contactArticle.classList.add("active");
    // Mettre à jour le lien nav actif
    navigationLinks.forEach((l) => {
      l.classList.toggle("active", l.innerText.toLowerCase() === "contact");
    });
    pages.forEach((p) => {
      p.classList.toggle("active", p.dataset.page === "contact");
    });
  }
}

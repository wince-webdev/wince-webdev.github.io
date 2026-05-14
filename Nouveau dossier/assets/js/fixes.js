/* ============================================================
   FICHIER: assets/js/fixes.js
   INSTRUCTIONS: Ajouter ce fichier dans chaque page HTML
   JUSTE AVANT </body> :
   <script src="assets/js/fixes.js"></script>

   IMPORTANT pour le formulaire contact :
   1. Aller sur https://www.emailjs.com/ → créer un compte GRATUIT
   2. Créer un "Email Service" (connecter ton Gmail)
   3. Créer un "Email Template" avec les variables :
      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   4. Remplacer les 3 valeurs ci-dessous :
      - YOUR_PUBLIC_KEY  → clé publique (Account > API Keys)
      - YOUR_SERVICE_ID  → ID du service (Email Services)
      - YOUR_TEMPLATE_ID → ID du template (Email Templates)
   ============================================================ */

// ============================================================
// CONFIGURATION EMAILJS — À MODIFIER
// ============================================================
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← remplacer
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← remplacer
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← remplacer

// ============================================================
// FIX 1 : LIGHTBOX — Afficher l'image du projet au clic sur "Voir"
// ============================================================
(function initLightbox() {

  // Créer la structure HTML de la lightbox si elle n'existe pas
  if (!document.getElementById('lightbox-overlay')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div id="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Aperçu du projet">
        <button id="lightbox-close" aria-label="Fermer">&#x2715;</button>
        <div id="lightbox-box">
          <div id="lightbox-loader"></div>
          <img id="lightbox-img" src="" alt="Aperçu projet" />
          <div id="lightbox-title"></div>
        </div>
      </div>
    `);
  }

  const overlay  = document.getElementById('lightbox-overlay');
  const img      = document.getElementById('lightbox-img');
  const title    = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const loader   = document.getElementById('lightbox-loader');

  // Ouvrir la lightbox
  function openLightbox(imageSrc, projectTitle) {
    img.style.display = 'none';
    loader.style.display = 'block';
    title.textContent = projectTitle || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    img.onload = function () {
      loader.style.display = 'none';
      img.style.display = 'block';
    };
    img.onerror = function () {
      loader.style.display = 'none';
      img.style.display = 'block';
      img.alt = 'Image non disponible';
    };
    img.src = imageSrc;
  }

  // Fermer la lightbox
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    img.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // -------------------------------------------------------
  // Attacher la lightbox aux boutons "Voir" des projets
  // -------------------------------------------------------
  // Stratégie : on cherche tous les boutons/liens "Voir"
  // et on récupère l'image du projet depuis la carte parente.
  //
  // Fonctionne avec la structure typique :
  //   <li class="project-item">
  //     <figure><img src="assets/images/projects/...jpg"></figure>
  //     <h3>Nom du projet</h3>
  //     <a class="project-link btn" href="...">Voir</a>
  //   </li>
  //
  // Adapte les sélecteurs si ta structure HTML est différente.

  function attachLightboxToProjects() {
    // Sélecteurs larges pour couvrir différentes structures possibles
    const voirBtns = document.querySelectorAll(
      'a[href].btn, a[href].project-btn, a[href].voir-btn, ' +
      '.project-item a, .project-card a, li.project-item a'
    );

    voirBtns.forEach(function (btn) {
      const btnText = btn.textContent.trim().toLowerCase();

      // Ne toucher que les boutons avec le texte "voir" ou "preview"
      if (!['voir', 'preview', 'aperçu', 'view', 'demo'].includes(btnText)) return;

      // Trouver l'image dans la carte parente
      const card = btn.closest('li, article, .project-item, .project-card, .card');
      if (!card) return;

      const cardImg = card.querySelector('img');
      if (!cardImg) return;

      const imageUrl    = cardImg.src;
      const projectName = card.querySelector('h3, h4, .project-title, .title')?.textContent || 'Projet';

      // Remplacer le comportement du lien
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(imageUrl, projectName);
      });

      // Indicateur visuel
      btn.style.cursor = 'pointer';
      btn.removeAttribute('target');
    });
  }

  // Appel immédiat + après tout chargement dynamique
  attachLightboxToProjects();

  // Observer les changements dynamiques (si les projets sont filtrés/rechargés)
  const observer = new MutationObserver(function () {
    attachLightboxToProjects();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();


// ============================================================
// FIX 2 : FORMULAIRE CONTACT — Envoi via EmailJS
// ============================================================
(function initContactForm() {

  // Charger EmailJS dynamiquement si pas déjà présent
  if (!window.emailjs) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = function () {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      bindContactForm();
    };
    document.head.appendChild(script);
  } else {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    bindContactForm();
  }

  function bindContactForm() {
    // Chercher le formulaire de contact (sélecteurs courants)
    const form = document.querySelector(
      'form.contact-form, form#contact-form, form[action*="formsubmit"], ' +
      'form[action*="mailto"], .contact form, #contact form, form'
    );

    if (!form) return;

    // Créer ou récupérer la zone de notification
    let notification = form.querySelector('.form-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'form-notification';
      form.appendChild(notification);
    }

    // Retirer l'action formsubmit.co (qui est en panne)
    form.removeAttribute('action');
    form.setAttribute('method', 'post');

    const submitBtn = form.querySelector('[type="submit"], button:last-of-type');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Récupérer les champs (noms courants)
      const nameField    = form.querySelector('[name="name"], [name="nom"], #name, #nom');
      const emailField   = form.querySelector('[name="email"], [name="mail"], #email');
      const subjectField = form.querySelector('[name="subject"], [name="objet"], #subject, #objet');
      const messageField = form.querySelector('[name="message"], textarea, #message');

      const templateParams = {
        from_name  : nameField?.value    || 'Visiteur',
        from_email : emailField?.value   || '',
        subject    : subjectField?.value || 'Nouveau message depuis portfolio',
        message    : messageField?.value || '',
        reply_to   : emailField?.value   || '',
      };

      // Vérification basique
      if (!templateParams.from_email || !templateParams.message) {
        showNotification('error', '⚠ Veuillez remplir au moins votre email et votre message.');
        return;
      }

      // Désactiver le bouton pendant l'envoi
      if (submitBtn) submitBtn.classList.add('btn-sending');

      window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function () {
          showNotification('success', '✅ Message envoyé avec succès ! Je vous répondrai très bientôt.');
          form.reset();
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          showNotification('error', '❌ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter par WhatsApp.');
        })
        .finally(function () {
          if (submitBtn) submitBtn.classList.remove('btn-sending');
        });
    });

    function showNotification(type, message) {
      notification.className = 'form-notification ' + type;
      notification.textContent = message;
      notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Masquer après 7 secondes
      clearTimeout(notification._timeout);
      notification._timeout = setTimeout(function () {
        notification.className = 'form-notification';
      }, 7000);
    }
  }

})();


// ============================================================
// FIX 3 : NAVIGATION MOBILE EN HAUT
// ============================================================
(function fixMobileNav() {

  function applyNavFix() {
    // Cible : trouver la nav/barre de menu
    // Essai de différents sélecteurs selon la structure du portfolio
    const navCandidates = [
      document.querySelector('.navbar'),
      document.querySelector('nav'),
      document.querySelector('.nav'),
      document.querySelector('[class*="bottom-nav"]'),
      document.querySelector('[class*="mobile-nav"]'),
    ].filter(Boolean);

    if (navCandidates.length === 0) return;

    const isMobile = window.innerWidth <= 768;

    navCandidates.forEach(function (nav) {
      if (isMobile) {
        const style = window.getComputedStyle(nav);

        // Si la nav est en bas (position fixed avec bottom)
        const isAtBottom = style.position === 'fixed' &&
                           (parseInt(style.bottom) >= 0 || style.bottom === '0px');

        if (isAtBottom) {
          nav.style.setProperty('top', '0', 'important');
          nav.style.setProperty('bottom', 'auto', 'important');
          nav.style.setProperty('position', 'fixed', 'important');
          nav.style.setProperty('width', '100%', 'important');
          nav.style.setProperty('left', '0', 'important');
          nav.style.setProperty('z-index', '9999', 'important');

          // Ajouter padding-top au body pour compenser
          const navHeight = nav.offsetHeight || 56;
          if (document.body.style.paddingTop === '') {
            document.body.style.paddingTop = navHeight + 'px';
          }
        }
      }
    });
  }

  // Appliquer au chargement et au resize
  document.addEventListener('DOMContentLoaded', applyNavFix);
  window.addEventListener('resize', applyNavFix);
  applyNavFix();

})();


// ============================================================
// FIX 4 : SIDEBAR MOBILE — Afficher tout le contenu
// ============================================================
(function fixSidebarMobile() {

  // Le bouton fléché (chevron) qui ouvre/ferme le sidebar
  const toggleBtn = document.querySelector(
    '.sidebar-toggle, [class*="toggle"], .chevron, [aria-label*="sidebar"], ' +
    '[class*="arrow"], .info-more-btn, button[data-sidebar-btn]'
  );

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', function () {
    // Trouver le sidebar
    const sidebar = document.querySelector(
      '.sidebar, aside, [class*="sidebar"]'
    );
    if (!sidebar) return;

    // Basculer la classe active
    sidebar.classList.toggle('active');

    // Forcer l'affichage de tout le contenu
    const hiddenContent = sidebar.querySelectorAll(
      '.contacts, .social-list, .sidebar-info, [class*="contact"], [class*="info"]'
    );
    hiddenContent.forEach(function (el) {
      if (sidebar.classList.contains('active')) {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.maxHeight = 'none';
        el.style.overflow = 'visible';
      } else {
        el.style.display = '';
        el.style.visibility = '';
        el.style.opacity = '';
        el.style.maxHeight = '';
        el.style.overflow = '';
      }
    });
  });

})();

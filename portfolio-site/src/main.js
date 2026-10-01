import { portfolio } from './content.js';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────
//  EmailJS: public key is intentionally visible in the
//  browser bundle. That is normal for EmailJS.
//  Restrict allowed domains in your EmailJS dashboard:
//  https://dashboard.emailjs.com/admin/account
// ─────────────────────────────────────────────────────────
const EJS_PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EJS_SERVICE_ID   = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE_ID  = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (EJS_PUBLIC_KEY) emailjs.init(EJS_PUBLIC_KEY);

// ─── SVG icon strings ────────────────────────────────────
const ICON_GITHUB = `<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true" focusable="false">
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>`;

const ICON_LINKEDIN = `<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true" focusable="false">
  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
</svg>`;

// ─── Helpers ─────────────────────────────────────────────

/**
 * Returns true only if linkedin URL has a non-empty slug after /in/
 */
function isLinkedInValid(url) {
  if (!url) return false;
  const base = 'https://linkedin.com/in/';
  return url.startsWith(base) && url.length > base.length;
}

/**
 * Builds icon anchor tags for GitHub + LinkedIn (icon only)
 */
function buildSocialIcons(social) {
  let html = '';
  if (social.github) {
    html += `<a href="${social.github}" target="_blank" rel="noopener noreferrer"
      class="social-icon" aria-label="GitHub profile">${ICON_GITHUB}</a>`;
  }
  if (isLinkedInValid(social.linkedin)) {
    html += `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer"
      class="social-icon" aria-label="LinkedIn profile">${ICON_LINKEDIN}</a>`;
  }
  return html;
}

/**
 * Builds text button links for GitHub + LinkedIn
 */
function buildSocialButtons(social) {
  let html = '';
  if (social.github) {
    html += `<a href="${social.github}" target="_blank" rel="noopener noreferrer"
      class="btn btn-outline btn-sm">GitHub</a>`;
  }
  if (isLinkedInValid(social.linkedin)) {
    html += `<a href="${social.linkedin}" target="_blank" rel="noopener noreferrer"
      class="btn btn-outline btn-sm">LinkedIn</a>`;
  }
  return html;
}

// ─── Intersection Observer factory ───────────────────────
function makeObserver(opts = {}) {
  return new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...opts });
}

// ─── DOM Ready ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Populate all sections ───────────────────────────────
  populateHero();
  populateMarquee();
  populateProjects();
  populateSkills();
  populateEducation();
  populateContact();
  populateFooter();

  // ── Footer year ─────────────────────────────────────────
  const yrEl = document.getElementById('footer-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // ── Navbar scroll effect ────────────────────────────────
  const navbar    = document.querySelector('.navbar');
  const scrollHint = document.getElementById('scroll-hint');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    if (scrollHint) scrollHint.classList.toggle('hidden', y > 80);
  }, { passive: true });

  // ── Mobile navigation ───────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    const closeMenu = () => {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link =>
      link.addEventListener('click', closeMenu)
    );

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  // ── Scroll reveal (static elements) ────────────────────
  const globalObserver = makeObserver();
  document.querySelectorAll('.reveal-up').forEach(el => globalObserver.observe(el));

  // ── Contact form ────────────────────────────────────────
  setupContactForm();
});

// ═════════════════════════════════════════════════════════
//  POPULATE FUNCTIONS
// ═════════════════════════════════════════════════════════

function populateHero() {
  const nameEl    = document.getElementById('hero-name');
  const taglineEl = document.getElementById('hero-tagline');
  const descEl    = document.getElementById('hero-desc');
  const socialsEl = document.getElementById('hero-socials');

  if (nameEl)    nameEl.textContent    = portfolio.name;
  if (taglineEl) taglineEl.textContent = portfolio.tagline;
  if (descEl)    descEl.textContent    = portfolio.description;
  if (socialsEl) socialsEl.innerHTML   = buildSocialIcons(portfolio.social);

  // Trigger hero reveals immediately (above fold, no IntersectionObserver needed)
  // Small rAF delay so the browser has painted before animating
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero-inner .reveal-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('in-view'), i * 80);
      });
    });
  });
}

function populateMarquee() {
  const el = document.getElementById('marquee-content');
  if (!el || !portfolio.marquee?.length) return;

  // Duplicate items so the CSS animation loops seamlessly
  const doubled = [...portfolio.marquee, ...portfolio.marquee];
  el.innerHTML = doubled
    .map(word => `<span class="marquee-item">${word}</span>`)
    .join('');
}

function populateProjects() {
  const filtersContainer = document.getElementById('project-filters');
  const gridContainer = document.getElementById('projects-grid');
  if (!gridContainer || !portfolio.projects) return;

  // ── 1. Collect Filter Tags ──
  const uniqueTags = new Set();
  portfolio.projects.forEach(p => {
    if (Array.isArray(p.tags)) {
      p.tags.forEach(t => uniqueTags.add(t));
    }
  });

  const categories = ['All', ...Array.from(uniqueTags)];

  // ── 2. Render Filter Tabs ──
  if (filtersContainer) {
    filtersContainer.innerHTML = categories
      .map(
        (cat, i) => `
        <button
          type="button"
          class="filter-btn${i === 0 ? ' active' : ''}"
          data-filter="${cat}"
          role="tab"
          aria-selected="${i === 0 ? 'true' : 'false'}"
        >
          ${cat}
        </button>
      `
      )
      .join('');
  }

  // ── 3. Render Cards ──
  gridContainer.innerHTML = '';
  const cardElements = [];

  portfolio.projects.forEach(proj => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'project-card';
    card.setAttribute('aria-haspopup', 'dialog');
    
    const title = proj.name || proj.title;
    card.setAttribute('aria-label', `View details for ${title}`);
    card.dataset.tags = JSON.stringify(proj.tags || []);

    const shortDesc = proj.shortDescription || '';
    const tagsHtml = (proj.tags || proj.tech || [])
      .slice(0, 3)
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    const thumbnail = proj.thumbnail || '/images/healthcare-rag.svg';

    card.innerHTML = `
      <div class="card-thumb-wrapper">
        <img
          class="card-thumb"
          src="${thumbnail}"
          alt="${title} preview graphic"
          loading="lazy"
          width="600"
          height="360"
        />
      </div>
      <div class="card-body">
        <h3 class="card-title">${title}</h3>
        <p class="card-desc">${shortDesc}</p>
        <div class="card-tags" aria-label="Tags">${tagsHtml}</div>
        <div class="card-cta">
          <span>View details</span>
          <span class="cta-arrow" aria-hidden="true">&rarr;</span>
        </div>
      </div>
    `;

    // Spotlight cursor glow (desktop only)
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });

    // Lazy load & fade in image
    const thumbImg = card.querySelector('.card-thumb');
    if (thumbImg) {
      if (thumbImg.complete) {
        thumbImg.classList.add('loaded');
      } else {
        thumbImg.addEventListener('load', () => thumbImg.classList.add('loaded'), { once: true });
      }
    }

    // Click / Enter / Space opens details popup
    card.addEventListener('click', () => {
      openProjectModal(proj, card);
    });

    gridContainer.appendChild(card);
    cardElements.push(card);
  });

  // ── 4. Staggered Entrance Animation (Once only) ──
  const entranceObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cardElements.forEach((card, idx) => {
            setTimeout(() => {
              card.classList.add('in-view');
            }, idx * 90);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  entranceObserver.observe(gridContainer);

  // ── 5. Smooth FLIP Filter Animation ──
  if (filtersContainer) {
    const filterButtons = filtersContainer.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.filter;
        if (btn.classList.contains('active')) return;

        // 5a. Record First positions of currently visible cards
        const firstPositions = new Map();
        cardElements.forEach(card => {
          if (card.style.display !== 'none') {
            firstPositions.set(card, card.getBoundingClientRect());
          }
        });

        // 5b. Update active button state
        filterButtons.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', String(isActive));
        });

        // 5c. Show / Hide cards based on filter
        cardElements.forEach(card => {
          const tags = JSON.parse(card.dataset.tags || '[]');
          const matches = selected === 'All' || tags.includes(selected);

          if (matches) {
            const wasHidden = card.style.display === 'none';
            card.style.display = 'flex';
            if (wasHidden) {
              card.classList.add('card-enter');
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  card.classList.remove('card-enter');
                });
              });
            }
          } else {
            card.style.display = 'none';
          }
        });

        // 5d. Measure Last positions and Invert & Play
        cardElements.forEach(card => {
          if (card.style.display !== 'none') {
            const first = firstPositions.get(card);
            if (first) {
              const last = card.getBoundingClientRect();
              const dx = first.left - last.left;
              const dy = first.top - last.top;

              if (dx !== 0 || dy !== 0) {
                card.classList.remove('animating');
                card.style.transform = `translate(${dx}px, ${dy}px)`;
                // Force layout reflow
                void card.offsetWidth;
                card.classList.add('animating');
                card.style.transform = '';
                card.addEventListener(
                  'transitionend',
                  () => card.classList.remove('animating'),
                  { once: true }
                );
              }
            }
          }
        });
      });
    });
  }

  // ── 6. Setup Modal Listeners (once) ──
  initProjectModal();
}

// ═════════════════════════════════════════════════════════
//  DETAILS POPUP MODAL (Focus Trap, Esc, Backdrop Click)
// ═════════════════════════════════════════════════════════
let activeCardTrigger = null;
let modalInitialized = false;

function initProjectModal() {
  if (modalInitialized) return;
  modalInitialized = true;

  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  const dialog = document.getElementById('modal-dialog');

  closeBtn?.addEventListener('click', closeProjectModal);
  backdrop?.addEventListener('click', closeProjectModal);

  // Esc key & Focus Trap
  document.addEventListener('keydown', e => {
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeProjectModal();
      return;
    }

    if (e.key === 'Tab' && dialog) {
      const focusables = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function openProjectModal(proj, triggerEl) {
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !content) return;

  activeCardTrigger = triggerEl;

  const title = proj.name || proj.title;
  const tagsHtml = (proj.tags || proj.tech || [])
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  // Keep fields short and scannable; only render non-empty fields
  const problemHtml = proj.problem
    ? `<div class="modal-section">
         <h4 class="modal-section-title">Problem</h4>
         <p class="modal-section-text">${proj.problem}</p>
       </div>`
    : '';

  const approachHtml = proj.approach
    ? `<div class="modal-section">
         <h4 class="modal-section-title">Approach</h4>
         <p class="modal-section-text">${proj.approach}</p>
       </div>`
    : '';

  const techList = proj.tech && proj.tech.length ? proj.tech.join(' · ') : '';
  const techHtml = techList
    ? `<div class="modal-section">
         <h4 class="modal-section-title">Technology</h4>
         <p class="modal-section-text">${techList}</p>
       </div>`
    : '';

  // Result ONLY if provided in data; never invent one
  const resultHtml =
    proj.result && proj.result.trim()
      ? `<div class="modal-section">
           <h4 class="modal-section-title">Result</h4>
           <p class="modal-section-text"><strong>${proj.result}</strong></p>
         </div>`
      : '';

  // Buttons: GitHub always (if exists); Live Demo only if exists
  let actionsHtml = '';
  const githubLink = proj.githubUrl || proj.github;
  const liveLink = proj.liveUrl || proj.demo;

  if (githubLink) {
    actionsHtml += `<a href="${githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">View on GitHub</a>`;
  }
  if (liveLink) {
    actionsHtml += `<a href="${liveLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Demo</a>`;
  }

  content.innerHTML = `
    <div class="modal-header">
      <h3 id="modal-title" class="modal-title">${title}</h3>
      <div class="modal-tags">${tagsHtml}</div>
    </div>
    <div class="modal-body">
      ${problemHtml}
      ${approachHtml}
      ${techHtml}
      ${resultHtml}
    </div>
    ${actionsHtml ? `<div class="modal-actions">${actionsHtml}</div>` : ''}
  `;

  modal.classList.remove('closing');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus trap start: focus close button
  setTimeout(() => {
    closeBtn?.focus();
  }, 50);
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal || !modal.classList.contains('open')) return;

  modal.classList.add('closing');

  setTimeout(() => {
    modal.classList.remove('open', 'closing');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    // Return focus to the card button that opened the modal
    if (activeCardTrigger) {
      activeCardTrigger.focus();
      activeCardTrigger = null;
    }
  }, 250);
}

function populateSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const obs = makeObserver();

  portfolio.skills.forEach(group => {
    const div = document.createElement('div');
    div.className = 'skill-group reveal-up';
    div.innerHTML = `
      <h3 class="skill-category">${group.category}</h3>
      <ul class="skill-items" role="list">
        ${group.items.map(item => `<li class="skill-item">${item}</li>`).join('')}
      </ul>
    `;
    grid.appendChild(div);
    obs.observe(div);
  });
}

function populateEducation() {
  const list = document.getElementById('education-list');
  if (!list) return;

  const obs = makeObserver();

  portfolio.education.forEach(edu => {
    const div = document.createElement('div');
    div.className = 'edu-item reveal-up';

    const metaParts = [];
    if (edu.cgpa)       metaParts.push(edu.cgpa);
    if (edu.coursework) metaParts.push(`Coursework: ${edu.coursework}`);

    div.innerHTML = `
      <div>
        <p class="edu-degree">${edu.degree}</p>
        <p class="edu-institution">${edu.institution}</p>
        ${metaParts.map(p => `<p class="edu-meta">${p}</p>`).join('')}
      </div>
      <p class="edu-year">${edu.year}</p>
    `;

    list.appendChild(div);
    obs.observe(div);
  });
}

function populateContact() {
  const emailLink   = document.getElementById('contact-email-link');
  const socialLinks = document.getElementById('contact-social-links');

  if (emailLink && portfolio.social.email) {
    emailLink.href        = `mailto:${portfolio.social.email}`;
    emailLink.textContent = portfolio.social.email;
  }

  if (socialLinks) {
    socialLinks.innerHTML = buildSocialButtons(portfolio.social);
  }
}

function populateFooter() {
  const footerSocials = document.getElementById('footer-socials');
  if (footerSocials) {
    footerSocials.innerHTML = buildSocialIcons(portfolio.social);
  }
}

// ═════════════════════════════════════════════════════════
//  CONTACT FORM
// ═════════════════════════════════════════════════════════

function setupContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');
  if (!form) return;

  let isSubmitting = false;

  // ── Field references ────────────────────────────────────
  const nameEl    = document.getElementById('user_name');
  const emailEl   = document.getElementById('user_email');
  const messageEl = document.getElementById('message');

  // ── Helpers ─────────────────────────────────────────────
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(errorId, inputEl, msg) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = msg;
    if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(errorId, inputEl) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = '';
    if (inputEl) inputEl.removeAttribute('aria-invalid');
  }

  function clearAllErrors() {
    clearFieldError('error-name',    nameEl);
    clearFieldError('error-email',   emailEl);
    clearFieldError('error-message', messageEl);
    formStatus.textContent = '';
    formStatus.className   = 'form-status';
  }

  function setStatus(type, msg) {
    formStatus.textContent = msg;
    formStatus.className   = `form-status${type ? ' ' + type : ''}`;
  }

  // ── Live validation (clear error as user types) ─────────
  nameEl?.addEventListener('input',    () => clearFieldError('error-name',    nameEl));
  emailEl?.addEventListener('input',   () => clearFieldError('error-email',   emailEl));
  messageEl?.addEventListener('input', () => clearFieldError('error-message', messageEl));

  // ── Submit ──────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check
    if (form._gotcha?.value) return;
    if (isSubmitting) return;

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = messageEl.value.trim();

    clearAllErrors();

    let hasError = false;

    if (!name) {
      setFieldError('error-name', nameEl, 'Please enter your name.');
      hasError = true;
    }

    if (!email || !EMAIL_RE.test(email)) {
      setFieldError('error-email', emailEl, 'Please enter a valid email address.');
      hasError = true;
    }

    if (message.length < 10) {
      setFieldError('error-message', messageEl, 'Message must be at least 10 characters.');
      hasError = true;
    }

    if (message.length > 1000) {
      setFieldError('error-message', messageEl, 'Message must be 1000 characters or fewer.');
      hasError = true;
    }

    if (hasError) {
      // Focus first errored field
      [nameEl, emailEl, messageEl].find(el => el.getAttribute('aria-invalid') === 'true')?.focus();
      return;
    }

    // ── Sending ─────────────────────────────────────────
    isSubmitting        = true;
    submitBtn.disabled  = true;
    submitBtn.textContent = 'Sending…';

    try {
      await emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        message:    message,
      });

      setStatus('success', "Message sent! I'll get back to you soon.");
      form.reset();     // Only reset on success
    } catch (err) {
      console.error('EmailJS error:', err);
      // Keep user's text; show fallback email
      setStatus(
        'error',
        `Something went wrong. Please email me directly at ${portfolio.social.email}`
      );
    } finally {
      isSubmitting        = false;
      submitBtn.disabled  = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

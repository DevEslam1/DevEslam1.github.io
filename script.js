/**
 * ENGINEER.OS — Portfolio Script
 * Router · Mobile Menu · Filters · Search · Scroll Reveals · Contact Form
 */

/* ── Scroll Spy (Highlight active nav link) ───────────────────── */
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // detects when section is in middle of viewport
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

/* ── Mobile menu link click handles ────────────────────────────── */
document.querySelectorAll('.mobile-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

/* ── Mobile Menu ─────────────────────────────────────────────── */
const menuToggle  = document.getElementById('menuToggle');
const mobileMenu  = document.getElementById('mobileMenu');
let menuOpen = false;

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.querySelector('.material-symbols-outlined').textContent = 'close';
  menuOpen = true;
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
  menuOpen = false;
}

menuToggle.addEventListener('click', e => {
  e.stopPropagation();
  menuOpen ? closeMobileMenu() : openMobileMenu();
});

document.addEventListener('click', e => {
  if (menuOpen && !mobileMenu.contains(e.target) && e.target !== menuToggle) {
    closeMobileMenu();
  }
});

/* ── Scroll Reveal ───────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function triggerReveals() {
  document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
    revealObserver.observe(el);
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', triggerReveals);

/* ── Projects: Filters & Search ─────────────────────────────── */
const projectFilters = document.getElementById('projectFilters');
const projectSearch  = document.getElementById('projectSearch');

function filterProjects() {
  const activeFilter = projectFilters
    ? projectFilters.querySelector('.filter-chip.active')?.dataset.filter || 'all'
    : 'all';
  const searchTerm = (projectSearch?.value || '').toLowerCase().trim();

  // Filter archive cards
  document.querySelectorAll('#archiveGrid .archive-card').forEach(card => {
    const tags    = (card.dataset.tags || '').toLowerCase();
    const title   = card.querySelector('.archive-card__title')?.textContent.toLowerCase() || '';
    const desc    = card.querySelector('.archive-card__desc')?.textContent.toLowerCase()  || '';
    const tech    = card.querySelector('.archive-card__tech')?.textContent.toLowerCase()  || '';

    const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const matchSearch = !searchTerm || [title, desc, tech, tags].some(t => t.includes(searchTerm));

    card.style.display = matchFilter && matchSearch ? '' : 'none';
  });

  // Also filter featured secondary cards (optional — show/hide by tag)
  document.querySelectorAll('.featured-card-secondary, .featured-card-primary').forEach(card => {
    if (!card.dataset.tags) return;
    const tags = card.dataset.tags.toLowerCase();
    const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const title = card.querySelector('h2,h3')?.textContent.toLowerCase() || '';
    const matchSearch = !searchTerm || title.includes(searchTerm) || tags.includes(searchTerm);

    card.style.display = matchFilter && matchSearch ? '' : 'none';
  });
}

if (projectFilters) {
  projectFilters.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    projectFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filterProjects();
  });
}
if (projectSearch) {
  projectSearch.addEventListener('input', filterProjects);
}

/* ── Certificates: Filters & Search ─────────────────────────── */
const certFilters = document.getElementById('certFilters');
const certSearch  = document.getElementById('certSearch');

function filterCerts() {
  const activeFilter = certFilters
    ? certFilters.querySelector('.filter-chip.active')?.dataset.certFilter || 'all'
    : 'all';
  const searchTerm = (certSearch?.value || '').toLowerCase().trim();

  document.querySelectorAll('#certGrid .cert-card').forEach(card => {
    const tags  = (card.dataset.certTags || '').toLowerCase();
    const title = card.querySelector('.cert-card__title')?.textContent.toLowerCase() || '';
    const meta  = card.querySelector('.cert-card__meta')?.textContent.toLowerCase()  || '';

    const matchFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const matchSearch = !searchTerm || [title, tags, meta].some(t => t.includes(searchTerm));

    card.style.display = matchFilter && matchSearch ? '' : 'none';
  });
}

if (certFilters) {
  certFilters.addEventListener('click', e => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    certFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filterCerts();
  });
}
if (certSearch) {
  certSearch.addEventListener('input', filterCerts);
}

/* ── Contact Form ────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const toast       = document.getElementById('toast');

function showToast(msg, type = '') {
  toast.textContent = msg;
  toast.className = 'toast show';
  if (type) toast.classList.add(type);
  setTimeout(() => { toast.className = 'toast'; }, 4000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const sendIcon = document.getElementById('sendIcon');
    const submitBtn = document.getElementById('submitBtn');

    // Validate
    if (!name) return showToast('Please enter your name.');
    if (!validateEmail(email)) return showToast('Please enter a valid email.');
    if (!subject) return showToast('Please enter a subject.');
    if (!message || message.length < 10) return showToast('Please enter a message (min 10 characters).');

    // Visual loading state
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    sendIcon.textContent = 'hourglass_empty';

    // Real send logic via Formspree or custom API
    // Replace the URL payload with your actual endpoint URL for this to function
    const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_ENDPOINT_ID';
    
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (response.ok) {
        showToast('Message sent! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        sendIcon.textContent = 'check_circle';
      } else {
        showToast('Failed to send message. Please try again.', 'error');
        sendIcon.textContent = 'error';
      }
    } catch (error) {
      console.error(error);
      showToast('Network error. Failed to send message.', 'error');
      sendIcon.textContent = 'error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';
      setTimeout(() => { sendIcon.textContent = 'arrow_forward'; }, 3000);
    }
  });
}

/* ── Hover effects on archive cards ──────────────────────────── */
document.querySelectorAll('.archive-card').forEach(card => {
  const title = card.querySelector('.archive-card__title');
  if (!title) return;
  const icon = card.querySelector('.archive-card__icon .material-symbols-outlined');
  const iconInitialColor = icon ? getComputedStyle(icon).color : '';
  card.addEventListener('mouseenter', () => {
    if (title) title.style.color = 'var(--clr-primary)';
  });
  card.addEventListener('mouseleave', () => {
    if (title) title.style.color = '';
  });
});

/* ── Nav highlight on scroll ───────────────────────────────────── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ── Init ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  navigate(getPage());
});

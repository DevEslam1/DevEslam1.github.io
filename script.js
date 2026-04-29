/**
 * Eslam.OS - Portfolio Script
 * Mobile Menu - Filters - Search - Scroll Reveals
 */

/* ── Scroll Spy (Highlight active nav link) ───────────────────── */
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav__link, .mobile-menu__link');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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

/* ── Hover effects on archive cards ──────────────────────────── */
document.querySelectorAll('.archive-card').forEach(card => {
  const title = card.querySelector('.archive-card__title');
  if (!title) return;
  const icon = card.querySelector('.archive-card__icon .material-symbols-outlined');
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

/* ── MockupMaster: Dynamic Project Previews ───────────────────── */
(function () {
  const mockupScroll = document.getElementById('mockupScroll');
  const mockupLabel  = document.getElementById('mockupSideLabel');
  if (!mockupScroll || !mockupLabel) return;

  const projectAssetMap = {
    novastore: {
      name: "NOVASTORE",
      icon: "./assets/apps icons/NovaStore_edited.webp",
      images: [
        './assets/Screenshots/NovaStore/1.webp',
        './assets/Screenshots/NovaStore/2.webp',
        './assets/Screenshots/NovaStore/3.webp',
        './assets/Screenshots/NovaStore/4.webp'
      ]
    },
    foodapp: {
      name: "FOODAPP",
      icon: "./assets/apps icons/foodapp_edited.webp",
      images: [
        './assets/Screenshots/food/1.webp',
        './assets/Screenshots/food/2.webp',
        './assets/Screenshots/food/3.webp',
        './assets/Screenshots/food/4.webp'
      ]
    },
    beatflow: {
      name: "BEATFLOW",
      icon: "./assets/apps icons/BeatFlow_Music_edited.webp",
      images: [
        './assets/Screenshots/beatflow/1.webp',
        './assets/Screenshots/beatflow/2.webp',
        './assets/Screenshots/beatflow/3.webp',
        './assets/Screenshots/beatflow/4.webp'
      ]
    },
    devsync: {
      name: "DEVSYNC",
      icon: "./assets/apps icons/devsync_edited.webp",
      images: [
        './assets/Screenshots/devsync/1.webp',
        './assets/Screenshots/devsync/2.webp',
        './assets/Screenshots/devsync/3.webp',
        './assets/Screenshots/devsync/4.webp'
      ]
    },
    newscloud: {
      name: "NEWSCLOUD",
      icon: "./assets/apps icons/news_app_edited.webp",
      images: [
        './assets/Screenshots/NEWSAPP/1.webp',
        './assets/Screenshots/NEWSAPP/2.webp',
        './assets/Screenshots/NEWSAPP/3.webp',
        './assets/Screenshots/NEWSAPP/4.webp'
      ]
    },
    maysur: {
      name: "MAYSUR",
      icon: "./assets/apps icons/maysour.webp",
      images: [
        './assets/Screenshots/maysour/1.webp',
        './assets/Screenshots/maysour/2.webp',
        './assets/Screenshots/maysour/3.webp',
        './assets/Screenshots/maysour/4.webp'
      ]
    },
    freezone: {
      name: "FREE ZONE",
      icon: "./assets/apps icons/free zone.webp",
      images: [
        './assets/Screenshots/freezone/1.webp',
        './assets/Screenshots/freezone/2.webp',
        './assets/Screenshots/freezone/3.webp',
        './assets/Screenshots/freezone/4.webp'
      ]
    },
    cinecurator: {
      name: "CINECURATOR",
      icon: "./assets/apps icons/movie.webp",
      images: [
        './assets/Screenshots/Movie app/1.webp',
        './assets/Screenshots/Movie app/2.webp',
        './assets/Screenshots/Movie app/3.webp',
        './assets/Screenshots/Movie app/4.webp'
      ]
    },
    weather: {
      name: "WEATHER APP",
      icon: "./assets/apps icons/weather.webp",
      images: [
        './assets/Screenshots/weather app/1.webp',
        './assets/Screenshots/weather app/2.webp',
        './assets/Screenshots/weather app/3.webp',
        './assets/Screenshots/weather app/4.webp'
      ]
    },
    todo: {
      name: "TO-DO LIST",
      icon: "./assets/apps icons/to do list_edited.webp",
      images: [
        './assets/Screenshots/to do list/1.webp',
        './assets/Screenshots/to do list/2.webp',
        './assets/Screenshots/to do list/3.webp',
        './assets/Screenshots/to do list/4.webp'
      ]
    }
  };

  const projectIds = Object.keys(projectAssetMap);
  let currentProject = '';
  let isUserInteracting = false;
  let interactionTimeout;

  const mainMockupSwitcher = document.getElementById('mainMockupSwitcher');

  // Initialize Project Thumbnails
  if (mainMockupSwitcher) {
    mainMockupSwitcher.innerHTML = projectIds.map(id => {
      const data = projectAssetMap[id];
      const iconHtml = data.icon 
        ? `<img src="${data.icon.replace(/ /g, '%20')}" class="app-icon" alt="${data.name} icon" loading="lazy">` 
        : `<div class="app-icon-fallback">${data.name.charAt(0)}</div>`;

      return `
        <button class="thumb-btn proj-thumb" data-project="${id}" title="${data.name}">
          ${iconHtml}
          <span class="app-name">${data.name}</span>
        </button>
      `;
    }).join('');

    mainMockupSwitcher.querySelectorAll('.proj-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        switchMockup(btn.dataset.project);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 10000);
      });
    });
  }

  function switchMockup(projectId) {
    if (projectId === currentProject || !projectAssetMap[projectId]) return;
    const data = projectAssetMap[projectId];
    currentProject = projectId;

    // Fade out
    mockupLabel.style.opacity = '0';
    mockupScroll.style.opacity = '0';

    setTimeout(() => {
      mockupLabel.textContent = data.name;
      
      // Inject images with space encoding
      mockupScroll.innerHTML = data.images
        .map(src => `<img src="${src.replace(/ /g, '%20')}" alt="${data.name}" />`)
        .join('');

      // Restart animation
      mockupScroll.style.animation = 'none';
      mockupScroll.offsetHeight; 
      mockupScroll.style.animation = '';

      // Fade in
      mockupLabel.style.opacity = '1';
      mockupScroll.style.opacity = '1';

      if (mainMockupSwitcher) {
        mainMockupSwitcher.querySelectorAll('.proj-thumb').forEach(b => {
          if (b.dataset.project === projectId) {
            b.classList.add('active');
            // Scroll container locally instead of scrollIntoView to prevent page jump
            const container = mainMockupSwitcher;
            const btnTop = b.offsetTop;
            const btnHeight = b.offsetHeight;
            const containerHeight = container.clientHeight;
            container.scrollTo({
              top: btnTop - (containerHeight / 2) + (btnHeight / 2),
              behavior: 'smooth'
            });
          } else {
            b.classList.remove('active');
          }
        });
      }
    }, 300);
  }

  // Auto-rotate logic
  mockupScroll.addEventListener('animationiteration', () => {
    if (isUserInteracting) return;
    const nextIdx = (projectIds.indexOf(currentProject) + 1) % projectIds.length;
    switchMockup(projectIds[nextIdx]);
  });

  document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('mouseenter', () => {
      isUserInteracting = true;
      clearTimeout(interactionTimeout);
      switchMockup(card.dataset.project);
    });
    card.addEventListener('mouseleave', () => {
      interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 5000);
    });
    card.addEventListener('click', () => {
      isUserInteracting = true;
      clearTimeout(interactionTimeout);
      switchMockup(card.dataset.project);
      interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 8000);
    });
  });

  // Initial
  switchMockup('novastore');
})();

/* ── Interactive Card Spotlight & Tilt ─────────────────────── */
(function() {
  const cards = document.querySelectorAll('.interactive-card');
  
  if (window.matchMedia('(hover: hover)').matches && !prefersReducedMotion.matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Spotlight variables
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Subtle Tilt variables (limit to ~5 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / (rect.height / 10);
        const tiltY = (centerX - x) / (rect.width / 10);
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      });
    });
  }
})();

/* ── Certification Carousel ────────────────────────────────── */
(function() {
  const grid = document.getElementById('certGrid');
  const prevBtn = document.getElementById('certPrev');
  const nextBtn = document.getElementById('certNext');
  if (!grid || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function updateCarousel() {
    const cards = Array.from(grid.querySelectorAll('.cert-card')).filter(c => c.style.display !== 'none');
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const gap = 24;
    const viewportWidth = grid.parentElement.offsetWidth;
    // Each card width is (viewportWidth - (gap * (cardsPerView - 1))) / cardsPerView
    const cardWidth = (viewportWidth - (gap * (cardsPerView - 1))) / cardsPerView;
    const moveAmount = currentIndex * (cardWidth + gap);

    grid.style.transform = `translateX(-${moveAmount}px)`;
    
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    
    // Hide arrows if all cards fit
    if (cards.length <= cardsPerView) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = '';
      nextBtn.style.display = '';
    }
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Re-sync on filter changes
  const certFilters = document.getElementById('certFilters');
  const certSearch  = document.getElementById('certSearch');
  
  if (certFilters) {
    certFilters.addEventListener('click', () => {
      currentIndex = 0;
      setTimeout(updateCarousel, 50); // wait for filter logic to hide cards
    });
  }
  if (certSearch) {
    certSearch.addEventListener('input', () => {
      currentIndex = 0;
      setTimeout(updateCarousel, 50);
    });
  }

  // Initial
  setTimeout(updateCarousel, 300);
})();

/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
(function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ── BACK-TO-TOP BUTTON ──────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
  });
})();

/* ── ANIMATED NUMBER COUNTERS ────────────────────────────── */
(function initFloatingHireButton() {
  const btn = document.getElementById('floatingHireBtn');
  const hero = document.getElementById('home');
  if (!btn || !hero) return;

  let ticking = false;
  const update = () => {
    const heroExitPoint = hero.offsetTop + hero.offsetHeight * 0.75;
    btn.classList.toggle('is-visible', window.scrollY > heroExitPoint);
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();

(function initCounters() {
  const counters = document.querySelectorAll('.stat-counter[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500; // ms
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ── CURSOR TRACKING GLOW ────────────────────────────────── */
(function initCursorGlow() {
  const orb = document.getElementById('bgOrb');
  const canUseCursorGlow = window.matchMedia('(hover: hover)').matches && !prefersReducedMotion.matches;
  if (!orb || !canUseCursorGlow) {
    if (orb) orb.style.display = 'none';
    return;
  }

  // Track cursor movement
  document.addEventListener('mousemove', (e) => {
    if (document.visibilityState !== 'visible') return;
    // Only smooth if we are tracking fast, requestAnimationFrame helps
    requestAnimationFrame(() => {
      orb.style.left = `${e.clientX}px`;
      orb.style.top = `${e.clientY}px`;
    });
  }, { passive: true });
})();

/* ── SMOOTH SCROLL ANCHOR FIX ────────────────────────────── */
(function fixAnchorScroll() {
  // Use native anchor scrolling behavior so mobile browsers handle layout
  // and dynamic viewport changes correctly.
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetHash = this.getAttribute('href');
      if (!targetHash || targetHash === '#') return;
      
      const targetId = decodeURIComponent(targetHash.slice(1));
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });

        if (history.replaceState) {
          history.replaceState(null, '', targetHash);
        }
      }
    });
  });
})();


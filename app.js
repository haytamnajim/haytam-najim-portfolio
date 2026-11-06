/**
 * HAITAM NAJIM PORTFOLIO
 * Modern Vanilla JavaScript — Noir & Crimson Ambient Canvas, Interactive SAV AI Explorer, Bento Filter & Clipboard
 */

(function () {
  'use strict';

  // ==========================================================================
  // SAV 7-AGENT PIPELINE DATA
  // ==========================================================================
  const LAYER_DATA = {
    1: {
      badge: 'LAYER 01 // SAV INTAKE',
      title: 'Réception & classification omnicanale',
      desc: 'Collecte et qualification des demandes SAV depuis email, Outlook et ServiceNow avec routage vers l’agent spécialisé.',
      tags: ['Email / Outlook', 'ServiceNow']
    },
    2: {
      badge: 'LAYER 02 // OCR VISION',
      title: 'Extraction documentaire OCR Vision',
      desc: 'Lecture et structuration automatique de pièces jointes et documents SAV afin d’alimenter le dossier incident avec des données exploitables.',
      tags: ['OCR Vision', 'Multi-canaux']
    },
    3: {
      badge: 'LAYER 03 // RAG CONTEXTE',
      title: 'Contexte métier augmenté par RAG',
      desc: 'Recherche augmentée par génération pour retrouver les procédures, historiques et connaissances utiles au traitement du dossier.',
      tags: ['RAG', 'Connaissance métier']
    },
    4: {
      badge: 'LAYER 04 // RULES ENGINE',
      title: 'Moteur de règles métier',
      desc: 'Application de règles déterministes pour prioriser, qualifier et router les incidents selon SLA, type de demande et impact client.',
      tags: ['Business Rules', 'SLA']
    },
    5: {
      badge: 'LAYER 05 // LLM GENERATION',
      title: 'Génération LLM contrôlée',
      desc: 'Génération de réponses, synthèses et propositions d’action avec contrôle par règles, contexte RAG et validation métier.',
      tags: ['Ollama LLM', 'Réponses SAV']
    },
    6: {
      badge: 'LAYER 06 // ITSM SYNC',
      title: 'ServiceNow bi-directionnel',
      desc: 'Synchronisation, création, mise à jour et résolution de tickets ServiceNow avec traçabilité complète et sécurité JWT.',
      tags: ['ServiceNow', 'JWT']
    },
    7: {
      badge: 'LAYER 07 // ESCALADE',
      title: 'Relance & escalade intelligente',
      desc: 'Surveillance SLA/CSAT, relances automatisées et escalade managériale lorsque le traitement dépasse les seuils définis.',
      tags: ['Relance', 'Escalade SLA/CSAT']
    }
  };

  // ==========================================================================
  // AMBIENT NOIR & CRIMSON OP-ART CANVAS (Optimized with Hero IntersectionObserver)
  // ==========================================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId = null;
    let isRunning = false;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let frame = 0;

    // Atmospheric Crimson Orbs (Red & Noir focus)
    const orbs = [
      { x: 0.35, y: 0.40, radius: 0.50, vx: 0.0003, vy: 0.0002, color: 'rgba(239, 68, 68, 0.14)' }, // Crimson Red
      { x: 0.70, y: 0.45, radius: 0.42, vx: -0.0002, vy: 0.0003, color: 'rgba(185, 28, 28, 0.10)' }, // Deep Blood Red
      { x: 0.50, y: 0.80, radius: 0.48, vx: 0.0002, vy: -0.0002, color: 'rgba(255, 255, 255, 0.03)' }  // Ghost Monochrome
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / width;
      mouse.targetY = e.clientY / height;
    }, { passive: true });

    function render() {
      if (!isRunning) return;
      frame++;

      // Ease mouse coordinates for smooth parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render subtle crimson orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;

        const px = (orb.x + (mouse.x - 0.5) * 0.06) * width;
        const py = (orb.y + (mouse.y - 0.5) * 0.06) * height;
        const r = orb.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle Op-Art Concentric Ambient Rings
      const centerX = width * 0.5 + (mouse.x - 0.5) * 20;
      const centerY = height * 0.45 + (mouse.y - 0.5) * 20;
      const baseR = (frame * 0.4) % 120;

      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const ringRadius = baseR + i * 140;
        const alpha = Math.max(0, 0.04 - (ringRadius / (Math.max(width, height) * 0.7)) * 0.04);
        if (alpha > 0.005) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    }

    function stopLoop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    startLoop();

    // Pause rendering when tab is hidden to conserve GPU/CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    // Pause rendering when Hero is scrolled out of viewport (Solves GPU waste flaw)
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      }, { threshold: 0.02 });
      heroObserver.observe(heroSection);
    }
  }

  // ==========================================================================
  // SAV 7-AGENT INTERACTIVE TAB SWITCHER
  // ==========================================================================
  function initLayerTabs() {
    const tabs = document.querySelectorAll('.layer-tab');
    const badgeEl = document.getElementById('layer-inspect-id');
    const titleEl = document.getElementById('layer-inspect-title');
    const descEl = document.getElementById('layer-inspect-desc');
    const tagsEl = document.getElementById('layer-inspect-tags');
    const contentPane = document.getElementById('layer-content');

    if (!tabs.length || !titleEl) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const layerNum = tab.getAttribute('data-layer');
        const data = LAYER_DATA[layerNum];
        if (!data) return;

        // Update active tab styling
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Smooth content swap animation
        if (contentPane) {
          contentPane.style.opacity = '0';
          contentPane.style.transform = 'translateY(6px)';
          contentPane.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

          setTimeout(() => {
            badgeEl.textContent = data.badge;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;

            // Render tags
            tagsEl.innerHTML = '';
            data.tags.forEach((tagText) => {
              const span = document.createElement('span');
              span.className = 'tech-tag';
              span.textContent = tagText;
              tagsEl.appendChild(span);
            });

            contentPane.style.opacity = '1';
            contentPane.style.transform = 'translateY(0)';
          }, 180);
        }
      });
    });
  }

  // ==========================================================================
  // BENTO GRID CATEGORY FILTERING
  // ==========================================================================
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    if (!filterButtons.length || !bentoCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Toggle active button state
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        bentoCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================================================
  // 1-CLICK EMAIL COPY TO CLIPBOARD WITH FLOATING TOAST
  // ==========================================================================
  function initCopyEmail() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = message;
      toast.classList.add('show');

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy') || 'haytamnajim07@gmail.com';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              showToast(`Copied to clipboard: ${textToCopy}`);
            })
            .catch(() => {
              fallbackCopy(textToCopy);
            });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(`Copied to clipboard: ${text}`);
      } catch (err) {
        showToast(`Direct email: ${text}`);
      }
      document.body.removeChild(textarea);
    }
  }

  // ==========================================================================
  // ACTIVE NAVIGATION DOCK SECTION OBSERVER
  // ==========================================================================
  function initScrollObserver() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    if (!navItems.length || !sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              if (item.getAttribute('href') === `#${id}`) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // ==========================================================================
  // LIGHTWEIGHT HERO BUILD + SCROLL REVEALS
  // ==========================================================================
  function initMotionReveals() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroParts = document.querySelectorAll('.hero-flank, .hero-center-col');
    heroParts.forEach((part) => part.classList.add('hero-build'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => heroParts.forEach((part) => part.classList.add('is-built')));
    });

    const revealItems = document.querySelectorAll(
      '.section-header, .flagship-card, .subgrid-card, .bento-card, .stack-grid > .glass-card, .about-grid, .contact-card'
    );
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach((item) => {
      item.classList.add('reveal-item');
      observer.observe(item);
    });
  }

  // ==========================================================================
  // BOOTSTRAP ALL MODULES ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initMotionReveals();
    initAuroraCanvas();
    initLayerTabs();
    initProjectFilters();
    initCopyEmail();
    initScrollObserver();
  });

  // ==========================================================================
  // ORIGINAL PORTFOLIO INTRO (clean-room inspired, no vendored engine)
  // ==========================================================================
  function initPortfolioIntro() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intro = document.createElement('div');
    intro.className = 'portfolio-intro';
    intro.setAttribute('aria-live', 'polite');
    intro.innerHTML = `
      <div class="portfolio-intro-grid" aria-hidden="true"></div>
      <div class="portfolio-intro-content">
        <div class="portfolio-intro-kicker">// PORTFOLIO BUILD</div>
        <h1 class="portfolio-intro-title">HAITAM NAJIM</h1>
        <div class="portfolio-intro-line"></div>
        <div class="portfolio-intro-status" id="portfolioIntroStatus">Initialisation...</div>
        <div class="portfolio-intro-progress"><div class="portfolio-intro-progress-bar" id="portfolioIntroBar"></div></div>
      </div>
    `;
    document.body.appendChild(intro);

    const status = intro.querySelector('#portfolioIntroStatus');
    const bar = intro.querySelector('#portfolioIntroBar');
    const steps = [
      'Chargement des modules visuels...',
      'Préparation du canvas aurora...',
      'Construction de la matrice projets...',
      'Finalisation du profil...',
      'Prêt.'
    ];
    let progress = 0;
    let index = 0;

    const update = () => {
      if (index < steps.length) {
        status.textContent = steps[index];
        index++;
      }
      progress = Math.min(100, progress + 18 + Math.random() * 12);
      bar.style.width = progress + '%';
      if (progress < 95) {
        window.setTimeout(update, 260);
      } else {
        window.setTimeout(() => {
          intro.classList.add('is-done');
          window.setTimeout(() => intro.remove(), 500);
        }, 320);
      }
    };

    window.setTimeout(update, 260);
  }
  function initPortfolioSound() {
    const play = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.28);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.36);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.38);
      } catch (e) {
        // Les navigateurs peuvent bloquer l'autoplay sans interaction utilisateur.
      }
    };
    window.setTimeout(play, 1300);
  }

  document.addEventListener('DOMContentLoaded', initPortfolioSound);

  function initThemeToggle() {
    const buttons = document.querySelectorAll('.theme-toggle');
    const applyTheme = (theme) => {
      document.body.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      buttons.forEach((button) => {
        button.textContent = theme === 'light' ? '☾' : '☀';
        button.setAttribute('aria-label', theme === 'light' ? 'Passer en thème sombre' : 'Passer en thème clair');
      });
      try { localStorage.setItem('portfolio-theme', theme); } catch (e) {}
    };
    const saved = (() => {
      try { return localStorage.getItem('portfolio-theme'); } catch (e) { return null; }
    })();
    applyTheme(saved === 'light' ? 'light' : 'dark');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const next = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
    });
  }

  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;
    const close = () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    };
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', close);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) close();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
  });

  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress > span');
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = progress + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  document.addEventListener('DOMContentLoaded', initScrollProgress);

})();
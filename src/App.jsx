import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';

const LAYER_DATA = {
  1: { badge: 'LAYER 01 // SAV INTAKE', title: 'Réception & classification omnicanale', desc: 'Collecte et qualification des demandes SAV depuis email, Outlook et ServiceNow avec routage vers l’agent spécialisé.', tags: ['Email / Outlook', 'ServiceNow'] },
  2: { badge: 'LAYER 02 // OCR VISION', title: 'Extraction documentaire OCR Vision', desc: 'Lecture et structuration automatique de pièces jointes et documents SAV afin d’alimenter le dossier incident avec des données exploitables.', tags: ['OCR Vision', 'Multi-canaux'] },
  3: { badge: 'LAYER 03 // RAG CONTEXTE', title: 'Contexte métier augmenté par RAG', desc: 'Recherche augmentée par génération pour retrouver les procédures, historiques et connaissances utiles au traitement du dossier.', tags: ['RAG', 'Connaissance métier'] },
  4: { badge: 'LAYER 04 // RULES ENGINE', title: 'Moteur de règles métier', desc: 'Application de règles déterministes pour prioriser, qualifier et router les incidents selon SLA, type de demande et impact client.', tags: ['Business Rules', 'SLA'] },
  5: { badge: 'LAYER 05 // LLM GENERATION', title: 'Génération LLM contrôlée', desc: 'Génération de réponses, synthèses et propositions d’action avec contrôle par règles, contexte RAG et validation métier.', tags: ['Ollama LLM', 'Réponses SAV'] },
  6: { badge: 'LAYER 06 // ITSM SYNC', title: 'ServiceNow bi-directionnel', desc: 'Synchronisation, création, mise à jour et résolution de tickets ServiceNow avec traçabilité complète et sécurité JWT.', tags: ['ServiceNow', 'JWT'] },
  7: { badge: 'LAYER 07 // ESCALADE', title: 'Relance & escalade intelligente', desc: 'Surveillance SLA/CSAT, relances automatisées et escalade managériale lorsque le traitement dépasse les seuils définis.', tags: ['Relance', 'Escalade SLA/CSAT'] },
};

const ACCENTS = [
  { id: 'crimson', name: 'Crimson', value: '#ef4444' },
  { id: 'orange', name: 'Orange', value: '#f97316' },
  { id: 'amber', name: 'Amber', value: '#f59e0b' },
  { id: 'emerald', name: 'Emerald', value: '#10b981' },
  { id: 'cyan', name: 'Cyan', value: '#06b6d4' },
  { id: 'violet', name: 'Violet', value: '#8b5cf6' },
  { id: 'pink', name: 'Pink', value: '#ec4899' },
];

const PROJECTS = [
  { id: 'SYS-01', category: 'ai', chip: 'Autonomous AI', title: 'Plateforme SAV Multi-Agents', desc: 'Pipeline de 7 agents IA pour automatiser email, Outlook et ServiceNow avec OCR Vision, RAG, règles métier, génération LLM et escalade.', tags: ['React 19', 'FastAPI', 'Ollama'] },
  { id: 'SYS-02', category: 'web', chip: 'SaaS RH', title: 'OnboardPro', desc: 'Plateforme SaaS RH & onboarding : matching de compétences, GED sécurisée, workflows RH Managers et recherche sémantique.', tags: ['Next.js 16', 'Supabase', 'Qdrant'] },
  { id: 'SYS-03', category: 'ai', chip: 'AI Workflow', title: 'n8n AI Automation', desc: 'Workflows internes automatisés avec n8n, API IA et outils cloud pour réduire les tâches répétitives et fiabiliser les processus.', tags: ['n8n', 'Zapier', 'Make'] },
  { id: 'SYS-04', category: 'web', chip: 'Realtime Commerce', title: 'Stock en temps réel', desc: 'Affichage dynamique de disponibilité produit pour améliorer l’expérience et la fiabilité commerciale.', tags: ['Full Stack', 'Realtime'] },
  { id: 'SYS-05', category: 'systems', chip: 'DevOps & Infra', title: 'Docker / CI/CD / Supabase', desc: 'Infrastructure Docker Compose multi-conteneurs, Supabase avec RLS, monitoring Prometheus et déploiement structuré.', tags: ['Docker', 'CI/CD', 'Prometheus'] },
  { id: 'SYS-06', category: 'ai', chip: 'RAG / LLM', title: 'RAG & LLM Integration', desc: 'Intégration RAG/LLM avec Ollama, contexte métier, ServiceNow, sécurité JWT et suivi SLA/CSAT.', tags: ['RAG', 'Ollama', 'ServiceNow'] },
];

const FILTERS = [
  { value: 'all', label: 'All Systems (6)' },
  { value: 'ai', label: 'AI Automation' },
  { value: 'web', label: 'Web & SaaS' },
  { value: 'systems', label: 'Core Engineering' },
];

function AuroraCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId = null;
    let isRunning = true;
    let frame = 0;
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    const orbs = [
      { x: 0.35, y: 0.40, radius: 0.50, vx: 0.0003, vy: 0.0002, color: 'rgba(239, 68, 68, 0.14)' },
      { x: 0.70, y: 0.45, radius: 0.42, vx: -0.0002, vy: 0.0003, color: 'rgba(185, 28, 28, 0.10)' },
      { x: 0.50, y: 0.80, radius: 0.48, vx: 0.0002, vy: -0.0002, color: 'rgba(255, 255, 255, 0.03)' },
    ];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMouseMove = (event) => {
      mouse.targetX = event.clientX / width;
      mouse.targetY = event.clientY / height;
    };
    const onVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };

    const render = () => {
      if (!isRunning) return;
      frame++;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      ctx.clearRect(0, 0, width, height);
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
    };
    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    };
    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();
    startLoop();

    return () => {
      stopLoop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas id="aurora-canvas" ref={canvasRef} aria-hidden="true" />;
}

function Toast({ message }) {
  return (
    <div id="toast" className={`toast-notification ${message ? 'show' : ''}`} aria-live="polite">
      <span className="toast-icon">✓</span>
      <span className="toast-text" id="toast-message">{message}</span>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [accent, setAccent] = useState('crimson');
  const [flashKey, setFlashKey] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeLayer, setActiveLayer] = useState(1);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');
  const scrollBarRef = useRef(null);
  const firstAccent = useRef(true);

  useEffect(() => {
    const saved = (() => { try { return localStorage.getItem('portfolio-theme'); } catch { return null; } })();
    const next = saved === 'light' ? 'light' : 'dark';
    setTheme(next);
    document.body.setAttribute('data-theme', next);
    document.documentElement.style.colorScheme = next;
  }, []);

  useEffect(() => {
    const saved = (() => { try { return localStorage.getItem('portfolio-accent'); } catch { return null; } })();
    const next = ACCENTS.some((item) => item.id === saved) ? saved : 'crimson';
    setAccent(next);
    document.body.setAttribute('data-accent', next);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-accent', accent);
    try { localStorage.setItem('portfolio-accent', accent); } catch {}
    if (firstAccent.current) {
      firstAccent.current = false;
      return;
    }
    setFlashKey((key) => key + 1);
    document.body.classList.remove('accent-change');
    void document.body.offsetWidth;
    document.body.classList.add('accent-change');
    const timeout = window.setTimeout(() => document.body.classList.remove('accent-change'), 650);
    return () => window.clearTimeout(timeout);
  }, [accent]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const bar = scrollBarRef.current;
    if (!bar) return;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = `${scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0}%`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const revealItems = document.querySelectorAll('.section-header, .flagship-card, .subgrid-card, .bento-card, .about-grid, .contact-card');
    revealItems.forEach((item) => item.classList.add('reveal-item'));
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
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
      } catch {}
    };
    const timeout = window.setTimeout(play, 1300);
    return () => window.clearTimeout(timeout);
  }, []);

  const copyEmail = () => {
    const email = 'haytamnajim07@gmail.com';
    const show = (message) => {
      setToast(message);
      window.setTimeout(() => setToast(''), 3200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => show(`Copied to clipboard: ${email}`)).catch(() => show(`Direct email: ${email}`));
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { document.execCommand('copy'); show(`Copied to clipboard: ${email}`); } catch { show(`Direct email: ${email}`); }
      document.body.removeChild(textarea);
    }
  };

  const toggleMobileMenu = () => setMobileOpen((open) => !open);
  const closeMobileMenu = () => setMobileOpen(false);
  const activeLayerData = LAYER_DATA[activeLayer];

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><span ref={scrollBarRef} /></div>
      <AuroraCanvas />

      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
        mobileOpen={mobileOpen}
        toggleMobile={toggleMobileMenu}
        closeMobile={closeMobileMenu}
      />

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-bg-grid" aria-hidden="true"><div className="grid-line line-1" /><div className="grid-line line-2" /><div className="grid-line line-3" /></div>
          <div className="hero-wordmark-svg" aria-hidden="true"><svg viewBox="0 0 1000 215" preserveAspectRatio="xMidYMid meet"><text x="0" y="205" fontSize="270" textLength="1000" lengthAdjust="spacingAndGlyphs">PORTFOLIO</text></svg></div>
          <div className="hero-stage-grid">
            <div className="hero-flank left-flank">
              <div className="hero-script">Bonjour, je suis</div>
              <h1 className="hero-name">HAITAM<span className="accent-red-dot">.</span></h1>
              <div className="hero-role-pill"><span className="pill-dot">●</span><span>DÉVELOPPEUR WEB FULL STACK & AI AUTOMATION</span></div>
              <p className="hero-desc">Je crée des <strong>applications web dynamiques</strong> et des <strong>automatisations IA</strong> pour les processus métiers — React, Node.js, Laravel, n8n, agents IA et CI/CD.</p>
              <div className="hero-actions"><a href="#contact" className="btn btn-crimson"><span>ME CONTACTER</span><svg className="btn-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a><a href="#flagships" className="btn btn-glass"><span>VOIR MES PROJETS</span></a></div>
              <div className="hero-stats-row"><div className="hero-stat-box"><span className="stat-val">7</span><span className="stat-lbl">Agents IA</span></div><div className="hero-stat-box"><span className="stat-val">2</span><span className="stat-lbl">Plateformes SaaS</span></div><div className="hero-stat-box"><span className="stat-val">3</span><span className="stat-lbl">Expériences Pro</span></div></div>
            </div>
            <div className="hero-center-col"><div className="hero-cutout-wrap"><div className="hero-portrait-panel" aria-hidden="true" /><img src="/haytam-photo.jpg" alt="HAITAM NAJIM" className="hero-cutout-img" width="480" height="480" loading="eager" /><div className="cutout-status-badge"><span className="status-pulse-red">●</span><span>AVAILABLE FOR FULL STACK ROLES</span></div></div></div>
            <div className="hero-flank right-flank"><div className="hud-stack">
              <div className="hud-card"><div className="hud-card-header"><span className="hud-idx">01.</span><span className="hud-tag">DXC TECHNOLOGY</span></div><div className="hud-card-title">Data Science & AI Automation</div><div className="hud-card-desc">Python, prompting, LangChain/LangGraph et agents IA pour des cas d’usage métiers.</div></div>
              <div className="hud-card"><div className="hud-card-header"><span className="hud-idx">02.</span><span className="hud-tag">ARK X</span></div><div className="hud-card-title">AI Workflow & Automation</div><div className="hud-card-desc">Workflows IA et automatisation interne avec n8n, API IA et outils cloud.</div></div>
              <div className="hud-card"><div className="hud-card-header"><span className="hud-idx">03.</span><span className="hud-tag">CASA MERCHANT</span></div><div className="hud-card-title">Stock en temps réel</div><div className="hud-card-desc">Solution dynamique de gestion de stock pour l’affichage en temps réel.</div></div>
              <div className="hud-tech-tags"><span className="tech-tag">React</span><span className="tech-tag">Node.js</span><span className="tech-tag">Laravel</span><span className="tech-tag">FastAPI</span><span className="tech-tag">n8n</span></div>
            </div></div>
          </div>
        </section>

        <div className="section-divider-bar" aria-hidden="true"><span className="divider-coord">// 01.00 SEC_ABOUT</span><span className="divider-line" /><span className="divider-index">INDEX [01 / 06]</span></div>

        <section id="about" className="section"><div className="section-header"><div className="section-tag">PROFIL</div><h2 className="section-title">Développeur Web Full Stack · AI Automation Specialist</h2></div><div className="about-container"><div className="glass-card about-grid"><div className="about-text-col"><p className="about-text">Développeur Web Full Stack orienté résultats, avec une expérience dans la création d’<strong>applications web dynamiques</strong> et l’<strong>automatisation intelligente de processus métiers</strong>. Maîtrise de React.js, Node.js, Laravel, ainsi que des pratiques DevOps et d’automatisation (n8n, agents IA, CI/CD).</p><p className="about-text">Curieux, innovant et axé sur l’utilisateur, je recherche un poste stimulant pour contribuer au succès de projets ambitieux. Basé à Casablanca, Maroc — disponible pour des opportunités full stack et automatisation IA.</p><div className="quote-box">"Je transforme des besoins métiers en interfaces utiles, automatisations fiables et produits web maintenables."</div></div><div className="about-principles-col"><ul className="principles-list"><li className="principle-item"><span className="principle-num">01</span><div><div className="principle-title">Impact mesurable</div><div className="principle-desc">Chaque livraison doit améliorer un indicateur : SLA, CSAT, temps de traitement, fiabilité ou expérience utilisateur.</div></div></li><li className="principle-item"><span className="principle-num">02</span><div><div className="principle-title">Automatisation utile</div><div className="principle-desc">n8n, Make, Zapier et agents IA intégrés aux outils existants : ServiceNow, API IA, CI/CD, alertes et dashboards.</div></div></li><li className="principle-item"><span className="principle-num">03</span><div><div className="principle-title">Stack pragmatique</div><div className="principle-desc">React/Next.js côté client, Node/Laravel/FastAPI côté API, Supabase/PostgreSQL, Docker, Prometheus et JWT.</div></div></li></ul></div></div></div></section>

        <div className="section-divider-bar" aria-hidden="true"><span className="divider-coord">// 02.00 SEC_FLAGSHIPS</span><span className="divider-line" /><span className="divider-index">INDEX [02 / 06]</span></div>

        <section id="flagships" className="section"><div className="section-header"><div className="section-tag">ARCHITECTURAL SHOWCASE</div><h2 className="section-title">Flagship Deployments</h2><p className="section-desc">Des applications full stack et pipelines IA déployés en contexte métier réel.</p></div><div className="flagship-container"><article className="glass-card flagship-card highlighted-card"><div className="card-glow-red" /><div className="flagship-header"><div className="flagship-badge"><span>●</span> IA // ENTERPRISE SAV</div><div className="flagship-meta">DXC Technology Morocco • Février 2026 – Juillet 2026 • Rabat · Sur site</div></div><div className="flagship-body"><div className="flagship-main-info"><h3 className="flagship-title">SAV Multi-Agents — Plateforme IA d’automatisation</h3><p className="flagship-desc">Back-office SaaS orchestrant un pipeline de 7 agents IA spécialisés (réception, OCR Vision, RAG contexte, moteur de règles métier, génération LLM, relance/escalade) pour automatiser le traitement d’incidents SAV multi-canaux.</p><div className="flagship-metrics-row"><div className="metric-pill"><div className="metric-num">7</div><div className="metric-desc">Agents IA</div></div><div className="metric-pill"><div className="metric-num">RAG</div><div className="metric-desc">Contexte métier</div></div><div className="metric-pill"><div className="metric-num">ITSM</div><div className="metric-desc">ServiceNow</div></div><div className="metric-pill"><div className="metric-num">JWT</div><div className="metric-desc">Accès sécurisé</div></div></div></div><div className="saai-architecture-explorer"><div className="explorer-header"><div className="explorer-title">7-AGENT SAV PIPELINE</div><div className="explorer-sub">Cliquez une couche pour inspecter le rôle</div></div><div className="layer-tabs" role="tablist">{[1,2,3,4,5,6,7].map((n) => <button key={n} className={`layer-tab ${activeLayer === n ? 'active' : ''}`} data-layer={n} role="tab" aria-selected={activeLayer === n} onClick={() => setActiveLayer(n)}>{`L${n}: ${{1:'Réception',2:'OCR Vision',3:'RAG',4:'Règles',5:'LLM',6:'ServiceNow',7:'Escalade'}[n]}`}</button>)}</div><div className="layer-inspector-pane"><div id="layer-content"><div className="layer-inspect-badge" id="layer-inspect-id">{activeLayerData.badge}</div><h4 className="layer-inspect-title" id="layer-inspect-title">{activeLayerData.title}</h4><p className="layer-inspect-desc" id="layer-inspect-desc">{activeLayerData.desc}</p><div className="tech-tags-group" id="layer-inspect-tags">{activeLayerData.tags.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}</div></div></div></div></div></article><div className="flagship-subgrid"><article className="glass-card subgrid-card"><div className="subgrid-top"><div className="subgrid-badge-row"><div className="flagship-badge">SAAS // RH</div></div><h3 className="subgrid-title">OnboardPro — Plateforme SaaS RH & Onboarding</h3><p className="subgrid-desc">Ark-X Talent Solutions · Décembre 2025. Plateforme d’onboarding avec matching de compétences, GED sécurisée et workflows de validation.</p><ul className="spec-list"><li className="spec-item">Next.js 16, React 19, TypeScript, Tailwind CSS v4</li><li className="spec-item">Supabase PostgreSQL + RLS pour confidentialité RH</li><li className="spec-item">Qdrant pour recherche sémantique + Docker Compose</li></ul></div><div className="subgrid-footer"><span className="tech-tag">Next.js 16</span><span className="tech-tag">Supabase</span><span className="tech-tag">Qdrant</span></div></article><article className="glass-card subgrid-card"><div className="subgrid-top"><div className="subgrid-badge-row"><div className="flagship-badge">AUTOMATION // N8N</div></div><h3 className="subgrid-title">Ark X — Workflows IA & automatisation</h3><p className="subgrid-desc">Octobre 2025 – Mars 2026 · Casablanca. Développement de workflows IA et automatisation de processus internes avec n8n, API IA et outils cloud.</p><ul className="spec-list"><li className="spec-item">Pipelines d’automatisation IA maintenables</li><li className="spec-item">Intégration API IA et monitoring</li><li className="spec-item">Amélioration continue des process internes</li></ul></div><div className="subgrid-footer"><span className="tech-tag">n8n</span><span className="tech-tag">API IA</span><span className="tech-tag">Cloud</span></div></article><article className="glass-card subgrid-card"><div className="subgrid-top"><div className="subgrid-badge-row"><div className="flagship-badge">COMMERCE // REALTIME</div></div><h3 className="subgrid-title">Casa Merchant — Disponibilité produit temps réel</h3><p className="subgrid-desc">Avril 2025 – Mai 2025 · Casablanca. Analyse du site entreprise et conception d’une solution dynamique de gestion de stock.</p><ul className="spec-list"><li className="spec-item">Identification du problème d’affichage stock</li><li className="spec-item">Solution de disponibilité en temps réel</li><li className="spec-item">Impact direct sur l’expérience client</li></ul></div><div className="subgrid-footer"><span className="tech-tag">Web Full Stack</span><span className="tech-tag">Stock</span><span className="tech-tag">Realtime</span></div></article></div></div></section>

        <div className="section-divider-bar" aria-hidden="true"><span className="divider-coord">// 03.00 SEC_MATRIX</span><span className="divider-line" /><span className="divider-index">INDEX [03 / 06]</span></div>

        <section id="projects" className="section"><div className="section-header"><div className="section-tag">ENGINEERING INDEX</div><h2 className="section-title">The Systems Matrix</h2><p className="section-desc">Une sélection de mes systèmes full stack, IA et DevOps.</p><div className="bento-controls">{FILTERS.map((item) => <button key={item.value} className={`filter-btn ${filter === item.value ? 'active' : ''}`} data-filter={item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}</div></div><div className="bento-grid">{PROJECTS.map((project) => <div key={project.id} className={`glass-card bento-card ${filter === 'all' || filter === project.category ? '' : 'hidden'}`} data-category={project.category}><div className="bento-top"><span className="category-chip">{project.chip}</span><span className="bento-id">#{project.id}</span></div><h3 className="bento-title">{project.title}</h3><p className="bento-desc">{project.desc}</p><div className="bento-footer"><div className="bento-tags">{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div></div></div>)}</div></section>

        <div className="section-divider-bar" aria-hidden="true"><span className="divider-coord">// 04.00 SEC_PARCOURS</span><span className="divider-line" /><span className="divider-index">INDEX [04 / 06]</span></div>

        <section id="formation" className="section"><div className="section-header"><div className="section-tag">PARCOURS</div><h2 className="section-title">Formation & Certifications</h2><p className="section-desc">Un parcours web full stack complété par des certifications IBM, Meta, AWS et MongoDB.</p></div><div className="about-container"><div className="glass-card about-grid"><div className="about-text-col"><ul className="principles-list"><li className="principle-item"><span className="principle-num">01</span><div><div className="principle-title">Licence Professionnelle — Full Stack & DevOps</div><div className="principle-desc">Nov. 2025 – Juillet 2026 · Faculté des Sciences Ain Chock, Casablanca</div></div></li><li className="principle-item"><span className="principle-num">02</span><div><div className="principle-title">Technicien Spécialisé — Web Full Stack</div><div className="principle-desc">Sept. 2023 – Juin 2025 · OFPPT NTIC 2 SM, Casablanca</div></div></li><li className="principle-item"><span className="principle-num">03</span><div><div className="principle-title">Baccalauréat Sciences Physiques</div><div className="principle-desc">Sept. 2022 – Juillet 2023 · Lycée Omar Ben-Alkhattab, Casablanca</div></div></li></ul></div><div className="about-principles-col"><ul className="principles-list"><li className="principle-item"><span className="principle-num">IBM</span><div><div className="principle-title">Mobile App, JavaScript & DevOps</div><div className="principle-desc">Mobile App Development · JavaScript Essentials · Introduction to DevOps (2026)</div></div></li><li className="principle-item"><span className="principle-num">META</span><div><div className="principle-title">React & JavaScript — bases</div><div className="principle-desc">Les bases de React · Programmation avec JavaScript (2025)</div></div></li><li className="principle-item"><span className="principle-num">AWS</span><div><div className="principle-title">Cloud Essentials & MongoDB CRUD</div><div className="principle-desc">AWS Cloud Essentials for Business Leaders (2025) · MongoDB CRUD Operations (2026) · Board Infinity Master Full-Stack Laravel & PHP (2025)</div></div></li><li className="principle-item"><span className="principle-num">LANG</span><div><div className="principle-title">Français / Arabe / Anglais</div><div className="principle-desc">Français : avancé · Arabe : avancé · Anglais : intermédiaire</div></div></li></ul></div></div></div></section>

        <div className="section-divider-bar" aria-hidden="true"><span className="divider-coord">// 05.00 SEC_CONTACT</span><span className="divider-line" /><span className="divider-index">INDEX [05 / 06]</span></div>

        <section id="contact" className="section"><div className="glass-card contact-card"><div className="contact-glow-red" /><div className="contact-content"><div className="section-tag">DIRECT CONNECT</div><h2 className="contact-title">Construisons quelque chose d’utile.</h2><p className="contact-subtitle">Disponible pour des missions de développement web full stack, SaaS, automatisation IA et intégration CI/CD.</p><div className="email-action-box"><span className="email-address">haytamnajim07@gmail.com</span><button className="btn btn-primary copy-btn" onClick={copyEmail} aria-label="Copier l’email"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg><span>Copy Email Address</span></button></div><div className="social-links-row"><a href="https://linkedin.com/in/haytamnajim" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1a6 6 0 0 1 2-1z" /><rect x="2" y="9" width="4" height="12" /><path d="M4 4h.01" /></svg><span>linkedin.com/in/haytamnajim</span></a><a href="https://haitam-najim.me" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Site web"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg><span>haitam-najim.me</span></a><a href="tel:+212709048305" className="social-pill" aria-label="Téléphone"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.28-1.16a2 2 0 0 1 2.11.45c.9.33 1.84.58 2.8.7A2 2 0 0 1 22 16.92z" /></svg><span>+212 709 048 305</span></a></div><div className="footer-meta"><span>© 2026 HAITAM NAJIM. Casablanca, Maroc.</span><span>Full Stack · AI Automation · DevOps</span></div></div></div></section>
      </main>

      <div className="color-palette" role="toolbar" aria-label="Palette de couleurs">
        <span className="color-palette-label">THEME</span>
        {ACCENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`color-dot ${accent === item.id ? 'active' : ''}`}
            style={{ '--dot-color': item.value }}
            onClick={() => setAccent(item.id)}
            aria-label={`Changer le thème en ${item.name}`}
            title={item.name}
          />
        ))}
      </div>

      {flashKey > 0 && (
        <div
          key={flashKey}
          className="accent-flash"
          style={{ '--flash-color': ACCENTS.find((item) => item.id === accent)?.value || '#ef4444' }}
          aria-hidden="true"
        />
      )}

      <Toast message={toast} />
    </>
  );
}

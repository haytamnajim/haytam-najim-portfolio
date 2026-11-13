import React from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'Profil' },
  { href: '#flagships', label: 'Projets' },
  { href: '#projects', label: 'Matrix' },
  { href: '#formation', label: 'Formation' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ activeSection, theme, toggleTheme, mobileOpen, toggleMobile, closeMobile }) {
  return (
    <header className="dock-container">
      <nav className="nav-dock" aria-label="Navigation principale">
        <a href="#hero" className="nav-brand" aria-label="HAITAM NAJIM — Accueil" onClick={closeMobile}>
          <span className="brand-monogram">HN</span>
          <span className="brand-label">HAITAM<span className="brand-dot">.</span></span>
        </a>

        <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-item ${activeSection === link.href.slice(1) ? 'active' : ''}`}
              onClick={closeMobile}
              aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="dock-right">
          <div className="dock-status" title="Disponible pour de nouvelles opportunités">
            <span className="status-dot" />
            <span className="status-text">Available</span>
          </div>
          <a href="#contact" className="dock-cta" onClick={closeMobile}>DISPATCH →</a>
          <div className="dock-controls">
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Passer en thème sombre' : 'Passer en thème clair'}
              title="Basculer thème"
            >
              {theme === 'light' ? '☾' : '☀'}
            </button>
            <button
              className="mobile-menu-toggle"
              type="button"
              onClick={toggleMobile}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              title="Menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

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
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              )}
            </button>
            <button
              className="mobile-menu-toggle"
              type="button"
              onClick={toggleMobile}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              title="Menu"
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

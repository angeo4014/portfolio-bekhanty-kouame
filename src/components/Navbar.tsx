import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/profile';
import { useScrollState } from '../hooks/useScrollState';
import { Close, Download, Mail } from './Icons';

export function Navbar() {
  const { scrolled, progress, active } = useScrollState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner">
          <a className="brand" href="#accueil" aria-label="Retour en haut de page">
            <span className="brand__mark" aria-hidden="true">
              BK
            </span>
            <span className="brand__name">
              {profile.displayName}
              <small>{profile.familyName}</small>
            </span>
          </a>

          <nav className="nav__links" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href ? 'is-active' : ''}
                aria-current={active === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="btn btn--primary btn--sm nav__cta" href={profile.cv} download>
              <Download size={16} />
              <span>Télécharger mon CV</span>
            </a>
            <button
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <Close size={22} />
              ) : (
                <span className="burger-lines" aria-hidden="true">
                  <i />
                  <i />
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="nav__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <nav aria-label="Navigation mobile">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : '0ms' }}
              tabIndex={open ? 0 : -1}
            >
              <span className="mobile-menu__index">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <a className="btn btn--primary" href={profile.cv} download>
            <Download size={18} />
            Télécharger mon CV
          </a>
          <a className="mobile-menu__mail" href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}

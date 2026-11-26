import { navLinks, profile } from '../data/profile';
import { ArrowUp, Download, Mail } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="brand__mark" aria-hidden="true">
              BK
            </span>
            <div>
              <p className="footer__name">{profile.fullName}</p>
              <p className="footer__role">{profile.role}</p>
            </div>
          </div>

          <div className="footer__actions">
            <a className="btn btn--ghost btn--sm" href={profile.cv} download>
              <Download size={16} />
              CV
            </a>
            <a className="btn btn--ghost btn--sm" href={`mailto:${profile.email}`}>
              <Mail size={16} />
              E-mail
            </a>
            <a className="btn btn--primary btn--sm" href="#accueil" aria-label="Revenir en haut">
              <ArrowUp size={16} />
              Haut
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {profile.displayName} {profile.familyName}
          </p>
          <nav aria-label="Navigation de pied de page">
            {navLinks.slice(1).map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

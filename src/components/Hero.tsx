import { useRef, type PointerEvent } from 'react';
import { profile } from '../data/profile';
import { useTypewriter } from '../hooks/useTypewriter';
import { ArrowRight, Download, Image as ImageIcon, MapPin, Sparkle } from './Icons';

export function Hero() {
  const typed = useTypewriter(profile.roles);
  const heroRef = useRef<HTMLElement | null>(null);

  const handlePointer = (event: PointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty('--mx', `${x.toFixed(3)}`);
    hero.style.setProperty('--my', `${y.toFixed(3)}`);
  };

  return (
    <section id="accueil" className="hero" ref={heroRef} onPointerMove={handlePointer}>
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__orb hero__orb--one" />
        <span className="hero__orb hero__orb--two" />
        <span className="hero__dots" />
      </div>

      <div className="container hero__grid">
        <div className="hero__content">
          <p className="hero__badge">
            <span className="dot" aria-hidden="true" />
            <MapPin size={15} />
            {profile.location}
          </p>

          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--name">{profile.familyName}</span>
            <span className="hero__title-line hero__title-line--accent">{profile.displayName}</span>
          </h1>

          <p className="hero__typed" aria-label={profile.role}>
            <span aria-hidden="true">{typed}</span>
            <span className="caret" aria-hidden="true" />
          </p>

          <p className="hero__pitch">{profile.pitch}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projets">
              Découvrir mes projets
              <ArrowRight size={18} />
            </a>
            <a className="btn btn--ghost" href={profile.cv} download>
              <Download size={18} />
              Télécharger mon CV
            </a>
          </div>

          <dl className="hero__facts">
            <div>
              <dt>Formation</dt>
              <dd>Licence Pro Informatique Décisionnelle</dd>
            </div>
            <div>
              <dt>Établissement</dt>
              <dd>HETEC</dd>
            </div>
          </dl>
        </div>

        <div className="hero__visual">
          <span className="hero__visual-ring" aria-hidden="true" />
          <div className="portrait">
            <div className="portrait__media">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={`Portrait de ${profile.fullName}`}
                  width={640}
                  height={800}
                />
              ) : (
                <div className="portrait__placeholder">
                  <span className="portrait__initials" aria-hidden="true">
                    KB
                  </span>
                  <span className="portrait__hint">
                    <ImageIcon size={18} />
                    Emplacement de votre portrait
                  </span>
                  <code>public/portrait.jpg</code>
                </div>
              )}
              <span className="portrait__glow" aria-hidden="true" />
            </div>

            <div className="portrait__tag portrait__tag--role">
              <Sparkle size={16} />
              <span>Full-Stack</span>
            </div>
            <div className="portrait__tag portrait__tag--bottom">
              <span className="portrait__tag-label">Diplômé</span>
              <strong>HETEC</strong>
            </div>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#apropos" aria-label="Faire défiler vers la section À propos">
        <span aria-hidden="true" />
        Défiler
      </a>
    </section>
  );
}

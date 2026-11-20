import { about, marqueeItems } from '../data/profile';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {marqueeItems.map((item) => (
              <span key={`${copy}-${item}`}>
                {item}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="apropos" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="À propos"
          title={
            <>
              Un profil à la croisée du <em>développement</em> et de la <em>donnée</em>.
            </>
          }
        />

        <div className="about__grid">
          <Reveal className="about__statement-card">
            <blockquote>{about.statement}</blockquote>
            <div className="about__meta">
              <div>
                <h3>Langues</h3>
                <ul className="about__languages">
                  {about.languages.map((language) => (
                    <li key={language.label}>
                      <span>{language.label}</span>
                      <small>{language.level}</small>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Centres d’intérêt</h3>
                <ul className="about__chips">
                  {about.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="about__text">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 90}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={270}>
              <ul className="about__values">
                <li>
                  <strong>Rigueur</strong>
                  <span>Une méthode claire, du cadrage à la livraison.</span>
                </li>
                <li>
                  <strong>Curiosité</strong>
                  <span>Une veille constante sur les outils et usages du numérique.</span>
                </li>
                <li>
                  <strong>Impact</strong>
                  <span>Des solutions pensées pour l’usage réel, pas pour la démonstration.</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

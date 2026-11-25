import { useEffect, useRef, useState } from 'react';
import { about, marqueeItems } from '../data/profile';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(34);
  const groupWidthRef = useRef(0);
  const [copyCount, setCopyCount] = useState(4);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [clickPaused, setClickPaused] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const group = groupRef.current;
    if (!marquee || !group) return;

    const measure = () => {
      const groupWidth = group.getBoundingClientRect().width;
      if (!groupWidth) return;

      groupWidthRef.current = groupWidth;
      const copies = Math.max(2, Math.ceil(marquee.clientWidth / groupWidth) + 2);
      setCopyCount((current) => (current === copies ? current : copies));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(marquee);
    observer.observe(group);
    measure();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (prefersReducedMotion) {
      speedRef.current = 0;
      offsetRef.current = 0;
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    let frame = 0;
    let previousTime = 0;

    const animate = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;

      const paused = pointerInside || focusWithin || clickPaused;
      const targetSpeed = paused ? 0 : 34;
      const easing = 1 - Math.exp(-delta / 0.45);
      speedRef.current += (targetSpeed - speedRef.current) * easing;

      const width = groupWidthRef.current;
      if (width > 0) {
        offsetRef.current = (offsetRef.current + speedRef.current * delta) % width;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      if (Math.abs(speedRef.current) >= 0.1 || Math.abs(targetSpeed - speedRef.current) >= 0.1) {
        frame = window.requestAnimationFrame(animate);
      } else {
        speedRef.current = targetSpeed;
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [clickPaused, focusWithin, pointerInside, prefersReducedMotion]);

  return (
    <div
      className="marquee"
      ref={marqueeRef}
      role="region"
      aria-label="Technologies utilisées"
      onPointerEnter={() => setPointerInside(true)}
      onPointerLeave={() => {
        setPointerInside(false);
        setClickPaused(false);
        setSelectedItem(null);
        const activeElement = document.activeElement;
        setFocusWithin(
          activeElement instanceof HTMLElement && activeElement.matches(':focus-visible'),
        );
      }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setFocusWithin(false);
          setClickPaused(false);
          setSelectedItem(null);
        }
      }}
    >
      <div className="marquee__track" ref={trackRef}>
        {Array.from({ length: copyCount }, (_, copy) => (
          <div
            className="marquee__group"
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            aria-hidden={copy > 0}
          >
            {marqueeItems.map((item) => (
              <button
                className={`marquee__item${selectedItem === item ? ' is-selected' : ''}`}
                key={item}
                type="button"
                tabIndex={copy === 0 ? undefined : -1}
                aria-pressed={selectedItem === item}
                onClick={() => {
                  setSelectedItem(item);
                  setClickPaused(true);
                }}
              >
                {item}
                <i aria-hidden="true">✦</i>
              </button>
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

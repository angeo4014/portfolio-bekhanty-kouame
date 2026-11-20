import { useEffect, useState } from 'react';

export function Loader() {
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';

    const close = window.setTimeout(() => setLeaving(true), reduce ? 250 : 1250);
    const unmount = window.setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = '';
    }, reduce ? 400 : 1950);

    return () => {
      window.clearTimeout(close);
      window.clearTimeout(unmount);
      document.body.style.overflow = '';
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`loader ${leaving ? 'is-leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Chargement du portfolio"
    >
      <div className="loader__inner">
        <span className="loader__monogram" aria-hidden="true">
          K<span>B</span>
        </span>
        <div className="loader__bar" aria-hidden="true">
          <span />
        </div>
        <p className="loader__label">Portfolio · Développeur Full-Stack</p>
      </div>
    </div>
  );
}

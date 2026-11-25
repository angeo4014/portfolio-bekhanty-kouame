import { useEffect, useState } from 'react';

export function CursorFollowers() {
  const [position, setPosition] = useState({ x: -100, y: -100, active: false });

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      setPosition({ x: event.clientX, y: event.clientY, active: true });
    };

    const hideFollowers = () => setPosition((current) => ({ ...current, active: false }));
    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hideFollowers();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('blur', hideFollowers);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('blur', hideFollowers);
    };
  }, []);

  return (
    <div className={`cursor-followers${position.active ? ' is-active' : ''}`} aria-hidden="true">
      <span
        className="cursor-followers__item cursor-followers__item--dot"
        style={{ left: position.x, top: position.y }}
      />
      <span
        className="cursor-followers__item cursor-followers__item--ring"
        style={{ left: position.x, top: position.y }}
      />
      <span
        className="cursor-followers__item cursor-followers__item--halo"
        style={{ left: position.x, top: position.y }}
      />
    </div>
  );
}

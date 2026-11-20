import { useEffect, useState } from 'react';

/** Effet machine à écrire qui alterne les titres professionnels. */
export function useTypewriter(words: string[], speed = 75, pause = 1900) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }

    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    } else {
      timeout = window.setTimeout(
        () =>
          setText(
            deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
          ),
        deleting ? speed / 2 : speed,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

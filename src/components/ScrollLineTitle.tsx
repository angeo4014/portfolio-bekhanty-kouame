import { isValidElement, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

type TitleToken = {
  text: string;
  isSpace: boolean;
  emphasized: boolean;
};

function tokenize(node: ReactNode, emphasized = false): TitleToken[] {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
      .split(/(\s+)/)
      .filter(Boolean)
      .map((text) => ({ text, isSpace: /^\s+$/.test(text), emphasized }));
  }

  if (Array.isArray(node)) {
    return node.flatMap((child) => tokenize(child, emphasized));
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return tokenize(node.props.children, emphasized || node.type === 'em');
  }

  return [];
}

function ScrollWord({
  children,
  progress,
  index,
  count,
  emphasized,
  reducedMotion,
  transitionDelay,
  wordRef,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
  emphasized: boolean;
  reducedMotion: boolean;
  transitionDelay: string;
  wordRef: (element: HTMLSpanElement | null) => void;
}) {
  const start = count === 1 ? 0 : (index / (count - 1)) * 0.8;
  const opacity = useTransform(progress, [start, start + 0.2], [0.15, 1]);

  return (
    <span className="section-heading__line-word">
      <motion.span
        className="section-heading__line-word-inner"
        ref={wordRef}
        style={{ opacity: reducedMotion ? 1 : opacity, transitionDelay }}
      >
        {emphasized ? <em>{children}</em> : children}
      </motion.span>
    </span>
  );
}

export function ScrollLineTitle({ title }: { title: ReactNode }) {
  const tokens = useMemo(() => tokenize(title), [title]);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [lineByWord, setLineByWord] = useState<number[]>([]);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start end', 'end start'],
  });
  const wordCount = tokens.filter((token) => !token.isSpace).length;
  const accessibleTitle = tokens.map((token) => token.text).join('');

  useLayoutEffect(() => {
    const heading = wordRefs.current.find((word) => word)?.closest('h2');
    if (!heading) return;

    let frame = 0;
    const measureLines = () => {
      const positions: number[] = [];
      let line = -1;
      let previousTop = Number.NaN;

      wordRefs.current.slice(0, wordCount).forEach((word) => {
        if (!word) return;
        const top = word.parentElement?.getBoundingClientRect().top;
        if (top === undefined) return;
        if (!Number.isFinite(previousTop) || Math.abs(top - previousTop) > 1) line += 1;
        positions.push(line);
        previousTop = top;
      });

      setLineByWord((current) =>
        current.length === positions.length &&
        current.every((position, index) => position === positions[index])
          ? current
          : positions,
      );
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measureLines);
    };

    measureLines();
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleMeasure);
    observer?.observe(heading);
    window.addEventListener('resize', scheduleMeasure);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [wordCount]);

  let wordIndex = 0;

  return (
    <h2 ref={headingRef} className="section-heading__title" aria-label={accessibleTitle}>
      <span aria-hidden="true">
        {tokens.map((token, index) => {
          if (token.isSpace) return token.text;

          const currentWord = wordIndex++;
          const delay = (lineByWord[currentWord] ?? 0) * 90;

          return (
            <ScrollWord
              key={`${token.text}-${index}`}
              progress={scrollYProgress}
              index={currentWord}
              count={wordCount}
              emphasized={token.emphasized}
              reducedMotion={reducedMotion}
              transitionDelay={`${delay}ms`}
              wordRef={(element) => {
                wordRefs.current[currentWord] = element;
              }}
            >
              {token.text}
            </ScrollWord>
          );
        })}
      </span>
    </h2>
  );
}

import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { ScrollLineTitle } from './ScrollLineTitle';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="section-heading">
      <Reveal>
        <p className="eyebrow">
          <span aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <ScrollLineTitle title={title} />
      </Reveal>
      {description ? (
        <Reveal delay={150}>
          <p className="section-heading__description">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

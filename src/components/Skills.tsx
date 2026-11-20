import { skillCategories, type IconKey } from '../data/profile';
import { Code, Database, Layers, Server, Tools } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<IconKey, typeof Code> = {
  code: Code,
  server: Server,
  database: Database,
  layers: Layers,
  tools: Tools,
};

export function Skills() {
  return (
    <section id="competences" className="section skills">
      <div className="container">
        <div className="skills__head">
          <SectionHeading
            eyebrow="Compétences"
            title={
              <>
                Une boîte à outils <em>cohérente</em>, du front à la donnée.
              </>
            }
            description="Les technologies que j’utilise pour concevoir, développer et interroger des applications web."
          />
          <Reveal delay={120} className="skills__note">
            <p>
              Chaque projet mobilise les outils adaptés au besoin : structuration des données,
              développement de l’interface et mise en service.
            </p>
          </Reveal>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon];
            return (
              <Reveal key={category.title} delay={index * 70}>
                <article className="skill-card">
                  <span className="skill-card__icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3>{category.title}</h3>
                  <p className="skill-card__summary">{category.summary}</p>
                  <ul className="skill-card__list">
                    {category.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

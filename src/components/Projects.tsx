import { profile, projects } from '../data/profile';
import { ArrowRight, Image as ImageIcon } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  return (
    <section id="projets" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Projets"
          title={
            <>
              Des réalisations pensées pour <em>l’usage réel</em>.
            </>
          }
          description="Deux projets qui illustrent ma façon de travailler : comprendre un besoin, modéliser, puis livrer une solution utilisable."
        />

        <div className="projects__list">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 60}>
              <article className={`case ${index % 2 === 1 ? 'case--reverse' : ''}`}>
                <div className="case__visual">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`Aperçu du projet ${project.name}`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="case__art" aria-hidden="true">
                      <span className="case__art-grid" />
                      <span className="case__art-orb" />
                      <span className="case__art-monogram">{project.name.slice(0, 2)}</span>
                      <span className="case__art-caption">
                        <ImageIcon size={16} />
                        Aperçu du projet
                      </span>
                    </div>
                  )}
                  <span className="case__index" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>

                <div className="case__body">
                  <p className="case__meta">
                    <span>{project.type}</span>
                    <span aria-hidden="true" className="case__meta-dot" />
                    <span>{project.year}</span>
                  </p>
                  <h3 className="case__title">{project.name}</h3>
                  <p className="case__description">{project.description}</p>

                  <ul className="case__highlights">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <ul className="stack-tags" aria-label="Technologies utilisées">
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  <div className="case__links">
                    {project.links?.length ? (
                      project.links.map((link) => (
                        <a
                          key={link.href}
                          className="link-arrow"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {link.label}
                          <ArrowRight size={16} />
                        </a>
                      ))
                    ) : (
                      <a className="link-arrow" href="#contact">
                        Demander une démonstration
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="projects__cta">
            <p>
              Vous souhaitez en savoir plus sur un projet ou en discuter ?
            </p>
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              Écrire un message
              <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

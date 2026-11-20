import { educationNote, experience, timeline } from '../data/profile';
import { Briefcase, Calendar, GraduationCap, MapPin } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Journey() {
  return (
    <section id="parcours" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Parcours académique"
          title={
            <>
              Une progression <em>continue</em>, du code à la décision.
            </>
          }
          description="Un parcours construit à HETEC, du développement d’applications à l’informatique décisionnelle."
        />

        <ol className="timeline">
          {timeline.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <li className="timeline__item">
                <span className="timeline__node" aria-hidden="true">
                  <GraduationCap size={16} />
                </span>
                <div className="timeline__year">
                  <Calendar size={14} />
                  {item.period}
                </div>
                <div className="timeline__content">
                  <span className="timeline__tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p className="timeline__school">{item.school}</p>
                  <p>{item.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="journey__note">{educationNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading
          eyebrow="Expérience professionnelle"
          title={
            <>
              Le terrain, la <em>vraie</em> école du produit.
            </>
          }
        />

        <Reveal>
          <article className="experience-card">
            <div className="experience-card__aside">
              <span className="experience-card__icon" aria-hidden="true">
                <Briefcase size={22} />
              </span>
              <p className="experience-card__period">{experience.period}</p>
              <p className="experience-card__place">
                <MapPin size={14} />
                {experience.location}
              </p>
            </div>

            <div className="experience-card__body">
              <h3>{experience.role}</h3>
              <p className="experience-card__org">{experience.organization}</p>
              <p className="experience-card__summary">{experience.summary}</p>

              <h4>Missions &amp; réalisations</h4>
              <ul className="experience-card__missions">
                {experience.missions.map((mission) => (
                  <li key={mission}>{mission}</li>
                ))}
              </ul>

              <ul className="stack-tags" aria-label="Technologies utilisées">
                {experience.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

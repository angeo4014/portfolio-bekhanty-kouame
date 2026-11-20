import { useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { ArrowRight, Check, Copy, Mail, MapPin, Phone, WhatsApp } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

type FormState = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { name: '', email: '', subject: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  'Bonjour Bekhanty, je vous contacte au sujet de votre portfolio.',
)}`;

const validate = (values: FormState): Errors => {
  const next: Errors = {};
  if (values.name.trim().length < 2) next.name = 'Merci d’indiquer votre nom.';
  if (!emailPattern.test(values.email.trim()))
    next.email = 'Merci d’indiquer une adresse e-mail valide.';
  if (values.subject.trim().length < 3) next.subject = 'Merci de préciser l’objet du message.';
  if (values.message.trim().length < 10)
    next.message = 'Merci de détailler un peu votre message (10 caractères minimum).';
  return next;
};

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [mailto, setMailto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      setMailto(null);
      return;
    }

    const body = [
      `Nom : ${form.name.trim()}`,
      `E-mail : ${form.email.trim()}`,
      '',
      form.message.trim(),
      '',
      '— Envoyé depuis le portfolio.',
    ].join('\r\n');

    const link = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject.trim(),
    )}&body=${encodeURIComponent(body)}`;

    setMailto(link);
    window.location.href = link;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const field = (
    key: keyof FormState,
    label: string,
    placeholder: string,
    options?: { textarea?: boolean; type?: string; autoComplete?: string },
  ) => (
    <div className={`field ${errors[key] ? 'has-error' : ''}`}>
      <label htmlFor={`field-${key}`}>{label}</label>
      {options?.textarea ? (
        <textarea
          id={`field-${key}`}
          name={key}
          rows={5}
          placeholder={placeholder}
          value={form[key]}
          onChange={(event) => update(key, event.target.value)}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `error-${key}` : undefined}
          required
        />
      ) : (
        <input
          id={`field-${key}`}
          name={key}
          type={options?.type ?? 'text'}
          placeholder={placeholder}
          autoComplete={options?.autoComplete}
          value={form[key]}
          onChange={(event) => update(key, event.target.value)}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `error-${key}` : undefined}
          required
        />
      )}
      {errors[key] ? (
        <p className="field__error" id={`error-${key}`} role="alert">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__intro">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Discutons de votre <em>prochain projet</em>.
                </>
              }
              description="Disponible pour échanger autour d’une opportunité, d’une collaboration ou d’une idée à concrétiser. Réponse sous 48 h."
            />

            <Reveal delay={120}>
              <ul className="contact__list">
                <li>
                  <a href={`mailto:${profile.email}`}>
                    <span className="contact__icon" aria-hidden="true">
                      <Mail size={18} />
                    </span>
                    <span>
                      <small>E-mail</small>
                      {profile.email}
                    </span>
                  </a>
                  <button
                    type="button"
                    className="contact__copy"
                    onClick={copyEmail}
                    aria-label="Copier l’adresse e-mail"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span aria-live="polite">{copied ? 'Copié' : 'Copier'}</span>
                  </button>
                </li>
                <li>
                  <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                    <span className="contact__icon" aria-hidden="true">
                      <Phone size={18} />
                    </span>
                    <span>
                      <small>Téléphone</small>
                      {profile.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                    <span className="contact__icon" aria-hidden="true">
                      <WhatsApp size={18} />
                    </span>
                    <span>
                      <small>WhatsApp</small>
                      Discuter maintenant
                    </span>
                  </a>
                </li>
                <li>
                  <span className="contact__static">
                    <span className="contact__icon" aria-hidden="true">
                      <MapPin size={18} />
                    </span>
                    <span>
                      <small>Localisation</small>
                      {profile.location}
                    </span>
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={80} className="contact__form-wrap">
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__row">
                {field('name', 'Nom complet', 'Votre nom', { autoComplete: 'name' })}
                {field('email', 'E-mail', 'vous@exemple.com', {
                  type: 'email',
                  autoComplete: 'email',
                })}
              </div>
              {field('subject', 'Objet', 'Sujet de votre message')}
              {field('message', 'Message', 'Décrivez votre besoin en quelques lignes…', {
                textarea: true,
              })}

              <button type="submit" className="btn btn--primary contact__submit">
                Envoyer le message
                <ArrowRight size={18} />
              </button>

              <p className="contact__hint">
                L’envoi ouvre votre messagerie avec le message prérempli, à destination de{' '}
                <strong>{profile.email}</strong>.
              </p>

              {mailto ? (
                <div className="contact__sent" role="status" aria-live="polite">
                  <span className="contact__sent-icon" aria-hidden="true">
                    <Check size={18} />
                  </span>
                  <p>
                    Votre messagerie devrait s’ouvrir. Si rien ne se passe,{' '}
                    <a href={mailto}>ouvrez le message manuellement</a>.
                  </p>
                </div>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

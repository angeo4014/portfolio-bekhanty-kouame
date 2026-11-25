/**
 * SOURCE UNIQUE DE CONTENU
 * ---------------------------------------------------------------------------
 * Toutes les informations du portfolio sont centralisées ici.
 * Pour ajouter un projet : ajoutez un objet dans `projects`.
 * Pour ajouter une compétence : complétez le tableau `items` d'une catégorie.
 * Pour publier votre portrait : déposez le fichier dans /public (ex. portrait.jpg)
 * puis renseignez `photo: '/portrait.jpg'`.
 * ---------------------------------------------------------------------------
 */

export type IconKey =
  | 'code'
  | 'server'
  | 'database'
  | 'layers'
  | 'tools';

export interface SkillCategory {
  title: string;
  icon: IconKey;
  summary: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  year: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Captures réelles : déposez une image dans /public puis renseignez son chemin. */
  image?: string;
  links?: { label: string; href: string }[];
}

export interface TimelineItem {
  period: string;
  title: string;
  school: string;
  description: string;
  tag: string;
}

export const profile = {
  fullName: 'KOUAME Bekhanty Ange Stéphane Armel',
  displayName: 'Bekhanty',
  familyName: 'KOUAME',
  role: 'Développeur Full-Stack',
  roles: [
    'Développeur Full-Stack',
    'Concepteur d’applications',
  ],
  pitch:
    'Je conçois des applications web et des solutions de données qui répondent à des problématiques concrètes — de l’analyse du besoin jusqu’à la mise en service.',
  introduction:
    'Je suis un jeune professionnel de l’informatique, spécialisé dans le développement d’applications et l’informatique décisionnelle. Je m’intéresse à la conception de solutions numériques innovantes, à l’analyse des besoins et à la création d’applications répondant à des problématiques concrètes.',
  location: 'Bouaké, Côte d’Ivoire',
  email: 'bekhantykouame@gmail.com',
  phone: '+225 01 40 14 71 44',
  /** Numéro au format international, sans espaces ni « + ». */
  whatsapp: '2250140147144',
  photo: '/portrait.jpg',
  cv: '/cv-bekhanty-kouame.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/angeo4014' },
  ] as { label: string; href: string }[],
};

export const about = {
  statement:
    'Transformer un besoin métier en une application claire, fiable et utile : c’est ce qui me guide dans chaque projet.',
  paragraphs: [
    'Titulaire d’un BTS Informatique Développeur d’Applications et d’une Licence Professionnelle en Informatique Décisionnelle, j’ai construit un profil à la rencontre du développement web et de l’analyse de données.',
    'Mon stage à la Direction Régionale du Budget et des Finances du Gbêkê m’a confronté au terrain : recueillir le besoin, concevoir une solution simple à utiliser, puis exploiter les données collectées pour éclairer les décisions.',
    'Rigoureux, curieux et motivé, je souhaite mettre mes compétences techniques au service de projets innovants et contribuer activement au développement d’une organisation.',
  ],
  languages: [
    { label: 'Français', level: 'Courant' },
    { label: 'Anglais', level: 'Débutant' },
  ],
  interests: ['Développement web', 'Intelligence artificielle', 'Sport', 'Musique'],
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Front-End',
    icon: 'code',
    summary: 'Interfaces responsives et interactives',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'React.js'],
  },
  {
    title: 'Back-End',
    icon: 'server',
    summary: 'Logique applicative et traitement des données',
    items: ['PHP', 'Java', 'Spring Boot'],
  },
  {
    title: 'Bases de données',
    icon: 'database',
    summary: 'Modélisation, requêtes et persistance',
    items: ['SQL', 'MySQL', 'Supabase', 'PostgreSQL'],
  },
  {
    title: 'Conception',
    icon: 'layers',
    summary: 'Cadrage, modélisation et maquettage',
    items: ['UML', 'Merise', 'Figma', 'Canva'],
  },
  {
    title: 'Outils',
    icon: 'tools',
    summary: 'Versioning et environnement de travail',
    items: ['GitHub', 'Docker', 'Visual Studio Code'],
  },
];

export const projects: Project[] = [
  {
    id: 'campuslink',
    name: 'CampusLink',
    type: 'Plateforme collaborative',
    year: 'Projet personnel',
    description:
      'Plateforme d’échange et de collaboration entre étudiants de différentes universités et filières : découvrir des étudiants proches, trouver des binômes de révision et des partenaires de projet, avec inscription et connexion.',
    highlights: [
      'Découverte d’étudiants de différentes universités et filières',
      'Mise en relation pour la révision et les projets',
      'Inscription et connexion avec une interface responsive',
    ],
    stack: ['React', 'React Router', 'Vite', 'Tailwind CSS'],
    image: '/projects/campuslink-home.jpg',
    links: [
      { label: 'Voir le projet en ligne', href: 'https://campuslink-olive.vercel.app/' },
      { label: 'Voir le code', href: 'https://github.com/angeo4014/campuslink' },
    ],
  },
  {
    id: 'drbf-qr',
    name: 'Système d’évaluation par QR Code — DRBF',
    type: 'Solution institutionnelle — DRBF',
    year: '2025 — 2026',
    description:
      'Solution numérique permettant aux usagers d’évaluer les services des sous-directions du Budget et de la Solde.',
    highlights: [
      'Formulaire d’évaluation accessible en un scan',
      'Collecte centralisée des avis des usagers',
      'Analyse des retours pour le suivi de la qualité de service',
    ],
    stack: ['Vercel', 'CSS', 'JavaScript', 'PHP', 'PHPMailer'],
    image: '/projects/drbf-subdirection.jpg',
    links: [
      { label: 'Voir le projet en ligne', href: 'https://evaluation-drbf.vercel.app/' },
      { label: 'Voir le code', href: 'https://github.com/angeo4014/evaluation-drbf' },
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    period: '2026',
    title: 'Certification Java & Spring Boot',
    school: 'Orange Digital Center',
    description:
      'Développement de services applicatifs avec Java et Spring Boot.',
    tag: 'Certification',
  },
  {
    period: '2026',
    title: 'Certification Docker',
    school: 'Orange Digital Center',
    description:
      'Conteneurisation et packaging d’applications avec Docker.',
    tag: 'Certification',
  },
  {
    period: '2025 — 2026',
    title: 'Licence Professionnelle en Informatique Décisionnelle',
    school: 'HETEC',
    description:
      'Analyse de données, conception de systèmes d’information décisionnels et gestion de projets informatiques.',
    tag: 'Diplôme',
  },
  {
    period: '2023 — 2025',
    title: 'BTS Informatique Développeur d’Applications',
    school: 'HETEC',
    description:
      'Développement web et applicatif, programmation orientée objet, conception et gestion de bases de données.',
    tag: 'Diplôme',
  },
];

export const educationNote =
  'Les diplômes sont complétés par des certifications Java, Spring Boot et Docker.';

export const experience = {
  period: 'Oct. 2025 — Janv. 2026',
  role: 'Stagiaire en informatique',
  organization: 'Direction Régionale du Budget et des Finances (DRBF)',
  location: 'Région du Gbêkê, Côte d’Ivoire',
  summary:
    'Conception et déploiement d’un système d’évaluation des sous-directions du Budget et de la Solde accessible aux usagers par QR Code.',
  missions: [
    'Analyse du besoin et conception du formulaire d’évaluation destiné aux usagers des sous-directions du Budget et de la Solde.',
    'Mise en place de l’accès par QR Code pour simplifier le recueil des avis sur le terrain.',
    'Structuration, collecte et analyse des réponses afin d’alimenter le suivi de la qualité des services.',
  ],
  stack: ['Vercel', 'CSS', 'JavaScript', 'PHP', 'PHPMailer'],
};

export const navLinks = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Projets', href: '#projets' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Contact', href: '#contact' },
];

export const marqueeItems = [
  'PostgreSQL',
  'UML',
  'Merise',
  'Git',
  'Docker',
  'Figma',
  'HTML5',
];

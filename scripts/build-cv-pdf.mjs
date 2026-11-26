/**
 * Génère le CV téléchargeable depuis les données du portfolio.
 * Exécution : npm run cv  →  public/cv-bekhanty-kouame.pdf
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, '../public/cv-bekhanty-kouame.pdf');

const A4 = { width: 595.28, height: 841.89 };
const ink = rgb(0.125, 0.129, 0.141);
const body = rgb(0.28, 0.28, 0.29);
const muted = rgb(0.47, 0.46, 0.44);
const orange = rgb(0.941, 0.471, 0.157);
const line = rgb(0.898, 0.886, 0.867);
const paper = rgb(1, 1, 1);

const data = {
  name: 'Bekhanty Kouame Ange Stéphane Armel',
  title: 'Développeur Full-Stack  |  Informaticien décisionnel',
  contact: "+225 01 40 14 71 44   ·   bekhantykouame@gmail.com   ·   Bouaké, Côte d'Ivoire",
  profile:
    "Titulaire d'un BTS Informatique Développeur d'Applications et d'une Licence Professionnelle en Informatique Décisionnelle, je possède des compétences en développement web, en conception et gestion de bases de données ainsi qu'en analyse et traitement des données. Rigoureux, curieux et motivé, je souhaite mettre mes compétences techniques au service de projets innovants.",
  skills: [
    ['Développement', 'HTML5, CSS3, JavaScript, PHP, Java'],
    ['Données', 'SQL, MySQL, Supabase'],
    ['Conception', 'UML, Merise, Figma, Canva'],
    ['Outils', 'Git, GitHub, Visual Studio Code, Microsoft Office'],
  ],
  experience: {
    role: 'Stagiaire en informatique',
    org: "Direction Régionale du Budget et des Finances (DRBF) — Région du Gbêkê",
    period: 'Oct. 2025 — Janv. 2026',
    bullets: [
      "Conception et mise en place d'un formulaire d'évaluation des sous-directions du Budget et de la Solde via un système de QR Code.",
      "Collecte et analyse des avis des usagers pour le suivi de la qualité des services.",
      'Analyse du besoin, conception de la solution et accompagnement des utilisateurs.',
    ],
  },
  education: [
    ['2025 — 2026', 'Licence Professionnelle Informatique Décisionnelle', 'HETEC'],
    ["2023 — 2025", "BTS Informatique Développeur d'Applications", 'HETEC'],
    ['2022 — 2023', 'Licence 1 — Informatique', 'HETEC'],
    ['—', 'BTS Informatique Décisionnelle', 'HETEC'],
  ],
  extra: {
    languages: 'Français : courant   ·   Anglais : débutant',
    interests: 'Développement web, intelligence artificielle, sport, musique',
  },
};

const pdf = await PDFDocument.create();
pdf.setTitle(`${data.name} — CV`);
pdf.setAuthor(data.name);
pdf.setSubject(data.title);
pdf.setKeywords(['développeur', 'full-stack', 'informatique décisionnelle', 'PHP', 'MySQL']);

const page = pdf.addPage([A4.width, A4.height]);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const regular = await pdf.embedFont(StandardFonts.Helvetica);

const margin = 54;
const contentWidth = A4.width - margin * 2;
let y = A4.height - margin;

const sanitize = (text) =>
  text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u00B7/g, '-')
    .replace(/[\u2019]/g, "'");

const write = (text, { size = 9.5, font = regular, color = body, x = margin, width = contentWidth } = {}) => {
  let lineText = '';
  const words = sanitize(text).split(' ');

  for (const word of words) {
    const attempt = lineText ? `${lineText} ${word}` : word;
    if (font.widthOfTextAtSize(attempt, size) > width && lineText) {
      page.drawText(lineText, { x, y, size, font, color });
      y -= size * 1.42;
      lineText = word;
    } else {
      lineText = attempt;
    }
  }

  if (lineText) {
    page.drawText(lineText, { x, y, size, font, color });
    y -= size * 1.42;
  }
};

const sectionTitle = (label) => {
  y -= 10;
  page.drawRectangle({ x: margin, y: y + 3, width: 3, height: 9, color: orange });
  page.drawText(label.toUpperCase(), {
    x: margin + 11,
    y,
    size: 8.5,
    font: bold,
    color: ink,
  });
  y -= 9;
  page.drawLine({
    start: { x: margin, y: y + 5 },
    end: { x: margin + contentWidth, y: y + 5 },
    thickness: 0.7,
    color: line,
  });
  y -= 8;
};

/* ---------------------------------------------------------------- en-tête */

page.drawRectangle({ x: 0, y: A4.height - 8, width: A4.width, height: 8, color: orange });

page.drawText('BEKHANTY', { x: margin, y: A4.height - margin - 22, size: 27, font: bold, color: ink });
page.drawText('KOUAME', {
  x: margin + bold.widthOfTextAtSize('BEKHANTY ', 27),
  y: A4.height - margin - 22,
  size: 27,
  font: bold,
  color: orange,
});
y = A4.height - margin - 42;
write(data.title, { size: 10, font: bold, color: muted });
y -= 6;
write(data.contact, { size: 8.8, color: body });
y -= 4;
page.drawRectangle({ x: margin, y, width: contentWidth, height: 30, color: rgb(0.976, 0.973, 0.965) });
page.drawText('PROFIL', { x: margin + 12, y: y + 19, size: 7.5, font: bold, color: orange });
y += 6;
write(data.profile, { size: 9, width: contentWidth - 24, x: margin + 12 });
y -= 10;

/* ------------------------------------------------------------ compétences */

sectionTitle('Compétences');
for (const [label, list] of data.skills) {
  const labelWidth = 86;
  page.drawText(sanitize(label), { x: margin, y, size: 9, font: bold, color: ink });
  const valueX = margin + labelWidth;
  const words = sanitize(list).split(', ');
  let current = '';
  const lines = [];
  for (const word of words) {
    const attempt = current ? `${current}, ${word}` : word;
    if (regular.widthOfTextAtSize(attempt, 9) > contentWidth - labelWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = attempt;
    }
  }
  if (current) lines.push(current);
  lines.forEach((lineText, index) => {
    page.drawText(lineText, {
      x: valueX,
      y: y - index * 12.4,
      size: 9,
      font: regular,
      color: body,
    });
  });
  y -= Math.max(1, lines.length) * 12.4 + 1.5;
}

/* ------------------------------------------------------------- expérience */

sectionTitle('Expérience professionnelle');
page.drawText(sanitize(data.experience.period), {
  x: margin + contentWidth - bold.widthOfTextAtSize(sanitize(data.experience.period), 8.8),
  y,
  size: 8.8,
  font: bold,
  color: orange,
});
write(data.experience.role, { size: 10.5, font: bold, color: ink });
write(data.experience.org, { size: 9, font: regular, color: muted });
y -= 3;
for (const bullet of data.experience.bullets) {
  page.drawCircle({ x: margin + 3.5, y: y + 3.2, size: 1.6, color: orange });
  write(bullet, { size: 9, x: margin + 13, width: contentWidth - 13 });
  y -= 1.5;
}

/* --------------------------------------------------------------- formation */

sectionTitle('Formation');
for (const [period, title, school] of data.education) {
  page.drawText(sanitize(period), { x: margin, y, size: 8.8, font: bold, color: orange });
  page.drawText(sanitize(title), { x: margin + 76, y, size: 9.2, font: bold, color: ink });
  page.drawText(sanitize(`— ${school}`), { x: margin + 76, y: y - 11.5, size: 8.8, font: regular, color: muted });
  y -= 25;
}

/* ------------------------------------------------------ langues & intérêts */

sectionTitle('Langues & centres d’intérêt');
write(`Langues : ${data.extra.languages}`, { size: 9 });
write(`Centres d'intérêt : ${data.extra.interests}`, { size: 9 });

/* ------------------------------------------------------------------ pied */

page.drawLine({
  start: { x: margin, y: 46 },
  end: { x: margin + contentWidth, y: 46 },
  thickness: 0.7,
  color: line,
});
page.drawText('Portfolio - Bekhanty Kouame, développeur Full-Stack & informaticien décisionnel', {
  x: margin,
  y: 32,
  size: 7.8,
  font: regular,
  color: muted,
});
page.drawRectangle({ x: margin, y: 52, width: 26, height: 2.2, color: orange });
page.drawRectangle({ x: A4.width - margin - 24, y: 52, width: 24, height: 2.2, color: paper });

await mkdir(dirname(output), { recursive: true });
await writeFile(output, await pdf.save());
console.log(`CV généré : ${output}`);

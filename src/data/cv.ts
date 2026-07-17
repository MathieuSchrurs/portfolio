import type { Education, Language } from '../types';

/*
 * CV-only content that has no home elsewhere on the site. Experience,
 * projects, skills and contact details are pulled from config.ts / skills.ts
 * by the /cv page; only the fields below are unique to the CV.
 *
 * TODO(Mathieu): everything here is placeholder scaffolding — fill in your
 * real summary, schooling and languages, then re-export the PDF from /cv.
 */

/** One short paragraph at the top of the CV. Keep it to 2–3 sentences. */
export const summary =
  'Software engineer with a background in music publishing and language teaching. ' +
  'I build clear, maintainable web applications across .NET/C# and React/TypeScript, ' +
  'and I care most about making complex systems intuitive for the people who actually use them.';

export const education: Education[] = [
  {
    institution: 'TODO — institution name',
    qualification: 'TODO — degree / graduate programme in software / applied computer science',
    location: 'Ghent, Belgium',
    range: 'TODO — e.g. 2022 — 2024',
    note: 'TODO (optional) — focus, distinction, or a line about the programme.',
  },
  {
    institution: 'TODO — institution name',
    qualification: "TODO — earlier degree (e.g. teaching / languages)",
    location: 'TODO — city',
    range: 'TODO — years',
  },
];

export const languages: Language[] = [
  { name: 'Dutch', level: 'Native' },
  { name: 'English', level: 'TODO — e.g. C2 / near-native' },
  { name: 'French', level: 'TODO — e.g. B2' },
];

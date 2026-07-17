/** Shared content types for the site config (src/config.ts). */

export interface Job {
  company: string;
  title: string;
  location: string;
  range: string;
  description: string;
}

export interface Project {
  title: string;
  /** Short terminal-style filename incl. extension (e.g. "issue-tracker.cs"). Falls back to a slug of the title. */
  filename?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

/** A schooling / formal-education entry. CV-only (see src/data/cv.ts). */
export interface Education {
  institution: string;
  qualification: string;
  location: string;
  range: string;
  note?: string;
}

/** A spoken language and proficiency. CV-only (see src/data/cv.ts). */
export interface Language {
  name: string;
  /** e.g. "Native", "C1", "Professional". */
  level: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface NavLink {
  name: string;
  url: string;
}

export interface SiteConfig {
  email: string;
  socialMedia: SocialLink[];
  navLinks: NavLink[];
  jobs: Job[];
  projects: Project[];
}

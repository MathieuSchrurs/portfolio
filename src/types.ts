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

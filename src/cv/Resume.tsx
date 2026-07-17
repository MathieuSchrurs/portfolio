import styled, { createGlobalStyle } from 'styled-components';
import config from '@config';
import { skillCategories } from '../data/skills';
import { summary, education, languages } from '../data/cv';

/*
 * The /cv page: a printable CV rendered with the site's own design tokens
 * (fonts, palette, spacing from variables.ts) so it reads as the same product.
 * `@media print` forces an ink-on-white palette and strips shadows/chrome so
 * "Save as PDF" produces a clean, recruiter-ready document. See ADR 0001.
 */

const PrintStyle = createGlobalStyle`
  /* Keep the on-screen CV in whatever theme the visitor picked, but pin the
     printed/exported version to a light, ink-on-white palette by overriding
     the custom properties for print only. */
  @page {
    margin: 14mm;
  }

  @media print {
    body {
      --bg-color: #ffffff;
      --text-primary-color: #171717;
      --text-secondary-color: #333333;
      --card-bg-color: #ffffff;
      --border-color: #cccccc;
      --shadow-color: transparent;
      --accent-color: #6d28d9;
      background: #ffffff;
    }
  }
`;

const Page = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 3rem) 5rem;
  color: var(--text-secondary-color);
  font-family: var(--font-sans);
  font-size: var(--fz-md);
  line-height: 1.5;

  @media print {
    padding: 0;
    max-width: none;
  }
`;

/* Screen-only toolbar: back to site + a print/save button. Hidden in print. */
const Toolbar = styled.div`
  ${({ theme }) => theme.mixins.flexBetween};
  max-width: 820px;
  margin: 0 auto;
  padding: 1.5rem clamp(1.25rem, 5vw, 3rem) 0;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  a {
    color: var(--text-secondary-color);
    &:hover {
      color: var(--accent-color);
    }
  }

  button {
    ${({ theme }) => theme.mixins.smallButton};
  }

  @media print {
    display: none;
  }
`;

const Header = styled.header`
  margin-bottom: 2.5rem;

  h1 {
    color: var(--text-primary-color);
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: clamp(2.25rem, 1.5rem + 3vw, 3.25rem);
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin: 0 0 0.35rem;
  }

  .role {
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    letter-spacing: 0.04em;
    margin: 0 0 1rem;
  }

  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 1rem;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--text-secondary-color);

    a {
      color: inherit;
      &:hover {
        color: var(--accent-color);
      }
    }
  }
`;

const Section = styled.section`
  margin-top: 2.25rem;
  break-inside: avoid;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--text-primary-color);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 1.1rem;

    &:after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: var(--border-color);
    }
  }

  p {
    margin: 0;
  }
`;

const Entry = styled.div`
  break-inside: avoid;
  & + & {
    margin-top: 1.4rem;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }

  .title {
    color: var(--text-primary-color);
    font-weight: 600;
    font-size: var(--fz-lg);
  }

  .at {
    color: var(--accent-color);
  }

  .range {
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--text-secondary-color);
    white-space: nowrap;
  }

  .meta {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--text-secondary-color);
    margin-bottom: 0.4rem;
  }

  .desc {
    margin: 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--text-secondary-color);

    span {
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 0.1rem 0.5rem;
    }
  }

  .links {
    display: flex;
    gap: 1rem;
    margin-top: 0.4rem;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);

    a {
      color: var(--accent-color);
    }
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem 1.75rem;

  .group {
    break-inside: avoid;
  }

  .label {
    color: var(--text-primary-color);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 600;
    letter-spacing: 0.04em;
    margin-bottom: 0.25rem;
  }

  .items {
    line-height: 1.6;
  }
`;

const TwoUp = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const github = config.socialMedia.find((s) => s.name === 'GitHub')?.url;
const linkedin = config.socialMedia.find((s) => s.name === 'LinkedIn')?.url;

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, '');

export default function Resume() {
  return (
    <>
      <PrintStyle />
      <Toolbar>
        <a href="/">← Back to site</a>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </Toolbar>

      <Page>
        <Header>
          <h1>Mathieu Schrurs</h1>
          <p className="role">Software Engineer · Ghent, Belgium</p>
          <div className="contact">
            <a href={`mailto:${config.email}`}>{config.email}</a>
            {github && (
              <a href={github} target="_blank" rel="noreferrer">
                {stripProtocol(github)}
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer">
                {stripProtocol(linkedin)}
              </a>
            )}
          </div>
        </Header>

        <Section>
          <h2>Profile</h2>
          <p>{summary}</p>
        </Section>

        <Section>
          <h2>Experience</h2>
          {config.jobs.map((job) => (
            <Entry key={`${job.company}-${job.range}`}>
              <div className="top">
                <span className="title">
                  {job.title} <span className="at">@ {job.company}</span>
                </span>
                <span className="range">{job.range}</span>
              </div>
              <div className="meta">{job.location}</div>
              <p className="desc">{job.description}</p>
            </Entry>
          ))}
        </Section>

        <Section>
          <h2>Selected Projects</h2>
          {config.projects.map((project) => (
            <Entry key={project.title}>
              <div className="top">
                <span className="title">{project.title}</span>
              </div>
              <p className="desc">{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {(project.liveUrl || project.codeUrl) && (
                <div className="links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  )}
                </div>
              )}
            </Entry>
          ))}
        </Section>

        <Section>
          <h2>Skills</h2>
          <SkillGrid>
            {skillCategories.map((cat) => (
              <div className="group" key={cat.category}>
                <div className="label">{cat.category}</div>
                <div className="items">{cat.skills.map((s) => s.name).join(', ')}</div>
              </div>
            ))}
          </SkillGrid>
        </Section>

        <TwoUp>
          <Section>
            <h2>Education</h2>
            {education.map((ed) => (
              <Entry key={`${ed.institution}-${ed.range}`}>
                <div className="top">
                  <span className="title">{ed.qualification}</span>
                  <span className="range">{ed.range}</span>
                </div>
                <div className="meta">
                  {ed.institution} · {ed.location}
                </div>
                {ed.note && <p className="desc">{ed.note}</p>}
              </Entry>
            ))}
          </Section>

          <Section>
            <h2>Languages</h2>
            {languages.map((lang) => (
              <Entry key={lang.name}>
                <div className="top">
                  <span className="title">{lang.name}</span>
                  <span className="range">{lang.level}</span>
                </div>
              </Entry>
            ))}
          </Section>
        </TwoUp>
      </Page>
    </>
  );
}

import styled from "styled-components";
import config from "@config";
import StyledButtonLink from "../ui/StyledButtonLink";
import SectionHeading from "../ui/SectionHeading";
import SectionWrapper from "../layout/SectionWrapper";

/* Full-height closing screen, mirroring the Hero's full-height opener. Without
   the min-height the short Contact block can't scroll up to the top of the
   viewport, so the tail of the Work section stays parked above it at the page
   bottom. Filling the viewport pushes Work fully off the top, and centring the
   content keeps the extra height from reading as dead space. */
const StyledContactSection = styled(SectionWrapper)`
  max-width: 900px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/* Same oversized mono-600 statement language as the Experience company
   names: the site's sign-off gets the editorial treatment, not a
   centered template card. */
const StyledTitle = styled.p`
  font-family: var(--font-sans);
  font-size: clamp(2.2rem, 1.4rem + 3.5vw, 4rem);
  font-weight: 600;
  line-height: 1.1;
  /* No negative tracking on mono: matches the Experience company names. */
  letter-spacing: 0;
  color: var(--text-primary-color);
  margin: 0 0 2rem 0;
  max-width: 18ch;
`;

const StyledDescription = styled.p`
  font-family: var(--font-mono);
  font-size: var(--fz-lg);
  line-height: 1.6;
  color: var(--text-secondary-color);
  max-width: 46em;
  margin: 0;
`;

const StyledCTA = styled.div`
  margin-top: 3rem;
`;

const Contact = () => {
  return (
    <StyledContactSection id="contact">
      <SectionHeading sectionNumber="5">Get In Touch</SectionHeading>
      <StyledTitle>Want to build together?</StyledTitle>

      <StyledDescription>
          Whether you've got an exciting project that could use another brain or some extra firepower,
          or you're building something cool and just want to team up, I would love to hear about it.
          So don't hesitate to reach out.
      </StyledDescription>

      <StyledCTA>
        <StyledButtonLink
          href={`mailto:${config.email}`}
          showIcon={false}
          className="email-link"
          primary
        >
          {config.email}
        </StyledButtonLink>
      </StyledCTA>
    </StyledContactSection>
  );
};

export default Contact;

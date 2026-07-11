import styled from "styled-components";
import config from "@config";
import StyledButtonLink from "../ui/StyledButtonLink";
import SectionWrapper from "../layout/SectionWrapper";

const StyledContactSection = styled(SectionWrapper)`
  max-width: 600px;
  text-align: center;
  font-family: var(--font-mono);
`;

const StyledPreHeading = styled.h2`
  font-size: var(--fz-md);
  font-family: var(--font-mono);
  margin: 0 0 20px 0;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:before {
    content: "05.";
    margin-right: 10px;
  }
`;

const StyledTitle = styled.h2`
  font-size: clamp(24px, 5vw, var(--fz-heading));
  font-weight: 500;
  color: var(--text-primary-color);
  margin: 0 0 20px 0;
`;

const StyledDescription = styled.p`
  color: var(--text-secondary-color);
`;

const StyledCTA = styled.div`
  margin-top: 3.5rem;
`;

const Contact = () => {
  return (
    <StyledContactSection id="contact">
      <StyledPreHeading>What's Next?</StyledPreHeading>
      <StyledTitle>Get In Touch</StyledTitle>

      <StyledDescription>
        I'm always on the lookout for new opportunities and welcome connections.
        Whether you have a specific question, or just want to connect,
        feel free to reach out!
      </StyledDescription>

      <StyledCTA>
        <StyledButtonLink
          href={`mailto:${config.email}`}
          showIcon={false}
          className="email-link"
        >
          Say Hello
        </StyledButtonLink>
      </StyledCTA>
    </StyledContactSection>
  );
};

export default Contact;

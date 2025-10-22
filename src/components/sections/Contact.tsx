import styled from "styled-components";
import config from "@config";
import StyledButtonLink from "../ui/StyledButtonLink"; // <-- import your shared button

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: var(--font-mono);

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
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

const Contact = () => {
  return (
    <StyledContactSection id="contact">
      <StyledPreHeading>What's Next?</StyledPreHeading>
      <StyledTitle>Get In Touch</StyledTitle>

      <p style={{ color: "var(--text-secondary-color)", marginBottom: "2.5rem" }}>
        I'm always on the lookout for new opportunities experiences and welcome connections.
        Whether you have a specific question, or just want to connect,
        feel free to reach out!
      </p>

      <StyledButtonLink
        href={`mailto:${config.email}`}
        showIcon={false}
        className="email-link"
      >
        Say Hello
      </StyledButtonLink>
    </StyledContactSection>
  );
};

export default Contact;

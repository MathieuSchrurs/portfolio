import React from 'react';
import styled from 'styled-components';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  padding: 100px 0;
  text-align: center;

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
    content: '04.';
    margin-right: 10px;
  }
`;

const StyledTitle = styled.h2`
  font-size: clamp(26px, 5vw, var(--fz-heading));
  font-weight: 600;
  color: var(--text-primary-color);
  margin: 0 0 20px 0;
`;

const StyledEmailLink = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 50px;
`;

const Contact = () => {
    return (
        <StyledContactSection id="contact">
            <StyledPreHeading>What's Next?</StyledPreHeading>
            <StyledTitle>Get In Touch</StyledTitle>
            <p style={{ color: 'var(--text-secondary-color)' }}>
                Although I'm not currently looking for new opportunities, my inbox is always open.
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <StyledEmailLink
                href="mailto:your.email@example.com" // Update with your email
                className="email-link"
            >
                Say Hello
            </StyledEmailLink>
        </StyledContactSection>
    );
};

export default Contact;

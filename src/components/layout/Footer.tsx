import React from 'react';
import styled from 'styled-components';
// Import config and icons later

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
  color: var(--light-slate); // Use theme variable
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
`;

const StyledCredit = styled.div`
  a {
    padding: 10px;
    color: inherit; // Inherit footer color
    text-decoration: none;
    &:hover {
      color: var(--accent-color); // Use theme accent
    }
  }
`;

const Footer = () => {
    // Add GitHub stats fetching later if desired

    return (
        <StyledFooter>
            {/* Add social links for mobile later */}
            <StyledCredit>
                <a
                    href="https://github.com/bchiang7/v4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>Design inspired by Brittany Chiang</div>
                </a>
                <br /> {/* Simple line break for now */}
                <a
                    href="https://github.com/MathieuSchrurs/portfolio" // Link to your repo
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>Built by Mathieu Schrurs</div>
                    {/* Add GitHub stats here later */}
                </a>
            </StyledCredit>
        </StyledFooter>
    );
};

export default Footer;

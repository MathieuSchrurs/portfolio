import React from 'react';
import styled from 'styled-components';
import config from '@config'; // Import config
import Side from './Side'; // Import Side component
import SocialIcon from '../ui/SocialIcon'; // Keep using your SocialIcon

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  /* Style the line like the target */
  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      padding: 10px; // Add padding for easier clicking

      &:hover,
      &:focus {
        transform: translateY(-3px); // Add hover effect like target
        color: var(
          --accent-color
        ); // Ensure icon color changes on hover
      }

      svg {
        width: 20px; // Match target icon size
        height: 20px;
      }
    }
  }
`;

interface SocialProps {
    isHome: boolean; // Prop passed from Layout
}

const Social: React.FC<SocialProps> = ({ isHome }) => {
    const { socialMedia } = config;

    return (
        <Side isHome={isHome} orientation="left">
            <StyledSocialList>
                {socialMedia &&
                    socialMedia.map(({ url, name }, i) => (
                        <li key={i}>
                            {/* Use your SocialIcon component, passing platform and url */}
                            <a
                                href={url}
                                aria-label={name}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {/* Assuming SocialIcon takes platform name and renders SVG */}
                                <SocialIcon platform={name.toLowerCase() as any} url={url} />
                            </a>
                        </li>
                    ))}
            </StyledSocialList>
        </Side>
    );
};

export default Social;

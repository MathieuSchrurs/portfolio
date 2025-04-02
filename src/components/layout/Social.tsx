import React from 'react';
import styled from 'styled-components';
import config from '@config';
import Side from './Side';
import SocialIcon from '../ui/SocialIcon';
import { usePrefersReducedMotion } from '../../hooks';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  li {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 20px;
    }
  }
`;

type Platform = 'github' | 'linkedin' | 'twitter' | 'instagram'; // Define Platform type if SocialIcon needs it strictly

const Social: React.FC = () => {
  const { socialMedia } = config;
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Side orientation="left">
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={i}>
              <SocialIcon
                platform={name.toLowerCase() as Platform} // Use defined type or keep 'as any'
                url={url}
                prefersReducedMotion={prefersReducedMotion}
              />
            </li>
          ))}
      </StyledSocialList>
    </Side>
  );
};

export default Social;

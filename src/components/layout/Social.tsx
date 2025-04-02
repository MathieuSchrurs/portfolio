import React from 'react';
import styled from 'styled-components';
import config from '@config';
import Side from './Side';
import SocialIcon from '../ui/SocialIcon';

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

const Social: React.FC<{ isHome: boolean }> = ({ isHome }) => {
  const { socialMedia } = config;

  return (
    <Side isHome={isHome} orientation="left">
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={i}>
              <SocialIcon
                platform={name.toLowerCase() as any}
                url={url}
              />
            </li>
          ))}
      </StyledSocialList>
    </Side>
  );
};

export default Social;

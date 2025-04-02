import styled from 'styled-components';
import config from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
`;

const StyledCredit = styled.div`
  a {
    padding: 10px;
    color: inherit;
    text-decoration: none;
    &:hover {
      color: var(--accent-color);
    }
  }
`;

const Footer = () => {
  const githubUrl = config.socialMedia.find(sm => sm.name.toLowerCase() === 'github')?.url;
  const repoUrl = githubUrl ? `${githubUrl}/portfolio` : '#';

  return (
    <StyledFooter>
      <StyledCredit>
        <a
          href="https://github.com/bchiang7/v4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>Design inspired by Brittany Chiang</div>
        </a>
        <br />
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>Built by Mathieu Schrurs</div>
        </a>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;

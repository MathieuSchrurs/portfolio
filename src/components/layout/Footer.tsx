import styled from 'styled-components';
import config from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
  color: var(--text-secondary-color);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);

  /* Clear the fixed bottom status bar (30px) so the credit never sits
     underneath it. The bar is hidden below 768px, so no padding is needed
     there. */
  @media (min-width: 769px) {
    padding-bottom: 3rem;
  }
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

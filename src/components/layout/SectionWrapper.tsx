import styled from "styled-components";

const SectionWrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: var(--section-padding-desktop) 0;

  @media (max-width: 1024px) {
    padding: var(--section-padding-tablet) 0;
  }

  @media (max-width: 768px) {
    padding: var(--section-padding-mobile) 0;
  }
`;

export default SectionWrapper;

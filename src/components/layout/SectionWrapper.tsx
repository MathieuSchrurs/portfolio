import styled from "styled-components";

// Single owner of section padding. Sections layer their own max-width
// (and any other section-specific styling) on top via `styled(SectionWrapper)`.
const SectionWrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  padding: var(--section-padding-desktop) 0;

  @media (max-width: 768px) {
    padding: var(--section-padding-tablet) 0;
  }

  @media (max-width: 480px) {
    padding: var(--section-padding-mobile) 0;
  }
`;

export default SectionWrapper;

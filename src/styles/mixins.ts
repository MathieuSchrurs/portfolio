import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--accent-color);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--accent-color);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--accent-color);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--accent-color) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--accent-color);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button: css`
    color: var(--accent-color);
    background-color: transparent;
    border: 1px solid var(--accent-color);
    border-radius: var(--border-radius);
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    padding: 1.25rem 1.75rem;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      background-color: var(--accent-tint-color);
      outline: none;
      /* Optional: Add target's shadow/translate effect */
      /* box-shadow: 4px 4px 0 0 var(--accent-color);
             transform: translate(-5px, -5px); */
    }
    &:after {
      display: none !important;
    }
  `,

  smallButton: css`
    color: var(--accent-color);
    background-color: transparent;
    border: 1px solid var(--accent-color);
    border-radius: var(--border-radius);
    padding: 0.85rem 1.2rem;
    margin: 0.2rem;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
    line-height: 0.8;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      background-color: var(--accent-tint-color);
      outline: none;
      box-shadow: 3px 3px 0 0 var(--accent-color);
             transform: translate(-2px, -2px);
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--accent-color);
    background-color: transparent;
    border: 1px solid var(--accent-color);
    border-radius: var(--border-radius);
    padding: 1.25rem 1.75rem;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      background-color: var(--accent-tint-color);
      outline: none;
      /* Optional: Add target's shadow/translate effect */
      /* box-shadow: 4px 4px 0 0 var(--accent-color);
             transform: translate(-5px, -5px); */
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--shadow-color);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 20px 30px -15px var(--shadow-color);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--accent-color);
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;

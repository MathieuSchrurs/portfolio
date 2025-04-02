import { useState } from 'react';
import styled from 'styled-components';
import CVDownload from '../ui/CVDownload';
import StyledButtonLink from '../ui/StyledButtonLink';

const InteractiveWordSpan = styled.span<{ isHovered: boolean }>`
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: var(--text-secondary-color);
  transition: color 1s ease;

  &::before {
    content: attr(data-content);
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    color: transparent;

    /* Theme-aware gradient */
    background-image: linear-gradient(
      to right,
      var(--accent-color),
      var(--gradient-middle-color),
      var(--gradient-end-color)
    );
    
    -webkit-background-clip: text;
    background-clip: text;
    background-repeat: no-repeat;

    transition: width 1s ease-in-out;
  }

  &:hover::before {
    width: 100%;
  }
`;

const Hero = () => {
    const [isWordHovered, setIsWordHovered] = useState(false);
    const handleWordEnter = () => setIsWordHovered(true);
    const handleWordLeave = () => setIsWordHovered(false);
    const wordToAnimate = 'creation';

    return (
        <section
            id="hero"
            className="min-h-[calc(100vh-var(--nav-height))] flex items-center mx-auto max-w-3xl py-20"
        >
            <div>
                <p
                    className="font-mono text-base mb-4"
                    style={{
                        color: 'var(--text-primary-color)',
                        fontFamily: '"Fira Code", monospace'

                    }}
                >
                    Hi, my name is
                </p>
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2"
                    style={{
                        color: 'var(--text-primary-color)',
                        fontFamily: '"Fira Code", monospace'
                    }}
                >
                    Mathieu Schrurs.
                </h1>

                <h2
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                    style={{
                        color: 'var(--text-secondary-color)',
                        fontFamily: '"Fira Code", monospace'

                    }}
                >
                    I explore{' '}
                    <InteractiveWordSpan
                        isHovered={isWordHovered}
                        onMouseEnter={handleWordEnter}
                        onMouseLeave={handleWordLeave}
                        data-content={wordToAnimate}
                    >
                        {wordToAnimate}
                    </InteractiveWordSpan>{' '}
                    through code
                </h2>
                <p
                    className="text-lg max-w-xl mb-12"
                    style={{
                        color: 'var(--text-secondary-color)',
                        padding: '10px 2px',
                        fontFamily: '"Fira Code", monospace'
                    }}
                >
                    Building digital solutions that bridge technology and human needs
                    <br></br>
                    using .NET, React, and Next.js.
                    <br></br>
                    Always growing, always learning.
                </p>

                <div className="flex space-x-4">
                    <StyledButtonLink href="#contact">Get In Touch</StyledButtonLink>
                    <CVDownload />
                </div>
            </div>
        </section>
    );
};

export default Hero;

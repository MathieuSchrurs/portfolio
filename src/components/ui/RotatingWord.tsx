import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'motion/react';

/* Fixed-height clipping window — the slot machine drum */
const WordSlot = styled.span`
  display: block;
  overflow: hidden;
  height: 1.2em;
  position: relative;
`;

/* Each word lives absolutely inside the slot so the container never resizes */
const AnimatedWord = styled(motion.span)`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 700;
  color: var(--accent-color);
  white-space: nowrap;
`;

const WORDS = [
  'rhythm',
  'clarity',
  'meaning',
  'craft',
  'connection',
  'flow',
  'purpose',
  'nuance',
  'structure',
  'stories',
];

/* The word that slides through the Hero tagline on a 2s loop, each entry
   rising into a fixed-height slot and the previous one sliding out above. */
export default function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % WORDS.length),
      2000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <WordSlot>
      <AnimatePresence initial={false}>
        <AnimatedWord
          key={WORDS[index]}
          initial={{ y: '105%' }}
          animate={{
            y: '0%',
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            y: '-105%',
            transition: { duration: 0.3, ease: [0.645, 0.045, 0.355, 1] },
          }}
        >
          {WORDS[index]}
        </AnimatedWord>
      </AnimatePresence>
    </WordSlot>
  );
}

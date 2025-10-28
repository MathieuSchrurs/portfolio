import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { initializeSongs, getRandomSong } from '@utils/songRandomizer';

const InteractiveWordSpan = styled.span`
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: var(--text-secondary-color);
  font-family: 'Fira Code', monospace;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
  }
`;

const TerminalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  background-color: var(--card-bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 10px;
  font-family: 'Fira Code', monospace;
  color: var(--text-secondary-color);
  overflow: hidden;
`;

const TerminalOutput = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  font-size: var(--fz-sm);
`;

const TerminalInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  color: var(--text-secondary-color);
  font-family: 'Fira Code', monospace;
  font-size: var(--fz-sm);
  outline: none;

  &::placeholder {
    color: var(--text-secondary-color);
    opacity: 0.6;
  }
`;

const InteractiveWord: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [command, setCommand] = useState('');

  useEffect(() => {
    initializeSongs();
  }, []);

  const handleWordClick = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const newOutput = [...terminalOutput];
      newOutput.push(`> ${command}`);

      switch (command.toLowerCase()) {
        case 'help':
          newOutput.push('Available commands: help, song, clear');
          break;
        case 'song':
          const randomSong = getRandomSong();
          if (randomSong) {
            newOutput.push(
              `Today's recommendation: "${randomSong.title}" by ${randomSong.artist}`
            );
            newOutput.push(`Listen here: ${randomSong.url}`);
          } else {
            newOutput.push('No songs available.');
          }
          break;
        case 'clear':
          setTerminalOutput([]);
          setCommand('');
          return;
        default:
          newOutput.push(`Command not found: ${command}`);
      }

      setTerminalOutput(newOutput);
      setCommand('');
    }
  };

  return isTerminalOpen ? (
    <TerminalWrapper>
      <TerminalOutput>
        {terminalOutput.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </TerminalOutput>
      <TerminalInput
        type="text"
        placeholder="Type a command..."
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleCommandSubmit}
      />
    </TerminalWrapper>
  ) : (
    <InteractiveWordSpan onClick={handleWordClick}>code</InteractiveWordSpan>
  );
};

export default InteractiveWord;

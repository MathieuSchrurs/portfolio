import React from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  const pathData =
    'M2 86.0934L18 64.0934C82 -21.9066 54 50.4268 52.5 64.0934C50.1 73.6934 58.1667 63.7601 62.5 57.5934L96 12.0934C114.5 -10.4065 107 10.7601 105.5 17.5934L72.5 107.093M149.5 48.5935L152 45.5935C156 35.0935 133 39.4268 129.5 41.0935L121.5 45.5935C105.5 57.5934 125.833 69.2601 140 73.0935C149.5 80.0935 133.333 90.0934 121.5 92.0935C94.7 99.6935 99.6667 91.2601 105.5 86.0934L116.5 79.5935C229.3 23.1935 250 14.5935 237 45.5935';
  const strokeWidth = '3';

  return (
    <svg
      viewBox="0 0 242 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MS Logo Signature"
    >
      <path
        className="logo-path-static"
        d={pathData}
        fill="none"
        strokeWidth={strokeWidth}
      />
      <path
        className="logo-path-animated"
        d={pathData}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray="642.528076171875"
        strokeDashoffset="642.528076171875"
      />
    </svg>
  );
};

export default AnimatedLogo;

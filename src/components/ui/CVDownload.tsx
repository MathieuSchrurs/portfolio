import React from 'react';

// 1. Add className to the props interface
interface CVDownloadProps {
    className?: string;
}

// 2. Accept className prop, provide default empty string
const CVDownload: React.FC<CVDownloadProps> = ({ className = '' }) => {
    return (
        <a
            href="/CV Mathieu Schrurs.pdf" // Path to your CV file in the public folder
            download="Mathieu_Schrurs_CV.pdf" // Suggested filename for the downloaded file
            // 3. Remove Tailwind classes and apply the passed className
            className={className}
        >
            CV
            {/* Keep the original SVG icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2} // Keep original strokeWidth
                stroke="currentColor"
                // 4. Remove Tailwind classes from SVG
                style={{ width: '1em', height: '1em', marginLeft: '0.5rem' }} // Use inline style or style via parent className
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 13l-5 5m0 0l-5-5m5 5V6" // Keep original path
                />
            </svg>
        </a>
    );
};

export default CVDownload;

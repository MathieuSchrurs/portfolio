import React from 'react';
import StyledButtonLink from './StyledButtonLink';

interface CVDownloadProps {
    className?: string;
}

const CVDownload: React.FC<CVDownloadProps> = ({ className = '' }) => {
    return (
        <StyledButtonLink
            href="/CV Mathieu Schrurs.pdf"
            download="Mathieu_Schrurs_CV.pdf"
            showIcon={true} // Explicitly show the icon for the CV button
            className={className} // Pass down any className received
        >
            CV {/* Text specific to this button */}
        </StyledButtonLink>
    );
};

export default CVDownload;

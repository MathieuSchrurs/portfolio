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
            showIcon={true}
            className={className}
        >
            CV
        </StyledButtonLink>
    );
};

export default CVDownload;
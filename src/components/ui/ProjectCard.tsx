import React from 'react';
// Assuming you create a new Button component styled for this theme or adapt the old one
// import Button from './Button'; // Or use simple <a> tags

interface ProjectCardProps {
    title: string;
    description: string;
    // imageSrc: string; // Optional image
    tags: string[];
    liveUrl?: string;
    codeUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    liveUrl,
    codeUrl
}) => {
    return (
        // Updated card styling
        <div className="bg-light-navy rounded-sm shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    {/* Folder Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    {/* External Links */}
                    <div className="flex space-x-3">
                        {codeUrl && (
                            <a href={codeUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub code link" className="text-light-slate hover:text-green transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        )}
                        {liveUrl && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo link" className="text-light-slate hover:text-green transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-lightest-slate hover:text-green transition-colors mb-3 cursor-pointer">
                    {/* Link the title if there's a dedicated project page or live URL */}
                    {liveUrl ? (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer">{title}</a>
                    ) : (
                        title
                    )}
                </h3>

                <p className="text-slate text-sm mb-5">
                    {description}
                </p>
            </div>

            {/* Footer of card for tags */}
            <footer className="mt-auto">
                <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-slate list-none p-0">
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
            </footer>
        </div>
    );
};

export default ProjectCard;

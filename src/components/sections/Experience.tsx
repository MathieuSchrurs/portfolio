const Experience = () => {
    // Replace with your actual experience data
    const jobs = [
        {
            company: 'Company A',
            title: 'Software Engineer',
            range: 'Jan 2022 - Present',
            url: 'https://companya.com',
            tasks: [
                'Developed and maintained critical features for customer-facing web applications using React and Node.js.',
                'Collaborated with designers and product managers to translate requirements into technical solutions.',
                'Improved application performance by optimizing database queries and frontend rendering.',
            ],
        },
        {
            company: 'Company B',
            title: 'Junior Developer',
            range: 'May 2020 - Dec 2021',
            url: 'https://companyb.com',
            tasks: [
                'Assisted senior developers in building and testing new features.',
                'Fixed bugs and improved existing codebase.',
                'Participated in code reviews and team meetings.',
            ],
        },
    ];

    // A real implementation would use state to switch between jobs (e.g., with tabs).
    const currentJob = jobs[0];

    return (
        <section id="experience" className="py-24 mx-auto max-w-3xl">
            <h2 className="flex items-center mb-8 text-2xl font-semibold text-lightest-slate whitespace-nowrap after:content-[''] after:block after:relative after:top-px after:w-full after:h-px after:ml-4 after:bg-lightest-navy">
                <span className="text-green font-mono text-xl mr-2">02.</span>
                Where I've Worked
            </h2>

            {/* Simplified display - shows only the first job */}
            {/* TODO: Implement tab switching logic if needed */}
            <div className="text-slate">
                <h3 className="text-xl font-medium text-lightest-slate mb-1">
                    {currentJob.title}{' '}
                    <span className="text-green">
                        @{' '}
                        <a href={currentJob.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {currentJob.company}
                        </a>
                    </span>
                </h3>
                <p className="font-mono text-xs mb-4">{currentJob.range}</p>
                <ul className="space-y-2 list-none p-0">
                    {currentJob.tasks.map((task, index) => (
                        <li key={index} className="relative pl-6 text-sm before:content-['▹'] before:absolute before:left-0 before:text-green">
                            {task}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Experience;

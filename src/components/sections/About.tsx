const About = () => {
    const skills = [
        'C#',
        '.NET',
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'Tailwind CSS',
        'HTML & (S)CSS',
        'Docker',
        'Git',
    ];

    return (
        <section id="about" className="py-24 mx-auto max-w-3xl">
            <h2 className="flex items-center mb-8 text-2xl font-semibold text-lightest-slate whitespace-nowrap after:content-[''] after:block after:relative after:top-px after:w-full after:h-px after:ml-4 after:bg-lightest-navy">
                <span className="text-green font-mono text-xl mr-2">01.</span>
                About Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                <div className="md:col-span-3 text-slate space-y-4">
                    <p>
                        Hello! I'm Mathieu, a software engineer based in Ghent, Belgium. I enjoy creating things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences.
                    </p>
                    <p>
                        Shortly after graduating from [Your University/Bootcamp], I joined the engineering team at [Previous Company/Project] where I work on a wide variety of interesting and meaningful projects on a daily basis.
                    </p>
                    <p>Here are a few technologies I've been working on recently:</p>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm list-none p-0">
                        {skills.map((skill, index) => (
                            <li key={index} className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-green">
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Optional Image Column */}
                <div className="md:col-span-2 relative group">
                    <div className="relative w-full max-w-xs mx-auto md:mx-0 aspect-square rounded">
                        {/* Placeholder Image */}
                        <div className="absolute inset-0 bg-light-navy rounded z-0 border-2 border-green transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                        <img
                            className="absolute inset-0 w-full h-full object-cover rounded z-10 grayscale transition-all duration-300 group-hover:grayscale-0"
                            src="https://via.placeholder.com/300" // Replace with your actual photo URL
                            alt="Mathieu Schrurs"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

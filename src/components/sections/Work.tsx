// src/components/sections/Work.tsx
import ProjectCard from '../ui/ProjectCard'; // Ensure path is correct

const Work = () => {
    // Use your actual project data
    const projects = [
        {
            title: 'Project One',
            description: 'A responsive web application built with React and Firebase, focusing on real-time data synchronization.',
            tags: ['React', 'Firebase', 'Tailwind CSS', 'Vite'],
            liveUrl: 'https://project-one.example.com',
            codeUrl: 'https://github.com/yourusername/project-one'
        },
        {
            title: 'E-commerce Platform',
            description: 'Full-stack e-commerce site featuring product browsing, cart management, and Stripe integration for payments.',
            tags: ['Next.js', 'MongoDB', 'Stripe', 'Node.js'],
            liveUrl: 'https://project-two.example.com',
            codeUrl: 'https://github.com/yourusername/project-two'
        },
        {
            title: 'Finance Tracker Dashboard',
            description: 'Data visualization dashboard using D3.js to track personal finances with a custom Express API backend.',
            tags: ['React', 'D3.js', 'Express', 'Chart.js'],
            liveUrl: 'https://project-three.example.com',
            codeUrl: 'https://github.com/yourusername/project-three'
        },
        {
            title: 'Dev Workflow CLI',
            description: 'A command-line interface tool built with Node.js and TypeScript to automate common development tasks.',
            tags: ['Node.js', 'TypeScript', 'CLI'],
            codeUrl: 'https://github.com/yourusername/project-four'
        },
        {
            title: 'Another Project',
            description: 'Brief description of another cool project you worked on.',
            tags: ['Vue', 'Supabase', 'CSS'],
            liveUrl: 'https://project-five.example.com',
        },
        {
            title: 'Sixth Project Example',
            description: 'Showcasing a different tech stack or problem domain.',
            tags: ['Svelte', 'GraphQL', 'Docker'],
            codeUrl: 'https://github.com/yourusername/project-six'
        }
    ];

    return (
        <section id="work" className="py-24 mx-auto max-w-5xl"> {/* Wider max-width for grid */}
            <h2 className="flex items-center mb-8 text-2xl font-semibold text-lightest-slate whitespace-nowrap after:content-[''] after:block after:relative after:top-px after:w-full after:h-px after:ml-4 after:bg-lightest-navy">
                <span className="text-green font-mono text-xl mr-2">03.</span>
                Some Things I've Built
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>

            {/* Optional: "Show More" button if you have many projects */}
            {/* <div className="text-center mt-12">
        <button className="font-mono text-sm text-green border border-green rounded-sm px-8 py-4 hover:bg-green/10 transition-colors duration-300">
          Show More
        </button>
      </div> */}
        </section>
    );
};

export default Work;

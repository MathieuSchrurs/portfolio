// src/components/sections/Skills.tsx
const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
        },
        {
            title: 'Backend',
            skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL']
        },
        {
            title: 'Tools & Others',
            skills: ['Git', 'Docker', 'AWS', 'Figma']
        }
    ];

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-serif font-bold mb-12 text-center">
                    Technologies I Work With
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xs">
                            <h3 className="text-xl font-bold mb-4 text-blue-600">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map((skill, skillIndex) => (
                                    <li key={skillIndex} className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

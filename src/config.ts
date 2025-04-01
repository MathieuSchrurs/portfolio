export default {
  email: 'mathieu@schrurs.be',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/MathieuSchrurs',
    },
    {
      name: 'Linkedin',
      url: 'https://linkedin.com/in/mathieuschrurs',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/mathieuschrurs',
    },
    // Add other platforms like Twitter if needed
    // {
    //   name: 'BlueSky',
    //   url: 'https://BlueSky.com/yourusername',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#experience',
    },
    {
      name: 'Work',
      url: '/#work',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    // Reference the CSS variables directly in styled-components
    // Or define JS constants if needed elsewhere, but CSS vars are preferred
    green: '#64ffda', // Example from target
    navy: '#0a192f', // Example from target
    darkNavy: '#020c1b', // Example from target
    // Add light theme colors if needed in JS
    lightAccent: '#8b5cf6',
  },

  // ScrollReveal config (optional, can add later)
  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),

  jobs: [
    {
      company: 'Batt Mobility @ Wintercircus',
      title: 'Software Engineer Intern',
      range: '2024 - 2024',
      description:
        'Worked with Blazor, Azure, Web APIs, and Entity Framework to develop, debug, and optimize software features while ensuring maintainable code and functionality.',
    },
    {
      company: 'Sint-Janscollege/HTISA/Campus Saint-Jean',
      title: 'English / Dutch Teacher',
      range: '2019-2023',
      description:
        'Facilitated language learning through engaging lessons and interactive activities. Managed diverse classroom environments to ensure optimal learning experiences. Employed effective communication skills and teaching techniques to foster a collaborative learning environment.',
    },
    {
      company: 'The Right People / Hans Kusters Music',
      title: 'Music Publishing Assistant',
      range: '2017-2019',
      description:
        'Assisted in music licensing and rights management, organizing catalogs, clearing copyrights, and tracking royalties. Collaborated with artists, composers, and internal teams to ensure compliance with licensing agreements.',
    },
    {
      company: 'PIAS UK London head office',
      title: '[PIAS] Intern',
      range: '2017-2017',
      description:
        'Assisted in day-to-day operations of the PIAS UK London office, gaining insight into music distribution and label management. Supported the team in various administrative tasks, including organizing promotional materials and maintaining databases.',
    },
    {
      company: 'Pepperminds',
      title: 'Sales Captain (Student Job)',
      range: '2012-2017',
      description:
        'As Sales Captain at Pepperminds, I led training sessions for large groups and participated in face-to-face marketing campaigns for NGOs, driving sales performance and achieving campaign objectives',
    },
  ],

  projects: [
    {
      title: 'Project One',
      description:
        'A responsive web application built with React and Firebase...',
      tags: ['React', 'Firebase', 'Styled Components'],
      liveUrl: 'https://project-one.example.com',
      codeUrl: 'https://github.com/yourusername/project-one',
    },
    {
      title: 'E-commerce Platform',
      description:
        'Full-stack e-commerce site featuring product browsing...',
      tags: ['Next.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://project-two.example.com',
      codeUrl: 'https://github.com/yourusername/project-two',
    },
    {
      title: 'Finance Tracker Dashboard',
      description: 'Data visualization dashboard using D3.js...',
      tags: ['React', 'D3.js', 'Express'],
      liveUrl: 'https://project-three.example.com',
      codeUrl: 'https://github.com/yourusername/project-three',
    },
    {
      title: 'Dev Workflow CLI',
      description: 'A command-line interface tool built with Node.js...',
      tags: ['Node.js', 'TypeScript', 'CLI'],
      codeUrl: 'https://github.com/yourusername/project-four',
    },
  ],
};

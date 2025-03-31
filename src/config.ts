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
  
    // Add other config like job data, project data here
    jobs: [
      // Example structure, replace with your actual data
      {
        company: 'Batt Mobility OS',
        title: 'Software Developer Intern',
        range: 'Sep 2024 - Dec 2024',
        url: 'https://companya.com',
        tasks: [
          'Developed and designed In-house application...',
          'Collaborated with designers...',
          'Improved application performance...',
        ],
      },
      {
        company: 'Sint-Janscollege',
        title: 'English Teacher',
        range: 'May 2020 - Dec 2021',
        url: 'https://companyb.com',
        tasks: [
          'Assisted senior developers...',
          'Fixed bugs...',
          'Participated in code reviews...',
        ],
      },
      // Add more jobs
    ],
  
    projects: [
      // Example structure, replace with your actual data
      {
        title: 'Project One',
        description:
          'A responsive web application built with React and Firebase...',
        tags: ['React', 'Firebase', 'Styled Components'], // Update tags
        liveUrl: 'https://project-one.example.com',
        codeUrl: 'https://github.com/yourusername/project-one',
        featured: true, // Add flag for featured projects if needed
        cover: 'path/to/image.png', // Add path for featured project images
      },
      {
        title: 'E-commerce Platform',
        description:
          'Full-stack e-commerce site featuring product browsing...',
        tags: ['Next.js', 'MongoDB', 'Stripe'],
        liveUrl: 'https://project-two.example.com',
        codeUrl: 'https://github.com/yourusername/project-two',
        featured: true,
        cover: 'path/to/another-image.jpg',
      },
      {
        title: 'Finance Tracker Dashboard',
        description: 'Data visualization dashboard using D3.js...',
        tags: ['React', 'D3.js', 'Express'],
        liveUrl: 'https://project-three.example.com',
        codeUrl: 'https://github.com/yourusername/project-three',
        showInProjects: true, // Flag for "Other Noteworthy Projects"
      },
      {
        title: 'Dev Workflow CLI',
        description: 'A command-line interface tool built with Node.js...',
        tags: ['Node.js', 'TypeScript', 'CLI'],
        codeUrl: 'https://github.com/yourusername/project-four',
        showInProjects: true,
      },
      // Add more projects
    ],
  };
  
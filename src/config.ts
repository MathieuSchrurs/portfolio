export default {
  email: "mathieu@schrurs.be",

  socialMedia: [
    {
      name: "GitHub",
      url: "https://github.com/MathieuSchrurs",
    },
    {
      name: "Linkedin",
      url: "https://linkedin.com/in/mathieuschrurs",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/mathieuschrurs",
    },
  ],

  navLinks: [
    {
      name: "About",
      url: "/#about",
    },
    {
      name: "Experience",
      url: "/#experience",
    },
    {
      name: "Skills",
      url: "/#skills",
    },
    {
      name: "Work",
      url: "/#work",
    },
    {
      name: "Contact",
      url: "/#contact",
    },
  ],

  colors: {
    green: "#64ffda",
    navy: "#0a192f",
    darkNavy: "#020c1b",
    lightAccent: "#8b5cf6",
  },

  srConfig: (delay = 100, viewFactor = 0.25) => ({
    origin: "bottom",
    distance: "20px",
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    mobile: true,
    reset: false,
    useDelay: "always",
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),

  jobs: [
    {
      company: "Twikey",
      title: "Customer Onboarding Specialist",
      range: "2025 - Now",
      description: "Turning complex fintech onboarding into simple, efficient client experiences.",
    },
    {
      company: "Batt Mobility @ Wintercircus",
      title: "Software Engineer Intern",
      range: "2024 - 2024",
      description:
        "Worked with Blazor, Azure, Web APIs, and Entity Framework to develop, debug, and optimize software features while ensuring maintainable code and functionality.",
    },
    {
      company: "Sint-Janscollege/HTISA/Campus Saint-Jean",
      title: "English / Dutch Teacher",
      range: "2019-2023",
      description:
        "Facilitated language learning through engaging lessons and interactive activities. Managed diverse classroom environments to ensure optimal learning experiences. Employed effective communication skills and teaching techniques to foster a collaborative learning environment.",
    },
    {
      company: "The Right People / Hans Kusters Music",
      title: "Music Publishing Assistant",
      range: "2017-2019",
      description:
        "Assisted in music licensing and rights management, organizing catalogs, clearing copyrights, and tracking royalties. Collaborated with artists, composers, and internal teams to ensure compliance with licensing agreements.",
    },
    {
      company: "PIAS UK London head office",
      title: "[PIAS] Intern",
      range: "2017-2017",
      description:
        "Assisted in day-to-day operations of the PIAS UK London office, gaining insight into music distribution and label management. Supported the team in various administrative tasks, including organizing promotional materials and maintaining databases.",
    },
    {
      company: "Pepperminds",
      title: "Sales Captain (Student Job)",
      range: "2012-2017",
      description:
        "As Sales Captain at Pepperminds, I led training sessions for large groups and participated in face-to-face marketing campaigns for NGOs, driving sales performance and achieving campaign objectives",
    },
  ],

  projects: [
    {
      title: "Personal Portfolio Website",
      description:
        "The site you are currently viewing! Built with React, TypeScript, and styled-components, featuring theme switching and responsive design.",
      tags: ["React", "TypeScript", "Styled Components", "Vite"],
      liveUrl: "https://mathieuschrurs.com",
      codeUrl: "https://github.com/MathieuSchrurs/portfolio",
    },
    {
      title: "Internal Issue Tracking Dashboard",
      description:
        "Developed an in-house Blazor application during an internship to provide clear visibility on issue status and priority, improving team workflow.",
      tags: ["Blazor", ".NET", "C#", "Web APIs", "Entity Framework", "Azure"],
    },
    {
      title: "Stock Management Web App",
      description:
        "Created a web application for a purchasing department to manage and view stock levels, utilizing a C# backend and JavaScript frontend.",
      tags: ["C#", ".NET", "JavaScript", "HTML", "CSS", "SQL Server"],
    },
  ],
};

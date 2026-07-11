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
    accent: "#a78bfa",
    accentLight: "#c4b5fd",
    dark: "#111111",
    darkElevated: "#1a1a1a",
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
      range: "2025 — present",
      description:
        "Designing and optimising onboarding flows for fintech clients — turning compliance requirements and API integrations into seamless client journeys. Bridges technical teams and end users, translating requirements clearly on both sides.",
    },
    {
      company: "Batt Mobility @ Wintercircus",
      title: "Software Engineer Intern",
      range: "2024",
      description:
        "Built and shipped features across a Blazor / .NET stack at an EV mobility startup. Worked with Azure, Web APIs, and Entity Framework — contributing to feature development, debugging, and code quality in a fast-moving team.",
    },
    {
      company: "Sint-Janscollege · HTISA · Campus Saint-Jean",
      title: "English & Dutch Teacher",
      range: "2019 — 2023",
      description:
        "Taught English and Dutch across secondary and higher education for four years. Running a classroom sharpens systems thinking, clear communication, and the ability to break down complexity — skills that carry directly into engineering.",
    },
    {
      company: "The Right People / Hans Kusters Music",
      title: "Music Publishing Assistant",
      range: "2017 — 2019",
      description:
        "Handled licensing, rights clearance, and royalty tracking for a catalog of independent artists. Precision-heavy work at the intersection of legal compliance, data management, and artist relations.",
    },
    {
      company: "PIAS UK — London",
      title: "Intern",
      range: "2017",
      description:
        "Inside look at international music distribution at one of Europe's leading independent groups. Supported A&R, release logistics, and cross-market coordination from the London head office.",
    },
    {
      company: "Pepperminds",
      title: "Sales Captain",
      range: "2012 — 2017",
      description:
        "Led teams and coached new hires in face-to-face marketing campaigns for NGOs. Developed persuasion, team management, and performance under pressure — long before code was in the picture.",
    },
  ],

  projects: [
    {
      title: "CommonGround",
      description:
        "A collaborative house-hunting app that helps a group of buyers converge on one property. Each participant sets a commute constraint, and the app intersects everyone's isochrones in real time to surface listings that work for the whole group.",
      tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Mapbox"],
      liveUrl: "https://commonground-gamma.vercel.app/",
      codeUrl: "https://github.com/MathieuSchrurs/commonground",
    },
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

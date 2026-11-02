import type { Activity, Experience, Interest, Profile, SkillGroup } from '../types';

// Profile content transcribed from the supplied Current_Resume.pdf.
// Personal identifiers from the academic record are deliberately excluded.
export const profile: Profile = {
  name: 'Ibrahim Tariq',
  firstName: 'Ibrahim',
  lastName: 'Tariq',
  title: 'Software engineering student & graphics enthusiast',
  email: 'itariq640@gmail.com',
  phone: '+1 (416) 627-7531',
  github: 'https://github.com/IbrahimT04',
  linkedin: 'https://www.linkedin.com/in/ibrahim-tariq-5b9914280/',
  location: 'Ontario, Canada',
  summary: 'I build graphics engines, explore the mathematics behind rendering, and turn complex software into clear, maintainable systems. I study Software Engineering at McMaster University, with experience in scientific software and machine learning evaluation.',
  education: {
    institution: 'McMaster University',
    degree: 'Bachelor of Engineering',
    program: 'Software Engineering Co-op',
    location: 'Hamilton, Ontario',
    startYear: 2022,
    expectedGraduation: 2027,
    years: '2022–2027',
    gpa: 9.8,
    gpaScale: 12,
    gpaSource: 'As reported on the supplied resume',
    honours: [
      { title: "Dean’s Honour List", detail: '2023 and 2024 academic standing' },
      { title: 'Faculty of Engineering Achievement Award', detail: 'Fall 2022' },
    ],
  },
};

export const experience: Experience[] = [
  {
    id: 'eccc',
    company: 'Environment and Climate Change Canada',
    team: 'WMS East',
    role: 'Software Engineering Intern',
    location: 'Burlington, Ontario',
    period: 'May 2025 – August 2026',
    start: '2025-05',
    end: '2026-08',
    description: 'Scientific software, modular architecture, and development tooling for hydrologic modelling.',
    bullets: [
      'Refactored a legacy hydrologic model into a modular, data-driven batch sequencing architecture with replaceable components, reducing code size by 25%, improving plan production productivity by 6%, and lowering simulation runtime by 3%.',
      'Built Bash tooling around PyLint to automate pull request checks, summarizing style violations, refactor candidates, warnings, and errors into a readiness score and merge gate indicator.',
      'Produced onboarding documentation and delivered co-development presentations on coding practices and version control to scientists and engineers across Canadian and U.S. federal agencies.',
    ],
    technologies: ['Python', 'Bash', 'PyLint', 'Git'],
    metrics: [
      { value: '25%', label: 'less code' },
      { value: '6%', label: 'higher plan production productivity' },
      { value: '3%', label: 'lower simulation runtime' },
    ],
  },
  {
    id: 'dataannotation',
    company: 'DataAnnotation',
    team: '',
    role: 'Swift Developer',
    location: 'Toronto, Ontario',
    period: 'May 2024 – August 2024',
    start: '2024-05',
    end: '2024-08',
    description: 'Code-focused training data and evaluation for machine learning models.',
    bullets: [
      'Generated and assessed data used to train ML models, interacting with over 10 LLMs and evaluating 1,000+ prompts.',
      'Improved machine learning models’ ability to program data structures in Python, Java, C++, TypeScript, and Swift.',
    ],
    technologies: ['Swift', 'Python', 'Java', 'C++', 'TypeScript'],
    metrics: [
      { value: '1,000+', label: 'prompts evaluated' },
      { value: '10+', label: 'LLMs evaluated' },
    ],
  },
];

export const activities: Activity[] = [
  {
    id: 'sumobot',
    name: 'McMaster Sumobot Club',
    role: 'Robotics',
    location: 'Hamilton, Ontario',
    period: 'October 2024 – Present',
    description: 'Tournament-style, one-on-one matches with autonomous fighting robots.',
  },
  {
    id: 'game-development',
    name: 'McMaster Game Development Club',
    role: 'Game development',
    location: 'Hamilton, Ontario',
    period: 'September 2024 – Present',
    description: 'Game jams with Unity, Unreal, Godot, and Blender.',
  },
  {
    id: 'tutoring',
    name: 'Mississauga Secondary School',
    role: 'Academic Tutor · Physics & Mathematics',
    location: 'Mississauga, Ontario',
    period: 'September 2021 – June 2022',
    description: 'Academic tutoring in physics and mathematics.',
  },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', items: ['Python', 'C++', 'C', 'GLSL', 'Java', 'SQL', 'Swift', 'TypeScript'] },
  { title: 'Frameworks & APIs', items: ['OpenGL', 'SDL3', 'PyGame', 'OpenCV', 'Unreal Engine 5', 'Godot', 'Unity', 'Blender'] },
  { title: 'Tools', items: ['Unix', 'Vim', 'Git', 'CMake', 'Maven', 'Quartus', 'MATLAB', 'Arduino', 'MS Office'] },
];

// Interests are grounded in the projects, work, and clubs listed on the resume.
export const interests: Interest[] = [
  { title: 'Computer graphics', description: 'Physically based rendering, GPU shaders, light transport, and 3D engines.' },
  { title: 'Game development', description: 'Ray casting, game jams, and building interactive worlds.' },
  { title: 'Robotics', description: 'Autonomous robots and the connection between software and hardware.' },
  { title: 'Scientific computing', description: 'Mathematical modelling and maintainable software for scientific work.' },
];

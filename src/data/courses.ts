import type { Course, CourseCategory, CourseStatus, Grade, Term } from '../types';

// All 50 enrollment entries from the supplied unofficial transcript.
// Snapshot: November 1, 2026. Letter grades and non-grade codes are preserved.
// No percentages have been inferred from letter grades.
export const terms: Term[] = [
  { id: '2022 Fall', label: 'Fall 2022', gpa: 11.3, status: 'completed' },
  { id: '2023 Winter', label: 'Winter 2023', gpa: 10.1, status: 'completed' },
  { id: '2023 Spring/Summer', label: 'Spring / Summer 2023', gpa: 12.0, status: 'completed' },
  { id: '2023 Fall', label: 'Fall 2023', gpa: 11.4, status: 'completed' },
  { id: '2024 Winter', label: 'Winter 2024', gpa: 8.6, status: 'completed' },
  { id: '2024 Fall', label: 'Fall 2024', gpa: 7.7, status: 'completed' },
  { id: '2025 Winter', label: 'Winter 2025', gpa: 9.1, status: 'completed' },
  { id: '2025 Spring/Summer', label: 'Spring / Summer 2025', gpa: null, status: 'completed' },
  { id: '2025 Fall', label: 'Fall 2025', gpa: null, status: 'completed' },
  { id: '2026 Winter', label: 'Winter 2026', gpa: null, status: 'completed' },
  { id: '2026 Spring/Summer', label: 'Spring / Summer 2026', gpa: 11.0, status: 'completed' },
  { id: '2026 Fall', label: 'Fall 2026', gpa: null, status: 'in-progress' },
  { id: '2027 Winter', label: 'Winter 2027', gpa: null, status: 'upcoming' },
];

const course = (
  code: string,
  title: string,
  term: string,
  attemptedUnits: number,
  earnedUnits: number,
  grade: Grade,
  category: CourseCategory,
  status: CourseStatus = 'completed',
  highlight = false,
): Course => ({
  id: `${term}-${code}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  code, title, term, attemptedUnits, earnedUnits, grade, category, status, highlight,
});

export const courses: Course[] = [
  course('CHEM 1E03', 'General Chemistry: Engineering I', '2022 Fall', 3, 3, 'A', 'Science'),
  course('ECON 1B03', 'Introductory Microeconomics', '2022 Fall', 3, 3, 'A-', 'Electives'),
  course('ENGINEER 1EE0', 'Engineering Co-op Program', '2022 Fall', 0, 0, 'COM', 'Co-op & training'),
  course('ENGINEER 1P13A', 'Integrated Design Projects in Engineering', '2022 Fall', 0, 0, 'MT', 'Engineering', 'multi-term'),
  course('MATH 1ZA3', 'Engineering Mathematics I', '2022 Fall', 3, 3, 'A+', 'Mathematics', 'completed', true),
  course('PHYSICS 1D03', 'Mechanics', '2022 Fall', 3, 3, 'A+', 'Science', 'completed', true),
  course('WHMIS 1A00', 'Introduction to Health and Safety', '2022 Fall', 0, 0, 'COM', 'Co-op & training'),

  course('ENGINEER 1P13B', 'Integrated Design Projects in Engineering', '2023 Winter', 13, 13, 'A-', 'Engineering'),
  course('MATH 1ZB3', 'Engineering Mathematics II-A', '2023 Winter', 3, 3, 'B', 'Mathematics'),
  course('MATH 1ZC3', 'Engineering Mathematics II-B', '2023 Winter', 3, 3, 'A+', 'Mathematics', 'completed', true),
  course('PHYSICS 1E03', 'Waves, Electricity and Magnetism', '2023 Winter', 3, 3, 'A-', 'Science'),
  course('PSYCH 1F03', 'Survey of Psychology', '2023 Winter', 3, 3, 'A', 'Electives'),

  course('MATH 2Z03', 'Engineering Mathematics III', '2023 Spring/Summer', 3, 3, 'A+', 'Mathematics', 'completed', true),

  course('FARSI 1Z03', 'Introductory Farsi I', '2023 Fall', 3, 3, 'A+', 'Electives', 'completed', true),
  course('SFWRENG 2DA4', 'Digital Systems and Interfacing', '2023 Fall', 4, 4, 'A+', 'Software engineering', 'completed', true),
  course('SFWRENG 2DM3', 'Discrete Mathematics with Applications I', '2023 Fall', 3, 3, 'A-', 'Mathematics'),
  course('SFWRENG 2OP3', 'Object-Oriented Programming', '2023 Fall', 3, 3, 'A+', 'Software engineering', 'completed', true),
  course('SFWRENG 2XC3', 'Software Engineering Practice and Experience', '2023 Fall', 3, 3, 'A', 'Software engineering'),

  course('ENGINEER 2PX3', 'Communications and Societal Impact', '2024 Winter', 3, 3, 'A+', 'Engineering', 'completed', true),
  course('SFWRENG 2AA4', 'Introduction to Software Development', '2024 Winter', 4, 4, 'C+', 'Software engineering'),
  course('SFWRENG 2C03', 'Data Structures and Algorithms', '2024 Winter', 3, 3, 'B-', 'Software engineering'),
  course('SFWRENG 2FA3', 'Discrete Mathematics Applications II', '2024 Winter', 3, 3, 'A+', 'Mathematics', 'completed', true),
  course('SFWRENG 2GA3', 'Computer Architecture', '2024 Winter', 3, 3, 'B-', 'Software engineering'),

  course('SFWRENG 3BB4', 'Software Design II', '2024 Fall', 4, 4, 'D', 'Software engineering'),
  course('SFWRENG 3DB3', 'Databases', '2024 Fall', 3, 3, 'B', 'Software engineering'),
  course('SFWRENG 3MX3', 'Signals and Systems', '2024 Fall', 3, 3, 'A+', 'Software engineering', 'completed', true),
  course('SFWRENG 3O03', 'Linear Optimization', '2024 Fall', 3, 3, 'A', 'Mathematics'),
  course('SFWRENG 3RA3', 'Software Requirements & Security Considerations', '2024 Fall', 3, 3, 'C', 'Software engineering'),
  course('STATS 3Y03', 'Probability and Statistics for Engineering', '2024 Fall', 3, 3, 'A-', 'Mathematics'),

  course('ENGINEER 3PX3', 'Engineering Economics', '2025 Winter', 3, 3, 'A', 'Engineering'),
  course('SFWRENG 3A04', 'Software Design III', '2025 Winter', 4, 4, 'B-', 'Software engineering'),
  course('SFWRENG 3DX4', 'Dynamic Systems and Control', '2025 Winter', 4, 4, 'B+', 'Software engineering'),
  course('SFWRENG 3S03', 'Software Testing', '2025 Winter', 3, 3, 'A-', 'Software engineering'),
  course('SFWRENG 3SH3', 'Operating Systems', '2025 Winter', 3, 3, 'B+', 'Software engineering'),

  course('ENGINEER 2EC0', 'Engineering Work Term', '2025 Spring/Summer', 0, 0, 'COM', 'Co-op & training'),
  course('ENGINEER 2EC0', 'Engineering Work Term', '2025 Fall', 0, 0, 'COM', 'Co-op & training'),
  course('ENGINEER 2EC0', 'Engineering Work Term', '2026 Winter', 0, 0, 'COM', 'Co-op & training'),
  course('ENGINEER 2EC0', 'Engineering Work Term', '2026 Spring/Summer', 0, 0, 'COM', 'Co-op & training'),
  course('ENVSOCTY 2RW3', 'World Regional Geography', '2026 Spring/Summer', 3, 3, 'A', 'Electives'),

  course('COMPSCI 4CR3', 'Applied Cryptography', '2026 Fall', 3, 0, null, 'Software engineering', 'in-progress'),
  course('ENGINEER 4A03', 'Ethics, Equity and Law in Engineering', '2026 Fall', 3, 0, null, 'Engineering', 'in-progress'),
  course('SFWRENG 4AA4', 'Real Time Systems', '2026 Fall', 4, 0, null, 'Software engineering', 'in-progress'),
  course('SFWRENG 4G06A', 'Software Design IV', '2026 Fall', 0, 0, null, 'Software engineering', 'in-progress'),
  course('SFWRENG 4HC3', 'Human Computer Interfaces', '2026 Fall', 3, 0, null, 'Software engineering', 'in-progress'),
  course('SFWRENG 4X03', 'Scientific Computation', '2026 Fall', 3, 0, null, 'Software engineering', 'in-progress'),

  course('ASTRON 2E03', 'Planetary Astronomy', '2027 Winter', 3, 0, null, 'Science', 'upcoming'),
  course('SFWRENG 4AL3', 'Applications of Machine Learning', '2027 Winter', 3, 0, null, 'Software engineering', 'upcoming'),
  course('SFWRENG 4C03', 'Computer Networks and Security', '2027 Winter', 3, 0, null, 'Software engineering', 'upcoming'),
  course('SFWRENG 4E03', 'Performance Analysis of Computer Systems', '2027 Winter', 3, 0, null, 'Software engineering', 'upcoming'),
  course('SFWRENG 4G06B', 'Software Design IV', '2027 Winter', 6, 0, null, 'Software engineering', 'upcoming'),
];

export interface Honour {
  title: string;
  detail: string;
}

export interface Education {
  institution: string;
  degree: string;
  program: string;
  location: string;
  startYear: number;
  expectedGraduation: number;
  years: string;
  gpa: number;
  gpaScale: number;
  gpaSource: string;
  honours: Honour[];
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  summary: string;
  education: Education;
}

export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  team: string;
  role: string;
  location: string;
  period: string;
  start: string;
  end: string;
  description: string;
  bullets: string[];
  technologies: string[];
  metrics: ExperienceMetric[];
}

export interface Activity {
  id: string;
  name: string;
  role: string;
  location: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Interest {
  title: string;
  description: string;
}

export type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';
export type Grade = LetterGrade | 'COM' | 'MT' | null;
export type CourseStatus = 'completed' | 'in-progress' | 'upcoming' | 'multi-term';
export type CourseCategory = 'Science' | 'Electives' | 'Co-op & training' | 'Engineering' | 'Mathematics' | 'Software engineering';
export type TermStatus = Exclude<CourseStatus, 'multi-term'>;

export interface Course {
  id: string;
  code: string;
  title: string;
  term: string;
  attemptedUnits: number;
  earnedUnits: number;
  grade: Grade;
  category: CourseCategory;
  status: CourseStatus;
  highlight: boolean;
}

export interface Term {
  id: string;
  label: string;
  gpa: number | null;
  status: TermStatus;
}

export type ProjectCategory = 'Graphics' | 'Games' | 'Tools' | 'Coursework';

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  languages: string[];
  category: ProjectCategory;
  featured: boolean;
  fromResume: boolean;
  fork: boolean;
  archived: boolean;
  image?: string;
  imageAlt?: string;
  imageSource?: string;
  status?: string;
  details: string[];
  updatedAt: string;
}

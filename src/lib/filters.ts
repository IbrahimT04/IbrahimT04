import type { Course, CourseStatus, Project } from '../types';

interface CourseFilters {
  query?: string;
  term?: string;
  status?: CourseStatus | 'all';
  strongOnly?: boolean;
}

interface ProjectFilters {
  query?: string;
  category?: string;
}

export function filterCourses(courses: Course[], { query = '', term = 'all', status = 'all', strongOnly = false }: CourseFilters = {}): Course[] {
  const text = query.trim().toLowerCase();
  return courses.filter(course =>
    (!text || `${course.code} ${course.title} ${course.category}`.toLowerCase().includes(text)) &&
    (term === 'all' || course.term === term) &&
    (status === 'all' || course.status === status) &&
    (!strongOnly || ['A+', 'A', 'A-'].includes(course.grade)),
  );
}

export function filterProjects(projects: Project[], { query = '', category = 'All' }: ProjectFilters = {}): Project[] {
  const text = query.trim().toLowerCase();
  return projects.filter(project =>
    (category === 'All' || project.category === category) &&
    (!text || `${project.name} ${project.description} ${(project.languages || []).join(' ')}`.toLowerCase().includes(text)),
  );
}

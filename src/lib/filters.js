export function filterCourses(courses, { query = '', term = 'all', status = 'all', strongOnly = false } = {}) {
  const text = query.trim().toLowerCase();
  return courses.filter(course =>
    (!text || `${course.code} ${course.title} ${course.category}`.toLowerCase().includes(text)) &&
    (term === 'all' || course.term === term) &&
    (status === 'all' || course.status === status) &&
    (!strongOnly || ['A+', 'A', 'A-'].includes(course.grade)),
  );
}

export function filterProjects(projects, { query = '', category = 'All' } = {}) {
  const text = query.trim().toLowerCase();
  return projects.filter(project =>
    (category === 'All' || project.category === category) &&
    (!text || `${project.name} ${project.description} ${(project.languages || []).join(' ')}`.toLowerCase().includes(text)),
  );
}

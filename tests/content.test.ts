import assert from 'node:assert/strict';
import test from 'node:test';
import { courses, terms } from '../src/data/courses.ts';
import { projects } from '../src/data/projects.ts';
import { profile } from '../src/data/profile.ts';
import { filterCourses, filterProjects } from '../src/lib/filters.ts';

// Independent fixtures transcribed from the supplied transcript and the public
// GitHub inventory. These protect completeness when portfolio content is edited.
const publicProjectIds = [
  '3D-Car-Game', 'Block-Shooter', 'Clarify', 'GemScan', 'GraphiXion',
  'Grid-Masters', 'HydroSim', 'Ibrahim_C_plus_plus', 'Ibrahim_Python3',
  'Iron-Tide', 'Island-Explorer-Assignment', 'Maze-Runner-Assignment',
  'Portfolio-Templates', 'PyEngine', 'RayTraceMax', 'Raycast-FPS-Discontinued',
  'Retro-Requiem', 'Slither-Blitz', 'The-Quality-Education-Goal',
  'War-Game', 'vk-renderer-playground',
];

const transcriptLetterGrades = {
  'CHEM 1E03': 'A',
  'ECON 1B03': 'A-',
  'MATH 1ZA3': 'A+',
  'PHYSICS 1D03': 'A+',
  'ENGINEER 1P13B': 'A-',
  'MATH 1ZB3': 'B',
  'MATH 1ZC3': 'A+',
  'PHYSICS 1E03': 'A-',
  'PSYCH 1F03': 'A',
  'MATH 2Z03': 'A+',
  'FARSI 1Z03': 'A+',
  'SFWRENG 2DA4': 'A+',
  'SFWRENG 2DM3': 'A-',
  'SFWRENG 2OP3': 'A+',
  'SFWRENG 2XC3': 'A',
  'ENGINEER 2PX3': 'A+',
  'SFWRENG 2AA4': 'C+',
  'SFWRENG 2C03': 'B-',
  'SFWRENG 2FA3': 'A+',
  'SFWRENG 2GA3': 'B-',
  'SFWRENG 3BB4': 'D',
  'SFWRENG 3DB3': 'B',
  'SFWRENG 3MX3': 'A+',
  'SFWRENG 3O03': 'A',
  'SFWRENG 3RA3': 'C',
  'STATS 3Y03': 'A-',
  'ENGINEER 3PX3': 'A',
  'SFWRENG 3A04': 'B-',
  'SFWRENG 3DX4': 'B+',
  'SFWRENG 3S03': 'A-',
  'SFWRENG 3SH3': 'B+',
  'ENVSOCTY 2RW3': 'A',
};

test('the project directory includes all 21 public projects exactly once', () => {
  assert.deepEqual(projects.map((project) => project.id).sort(), [...publicProjectIds].sort());
  assert.equal(new Set(projects.map((project) => project.id)).size, 21);
  for (const project of projects) {
    assert.equal(project.url, `https://github.com/IbrahimT04/${project.id}`);
  }
  assert.deepEqual(projects.filter((project) => project.fork).map((project) => project.id), ['GemScan']);
  assert.deepEqual(projects.filter((project) => project.archived).map((project) => project.id), ['Raycast-FPS-Discontinued']);
  const placeholder = projects.find((project) => project.id === 'vk-renderer-playground');
  assert.equal(placeholder?.status, 'Repository placeholder');
  assert.match(placeholder?.description ?? '', /no source code/i);
});

test('all four resume projects remain featured with their complete technical details', () => {
  const requiredFeatures: Record<string, string[]> = {
    RayTraceMax: [
      'OpenGL 4.6', 'GLFW', 'Python', 'GPU compute shader', 'physically based',
      'Monte Carlo', 'Multiple Importance Sampling', 'Next-Event Estimation',
      'Cook–Torrance', 'GGX/Smith', 'Schlick Fresnel', 'metallic/roughness',
      'IOR', 'clearcoat', 'transmission', 'HDR', 'IBL', 'SSBO',
    ],
    GraphiXion: [
      'OpenGL', 'GLSL', 'Python', 'customizable shaders', 'lighting', 'texture mapping',
      'Parallax Occlusion Mapping', 'Soft Shadow Mapping', 'Physically Based Rendering',
      'Tangent-Bitangent-Normal', 'TBN', 'normal maps',
    ],
    'Block-Shooter': [
      'Python', 'Pygame', 'NumPy', 'level design', 'enemy types', 'scoring',
      'ray casting', 'anti-aliasing', 'Xiaolin Wu', 'DDA', 'line drawing',
      'frame tracking', '60 Hz',
    ],
    Clarify: [
      'C++', 'OpenCV', 'open-source', 'enhancement', 'manipulation', 'analysis',
      'sharpening', 'blurring', 'noise reduction', 'edge detection', 'filtering',
    ],
  };
  const resumeProjects = projects.filter((project) => project.fromResume);
  assert.deepEqual(resumeProjects.map((project) => project.id).sort(), Object.keys(requiredFeatures).sort());
  for (const project of resumeProjects) {
    assert.equal(project.featured, true);
    const details = project.details.join(' ').toLowerCase();
    const features = requiredFeatures[project.id];
    assert.ok(features, `${project.name} needs a resume feature fixture`);
    for (const feature of features) {
      assert.ok(details.includes(feature.toLowerCase()), `${project.name} must retain ${feature}`);
    }
  }
});

test('all 50 transcript enrollments and every reported letter grade are preserved', () => {
  assert.equal(courses.length, 50);
  assert.equal(new Set(courses.map((course) => course.id)).size, 50);
  assert.equal(terms.length, 13);
  const letterGradedCourses = courses.filter((course) => course.grade !== null && !['COM', 'MT'].includes(course.grade));
  assert.equal(letterGradedCourses.length, 32);
  assert.deepEqual(Object.fromEntries(letterGradedCourses.map((course) => [course.code, course.grade])), transcriptLetterGrades);
  assert.equal(courses.filter((course) => course.grade === 'A+').length, 10);
  assert.equal(courses.reduce((total, course) => total + course.earnedUnits, 0), 111);
  assert.ok(courses.every((course) => terms.some((term) => term.id === course.term)));
});

test('current and upcoming enrollments stay ungraded and distinct from completed work', () => {
  const current = courses.filter((course) => course.status === 'in-progress');
  const upcoming = courses.filter((course) => course.status === 'upcoming');
  assert.deepEqual(current.map((course) => course.code), [
    'COMPSCI 4CR3', 'ENGINEER 4A03', 'SFWRENG 4AA4',
    'SFWRENG 4G06A', 'SFWRENG 4HC3', 'SFWRENG 4X03',
  ]);
  assert.deepEqual(upcoming.map((course) => course.code), [
    'ASTRON 2E03', 'SFWRENG 4AL3', 'SFWRENG 4C03', 'SFWRENG 4E03', 'SFWRENG 4G06B',
  ]);
  assert.ok(current.every((course) => course.term === '2026 Fall'));
  assert.ok(upcoming.every((course) => course.term === '2027 Winter'));
  assert.ok([...current, ...upcoming].every((course) => course.grade === null && course.earnedUnits === 0));
  assert.equal(courses.filter((course) => course.status === 'completed').length, 38);
});

test('non-grade codes and all repeated work terms survive data processing', () => {
  assert.equal(courses.filter((course) => course.grade === 'COM').length, 6);
  assert.equal(courses.filter((course) => course.grade === 'MT').length, 1);
  assert.deepEqual(courses.filter((course) => course.code === 'ENGINEER 2EC0').map((course) => course.term), [
    '2025 Spring/Summer', '2025 Fall', '2026 Winter', '2026 Spring/Summer',
  ]);
  const multiTerm = courses.find((course) => course.code === 'ENGINEER 1P13A');
  assert.equal(multiTerm?.grade, 'MT');
  assert.equal(multiTerm?.status, 'multi-term');
  assert.equal(multiTerm?.earnedUnits, 0);
  assert.equal(courses.find((course) => course.code === 'ENGINEER 1P13B')?.earnedUnits, 13);
  assert.equal(courses.find((course) => course.code === 'SFWRENG 4G06A')?.attemptedUnits, 0);
  assert.equal(courses.find((course) => course.code === 'SFWRENG 4G06B')?.attemptedUnits, 6);
});

test('academic data contains recorded letter grades and GPA, never invented percentages', () => {
  const recordedCodes = new Set<string | null>(['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'COM', 'MT', null]);
  for (const course of courses) {
    assert.ok(recordedCodes.has(course.grade), `${course.code} has an unsupported grade`);
    assert.ok(!Object.keys(course).some((key) => /percentage|percent|numericGrade/i.test(key)));
  }
  assert.equal(profile.education.gpa, 9.8);
  assert.equal(profile.education.gpaScale, 12);
  assert.match(profile.education.gpaSource, /resume/i);
  assert.equal(JSON.stringify(courses).includes('%'), false);
});

test('the default course view includes lower grades and all current and future enrollments', () => {
  const results = filterCourses(courses);
  assert.equal(results.length, 50);
  assert.equal(results.find((course) => course.code === 'SFWRENG 3BB4')?.grade, 'D');
  assert.equal(results.find((course) => course.code === 'SFWRENG 2AA4')?.grade, 'C+');
  assert.equal(results.filter((course) => course.grade === null).length, 11);
});

test('course search, term, status, and strongest-grade filters compose correctly', () => {
  const results = filterCourses(courses, {
    query: '  sFwReNg  ', term: '2024 Fall', status: 'completed', strongOnly: true,
  });
  assert.deepEqual(results.map((course) => course.code), ['SFWRENG 3MX3', 'SFWRENG 3O03']);
  assert.deepEqual(filterCourses(courses, { query: '  CrYpToGrApHy  ', status: 'in-progress' }).map((course) => course.code), ['COMPSCI 4CR3']);
  assert.equal(filterCourses(courses, { query: 'Cryptography', term: '2027 Winter' }).length, 0);
  assert.equal(filterCourses(courses, { status: 'upcoming', strongOnly: true }).length, 0);
  assert.equal(filterCourses(courses, { term: '2026 Fall', status: 'completed' }).length, 0);
});

test('project search combines category and technology without dropping the full inventory', () => {
  assert.equal(filterProjects(projects).length, 21);
  assert.deepEqual(filterProjects(projects, { query: '  gLsL  ', category: 'Graphics' }).map((project) => project.id), ['RayTraceMax', 'GraphiXion', 'PyEngine']);
  assert.deepEqual(filterProjects(projects, { query: ' NumPy ', category: 'Games' }).map((project) => project.id), ['Block-Shooter']);
  assert.equal(filterProjects(projects, { query: 'NumPy', category: 'Coursework' }).length, 0);
  assert.deepEqual(filterProjects(projects, { query: 'Java', category: 'Coursework' }).map((project) => project.id), ['Maze-Runner-Assignment', 'Island-Explorer-Assignment']);
});

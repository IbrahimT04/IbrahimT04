import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, SlidersHorizontal, X, Award, GraduationCap } from 'lucide-react';
import { courses, terms } from '../data/courses.js';
import { profile } from '../data/profile.js';
import { filterCourses } from '../lib/filters.js';

const highlightCodes = ['SFWRENG 2OP3', 'SFWRENG 2DA4', 'SFWRENG 3MX3', 'MATH 2Z03'];
const statusLabels = { completed: 'Completed', 'in-progress': 'In progress', upcoming: 'Upcoming', 'multi-term': 'Multi-term' };

export default function CourseExplorer() {
  const [query, setQuery] = useState('');
  const [term, setTerm] = useState('all');
  const [status, setStatus] = useState('all');
  const [strongOnly, setStrongOnly] = useState(false);
  const filtered = useMemo(() => filterCourses(courses, { query, term, status, strongOnly }), [query, term, status, strongOnly]);
  const reset = () => { setQuery(''); setTerm('all'); setStatus('all'); setStrongOnly(false); };
  const hasFilter = query || term !== 'all' || status !== 'all' || strongOnly;

  return <section id="education" className="section education-section">
    <div className="section-heading" data-reveal>
      <div><p className="eyebrow"><span>03 /</span> THE FOUNDATION</p><h2>Curiosity, backed<br />by the coursework.</h2></div>
      <p className="section-intro">The theory behind the things I build. A complete look at my engineering education, with a few personal highlights.</p>
    </div>
    <div className="degree-banner" data-reveal>
      <div className="degree-icon"><GraduationCap size={30} strokeWidth={1.4} /></div>
      <div className="degree-copy"><p className="eyebrow">McMASTER UNIVERSITY · HAMILTON, ON</p><h3>B.Eng. Software Engineering</h3><p>Co-op program · 2022–2027 · Expected graduation 2027</p></div>
      <div className="gpa"><strong>{profile.education.gpa}<span> / 12</span></strong><span>GPA · resume-reported</span></div>
    </div>
    <div className="honours"><span><Award size={16} /> Dean’s Honour List · 2023 & 2024</span><span><Award size={16} /> Faculty of Engineering Achievement Award</span></div>
    <div className="course-highlights" data-reveal>{highlightCodes.map(code => {
      const course = courses.find(item => item.code === code);
      return <button key={code} className="course-highlight" onClick={() => { setQuery(code); setTerm('all'); setStatus('all'); setStrongOnly(false); document.getElementById('course-explorer').scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
        <span className="highlight-top"><span className="mono">{course.code}</span><ArrowUpRight size={17} /></span><strong>{course.grade}</strong><span>{course.title}</span>
      </button>;
    })}</div>
    <div id="course-explorer" className="course-explorer">
      <div className="explorer-title"><div><h3>The full academic record</h3><p>Every course, work term, and result. Snapshot: November 1, 2026.</p></div><span className="record-count mono">50 ENTRIES</span></div>
      <div className="course-controls">
        <label className="search-field"><Search size={18} /><span className="sr-only">Search courses</span><input placeholder="Search courses or codes…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button aria-label="Clear course search" onClick={() => setQuery('')}><X size={16} /></button>}</label>
        <label className="select-field"><span className="sr-only">Filter by term</span><select value={term} onChange={event => setTerm(event.target.value)}><option value="all">All terms</option>{terms.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label className="select-field"><span className="sr-only">Filter by course status</span><select value={status} onChange={event => setStatus(event.target.value)}><option value="all">All statuses</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      <div className="filter-meta"><button className={`filter-toggle ${strongOnly ? 'is-active' : ''}`} aria-pressed={strongOnly} onClick={() => setStrongOnly(value => !value)}><SlidersHorizontal size={14} /> A-range grades</button><span role="status">Showing {filtered.length} of {courses.length} entries</span>{hasFilter && <button className="text-button" onClick={reset}>Reset filters <X size={13} /></button>}</div>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Academic course results, scroll to view all entries">
        <table><caption className="sr-only">All McMaster University course enrollments and recorded grades</caption><thead><tr><th scope="col">COURSE</th><th scope="col">TERM</th><th scope="col">UNITS <span className="sr-only">earned / attempted</span></th><th scope="col">GRADE</th></tr></thead>
          <tbody>{filtered.map(course => <tr key={course.id}><td><span className="course-code mono">{course.code}</span><span className="course-name">{course.title}</span></td><td><span>{terms.find(item => item.id === course.term)?.label}</span>{course.status !== 'completed' && <small className="course-status">{statusLabels[course.status]}</small>}</td><td className="mono units">{course.earnedUnits}<span> / {course.attemptedUnits}</span></td><td><span className={`grade ${course.highlight ? 'grade-best' : ''} ${!course.grade ? 'grade-pending' : ''}`}>{course.grade || '—'}</span></td></tr>)}</tbody>
        </table>
        {!filtered.length && <div className="empty-state"><Search size={26} /><h4>No courses found</h4><p>Try another course name, code, or term.</p><button className="text-button" onClick={reset}>Clear all filters <ArrowUpRight size={16} /></button></div>}
      </div>
      <p className="grade-note">Grades are shown exactly as recorded, without percentage conversions. <strong>COM</strong> = completed · <strong>MT</strong> = multi-term · <strong>—</strong> = no grade recorded. Units show earned / attempted.</p>
    </div>
  </section>;
}

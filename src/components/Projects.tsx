import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Braces, ChevronRight, Code2, Github, Search, X, Box, Layers, GitFork } from 'lucide-react';
import { projects } from '../data/projects';
import { filterProjects } from '../lib/filters';
import type { Project } from '../types';

function ProjectArtwork({ project }: { project: Project }) {
  if (project.image) return <img src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`} alt={project.imageAlt || `${project.name} screenshot from its GitHub repository`} loading="lazy" />;
  return <div className={`project-concept ${project.name.toLowerCase().includes('clarify') ? 'concept-clarify' : 'concept-graphics'}`} aria-hidden="true">
    <div className="concept-grid" /><div className="concept-object">{project.name.toLowerCase().includes('clarify') ? <Layers size={100} strokeWidth={0.7} /> : <Box size={114} strokeWidth={0.65} />}</div><span className="concept-caption mono">{project.name.toLowerCase().includes('clarify') ? 'INPUT → FILTER → CLARITY' : 'GEOMETRY × LIGHT × MATERIAL'}</span><span className="concept-tag mono">CONCEPT STUDY</span>
  </div>;
}

export default function Projects() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const featured = projects.filter(project => project.fromResume);
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const filtered = useMemo(() => filterProjects(projects, { query, category }), [query, category]);
  const shown = expanded || query || category !== 'All' ? filtered : filtered.slice(0, 6);

  useEffect(() => {
    if (!selected) return;
    const focused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = oldOverflow; focused?.focus(); };
  }, [selected]);

  return <section id="work" className="section projects-section">
    <div className="section-heading" data-reveal><div><p className="eyebrow"><span>01 /</span> SELECTED WORK</p><h2>Built from curiosity.<br /><span className="muted">Refined through code.</span></h2></div><p className="section-intro">Rendering light. Building worlds. Solving problems from the ground up. Four projects from my resume.</p></div>
    <div className="featured-grid">{featured.map((project, index) => <article className="project-card" key={project.id} data-reveal>
      <button className="project-art" aria-label={`Explore ${project.name}`} onClick={() => setSelected(project)}><ProjectArtwork project={project} /><span className="project-number mono">0{index + 1}</span><span className="project-open"><ArrowUpRight size={23} /></span></button>
      <div className="project-card-body"><div className="project-title-row"><h3><button onClick={() => setSelected(project)}>{project.name}</button></h3><span className="project-category">{project.category}</span></div><p>{project.description}</p><div className="project-card-footer"><div className="tags">{project.languages.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><button className="text-button" onClick={() => setSelected(project)}>Explore <ArrowUpRight size={16} /></button></div></div>
    </article>)}</div>
    <div className="archive" data-reveal>
      <div className="archive-heading"><div><p className="eyebrow">THE REST OF THE EXPLORATION</p><h3>Project index <span>{projects.length}</span></h3></div><a href="https://github.com/IbrahimT04?tab=repositories" target="_blank" rel="noreferrer" className="text-button">All repositories <Github size={17} /></a></div>
      <div className="archive-controls"><div className="category-tabs" role="group" aria-label="Project categories">{categories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field archive-search"><Search size={16} /><span className="sr-only">Search projects</span><input placeholder="Find a project…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button aria-label="Clear project search" onClick={() => setQuery('')}><X size={14} /></button>}</label></div>
      <p className="sr-only" role="status">Showing {shown.length} of {filtered.length} matching projects</p>
      <div className="archive-list">{shown.map((project, index) => <button className="archive-row" key={project.id} onClick={() => setSelected(project)}><span className="archive-num mono">{String(index + 1).padStart(2, '0')}</span><span className="archive-name">{project.name}{project.fork && <span className="fork-label"><GitFork size={12} /> Fork</span>}</span><span className="archive-description">{project.description}</span><span className="archive-language mono">{project.language || project.languages[0] || 'Repository'}</span><ArrowUpRight size={18} /></button>)}</div>
      {!filtered.length && <div className="empty-state"><Braces size={28} /><h4>No matching projects</h4><p>Try a different language or project name.</p><button className="text-button" onClick={() => { setQuery(''); setCategory('All'); }}>Reset search <X size={14} /></button></div>}
      {category === 'All' && !query && <button className="archive-expand" onClick={() => setExpanded(value => !value)}>{expanded ? 'Show fewer projects' : `Explore all ${projects.length} projects`}<ArrowDown size={16} style={{ transform: expanded ? 'rotate(180deg)' : undefined }} /></button>}
      <p className="archive-note">Public GitHub repositories · November 2026 snapshot · Forks are identified.</p>
    </div>
    {selected && <dialog ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}><div className="dialog-content"><button className="dialog-close" autoFocus aria-label="Close project details" onClick={() => setSelected(null)}><X size={22} /></button><p className="eyebrow">{selected.category}{selected.fork ? ' / FORKED REPOSITORY' : ''}</p><h2 id="project-dialog-title">{selected.name}</h2><p className="dialog-description">{selected.description}</p>{selected.image && <div className="dialog-image"><ProjectArtwork project={selected} /></div>}<div className="tags dialog-tags">{selected.languages.map(language => <span key={language}>{language}</span>)}</div>{selected.details?.length > 0 && <ul className="project-details">{selected.details.map(detail => <li key={detail}><ChevronRight size={15} /><span>{detail}</span></li>)}</ul>}<div className="dialog-actions"><a className="button primary" href={selected.url} target="_blank" rel="noreferrer">View source <Github size={17} /></a>{selected.homepage && <a className="button secondary" href={selected.homepage} target="_blank" rel="noreferrer">Project website <ArrowUpRight size={17} /></a>}</div><p className="source-note"><Code2 size={13} /> Details from the repository{selected.fromResume ? ' and resume' : ''}.</p></div></dialog>}
  </section>;
}

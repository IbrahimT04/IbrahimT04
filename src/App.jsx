import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowUp, Check, Code2, Copy, Download, Github, Linkedin, Mail, MapPin, Menu, Pause, Play, X, Sparkles, Cpu, Terminal, Workflow } from 'lucide-react';
import SignalScene from './components/SignalScene.jsx';
import Projects from './components/Projects.jsx';
import CourseExplorer from './components/CourseExplorer.jsx';
import { profile, experience, skillGroups, activities, interests } from './data/profile.js';

const links = [['work', 'Work'], ['experience', 'Experience'], ['education', 'Education'], ['about', 'About']];
const skillIcons = [Code2, Cpu, Terminal];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [paused, setPaused] = useState(false);
  const [copyState, setCopyState] = useState('idle');
  const copyTimer = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.dataset.revealed = 'true'; observer.unobserve(entry.target); } }), { threshold: 0.06 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    const sections = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-15% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => sections.observe(section));
    return () => { observer.disconnect(); sections.disconnect(); clearTimeout(copyTimer.current); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = event => { if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('menu-toggle').focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopyState('copied'); }
    catch { setCopyState('failed'); }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState('idle'), 3500);
  };

  return <div className="app" data-motion={paused ? 'paused' : 'active'}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a href="#home" className="wordmark" aria-label="Ibrahim Tariq home">it<span>.</span></a><nav className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation" id="main-navigation">{links.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><a className="header-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a><button id="menu-toggle" className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X /> : <Menu />}</button></header>
    <main id="main">
      <section className="hero" id="home">
        <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" /> SOFTWARE ENGINEERING · McMASTER ’27</p><p className="hero-intro">Hi, I’m Ibrahim Tariq.</p><h1>Turning code<br />into <span className="hero-accent">experience<svg viewBox="0 0 510 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12Q240-4 505 9" /></svg></span><span className="hero-period">.</span></h1><p className="hero-description">I build graphics engines, simulate the world, and make complex systems feel simple. Curious about what’s underneath. Driven to make it work.</p><div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowDown size={17} /></a><a className="button secondary" href={`${import.meta.env.BASE_URL}Ibrahim_Tariq_Resume.pdf`} download>Resume <Download size={17} /></a></div><div className="hero-meta"><span><MapPin size={14} /> Ontario, Canada</span><span className="hero-meta-divider" /><span>Graphics-minded. Systems-driven.</span></div></div>
        <div className="hero-visual"><div className="scene-corner corner-tl" /><div className="scene-corner corner-br" /><div className="scene-topline mono"><span><span className="tiny-square" /> LIVE GEOMETRY</span><span>FIG. 001</span></div><div className="signal-stage"><SignalScene paused={paused} /></div><div className="scene-bottomline"><div><p className="mono">A STUDY IN MOTION</p><span>Mathematics, made visible.</span></div><button className="motion-control" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Resume animations' : 'Pause animations'} aria-pressed={paused}>{paused ? <Play size={15} /> : <Pause size={15} />}</button></div><span className="scene-coordinate mono">x / y / z</span></div>
        <div className="hero-bottom"><span className="mono">SCROLL TO EXPLORE</span><ArrowDown size={15} /><span className="hero-bottom-right">ENGINEERING WITH INTENT, FROM PIXEL TO SYSTEM.</span></div>
      </section>
      <div className="discipline-strip" aria-label="Areas of interest"><span>COMPUTER GRAPHICS</span><span className="strip-star">✳</span><span>SCIENTIFIC SOFTWARE</span><span className="strip-star">✳</span><span>GAME DEVELOPMENT</span><span className="strip-star">✳</span><span>SOFTWARE ENGINEERING</span></div>
      <Projects />
      <section id="experience" className="section experience-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span>02 /</span> EXPERIENCE</p><h2>Engineering with<br />real-world impact.</h2></div><p className="section-intro">From hydrologic models to AI training data, I care about software that’s useful, understandable, and built to last.</p></div>
        <div className="experience-list">{experience.map((job, index) => <article className="experience-item" key={job.id} data-reveal><div className="experience-date"><span className="experience-dot" /><p className="mono">{job.period}</p><span>{job.location}</span><span className="job-index">0{index + 1}</span></div><div className="experience-content"><p className="eyebrow">{job.role}</p><h3>{job.company}</h3>{job.team && <p className="job-team">{job.team}</p>}<p className="job-description">{job.description}</p><div className="job-metrics">{job.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><ul className="job-bullets">{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="tags">{job.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></article>)}</div>
      </section>
      <CourseExplorer />
      <section id="about" className="section about-section"><div className="section-heading" data-reveal><div><p className="eyebrow"><span>04 /</span> THE TOOLKIT & THE PERSON</p><h2>Always a little<br />deeper down the rabbit hole.</h2></div><p className="section-intro">{profile.summary}</p></div>
        <div className="skills-grid">{skillGroups.map((group, index) => { const Icon = skillIcons[index]; return <div className="skill-group" key={group.title} data-reveal><Icon size={25} strokeWidth={1.4} /><h3>{group.title}</h3><div className="skill-tags">{group.items.map(skill => <span key={skill}>{skill}</span>)}</div></div>; })}</div>
        <div className="interests-block" data-reveal><p className="eyebrow">WHAT KEEPS ME CURIOUS</p><div className="interests-grid">{interests.map((interest, index) => <div key={interest.title}><span className="mono">0{index + 1}</span><h3>{interest.title}</h3><p>{interest.description}</p></div>)}</div></div>
        <div className="activities-heading"><h3>Beyond the editor.</h3><span className="mono">COMMUNITY & COLLABORATION</span></div><div className="activities-grid">{activities.map((activity, index) => <article key={activity.id} data-reveal><div className="activity-icon">{index === 0 ? <Cpu size={24} /> : index === 1 ? <Sparkles size={24} /> : <Workflow size={24} />}</div><p className="activity-role">{activity.role}</p><h4>{activity.name}</h4><p>{activity.description}</p><span className="activity-period mono">{activity.period}</span></article>)}</div>
      </section>
      <section id="contact" className="contact-section" data-reveal><div><p className="eyebrow"><span className="status-dot" /> LET’S CONNECT</p><h2>Have something<br />interesting in mind<span>?</span></h2><p>A graphics experiment, a difficult engineering problem,<br className="desktop-break" /> or a chance to build something useful. Let’s talk.</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={35} /></a><div className="contact-actions"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={13} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={13} /></a><button onClick={copyEmail}>{copyState === 'copied' ? <Check size={17} /> : <Copy size={17} />}<span role="status">{copyState === 'copied' ? 'Email copied' : copyState === 'failed' ? 'Please copy the address above' : 'Copy email'}</span></button></div></div><div className="contact-symbol" aria-hidden="true">↗</div></section>
    </main>
    <footer className="site-footer"><a href="#home" className="wordmark" aria-label="Back to Ibrahim Tariq home">it<span>.</span></a><p>© {new Date().getFullYear()} Ibrahim Tariq<span>Built with curiosity. And React.</span></p><a href="#home" className="back-to-top">Back to top <ArrowUp size={16} /></a></footer>
  </div>;
}

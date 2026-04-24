import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/AnimatedBackground';
import './ResumePage.css';

import resumePdf from '../Resume/Thossaphol_Resume.pdf';

function ResumePage() {
    const { t } = useTranslation();
    const education = t('resume.educationItems', { returnObjects: true });
    const experience = t('resume.experienceItems', { returnObjects: true });
    const projects = t('resume.projectItems', { returnObjects: true });
    const techSkills = t('resume.techSkills', { returnObjects: true });
    const softSkills = t('resume.softSkillsItems', { returnObjects: true });
    const [isVisible, setIsVisible] = useState(false);
    const timelineRef = useRef(null);
    const skillsRef = useRef(null);
    const projectRef = useRef(null);
    const [timelineVisible, setTimelineVisible] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const [projectVisible, setProjectVisible] = useState(false);

    const renderBulletDescription = (description) => {
        const points = description
            .split('. ')
            .map((point) => point.trim())
            .filter(Boolean)
            .map((point) => (point.endsWith('.') ? point : `${point}.`));

        return (
            <ul className="timeline-bullets">
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        );
    };

    useEffect(() => { setTimeout(() => setIsVisible(true), 100); }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === timelineRef.current && entry.isIntersecting) setTimelineVisible(true);
                if (entry.target === skillsRef.current && entry.isIntersecting) setSkillsVisible(true);
                if (entry.target === projectRef.current && entry.isIntersecting) setProjectVisible(true);
            });
        }, { threshold: 0.1 });
        if (timelineRef.current) observer.observe(timelineRef.current);
        if (skillsRef.current) observer.observe(skillsRef.current);
        if (projectRef.current) observer.observe(projectRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="resume-page">
            <AnimatedBackground />
            {/* HERO */}
            <section className={`resume-hero ${isVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="resume-hero-content">
                        <span className="section-label">{t('resume.sectionLabel')}</span>
                        <h1 className="resume-hero-title">Thossaphol Makpeam</h1>
                        <p className="resume-hero-desc">{t('resume.heroDescription')}</p>
                        <div className="resume-contact-row">
                            <span className="contact-item">📧 Thossapholmp@gmail.com</span>
                            <span className="contact-item">📱 (+66) 080-657-0875</span>
                            <span className="contact-item">📍 Samut Sakhon, Thailand</span>
                        </div>
                        <a href={resumePdf} download="Thossaphol_Resume.pdf" className="download-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            {t('resume.downloadCv')}
                        </a>
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            <section ref={timelineRef} className={`timeline-section ${timelineVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="timeline-grid">
                        <div className="timeline-column">
                            <h2 className="timeline-column-title"><span className="timeline-icon">🎓</span> {t('resume.education')}</h2>
                            <div className="timeline-items">
                                {education.map((item, i) => (
                                    <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.15}s` }}>
                                        <div className="timeline-dot"></div>
                                        <span className="timeline-year">{item.year}</span>
                                        <h3>{item.title}</h3>
                                        <span className="timeline-place">{item.place}</span>
                                        {renderBulletDescription(item.desc)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="timeline-column">
                            <h2 className="timeline-column-title"><span className="timeline-icon">💼</span> {t('resume.internshipExperience')}</h2>
                            <div className="timeline-items">
                                {experience.map((item, i) => (
                                    <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.15}s` }}>
                                        <div className="timeline-dot"></div>
                                        <span className="timeline-year">{item.year}</span>
                                        <h3>{item.title}</h3>
                                        <span className="timeline-place">{item.place}</span>
                                        {renderBulletDescription(item.desc)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECT EXPERIENCE */}
            <section ref={projectRef} className={`project-exp-section ${projectVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header"><span className="section-label">{t('resume.projects')}</span><h2 className="section-title">{t('resume.projectExperience')}</h2></div>
                    <div className="project-exp-grid">
                        {projects.map((proj, i) => (
                            <div key={i} className="project-exp-card" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="project-exp-header">
                                    <h3>{proj.title}</h3>
                                    <span className="project-exp-period">{proj.period}</span>
                                </div>
                                <p>{proj.desc}</p>
                                <Link to="/project" className="project-exp-see-detail">
                                    {t('project.seeDetail')}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SKILLS */}
            <section ref={skillsRef} className={`resume-skills-section ${skillsVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header"><span className="section-label">{t('resume.skills')}</span><h2 className="section-title">{t('resume.technicalAndSoftSkills')}</h2></div>
                    <div className="resume-skills-grid">
                        <div className="tech-skills-card">
                            <h3>{t('resume.technicalSkills')}</h3>
                            <div className="tech-skill-grid">
                                {techSkills.map((skill, i) => {
                                    const skillTier = skill.level >= 85 ? 'expert' : skill.level >= 75 ? 'advanced' : 'solid';
                                    return (
                                        <div key={i} className={`tech-skill-chip ${skillTier}`} style={{ animationDelay: `${i * 0.08}s` }}>
                                            <div className="tech-skill-head">
                                                <span className="tech-skill-name">{skill.name}</span>
                                            </div>
                                            <div className="tech-skill-meta">
                                                <span className="tech-skill-dot"></span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="soft-skills-card">
                            <h3>{t('resume.softSkills')}</h3>
                            <div className="soft-skills-tags">
                                {softSkills.map((skill, i) => (
                                    <span key={i} className="soft-skill-tag" style={{ animationDelay: `${i * 0.1}s` }}>{skill}</span>
                                ))}
                            </div>
                            <div className="languages-section">
                                <h4>{t('resume.languages')}</h4>
                                <div className="language-items">
                                    <div className="language-item"><span>{t('resume.thai')}</span><span className="lang-level">{t('resume.native')}</span></div>
                                    <div className="language-item"><span>{t('resume.english')}</span><span className="lang-level">{t('resume.intermediate')}</span></div>
                                </div>
                            </div>
                            <div className="languages-section">
                                <h4>{t('resume.toolsPlatforms')}</h4>
                                <div className="tools-tags">
                                    {["Git", "Figma", "Postman", "MobaXterm", "Vercel", "Docker"].map((tool, i) => (
                                        <span key={i} className="tool-tag">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ResumePage;

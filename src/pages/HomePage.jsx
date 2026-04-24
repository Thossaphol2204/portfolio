import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/AnimatedBackground';
import LuxuryCarousel from '../components/LuxuryCarousel';
import './HomePage.css';

function HomePage() {
    const { t } = useTranslation();
    const roles = t('home.roles', { returnObjects: true });
    const skills = t('home.skills', { returnObjects: true });
    const [currentRole, setCurrentRole] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);
    const [skillsVisible, setSkillsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setCurrentRole((prev) => (prev + 1) % roles.length), 2500);
        return () => clearInterval(interval);
    }, [roles.length]);

    useEffect(() => { setTimeout(() => setIsVisible(true), 100); }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === skillsRef.current && entry.isIntersecting) setSkillsVisible(true);
            });
        }, { threshold: 0.15 });
        if (skillsRef.current) observer.observe(skillsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page">
            <AnimatedBackground />
            <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
                <div className="hero-grid-bg"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="hero-badge"><span className="badge-pulse"></span><span>{t('home.badge')}</span></div>
                        <h1 className="hero-title">
                            {t('home.greeting')} <span className="hero-name-highlight">Thossaphol Makpeam</span><br />
                            <span className="hero-desired-role-label">{t('home.desiredRoleLabel')}</span>
                            <span className="hero-rotating-wrapper">
                                {roles.map((role, i) => (<span key={i} className={`hero-rotating-text ${i === currentRole ? 'active' : ''}`}>{role}</span>))}
                            </span>
                        </h1>
                        <p className="hero-description">{t('home.description')}</p>
                        <div className="hero-actions">
                            <Link to="/project" className="hero-btn-primary"><span>{t('home.viewMyWork')}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                            <Link to="/resume" className="hero-btn-secondary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg><span>{t('home.myResume')}</span></Link>
                            <Link to="/certificate" className="hero-btn-secondary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10V6a2 2 0 0 0-2-2h-4" /><path d="M2 14v4a2 2 0 0 0 2 2h4" /><path d="M10 2H6a2 2 0 0 0-2 2v4" /><path d="M14 22h4a2 2 0 0 0 2-2v-4" /><rect x="8" y="8" width="8" height="8" rx="1" /></svg><span>{t('nav.certificate')}</span></Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-visual-glow"></div>
                        <LuxuryCarousel />
                    </div>
                </div>
            </section>

            <section ref={skillsRef} className={`skills-section ${skillsVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header"><span className="section-label">{t('home.whatIDo')}</span><h2 className="section-title">{t('home.myCoreSkills')}</h2><p className="section-subtitle">{t('home.skillsSubtitle')}</p></div>
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div key={index} className="skill-card" style={{ animationDelay: `${index * 0.1}s`, '--accent': skill.color }}>
                                <div className="skill-icon-wrapper"><span className="skill-icon">{skill.icon}</span><div className="skill-icon-bg" style={{ background: `${skill.color}15` }}></div></div>
                                <h3>{skill.title}</h3><p>{skill.desc}</p>
                                <Link to="/project" className="skill-link">{t('home.seeProjects')}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default HomePage;

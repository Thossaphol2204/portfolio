import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/AnimatedBackground';
import './ProjectPage.css';

import reward3 from '../pic/reward3.jpg';
import superai from '../pic/superai.jpg';
import facelab0 from '../project/facelab0.png';
import facelab1 from '../project/facelab1.png';
import facelab2 from '../project/facelab2.png';
import facelab3 from '../project/facelab3.png';
import facelab4 from '../project/facelab4.png';
import facelab5 from '../project/facelab5.png';
import chat1 from '../project/chat0.png';
import chat2 from '../project/chat1.png';
import chat3 from '../project/chat3.png';
import fit1 from '../project/fit1.png';
import fit2 from '../project/fit2.png';
import fit3 from '../project/8.png';
import fit4 from '../project/9.png';
import fit5 from '../project/10.png';
import fit6 from '../project/11.png';
import Tv1 from '../project/Tv1.png';
import Tv2 from '../project/Tv2.png';
import Tv3 from '../project/Tv3.png';
import Tv4 from '../project/Tv4.png';
import Tv5 from '../project/Tv5.png';

function ProjectPage() {
    const { t } = useTranslation();
    const translatedProjects = t('project.projects', { returnObjects: true });
    const projects = translatedProjects.map((project, index) => {
        if (index === 0) return { ...project, images: [facelab3, facelab0, facelab1, facelab2, facelab4, facelab5] };
        if (index === 1) return { ...project, images: [chat3, chat1, chat2] };
        if (index === 2) return { ...project, images: [Tv1, superai, Tv5, Tv2, Tv3, Tv4] };
        if (index === 3) return { ...project, images: [fit1, fit2, fit3, fit4, fit5, fit6] };
        return project;
    });
    const [isVisible, setIsVisible] = useState(false);
    const gridRef = useRef(null);
    const [gridVisible, setGridVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => { setTimeout(() => setIsVisible(true), 100); }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.target === gridRef.current && entry.isIntersecting) setGridVisible(true); });
        }, { threshold: 0.1 });
        if (gridRef.current) observer.observe(gridRef.current);
        return () => observer.disconnect();
    }, []);



    return (
        <div className="project-page">
            <AnimatedBackground />
            <section className={`project-hero ${isVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="project-hero-content">
                        <span className="section-label">{t('project.sectionLabel')}</span>
                        <h1 className="project-hero-title">{t('project.title')}</h1>
                        <p className="project-hero-desc">{t('project.description')}</p>
                    </div>
                </div>
            </section>

            <section ref={gridRef} className={`project-grid-section ${gridVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="project-grid">
                        {projects.map((project, index) => (
                            <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s`, '--accent': project.color }} onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') { setSelectedProject(project); setCurrentImageIndex(0); } }}>
                                <div className="project-card-header">
                                    <div className="project-icon-wrapper"><span className="project-icon">{project.icon}</span><div className="project-icon-bg" style={{ background: `${project.color}15` }}></div></div>
                                    <svg className="project-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className="project-tags">{project.tags.map((tag, i) => (<span key={i} className="project-tag">{tag}</span>))}</div>
                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="project-tech-stack">
                                        <span className="tech-stack-label">{t('project.techStackLabel') || 'Tech Stack'}</span>
                                        <div className="tech-stack-items">
                                            {project.techStack.map((tech, i) => (
                                                <span key={i} className="tech-stack-badge" style={{ '--accent': project.color }}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="project-card-footer">
                                    <span className="project-read-more" style={{ color: project.color }}>
                                        {t('project.seeDetail')}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECT MODAL */}
            {selectedProject && (
                <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="project-modal-close" onClick={() => setSelectedProject(null)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="project-modal-header" style={{ '--accent': selectedProject.color }}>
                            <div className="project-modal-icon-wrapper">
                                <span className="project-modal-icon">{selectedProject.icon}</span>
                                <div className="project-modal-icon-bg" style={{ background: `${selectedProject.color}15` }}></div>
                            </div>
                            <h2>{selectedProject.title}</h2>
                        </div>
                        <div className="project-modal-body">
                            {(() => {
                                const imagesList = selectedProject.images || [selectedProject.image].filter(Boolean);
                                if (imagesList.length === 0) return null;

                                return (
                                    <div className="project-modal-image-wrapper">
                                        <img src={imagesList[currentImageIndex]} alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`} className="project-modal-image" />

                                        {imagesList.length > 1 && (
                                            <>
                                                <button className="slider-btn prev" onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1)); }}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                </button>
                                                <button className="slider-btn next" onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1)); }}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                </button>
                                                <div className="slider-dots">
                                                    {imagesList.map((_, idx) => (
                                                        <span key={idx} className={`slider-dot ${idx === currentImageIndex ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}></span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })()}
                            <div className="project-modal-tags">
                                {selectedProject.tags.map((tag, i) => (
                                    <span key={i} className="project-modal-tag" style={{ color: selectedProject.color, background: `${selectedProject.color}15`, borderColor: `${selectedProject.color}30` }}>{tag}</span>
                                ))}
                            </div>
                            {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                                <div className="project-modal-tech-stack">
                                    <span className="tech-stack-label">{t('project.techStackLabel') || 'Tech Stack'}</span>
                                    <div className="tech-stack-items">
                                        {selectedProject.techStack.map((tech, i) => (
                                            <span key={i} className="tech-stack-badge modal-tech" style={{ '--accent': selectedProject.color }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="project-modal-desc-container">
                                <div className="project-modal-desc-header">
                                    <h3>{t('project.projectOverview')}</h3>
                                    {selectedProject.link && selectedProject.link !== "#" && (
                                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="project-paper-btn" style={{ '--btn-color': selectedProject.color }}>
                                            <span>{t('project.viewProjectPaper')}</span>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        </a>
                                    )}
                                </div>
                                <p className="project-modal-main-desc">{selectedProject.desc}</p>

                                {selectedProject.details && selectedProject.details.length > 0 && (
                                    <div className="project-modal-details-list">
                                        <h4>{t('project.keyFeaturesResponsibilities')}</h4>
                                        <ul>
                                            {selectedProject.details.map((detail, idx) => (
                                                <li key={idx}>
                                                    <span className="detail-bullet" style={{ backgroundColor: selectedProject.color }}></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectPage;

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/AnimatedBackground';
import './CertificatePage.css';
import superai from '../cer/Thossaphol_superai.png';
import Goodgrade from '../cer/D.png';
import reward from '../pic/reward1.jpg';
import clound from '../cer/clound.png';
import app from '../cer/app.png'; 
import mathlab from '../cer/mathlab.png';
import idcl from '../cer/idcl.png';
import link from '../cer/link.png';

function CertificatePage() {
    const { t } = useTranslation();
    const translatedCertificates = t('certificate.certificates', { returnObjects: true });
    const certificates = translatedCertificates.map((cert, index) => {
        if (index === 0) return { ...cert, image: superai };
        if (index === 1) return { ...cert, image: idcl };
        if (index === 2) return { ...cert, image: link };
        if (index === 3) return { ...cert, image: clound };
        if (index === 4) return { ...cert, image: app };
        if (index === 5) return { ...cert, image: mathlab };
        if (index === 6) return { ...cert, image: reward };
        if (index === 7) return { ...cert, image: Goodgrade };
        return cert;
    });
    const [isVisible, setIsVisible] = useState(false);
    const gridRef = useRef(null);
    const [gridVisible, setGridVisible] = useState(false);

    useEffect(() => { setTimeout(() => setIsVisible(true), 100); }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.target === gridRef.current && entry.isIntersecting) setGridVisible(true); });
        }, { threshold: 0.1 });
        if (gridRef.current) observer.observe(gridRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="certificate-page">
            <AnimatedBackground />
            <section className={`cert-hero ${isVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="cert-hero-content">
                        <span className="section-label">{t('certificate.sectionLabel')}</span>
                        <h1 className="cert-hero-title">{t('certificate.title')}</h1>
                        <p className="cert-hero-desc">{t('certificate.description')}</p>
                    </div>
                </div>
            </section>

            <section ref={gridRef} className={`cert-grid-section ${gridVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="cert-grid">
                        {certificates.map((cert, index) => (
                            <div key={index} className="cert-card" style={{ animationDelay: `${index * 0.1}s`, '--accent': cert.color }}>
                                <div className="cert-card-inner">
                                    <div className={`cert-card-front ${cert.image ? 'has-image' : ''}`}>
                                        {cert.image ? (
                                            <div className="cert-image-banner">
                                                <img src={cert.image} alt={cert.title} />
                                                <div className="cert-image-overlay">
                                                    <div className="cert-image-icon-overlay">
                                                        <div className="cert-icon-wrapper">
                                                            <span className="cert-icon">{cert.icon}</span>
                                                            <div className="cert-icon-bg" style={{ background: `${cert.color}20` }}></div>
                                                        </div>
                                                    </div>
                                                    <span className="cert-date-badge">{cert.date}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="cert-card-header">
                                                <div className="cert-icon-wrapper"><span className="cert-icon">{cert.icon}</span><div className="cert-icon-bg" style={{ background: `${cert.color}15` }}></div></div>
                                                <span className="cert-date">{cert.date}</span>
                                            </div>
                                        )}
                                        <div className="cert-card-front-content">
                                            <h3>{cert.title}</h3>
                                            <span className="cert-issuer">{cert.issuer}</span>
                                        </div>
                                        <div className="cert-card-front-footer">
                                            <span className="flip-hint" style={{ color: cert.color }}>
                                                {t('certificate.viewDetails')}
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="cert-card-back">
                                        <div className="cert-card-back-content">
                                            <h3>{cert.title}</h3>
                                            <span className="cert-category" style={{ background: `${cert.color}15`, color: cert.color, borderColor: `${cert.color}30` }}>{cert.category}</span>
                                            <p>{cert.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CertificatePage;

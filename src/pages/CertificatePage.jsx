import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/AnimatedBackground';
import './CertificatePage.css';
import sfPlatformAdmin from '../cer/sf_platform_admin.png';
import sfAgentforceSpecialist from '../cer/sf_agentforce_specialist.png';
import sfData360Consultant from '../cer/sf_data_360_consultant.png';
import superai from '../cer/Thossaphol_superai.png';
import Goodgrade from '../cer/D.png';
import reward from '../pic/reward1.jpg';
import clound from '../cer/clound.png';
import app from '../cer/app.png'; 
import mathlab from '../cer/mathlab.png';
import idcl from '../cer/idcl.png';
import link from '../cer/link.png';
import firstClassHonors from '../cer/first_class_honors.jpg';

const CERTIFICATE_META = [
    { image: sfPlatformAdmin, year: '2026', sortKey: 20261019 },
    { image: sfAgentforceSpecialist, year: '2026', sortKey: 20261101 },
    { image: sfData360Consultant, year: '2026', sortKey: 20261112 },
    { image: superai, year: '2024', sortKey: 20240600 },
    { image: idcl, year: '2023', sortKey: 20230600 },
    { image: link, year: '2024', sortKey: 20240500 },
    { image: clound, year: '2024', sortKey: 20240400 },
    { image: app, year: '2024', sortKey: 20240300 },
    { image: mathlab, year: '2022', sortKey: 20220600 },
    { image: reward, year: '2025', sortKey: 20250600 },
    { image: Goodgrade, year: '2024', sortKey: 20240200 },
    { image: firstClassHonors, year: '2026', sortKey: 20260500 },
];

function CertificatePage() {
    const { t } = useTranslation();
    const translatedCertificates = t('certificate.certificates', { returnObjects: true });
    const [selectedYear, setSelectedYear] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [isVisible, setIsVisible] = useState(false);
    const gridRef = useRef(null);
    const [gridVisible, setGridVisible] = useState(false);

    const certificates = useMemo(
        () =>
            translatedCertificates.map((cert, index) => {
                const meta = CERTIFICATE_META[index] || {};
                const fallbackYear = (cert.date?.match(/\d{4}/) || [''])[0];
                const year = meta.year || fallbackYear;
                return {
                    ...cert,
                    id: index,
                    image: meta.image || null,
                    year,
                    sortKey: meta.sortKey || Number(year || 0) * 10000,
                };
            }),
        [translatedCertificates]
    );

    const yearOptions = useMemo(() => {
        const counts = certificates.reduce((acc, cert) => {
            if (cert.year) acc[cert.year] = (acc[cert.year] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => ({ year, count: counts[year] }));
    }, [certificates]);

    const visibleCertificates = useMemo(() => {
        const filtered =
            selectedYear === 'all'
                ? certificates
                : certificates.filter((cert) => cert.year === selectedYear);

        return [...filtered].sort((a, b) =>
            sortOrder === 'newest' ? b.sortKey - a.sortKey : a.sortKey - b.sortKey
        );
    }, [certificates, selectedYear, sortOrder]);

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
                    <div className="cert-controls-bar">
                        <div className="cert-year-filter" role="group" aria-label={t('certificate.filterByYear')}>
                            <span className="cert-filter-label">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {t('certificate.filterByYear')}
                            </span>
                            <button
                                type="button"
                                className={`cert-filter-pill ${selectedYear === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedYear('all')}
                            >
                                <span>{t('certificate.allYears')}</span>
                                <span className="cert-filter-count">{certificates.length}</span>
                            </button>
                            {yearOptions.map(({ year, count }) => (
                                <button
                                    key={year}
                                    type="button"
                                    className={`cert-filter-pill ${selectedYear === year ? 'active' : ''}`}
                                    onClick={() => setSelectedYear(year)}
                                >
                                    <span>{year}</span>
                                    <span className="cert-filter-count">{count}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className={`cert-sort-btn ${sortOrder}`}
                            onClick={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                {sortOrder === 'newest' ? (
                                    <>
                                        <path d="M12 5v14" />
                                        <path d="M19 12l-7 7-7-7" />
                                    </>
                                ) : (
                                    <>
                                        <path d="M12 19V5" />
                                        <path d="M5 12l7-7 7 7" />
                                    </>
                                )}
                            </svg>
                            <span>{sortOrder === 'newest' ? t('certificate.sortNewest') : t('certificate.sortOldest')}</span>
                        </button>
                    </div>

                    <div className="cert-grid">
                        {visibleCertificates.map((cert, index) => (
                            <div key={cert.id} className="cert-card" style={{ animationDelay: `${index * 0.08}s`, '--accent': cert.color }}>
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
                                        {cert.credential && cert.credential !== '#' && (
                                            <a
                                                href={cert.credential}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cert-link"
                                                style={{ background: cert.color }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t('certificate.viewCredential')}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        )}
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

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LuxuryCarousel.css';

import reward1 from '../pic/reward1.jpg';
import reward2 from '../pic/reward2.jpg';
import reward3 from '../pic/reward3.jpg';
import superai from '../pic/superai.jpg';

function LuxuryCarousel() {
    const { t } = useTranslation();
    const labels = t('carousel.slides', { returnObjects: true });
    const slides = [
        { src: reward1, label: labels[0] },
        { src: reward2, label: labels[1] },
        { src: reward3, label: labels[2] },
        { src: superai, label: labels[3] },
    ];

    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);
    const total = slides.length;

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 4000);
        return () => clearInterval(timer);
    }, [isHovered, total]);

    const goTo = (index) => setCurrent(index);
    const prev = () => setCurrent((current - 1 + total) % total);
    const next = () => setCurrent((current + 1) % total);
    const handleTouchStart = (event) => setTouchStartX(event.touches[0].clientX);
    const handleTouchEnd = (event) => {
        if (touchStartX === null) return;
        const deltaX = touchStartX - event.changedTouches[0].clientX;
        if (Math.abs(deltaX) > 45) {
            if (deltaX > 0) next();
            else prev();
        }
        setTouchStartX(null);
    };

    return (
        <div
            className="luxury-carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Stacked card effect behind */}
            <div className="carousel-stack stack-2"></div>
            <div className="carousel-stack stack-1"></div>

            {/* Main display */}
            <div className="carousel-display">
                <div className="carousel-glass-frame">
                    <div className="carousel-image-area">
                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                className={`carousel-slide ${i === current ? 'active' : ''}`}
                            >
                                <img src={slide.src} alt={slide.label} />
                            </div>
                        ))}

                        {/* Overlay gradient */}
                        <div className="carousel-overlay"></div>
                        <div className="carousel-overlay-top"></div>

                        <div className="carousel-floating-ui">
                            <div className="carousel-counter">
                                <span className="counter-current">{String(current + 1).padStart(2, '0')}</span>
                                <span className="counter-sep">/</span>
                                <span className="counter-total">{String(total).padStart(2, '0')}</span>
                            </div>
                            <div className="carousel-chip">Auto</div>
                        </div>

                        <div className="carousel-label-wrap">
                            <div className="carousel-label">
                                <span className="carousel-label-dot"></span>
                                <span>{slides[current].label}</span>
                            </div>
                            <div className={`carousel-progress ${isHovered ? 'paused' : ''}`}>
                                <div className="carousel-progress-fill" key={`progress-${current}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation arrows */}
                <button className="carousel-arrow arrow-left" onClick={prev} aria-label={t('carousel.previous')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button className="carousel-arrow arrow-right" onClick={next} aria-label={t('carousel.next')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Dots */}
            <div className="carousel-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`carousel-dot ${i === current ? 'active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`${t('carousel.slide')} ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default LuxuryCarousel;

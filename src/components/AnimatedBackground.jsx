import { useState, useEffect } from 'react';
import './AnimatedBackground.css';

const particles = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    left: `${(index * 37) % 100}%`,
    animationDelay: `${((index * 0.61) % 5).toFixed(2)}s`,
    animationDuration: `${(15 + ((index * 1.73) % 10)).toFixed(2)}s`,
}));

function AnimatedBackground() {
    const [mousePosition, setMousePosition] = useState(() => ({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    }));

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Animated Background */}
            <div className="animated-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                <div
                    className="mouse-glow"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }}
                ></div>
            </div>

            {/* Floating Particles */}
            <div className="particles">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: particle.left,
                            animationDelay: particle.animationDelay,
                            animationDuration: particle.animationDuration,
                        }}
                    ></div>
                ))}
            </div>
        </>
    );
}

export default AnimatedBackground;

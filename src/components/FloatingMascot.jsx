import { useEffect, useRef, useState } from 'react';
import mascotImage from '../pic/mascot.png';
import './FloatingMascot.css';

const EYE_ANCHORS = [
    { x: 0.40, y: 0.400 },
    { x: 0.59, y: 0.400 },
];

const MAX_PUPIL_MOVE = 3;

const BUBBLE_MESSAGES = [
    'Hire me pls ~~~',
    'Ready to work with you',
    'I love building cool projects',
    'Open to new opportunities',
    'Let me create something awesome',
    'รับผมเข้าทีมหน่อยครับ',
];

function FloatingMascot() {
    const mascotRef = useRef(null);
    const hideBubbleTimerRef = useRef(null);
    const [pupilOffsets, setPupilOffsets] = useState([{ x: 0, y: 0 }, { x: 0, y: 0 }]);
    const [showBubble, setShowBubble] = useState(false);
    const [bubbleText, setBubbleText] = useState(BUBBLE_MESSAGES[0]);
    const [isMascotVisible, setIsMascotVisible] = useState(true);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!isMascotVisible) return;
            const mascot = mascotRef.current;
            if (!mascot) return;

            const rect = mascot.getBoundingClientRect();
            const nextOffsets = EYE_ANCHORS.map((anchor) => {
                const eyeX = rect.left + rect.width * anchor.x;
                const eyeY = rect.top + rect.height * anchor.y;
                const dx = event.clientX - eyeX;
                const dy = event.clientY - eyeY;
                const distance = Math.hypot(dx, dy) || 1;
                const clampedDistance = Math.min(distance, MAX_PUPIL_MOVE);
                const ratio = clampedDistance / distance;

                return {
                    x: dx * ratio,
                    y: dy * ratio,
                };
            });

            setPupilOffsets(nextOffsets);
        };

        const handleMouseLeave = () => {
            setPupilOffsets([{ x: 0, y: 0 }, { x: 0, y: 0 }]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('blur', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('blur', handleMouseLeave);
        };
    }, [isMascotVisible]);

    useEffect(() => {
        const showBubbleTemporarily = () => {
            if (!isMascotVisible) return;
            setBubbleText((prev) => {
                if (BUBBLE_MESSAGES.length <= 1) return BUBBLE_MESSAGES[0];
                let next = prev;
                while (next === prev) {
                    next = BUBBLE_MESSAGES[Math.floor(Math.random() * BUBBLE_MESSAGES.length)];
                }
                return next;
            });
            setShowBubble(true);
            if (hideBubbleTimerRef.current) {
                clearTimeout(hideBubbleTimerRef.current);
            }
            hideBubbleTimerRef.current = setTimeout(() => {
                setShowBubble(false);
            }, 2400);
        };

        const initialTimer = setTimeout(showBubbleTemporarily, 1200);
        const repeatTimer = setInterval(showBubbleTemporarily, 9000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(repeatTimer);
            if (hideBubbleTimerRef.current) {
                clearTimeout(hideBubbleTimerRef.current);
            }
        };
    }, [isMascotVisible]);

    const toggleMascotVisibility = () => {
        setIsMascotVisible((prev) => !prev);
        setShowBubble(false);
    };

    return (
        <div className="floating-mascot">
            {isMascotVisible && (
                <>
                    <div className={`floating-mascot-bubble ${showBubble ? 'show' : ''}`}>
                        {bubbleText}
                    </div>
                    <div className="floating-mascot-inner" ref={mascotRef}>
                        <img src={mascotImage} alt="" className="floating-mascot-image" />
                        {EYE_ANCHORS.map((anchor, index) => (
                            <span
                                key={index}
                                className="floating-mascot-eye"
                                style={{
                                    left: `${anchor.x * 100}%`,
                                    top: `${anchor.y * 100}%`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <span
                                    className="floating-mascot-pupil"
                                    style={{
                                        transform: `translate(${pupilOffsets[index].x}px, ${pupilOffsets[index].y}px)`,
                                    }}
                                />
                            </span>
                        ))}
                    </div>
                </>
            )}
            <button type="button" className="floating-mascot-toggle" onClick={toggleMascotVisibility}>
                {isMascotVisible ? 'Hide Mascot' : 'Show Mascot'}
            </button>
        </div>
    );
}

export default FloatingMascot;

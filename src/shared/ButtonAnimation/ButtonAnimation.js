import { useState } from 'react';

//тут описан волновой эффект анимации при нажатии
export const ButtonAnimation = () => {
    const [isAnimating, setIsAnimating] = useState(true);
    const handleClickAnim = (e) => {
        setIsAnimating(true);
        const animateButton = (timestamp) => {
            if (!isAnimating) return;
            const t = timestamp - startTime;
            if (t < 1000) {
                requestAnimationFrame(animateButton);
            }
            const progress = t / 400;
            const button = e.target;
            const rect = button.getBoundingClientRect();
            const position = `${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY},${progress * Math.max(rect.width, rect.height)}`;
            button.style.backgroundImage = `-webkit-gradient(radial,${position},${position},from(rgba(150,150,150,${0.6 - progress * 0.6})),to(#fff0))`;
        };
        const startTime = performance.now();
        requestAnimationFrame(animateButton);
    };

    return {
        handleClickAnim
    };
};

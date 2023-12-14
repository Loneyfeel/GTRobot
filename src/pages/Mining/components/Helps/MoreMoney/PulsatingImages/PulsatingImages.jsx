import React from 'react';
import Sparkle1 from "../../../../assets/HelpsAnimations/moreMoney/Sparkle-1.svg";
import Sparkle2 from "../../../../assets/HelpsAnimations/moreMoney/Sparkle-2.svg";
import Sparkle3 from "../../../../assets/HelpsAnimations/moreMoney/Sparkle-3.svg";
import PulsatingImage from "./PulsatingImage/index.js";

const PulsatingImages = () => {
    const sparkleData = [
        { imageSrc: Sparkle1, position: { top: 350, left: 50 }, delay: 0 },
        { imageSrc: Sparkle1, position: { top: 250, left: 250 }, delay: 0.1 },
        { imageSrc: Sparkle1, position: { top: 380, left: 200 }, delay: 0.5 },
        { imageSrc: Sparkle1, position: { top: 450, left: 120 }, delay: 0.3 },
        { imageSrc: Sparkle1, position: { top: 500, left: 320 }, delay: 1 },
        { imageSrc: Sparkle2, position: { top: 500, left: 200 }, delay: 0.2 },
        { imageSrc: Sparkle2, position: { top: 230, left: 320 }, delay: 0.6 },
        { imageSrc: Sparkle2, position: { top: 220, left: 40 }, delay: 0.7 },
        { imageSrc: Sparkle2, position: { top: 350, left: 270 }, delay: 1.2 },
        { imageSrc: Sparkle2, position: { top: 420, left: 20 }, delay: 0.9 },
        { imageSrc: Sparkle3, position: { top: 250, left: 140 }, delay: 0.4 },
        { imageSrc: Sparkle3, position: { top: 520, left: 20 }, delay: 1.1 },
        { imageSrc: Sparkle3, position: { top: 430, left: 330 }, delay: 0.8 },
    ];

    return (
        <>
            {sparkleData.map((data, index) => (
                <PulsatingImage
                    key={index}
                    imageSrc={data.imageSrc}
                    position={data.position}
                    delay={data.delay}
                />
            ))}
        </>
    );
};

export default PulsatingImages;

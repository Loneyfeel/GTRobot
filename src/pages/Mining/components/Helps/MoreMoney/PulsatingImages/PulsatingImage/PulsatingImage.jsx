import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const PulsatingImage = ({ imageSrc, position, delay }) => {
    const controls = useAnimation();

    useEffect(() => {
        const pulseAnimation = {
            scale: [0.5, 2, 0.5],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: delay,
            },
        };

        controls.start(pulseAnimation);
    }, [controls, delay]);

    return (
        <motion.img
            src={imageSrc}
            alt="PulsatingImage"
            style={{
                position: 'absolute',
                ...position,
            }}
            animate={controls}
        />
    );
};

export default PulsatingImage;

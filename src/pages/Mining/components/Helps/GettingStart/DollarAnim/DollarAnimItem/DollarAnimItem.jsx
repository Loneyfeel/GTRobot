import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const DollarAnimItem = ({ imageSrc, startPosition, delay }) => {
    const controls = useAnimation();

    useEffect(() => {
        const animate = async () => {
            for (let i = 0; i < 50; i++) {
                await controls.start({
                    y: [startPosition.top - 30, startPosition.top + 30],
                    opacity: [0, 1, 0],
                    transition: {
                        duration: 1.5,
                        ease: 'linear',
                        delay,
                    },
                });
            }
        };

        animate();
    }, [controls, startPosition, delay]);

    return (
        <motion.img
            src={imageSrc}
            alt="DollarAnimItem"
            style={{
                position: 'absolute',
                ...startPosition,
            }}
            animate={controls}
        />
    );
};

export default DollarAnimItem;

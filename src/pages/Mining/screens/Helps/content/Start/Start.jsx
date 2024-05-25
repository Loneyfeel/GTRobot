import React from 'react';
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from '../../../../assets/Helps/content/Start/start.json'

const Start = () => {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
    };
    const transition = {duration: 0.3, ease: "easeInOut"};

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={transition}
            >
                <div
                    className={'gray-animations'}>
                    <Lottie
                        animationData={animationData}
                    />
                </div>
            </motion.div>
        </>
    );
}

export default Start;
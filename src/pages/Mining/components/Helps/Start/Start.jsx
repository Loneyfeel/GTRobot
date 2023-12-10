import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from "@mui/material";
import startIcon from '../../../assets/HelpsAnimations/Start/cloud-mining.svg';

const Start = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const textVariants = {
        hidden: { opacity: 0, x: '-50%' },
        visible: { opacity: 1, x: 0 },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    const transition = { duration: 0.3, ease: "easeInOut" };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={transition}
        >
            <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ ...transition, delay: 0.3 }}
            >
                <Typography
                    sx={{
                        fontSize: '34px',
                        color: 'var(--tg-theme-text-color)',
                        margin: '20px'
                    }}>
                    Облачный майнинг - новый способ заработка
                </Typography>
            </motion.div>
            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ ...transition, delay: 0.8 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <motion.img
                    src={startIcon}
                    alt="Start Icon"
                    style={{
                        marginTop: '50px',
                        height: '200px',
                        width: '200px',
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default Start;

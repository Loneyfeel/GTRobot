import React from 'react';
import {motion} from "framer-motion";
import {Typography} from "@mui/material";

import bancknotes from '../../../assets/HelpsAnimations/GettingStart/Banknotes.svg'
import laptop from '../../../assets/HelpsAnimations/GettingStart/Laptop.svg'
import character from '../../../assets/HelpsAnimations/GettingStart/Character.svg'
import pig from '../../../assets/HelpsAnimations/GettingStart/Pig.svg'

const GettingStart = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const textVariants = {
        hidden: { opacity: 0, x: '-50%' },
        visible: { opacity: 1, x: 0 },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, y: '-80%' },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    const characterVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };

    const deviseVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    };
    const linesVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const transition = { duration: 0.3, ease: 'easeInOut' };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ ...transition, delay: 0.3 }}
                >
                    <Typography
                        sx={{
                            fontSize: '32px',
                            color: 'var(--tg-theme-text-color)',
                            margin: '20px',
                            position: 'relative',
                        }}
                    >
                        Попробуйте облачный майнинг прямо сейчас
                    </Typography>
                </motion.div>
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ ...transition, delay: 1 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <motion.img
                        src={laptop}
                        alt="Devises"
                        style={{
                            position: 'absolute',
                            top: '30px',
                            transform: 'translate(-50%, -50%)',
                            width: '330px',
                        }}
                        variants={deviseVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ ...transition, delay: 1.2 }}
                    />
                    {/* Персонажи появляются по очереди с задержкой */}
                    <motion.img
                        src={character}
                        alt="Character 1"
                        style={{
                            position: 'absolute',
                            top: '100px',
                            right: '5%',
                            transform: 'translate(-50%, -50%)',
                            width: '100px',
                            zIndex: '1000'
                        }}
                        variants={characterVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ ...transition, delay: 1.6 }}
                    />
                    <motion.img
                        src={pig}
                        alt="Character 2"
                        style={{
                            position: 'absolute',
                            top: '130px',
                            right: '32%',
                            transform: 'translate(-50%, -50%)',
                            width: '120px',
                            zIndex: '1000'
                        }}
                        variants={characterVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ ...transition, delay: 2 }}
                    />
                    <motion.img
                        src={bancknotes}
                        alt="Character 3"
                        style={{
                            position: 'absolute',
                            top: '260px',
                            left: '10%',
                            transform: 'translate(-50%, -50%)',
                            width: '110px',
                        }}
                        variants={characterVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ ...transition, delay: 2.4 }}
                    />
                </motion.div>
            </motion.div>
        </>
    );
};
export default GettingStart;
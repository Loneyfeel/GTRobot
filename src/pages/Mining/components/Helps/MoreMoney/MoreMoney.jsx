import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import Coins from '../../../assets/HelpsAnimations/moreMoney/Coins.svg';
import PulsatingImages from "./PulsatingImages/PulsatingImages.jsx";
import {useTranslation} from "react-i18next";

const MoreMoney = () => {
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

    const transition = { duration: 0.3, ease: 'easeInOut' };

    const {t} = useTranslation()

    return (
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
                    {t('mining.components.helps.more-money')}
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
                    src={Coins}
                    alt="Coins"
                    style={{
                        marginTop: '50px',
                        width: '70%',
                    }}
                />
                <PulsatingImages/>
            </motion.div>
        </motion.div>
    );
};

export default MoreMoney;

import React from 'react';
import {motion} from "framer-motion";
import {Typography} from "@mui/material";
import collectIcon from "../../../assets/HelpsAnimations/collect/collect.svg";
import Coin from '../../../assets/HelpsAnimations/Coin.svg'

const Collect = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const textVariants = {
        hidden: { opacity: 0, x: '-50%' },
        visible: { opacity: 1, x: 0 },
    };

    const coinVariants = {
        hidden: { opacity: 0, y: '-50%' },
        visible: { opacity: 1, y: 0 },
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
                        fontSize: '32px',
                        color: 'var(--tg-theme-text-color)',
                        margin: '20px'
                    }}>
                    Собирайте прибыль несколько раз в день!
                </Typography>
            </motion.div>
            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{ ...transition, delay: 1 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <motion.img
                    src={collectIcon}
                    alt="Start Icon"
                    style={{
                        marginTop: '35px',
                        width: '300px',
                    }}
                />
            </motion.div>
            <motion.img
                src={Coin}
                alt="Coin"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '200px',
                    transform: 'translate(-50%, -50%)',
                }}
                variants={coinVariants}
                initial="hidden"
                animate="visible"
                transition={{ ...transition, delay: 1.5 }}
            />
        </motion.div>
    );
};

export default Collect;
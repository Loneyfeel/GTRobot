import animationCloud from "../../../../assets/cloud-mining.json";
import animationBtc from "../../../../assets/bitcoin-mining.json";
import {Box, Typography} from "@mui/material";
import Lottie from "lottie-react";
import React from "react";

const Timer = ({ timeRemaining }) => {

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        const pad = (value) => (value < 10 ? `0${value}` : value);
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    const getAnimationData = () => {
        const currentTime = new Date().getHours();
        // Ваша логика для определения анимации в зависимости от времени
        if (currentTime >= 0 && currentTime < 8) {
            return animationCloud;
        } else if (currentTime >= 8 && currentTime < 16) {
            return animationBtc;
        } else {
            // Добавьте обработку других временных диапазонов, если необходимо
            return animationCloud;
        }
    };

    const animationData = getAnimationData();

    return (
        <Box
            sx={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                sx={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '8px',
                }}
            >
                {formatTime(timeRemaining)}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Lottie
                    animationData={animationData}
                    style={{
                        width: '180px',
                    }}
                />
            </Box>
        </Box>
    );
};

export default Timer
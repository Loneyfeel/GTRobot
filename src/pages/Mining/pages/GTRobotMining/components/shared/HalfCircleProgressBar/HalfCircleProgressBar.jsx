import React from 'react';
import style from "./halfCircleProgressBar.module.sass";
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

import Progress from 'react-circle-progress-bar'

const HalfCircleProgressBar = ({ value, max, width, height, gradient, text, widthStick, userSubscription }) => {
    const { t } = useTranslation();

    const maxRotation = 275;
    const pointerRotation = (value / max) * maxRotation - 135;

    return (
        <>
            <div
                style={{
                    width: `${width}`,
                    height: `${width}`,
                    position: 'relative',
                    marginBlock: '-20px'
            }}>
                <Progress
                    progress={userSubscription === 'ultra' ? value/3 : userSubscription === 'pro' ? value/2 : value}
                    hideBall={true}
                    hideValue={true}
                    strokeWidth={12}
                    background={'rgba(255, 255, 255, 0.15)'}
                    gradient={gradient}
                    reduction={0.25}
                    transitionDuration={1}
                    transitionTimingFunction={'ease-in-out'}
                    style={{
                        width: `${width}`
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transformOrigin: 'bottom',
                        transform: `translate(-50%, -100%) rotate(${pointerRotation}deg)`,
                        width: `${widthStick}`,
                        height: height,
                        backgroundImage: 'linear-gradient(to bottom, var(--circle-progressbar-one), var(--circle-progressbar-two))',
                        borderRadius: '10px',
                        transition: 'transform 1000ms ease-in-out',
                    }}
                />
            </div>
            {text && (
                <Box className={style.halfCircleProgressBar__text}>
                    {t('mining.pages.gtrobotMining.timer_balance_text')}
                </Box>
            )}
        </>
    );
}

export default HalfCircleProgressBar;
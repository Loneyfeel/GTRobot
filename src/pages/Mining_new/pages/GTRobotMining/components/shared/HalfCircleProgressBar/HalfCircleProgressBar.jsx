import React from 'react';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import style from "./halfCircleProgressBar.module.sass";
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

const HalfCircleProgressBar = ({ value, max }) => {
    const { t } = useTranslation();

    const maxRotation = 260;
    const pointerRotation = (value / max) * maxRotation - 130;

    return (
        <>
            <div style={{width: '300px', height: '300px', position: 'relative'}}>
                <CircularProgressbar
                    value={value}
                    maxValue={max}  // Set the maxValue prop
                    strokeWidth={7}
                    circleRatio={0.7}
                    styles={buildStyles({
                        rotation: 0.65,
                        strokeLinecap: 'round',
                        pathColor: `rgba(200, 200, 200, ${(value + 20) / max})`,
                        trailColor: 'rgba(255, 255, 255, 0.15)',
                        transition: 'stroke-dashoffset 1s ease',
                        pathTransition: 'stroke-dashoffset 1s ease'
                    })}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transformOrigin: 'bottom',
                        transform: `translate(-50%, -100%) rotate(${pointerRotation}deg)`,
                        width: '5px',
                        height: '100px',
                        backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #252525)',
                        borderRadius: '10px',
                        transition: 'transform 1s ease',
                    }}
                />
            </div>
            <Box className={style.halfCircleProgressBar__text}>
                {t('mining.pages.gtrobotMining.timer_balance_text')}
            </Box>
        </>
    );
}

export default HalfCircleProgressBar;
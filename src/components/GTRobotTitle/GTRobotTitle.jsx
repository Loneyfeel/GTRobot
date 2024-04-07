import React from 'react';
import style from './gtrobotTitle.module.sass'
import {Box} from "@mui/material";
import logo from '../../assets/gtrobot_logo.svg'

const GTRobotTitle = () => {
    return (
        <>
            <Box className={style.gtrobotTitle}>
                <Box className={style.gtrobotTitle__logo}>
                    <img className={style.gtrobotTitle__logo_img} src={logo} alt={'Logo'}/>
                </Box>
                <Box className={style.gtrobotTitle__text}>
                    GTRobot
                </Box>
            </Box>
        </>
    );
};

export default GTRobotTitle;
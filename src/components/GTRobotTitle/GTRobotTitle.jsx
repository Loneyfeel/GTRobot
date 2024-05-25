import React, {useEffect} from 'react';
import style from './gtrobotTitle.module.sass'
import {Box} from "@mui/material";
import logo from '../../assets/gtrobot_logo.svg'
import {tg} from "../../shared/telegram/telegram.js";

const GTRobotTitle = ({gtrobotTheme}) => {
    return (
        <>
            <Box className={style.gtrobotTitle}>
                <Box className={style.gtrobotTitle__logo}
                sx={{
                    filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                }}>
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
import React from 'react';
import style from './button.module.sass'
import {Box, Button} from "@mui/material";
import arrow from '../../assets/arrow.svg'

const MenuButton = ({icon, text, url}) => {

    const handleButtonClick = () => {
        window.location.href = url;
    };

    return (
        <>
            <Button
                className={style.button}
                sx={{
                    color: 'var(--text-color)',
                    borderRadius: '50px',
                    marginBlock: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 20px'
                }}
                onClick={handleButtonClick}
            >
                <Box className={style.button__group}>
                    <Box className={style.button__group__icon}>
                        <img src={icon} alt={icon} className={style.button__group__icon_img}/>
                    </Box>
                    <Box className={style.button__group__text}>
                        {text}
                    </Box>
                </Box>
                <Box className={style.button__arrow}>
                    <img src={arrow} alt={'arrow'} className={style.button__arrow_img}/>
                </Box>
            </Button>
        </>
    );
};

export default MenuButton;
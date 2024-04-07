import React from 'react';
import style from './mainMenuButton.module.sass'
import {Box, Button} from "@mui/material";
import {tg} from "../../../../shared/telegram/telegram.js";
import {sendCommand} from "../../api/api.js";

const MainMenuButton = ({icon, text, url, setCommandsX, width, center, type}) => {

    function handleButtonClick() {
        if (type === 'link') {
            window.location.href = url;
        } else if (type === "commands") {
            setCommandsX('0')
        } else if (type === 'menu'){
            sendCommand(`menu_${url}`)
            tg.close();
        }
    }

    return (
        <>
            <Button className={style.mainMenuButton}
                    onClick={handleButtonClick}
                    sx={{
                        color: 'var(--text_color)',
                        borderRadius: '20px',
                        border: '1px solid var(--component_stroke_color)',
                        margin: '5px',
                        padding: '15px',
                        bgcolor: 'var(--component_bg_color)',
                        width: {width} || '46%',
                        display: 'flex',
                        justifyContent: center,
                        fontFamily: 'Gilroy',
                        textTransform: 'none',
                        fonSize: '16px',
                        textAlign: 'left',
                        lineHeight: 'unset'
                    }}>
                <Box className={style.mainMenuButton__icon}>
                    <img src={icon} alt={'icon'}/>
                </Box>
                <Box className={style.mainMenuButton__text}>
                    {text}
                </Box>
            </Button>
        </>
    );
}

export default MainMenuButton;
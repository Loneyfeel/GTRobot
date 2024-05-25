import React, {useEffect} from 'react';
import style from './tab.module.sass'
import {Box} from "@mui/material";
import {tg} from "../../../../shared/telegram/telegram.js";

const Tab = ({ name, iconActive, iconDisabled, onClick, activeTab, text, gtrobotTheme }) => {
    return (
        <>
            <Box
                className={style.trackingCryptoWallets__content__pages__tab}
                onClick={() => onClick(name)}
                sx={{
                    borderBottom: activeTab === name ? '2px solid var(--active-color)' : '2px solid var(--inactive-color)',
                    color: activeTab === name ? 'var(--active-color)' : 'var(--inactive-color)',
                }}
            >
                <Box className={style.trackingCryptoWallets__content__pages__tab__icon}
                sx={{
                    filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                }}>
                    <img src={activeTab === name ? iconActive : iconDisabled} alt={name} className={style.trackingCryptoWallets__content__pages__tab__icon_img} />
                </Box>
                <Box className={style.trackingCryptoWallets__content__pages__tab__text}>
                    {text}
                </Box>
            </Box>
        </>
    );
};

export default Tab;
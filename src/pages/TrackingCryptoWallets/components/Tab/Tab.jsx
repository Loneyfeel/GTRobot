import React from 'react';
import style from './tab.module.sass'
import {Box} from "@mui/material";

const Tab = ({ name, iconActive, iconDisabled, onClick, activeTab, text }) => {
    return (
        <>
            <Box
                className={style.trackingCryptoWallets__content__pages__tab}
                onClick={() => onClick(name)}
                sx={{
                    borderBottom: activeTab === name ? '2px solid #fff' : '2px solid #616161',
                    color: activeTab === name ? '#fff' : '#616161',
                }}
            >
                <Box className={style.trackingCryptoWallets__content__pages__tab__icon}>
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
import React, { useState, useEffect } from 'react';
import style from './menu.module.sass';
import { useLocation } from 'react-router-dom';
import { Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import PageTitle from '../../components/PageTitle/index.js';
import clouds from '../../assets/shared/bottomNavigation/cloud.svg';
import referrals from '../../assets/shared/bottomNavigation/referrals.svg';
import btcCoin from '../../assets/Menu/btcCoin.svg';
import usdCoin from '../../assets/Menu/usdCoin.svg';
import wallet from '../../assets/Menu/wallet.svg';
import arrow from '../../assets/Menu/arrow.svg';
import btc from '../../assets/shared/cryptoCoins/bitcoin.svg'
import doge from '../../assets/shared/cryptoCoins/dogecoin.svg'
import ton from '../../assets/shared/cryptoCoins/toncoin.svg'
import shib from '../../assets/shared/cryptoCoins/shibacoin.svg'
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import Withdraw from './Withdraw'

const Menu = ({ onTabChange }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const path = location.pathname.split('/')[2]; //получаем путь
        if (path) {
            const menuItem = menuItems.find(item => item.id === path); // сопоставляем с id
            setExpanded(menuItem ? menuItem.id : null);
        }
    }, [location.pathname]);

    useEffect(() => {
        onTabChange(3);
    }, []);

    const handleChange = (id) => (event, newExpanded) => {
        setExpanded(newExpanded ? id : null);
    };

    const menuItems = [
        {
            id: 'clouds',
            icon: clouds,
            title: `${t("mining.pages.menu.mining.title")}`,
            text: <span>
                <b>{t("mining.pages.menu.mining.text_mining_1")}</b>
                {t("mining.pages.menu.mining.text_mining_2")}
                <br/><br/><b>{t("mining.pages.menu.mining.text_mining_3")}</b><br/><br/>
                {t("mining.pages.menu.mining.text_mining_4")}
                <br/><br/><b>{t("mining.pages.menu.mining.text_mining_5")}</b><br/><br/>
                    <b>{t("mining.pages.menu.mining.text_mining_6")}</b>
            </span>
        },
        {
            id: 'gtrobot-mining',
            icon: usdCoin,
            title: `${t("mining.pages.menu.gtrobot-mining.title")}`,
            text: <span>
                <b>{t("mining.pages.menu.gtrobot-mining.text_gtr_1")}
                    {t("mining.pages.menu.gtrobot-mining.text_gtr_2")}
                    {t("mining.pages.menu.gtrobot-mining.text_gtr_3")}
                    <br/><br/>{t("mining.pages.menu.gtrobot-mining.text_gtr_4")}
                </b>
            </span>
        },
        {
            id: 'referral',
            icon: referrals,
            title: `${t("mining.pages.menu.referral.title")}`,
            text: <span>
                {t("mining.pages.menu.referral.text_ref_1")}
                <br/><br/>{t("mining.pages.menu.referral.text_ref_2")}<br/><br/>
                {t("mining.pages.menu.referral.text_ref_3")}
                <br/><br/>{t("mining.pages.menu.referral.text_ref_4")}
                <br/><br/>{t("mining.pages.menu.referral.text_ref_5")}<br/><br/>
                {t("mining.pages.menu.referral.text_ref_6")}
            </span>
        },
        {
            id: 'coins',
            icon: btcCoin,
            title: `${t("mining.pages.menu.coins.title")}`,
            text: <span
                style={{
                    display: 'flex',
                    flexDirection: 'column'
            }}>
                <span
                    style={{
                        display:'flex',
                        alignItems: 'flex-start'
                }}>
                    <img src={btc} alt={'btc'} className={style.menu__item__text_icon}/>
                    <span>
                        <b>{t("mining.pages.menu.coins.text_btc_1")}</b>
                        {t("mining.pages.menu.coins.text_btc_2")}<br/><br/>
                    </span>
                </span>
               <span
                   style={{
                       display: 'flex',
                       alignItems: 'flex-start'
                   }}>
                   <img src={ton} alt={'btc'} className={style.menu__item__text_icon}/>
                    <span>
                       <b>{t("mining.pages.menu.coins.text_ton_1")}</b>
                       {t("mining.pages.menu.coins.text_ton_2")}<br/><br/>
                    </span>
               </span>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}>
                    <img src={shib} alt={'btc'} className={style.menu__item__text_icon}/>
                    <span>
                        <b>{t("mining.pages.menu.coins.text_shib_1")}</b>
                        {t("mining.pages.menu.coins.text_shib_2")}<br/><br/>
                    </span>
                </span>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start'
                    }}>
                     <img src={doge} alt={'btc'} className={style.menu__item__text_icon}/>
                    <span>
                        <b>{t("mining.pages.menu.coins.text_doge_1")}</b>
                        {t("mining.pages.menu.coins.text_doge_2")}
                    </span>
                </span>
            </span>
        },
        {
            id: 'wallet',
            icon: wallet,
            title: `${t("mining.pages.menu.withdraw.title")}`,
            isCustom: true }
    ];

    return (
        <>
            <motion.div
                initial={{opacity: 0}} // Начальное состояние - видимый
                animate={{opacity: 1}} // Анимация по изменению видимости
                transition={{duration: 1}} // Длительность анимации
            >
            <Box className={style.menu}>
                <PageTitle text={'Menu'} />
                <Box className={style.menu__navigation}>
                    {menuItems.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === item.id}
                            onChange={handleChange(item.id)}
                            sx={{
                                '&.MuiAccordion-root': {
                                    borderRadius: '30px',
                                    backgroundImage: 'linear-gradient(to top right, rgba(32, 32, 32, 1), rgba(122, 122, 122, 1))',
                                    marginBottom: '10px'
                                },
                                '&.MuiAccordion-root.Mui-expanded': {
                                    margin: '0',
                                    marginBottom: '10px'
                                },
                                color: 'var(--text_color)'
                            }}
                        >
                            <AccordionSummary
                                className={style.menu__navigation__item}
                                expandIcon={<img src={arrow} alt="Expand" />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                                sx={{
                                    '&.MuiAccordionSummary-root.Mui-expanded':{
                                        minHeight: '48px'
                                    },
                                    '&.MuiAccordionSummary-content.Mui-expanded':{
                                        margin: '0'
                                    },
                                    color: 'var(--text_color)'
                                }}
                                >
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    style={{
                                        marginRight: '10px',
                                        width: '24px',
                                        height: '24px'
                                }} />
                                <Box
                                sx={{
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    lineHeight: '1.5',
                                    color: 'var(--text_color)'
                                }}>
                                    {item.title}
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails
                            className={style.menu__navigation__item_text}
                            sx={{
                                padding: '8px',
                                paddingTop: '0'
                            }}>
                                {item.isCustom ? <Withdraw /> : <Box
                                sx={{
                                    bgcolor: 'var(--component_bg_color)',
                                    borderRadius: '20px',
                                    padding: '20px',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    lineHeight: '1.5',
                                    color: 'var(--text_color)'
                                }}>{item.text}</Box>}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
            </motion.div>
        </>
    );
};

export default Menu;

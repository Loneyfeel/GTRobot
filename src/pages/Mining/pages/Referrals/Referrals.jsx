import React, { useEffect, useState, useMemo } from 'react';
import style from './referrals.module.sass'
import PageTitle from "../../components/PageTitle/index.js";
import { useTranslation } from "react-i18next";
import { Avatar, Box } from "@mui/material";
import CustomButton from "@components/CustomButton/index.js";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import CustomSnackBar from "../../components/CustomSnackBar/index.js";
import AreaChart from "./ReferralChart/index.js";
import { motion } from "framer-motion";

import user from '../../assets/Referrals/user.svg'
import userAdd from '../../assets/Referrals/userAdd.svg'

// Функция для кэширования изображений
const imageCache = {};
const cachedImage = (src) => {
    if (!imageCache[src]) {
        const img = new Image();
        img.src = src;
        imageCache[src] = img;
    }
    return imageCache[src];
};

const Referrals = () => {
    const { t } = useTranslation();
    const userDataStorage = JSON.parse(localStorage.getItem("miningUserData"));
    const boost = userDataStorage.referrals.referralBonus
    const refCode = userDataStorage.referrals.referralCode
    const referralLink = `https://t.me/GTRaibot?start=${refCode}`;

    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    function handleInviteButtonClick(){
        copyToClipboard(referralLink)
        setIsSnackbarOpen(true)
    }

    //Данные рефералов
    const [referralsData, setReferralsData] = useState(
        Array.isArray(userDataStorage.referrals.referrals)
            ? userDataStorage.referrals.referrals
            : [userDataStorage.referrals.referrals]
    );

    // Выбираем только последние три элемента массива
    const [latestReferrals, setLatestReferrals]  = useState(referralsData.slice(0, 3));

    return (
        <>
            <motion.div
                className={style.referrals}
                initial={{opacity: 0}} // Начальное состояние - видимый
                animate={{opacity: 1}} // Анимация по изменению видимости
                transition={{duration: 0.2}} // Длительность анимации
                style={{
                    willChange: 'opacity'
                }}
            >
                <PageTitle text={t("mining.pages.ref.title")}/>
                <Box className={style.referrals__boost}>
                    <Box className={style.referrals__boost__count}>
                        <Box className={style.referrals__boost__count_text}>
                            Boost
                        </Box>
                        <Box className={style.referrals__boost__count_number}>
                            {(boost * 100).toFixed(2)}%
                        </Box>
                    </Box>
                    <CustomButton
                        content={t("mining.pages.ref.btn")}
                        onClick={handleInviteButtonClick}
                        style={{
                            fontSize: '16px',
                            marginTop: '10px',
                            width: '100%'
                        }}
                    />
                </Box>
                <Box className={style.referrals__graph}>
                    <Box className={style.referrals__graph__text}>
                        {t("mining.pages.ref.graphic")}
                    </Box>
                    <AreaChart referralsData={referralsData}/>
                </Box>
                <Box className={style.referrals__list}>
                    <Box className={style.referrals__list__text}>
                        {t("mining.pages.ref.list")}:
                    </Box>
                    <Box className={style.referrals__list__cards}>
                        {referralsData && (
                            <>
                                {latestReferrals && latestReferrals.map((referral, index) => (
                                    <ReferralCard
                                        key={index}
                                        userName={referral.userName}
                                        userProfilePhoto={referral.userProfilePhoto}
                                    />
                                ))}
                            </>
                        )}
                        <Box
                            className={`${style.referrals__list__cards_card} ${style.referrals__list__cards_card_active}`}
                            onClick={handleInviteButtonClick}
                        >
                            <Box className={style.referrals__list__cards_card__img}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'var(--component_stroke_color)',
                                        border: '1px solid var(--component_stroke_color_light)',
                                        width: '15vw',
                                        height: '15vw',
                                        maxHeight: '95px',
                                        maxWidth: '95px'
                                    }}
                                    alt="userAdd"
                                    src={"userAdd"} // Кешируем изображение
                                >
                                    <img src={cachedImage(userAdd).src} alt={'userAdd'}/>
                                </Avatar>
                            </Box>
                            <Box className={style.referrals__list__cards_card__text}>
                                {t("mining.pages.ref.invite")}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </motion.div>
            <CustomSnackBar
                openState={isSnackbarOpen}
                text={t("mining.pages.ref.snackbar_text")}
                severity={"info"}
                setIsFunction={setIsSnackbarOpen}
            />
        </>
    );
};

export default Referrals;

const ReferralCard = ({ userName, userProfilePhoto }) => {
    return (
        <Box className={style.referrals__list__cards_card}>
            <Box className={style.referrals__list__cards_card__img}>
                <Avatar
                    sx={{
                        bgcolor: 'var(--component_bg_color)',
                        border: '1px solid var(--component_stroke_color)',
                        width: '15vw',
                        height: '15vw',
                        maxHeight: '95px',
                        maxWidth: '95px'
                    }}
                    alt={userName}
                    src={useMemo(() => `data:image/jpeg;base64,${userProfilePhoto}`, [userProfilePhoto])} // Используем useMemo для мемоизации
                >
                    <img src={useMemo(() => user, [user])} alt={'user'}/>
                </Avatar>
            </Box>
            <Box className={style.referrals__list__cards_card__text}>
                {userName}
            </Box>
        </Box>
    );
};

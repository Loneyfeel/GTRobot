import React, {useState} from 'react';
import style from './referrals.module.sass'
import PageTitle from "../../components/PageTitle/index.js";
import {useTranslation} from "react-i18next";
import {Avatar, Box} from "@mui/material";
import CustomButton from "@components/CustomButton/index.js";
import {useCopyToClipboard} from "@uidotdev/usehooks";
import CustomSnackBar from "../../components/CustomSnackBar/index.js";
import AreaChart from "./ReferralChart/index.js";

import user from '../../assets/Referrals/user.svg'
import userAdd from '../../assets/Referrals/userAdd.svg'

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
    const [referralsData, setReferralsData] = useState(userDataStorage.referrals.referrals)
    // Выбираем только последние три элемента массива
    const latestReferrals = referralsData.slice(-3);

    return (
        <>
            <Box className={style.referrals}>
                <PageTitle text={t("mining.pages.ref.title")}/>
                <Box className={style.referrals__boost}>
                    <Box className={style.referrals__boost__count}>
                        <Box className={style.referrals__boost__count_text}>
                            Boost
                        </Box>
                        <Box className={style.referrals__boost__count_number}>
                            %{boost}
                        </Box>
                    </Box>
                    <CustomButton
                        content={t("mining.pages.ref.btn")}
                        onClick={handleInviteButtonClick}
                        style={{
                            fontSize: '16px',
                            marginTop: '20px',
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
                        {latestReferrals.map((referral, index) => (
                            <ReferralCard
                                key={index}
                                userName={referral.userName}
                                userProfilePhoto={referral.userProfilePhoto}
                            />
                        ))}
                        <Box className={`${style.referrals__list__cards_card} ${style.referrals__list__cards_card_active}`}
                            onClick={handleInviteButtonClick}
                        >
                            <Box className={style.referrals__list__cards_card__img}>
                                <Avatar
                                    sx={{
                                        bgcolor: 'var(--component_stroke_color)',
                                        border: '1px solid var(--component_stroke_color_light)',
                                        width: '15vw',
                                        height: '15vw'
                                    }}
                                    alt="userAdd"
                                    src={"userAdd"}
                                >
                                    <img src={userAdd} alt={'userAdd'}/>
                                </Avatar>
                            </Box>
                            <Box className={style.referrals__list__cards_card__text}>
                                {t("mining.pages.ref.invite")}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
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
                        height: '15vw'
                    }}
                    alt={userName}
                    src={userProfilePhoto} // Используем userProfilePhoto в качестве src
                >
                    <img src={user} alt={'user'}/>
                </Avatar>
            </Box>
            <Box className={style.referrals__list__cards_card__text}>
                {userName}awdawdawdawd
            </Box>
        </Box>
    );
};
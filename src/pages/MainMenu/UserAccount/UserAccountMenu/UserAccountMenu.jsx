import React, {useEffect, useState} from 'react';
import style from './userAccountMenu.module.sass'
import {initData, tg, userId} from "../../../../shared/telegram/telegram.js";

import star from '../../assets/UserAccount/UserAccountMenu/star.svg'
import profile from '../../assets/UserAccount/UserAccountMenu/profile.svg'
import calendar from '../../assets/UserAccount/UserAccountMenu/calendar.svg'
import telegramID from '../../assets/UserAccount/UserAccountMenu/telegramID.svg'
import promoSuccess from '../../assets/UserAccount/UserAccountMenu/promoSuccess.svg'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import logo from '../../../../assets/gtrobot_logo.svg'
import {
    Accordion, AccordionDetails,
    AccordionSummary, Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {host} from "../../../../shared/host/host.js";
import arrow from "../../../Mining/assets/Menu/arrow.svg";

import wasd from '../../assets/UserAccount/UserAccountMenu/services/1.svg'
import {sendCommand} from "../../api/api.js";
import {useTranslation} from "react-i18next";

const UserAccountMenu = ({open, setOpen, gtrobotTheme, setUseAccountMenuOpenTemp, useAccountMenuOpenTemp, userData}) => {

    const { t} = useTranslation();

    async function fetchUserData() {
        try {
            const response = await axios.post(`${host}/api/get-user-data`, { initData: initData });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    }

    const { data, refetch } = useQuery({
        queryKey: 'userMainData', // Оберните строку 'userData' в массив
        queryFn: fetchUserData,
        config: {
            keepPreviousData: true,
            refetchOnWindowFocus: false
        }
    });


    tg.SettingsButton.onClick(() => {
        setOpen(false)
        if (!useAccountMenuOpenTemp) {
            setUseAccountMenuOpenTemp(true)
        }
    })

    function handleUserAccountMenuClose() {
        setOpen(false)
        setUseAccountMenuOpenTemp(false)
        tg.BackButton.isVisible = false
    }

    useEffect(() => {
        if (open) {
            tg.BackButton.isVisible = true
            window.Telegram.WebApp.BackButton.onClick(async () => {
                window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

                handleUserAccountMenuClose()
            });
        }
    }, [open]);

    function handleBuyTarifClick() {
        window.Telegram.WebApp.openTelegramLink('https://t.me/GTRaibot/shop')
    }

    const [serviceInfoOpen, setServiceInfoOpen] = useState(null)

    async function fetchGetServices() {
        try {
            const response = await axios.get('https://corsproxy.io/?https://api.gtrobot.shop/services/?format=json')
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data');
        }
    }

    const {data: services, isLoading, isError, isSuccess} = useQuery({
        queryFn: fetchGetServices,
        config: {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            retry: 3 // количество повторных попыток при ошибке
        }
    });

    function daysUntil(timestamp) {
        // Get the current date and time
        const now = new Date();

        // Create a date object for the target timestamp
        const targetDate = timestamp * 1000

        // Calculate the difference in milliseconds
        const differenceInMillis = targetDate - now;

        // Convert milliseconds to days
        const millisInADay = 24 * 60 * 60 * 1000;
        const daysRemaining = Math.floor(differenceInMillis / millisInADay);

        return daysRemaining;
    }

    const [imgSrc, setImgSrc] = useState(`static/assets/profile_photos/${userId}.jpg`);

    const [promocodeUserInput, setPromocodeUserInput] = useState('')
    const handleInputChange = (event) => {
        setPromocodeUserInput(event.target.value);
    };

    const [errorOpen, setErrorOpen] = useState(false)
    const [errorCode, setErrorCode] = useState()
    const [status, setStatus] = useState(false)

    async function fetchPostPromocode(promocodeUserInput) {
        try {
            const response = await axios.post(
                `${host}/api/validate-token`,
                {initData, token: promocodeUserInput} // Тело запроса
            );
            refetch()
            setStatus(response.data.status);
        } catch (error) {
            setErrorOpen(true)
            setErrorCode(error.response.data.errorCode)
        }
    }

    function handlePromocodeInput() {
        fetchPostPromocode(promocodeUserInput)
    }

    const [expanded, setExpanded] = useState(null);
    const handleChange = (id) => (event, newExpanded) => {
        setExpanded(newExpanded ? id : null);
    };

    const serviceButtonIds = [1, 2, 3, 8, 9];

    function handleButtonServiceClick(serviceID){
        if(serviceID === 1 || serviceID === 2 ) {
            sendCommand(`menu_support`)
            setTimeout(() => {
                tg.close();
            }, 100)
        }
        if(serviceID === 3){
            tg.openTelegramLink('https://t.me/GTRKurator')
        }
        if(serviceID === 8 || serviceID === 9 ){
            window.location.href = '/mining';
        }
    }

    return (
        <>
            <div className={style.userAccountMenu}
                 style={{
                     right: open ? 0 : '100vw'
                 }}>
                <div className={style.userAccountMenu__content}>
                    <div className={style.userAccountMenu__content__userData}>
                        <div className={style.userAccountMenu__content__userData__title}>
                            <div className={style.userAccountMenu__content__userData__title_text}>
                                {t("mainMenu.accountMenu.profile")}
                            </div>
                        </div>
                        <div className={style.userAccountMenu__content__userData__avatar}>
                            <img src={imgSrc} alt={'photo'}
                                 className={style.userAccountMenu__content__userData__avatar_img}
                                 style={{
                                     filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                 }}
                                 onError={(e) => {
                                     e.target.src = logo;
                                 }}
                            />
                        </div>
                        {userData.isPremiumUser &&
                        <div className={style.userAccountMenu__content__userData__data}>
                            <div className={style.userAccountMenu__content__userData__data__section}>
                                <div className={style.userAccountMenu__content__userData__data__section__item}>
                                    <div
                                        className={style.userAccountMenu__content__userData__data__section__item__icon}>
                                        <img src={profile} alt={'photo'}
                                             className={style.userAccountMenu__content__userData__data__section__item__icon_img}/>
                                    </div>
                                    <div
                                        className={style.userAccountMenu__content__userData__data__section__item__title}>
                                        <div
                                            className={style.userAccountMenu__content__userData__data__section__item__title_text}>
                                            {t("mainMenu.accountMenu.name")}:
                                        </div>
                                    </div>
                                </div>
                                <div className={style.userAccountMenu__content__userData__data__name_text}>
                                    {tg.initDataUnsafe?.user.username}
                                </div>
                            </div>
                            <div className={style.userAccountMenu__content__userData__data__section}>
                                <div className={style.userAccountMenu__content__userData__data__section__item}>
                                    <div
                                        className={style.userAccountMenu__content__userData__data__section__item__icon}>
                                        <img src={telegramID} alt={'id'}
                                             className={style.userAccountMenu__content__userData__data__section__item__icon_img}/>
                                    </div>
                                    <div
                                        className={style.userAccountMenu__content__userData__data__section__item__title}>
                                        <div
                                            className={style.userAccountMenu__content__userData__data__section__item__title_text}>
                                            Telegram ID:
                                        </div>
                                    </div>
                                </div>
                                <div className={style.userAccountMenu__content__userData__data__name_text}>
                                    {tg.initDataUnsafe?.user.id}
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    {userData.isPremiumUser &&
                        <div className={style.userAccountMenu__content__tarifData}>
                            <div className={style.userAccountMenu__content__userData__data__section}>
                                <div className={style.userAccountMenu__content__userData__data__section__item}>
                                    <div
                                        className={style.userAccountMenu__content__userData__data__section__item__icon}>
                                        <img src={star} alt={'star'}
                                             className={style.userAccountMenu__content__userData__data__section__item__icon_img}/>
                                    </div>
                                    <div
                                        className={style.userAccountMenu__content__userData__data__section__item__title}>
                                        <div
                                            className={style.userAccountMenu__content__userData__data__section__item__title_text}>
                                            {t("mainMenu.accountMenu.tariff")}:
                                        </div>
                                    </div>
                                </div>
                                <div className={style.userAccountMenu__content__userData__data__name_text}>
                                    {userData.subscriptionName ?
                                        <>
                                            {userData.subscriptionName}
                                        </>
                                        :
                                        <>
                                            Standard
                                        </>
                                    }
                                </div>
                            </div>
                            {userData.endSubscriptionDate &&
                                <div className={style.userAccountMenu__content__userData__data__section}>
                                    <div className={style.userAccountMenu__content__userData__data__section__item}>
                                        <div
                                            className={style.userAccountMenu__content__userData__data__section__item__icon}>
                                            <img src={calendar} alt={'id'}
                                                 className={style.userAccountMenu__content__userData__data__section__item__icon_img}/>
                                        </div>
                                        <div
                                            className={style.userAccountMenu__content__userData__data__section__item__title}>
                                            <div
                                                className={style.userAccountMenu__content__userData__data__section__item__title_text}>
                                                {t("mainMenu.accountMenu.daysUntil")}:
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.userAccountMenu__content__userData__data__name_text}>
                                        {daysUntil(userData.endSubscriptionDate)}
                                    </div>
                                </div>
                            }
                        </div>
                    }
                    {!userData.isPremiumUser &&
                        <div className={style.userAccountMenu__content__promocodeActivation}>
                            <Button
                                variant={'contained'}
                                onClick={handleBuyTarifClick}
                                sx={{
                                    height: '50px',
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                                    marginTop: '10px',
                                    borderRadius: '8px',
                                    padding: '15px',
                                    marginBottom: '40px',
                                    ':hover': {
                                        backgroundColor: 'rgba(255,255,255, 0.7)',
                                        boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#000',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        fontFamily: 'Gilroy, sans-serif',
                                        textTransform: 'none',
                                    }}>
                                    {t("mainMenu.accountMenu.buySubscribe")}
                                </Typography>
                            </Button>
                            <div className={style.userAccountMenu__content__promocodeActivation__promocode}>
                                <div className={style.userAccountMenu__content__promocodeActivation__promocode__title}>
                                    Активировать промокод
                                </div>
                                <input
                                    className={style.userAccountMenu__content__promocodeActivation__promocode__input}
                                    placeholder={'1234567890'}
                                    onChange={handleInputChange}
                                />
                                    <Button
                                        variant={'contained'}
                                        onClick={()=>{
                                            handlePromocodeInput()
                                        }}
                                        sx={{
                                            height: '50px',
                                            width: '100%',
                                            backgroundColor: 'var(--button-color)',
                                            marginTop: '10px',
                                            borderRadius: '8px',
                                            padding: '15px',
                                            marginBottom: '20px',
                                            border: '1px solid var(--component-stroke-color)',
                                            ':hover': {
                                                backgroundColor: 'rgba(255,255,255, 0.5)',
                                            }
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'var(--button-text-color)',
                                                fontSize: '16px',
                                                fontWeight: '700',
                                                fontFamily: 'Gilroy, sans-serif',
                                                textTransform: 'none',
                                            }}>
                                            {t("mainMenu.accountMenu.activation")}
                                        </Typography>
                                    </Button>
                            </div>
                        </div>
                    }
                    {userData.services && userData.services.length > 0 &&
                        <div className={style.userAccountMenu__content__services}>
                            <div className={style.userAccountMenu__content__services__title}>
                                Активные услуги:
                            </div>
                            <div className={style.userAccountMenu__content__services__items}>
                                {userData.services.map((item, index) => (
                                    <>

                                        <Accordion
                                            key={index}
                                            expanded={expanded === item}
                                            onChange={handleChange(item)}
                                            className={style.userAccountMenu__content__services__items_item}
                                            sx={{
                                                '&::before':{
                                                    opacity: 0
                                                },
                                                '&.MuiAccordion-root': {
                                                    borderRadius: '20px',
                                                    backgroundColor: 'var(--component-bg-color)',
                                                    marginBlock: '10px',
                                                },
                                                '&.MuiAccordion-root.Mui-expanded': {
                                                    margin: '0',
                                                    marginBottom: '10px',
                                                },
                                                color: 'var(--text_color)',
                                                padding: '5px'
                                            }}
                                        >
                                            <AccordionSummary
                                                className={style.menu__navigation__item}
                                                expandIcon={<img src={arrow} alt="Expand"/>}
                                                aria-controls={`panel${index}-content`}
                                                id={`panel${index}-header`}
                                                sx={{
                                                    '&.MuiAccordionSummary-root.Mui-expanded': {
                                                        minHeight: '48px'
                                                    },
                                                    '& .MuiAccordionSummary-content.Mui-expanded': {
                                                        margin: '0'
                                                    },
                                                    '& .MuiAccordionSummary-content': {
                                                        margin: '0',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    },
                                                    color: 'var(--text_color)',
                                                    padding: '8px'
                                                }}
                                            >
                                                <img
                                                    src={`/assets/${index+1}.svg`}
                                                    alt={`icon-${index + 1}`}
                                                    className={style.userAccountMenu__content__services__items_item_img}
                                                />
                                                <div
                                                    className={style.userAccountMenu__content__services__items_item__text}
                                                style={{
                                                    width: '100%'
                                                }}>
                                                    {services[index].name}
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                className={style.userAccountMenu__content__services__items_item__dialog__text}
                                                sx={{
                                                    padding: '8px 16px',
                                                    paddingTop: '0',
                                                    borderRadius: '20px'
                                                }}>
                                                {services[index].description}
                                                <div className={style.userAccountMenu__content__services__items_item__dialog__btn}>
                                                    {serviceButtonIds.includes(services[index].id) &&
                                                        <Button
                                                            variant={'contained'}
                                                            onClick={()=>{
                                                                handleButtonServiceClick(services[index].id)
                                                            }}
                                                            sx={{
                                                                backgroundColor: 'var(--button-color)',
                                                                marginTop: '10px',
                                                                borderRadius: '8px',
                                                                padding: '10px 20px',
                                                                marginBottom: '5px',
                                                                marginInline: 'auto',
                                                                border: '1px solid var(--component-stroke-color)',
                                                                ':hover': {
                                                                    backgroundColor: 'rgba(255,255,255, 0.5)',
                                                                }
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    color: 'var(--button-text-color)',
                                                                    fontSize: '16px',
                                                                    fontWeight: '700',
                                                                    fontFamily: 'Gilroy, sans-serif',
                                                                    textTransform: 'none',
                                                                }}>
                                                                {t("mainMenu.accountMenu.toWebsite")}
                                                            </Typography>
                                                        </Button>
                                                    }
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <Dialog
                open={errorOpen}
                onClose={() => {
                    setErrorOpen(false)
                }}
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '20px',
                        border: '1px solid var(--component-stroke-color)'
                    }
                }}
            >
                <DialogTitle
                    className={style.userAccountMenu__content__services__items_item__dialog__title}
                    sx={{
                        fontFamily: 'Gilroy, sans-serif'
                    }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div style={{marginTop: '5px'}}>
                            {t("mainMenu.accountMenu.activationError")}
                        </div>
                    </div>
                    <IconButton
                        sx={{
                            padding: '3px',
                            color: 'var(--text-color)'
                        }}
                        onClick={() => {
                            setErrorOpen(false)
                        }}>
                        <CloseRoundedIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    className={style.userAccountMenu__content__services__items_item__dialog__text}>
                    {errorCode === 6000 &&
                        <>
                            {t("mainMenu.accountMenu.activationError6000")}
                        </>
                    }
                    {errorCode === 6001 &&
                        <>
                            {t("mainMenu.accountMenu.activationError6001")}
                        </>
                    }
                    {errorCode === 1 &&
                        <>
                            {t("mainMenu.accountMenu.activationError1")}
                        </>
                    }
                </DialogContent>
            </Dialog>
            <div className={style.userAccountMenu__success}
            style={{
                left: status ? '0' : '110vw'
            }}>
                <div className={style.userAccountMenu__success__title}>
                    {t("mainMenu.accountMenu.activationSuccess")}
                </div>
                <div className={style.userAccountMenu__success__icon}>
                    <img src={promoSuccess} alt={'Succeess'} className={style.userAccountMenu__success__icon_img}/>
                </div>
                <div className={style.userAccountMenu__success__btn}>
                    <Button
                        variant={'contained'}
                        onClick={()=>{
                            setStatus(false)
                        }}
                        sx={{
                            height: '50px',
                            width: '70vw',
                            backgroundColor: '#fff',
                            boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                            marginTop: '10px',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '40px',
                            ':hover': {
                                backgroundColor: 'rgba(255,255,255, 0.7)',
                                boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#000',
                                fontSize: '16px',
                                fontWeight: '600',
                                fontFamily: 'Gilroy, sans-serif',
                                textTransform: 'none',
                            }}>
                            {t("mainMenu.accountMenu.confirm")}
                        </Typography>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default UserAccountMenu;
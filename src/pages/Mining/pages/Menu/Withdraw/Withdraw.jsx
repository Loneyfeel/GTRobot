import React, {useEffect, useState} from 'react';
import style from './withdraw.module.sass'
import { Box} from "@mui/material";
import {miningWithdraw} from "../../../api/api.js";
import {useTranslation} from "react-i18next";

import EastRoundedIcon from '@mui/icons-material/EastRounded';

import btcIcon from "../../../assets/shared/cryptoCoins/bitcoin.svg";
import tonIcon from "../../../assets/shared/cryptoCoins/toncoin.svg";
import dogeIcon from "../../../assets/shared/cryptoCoins/dogecoin.svg";
import shibIcon from "../../../assets/shared/cryptoCoins/shibacoin.svg";

import btcMiniIcon from '../../../assets/Menu/Widthdraw/btcIcon.svg'
import tonMiniIcon from '../../../assets/Menu/Widthdraw/tonIcon.png'
import dogeMiniIcon from '../../../assets/Menu/Widthdraw/dogeIcon.svg'
import shibMiniIcon from '../../../assets/Menu/Widthdraw/shibIcon.svg'

import tether from "../../../assets/Menu/Widthdraw/tether.svg";

import info from '../../../assets/Menu/Widthdraw/infoCircle.svg'

import CustomSnackBar from "../../../components/CustomSnackBar/index.js";
import CustomButton from "@components/CustomButton/index.js";
import {fetchDataAndUpdateLocalStorageInSession} from "../../../helps/dataHelps.js";

const Withdraw = () => {
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
    const [amountInCoin, setAmountInCoin] = useState("");
    const [trueAmount, setTrueAmount] = useState();
    const minWithdrawAmount = 1;

    const [isDaysErrorSnackbarOpen, setDaysErrorSnackbarOpen] = useState(false);
    const [isSuccessSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [isAmountErrorSnackbarOpen, setAmountErrorSnackbarOpen] = useState(false);
    const [isEmptyFieldsErrorSnackbarOpen, setEmptyFieldsErrorSnackbarOpen] = useState(false);
    const [isWithdrawError404SnackbarOpen, setIsWithdrawError404SnackbarOpen] = useState(false);
    const [isWithdrawError2010SnackbarOpen, setIsWithdrawError2010SnackbarOpen] = useState(false);
    const [isWithdrawError2011SnackbarOpen, setIsWithdrawError2011SnackbarOpen] = useState(false);
    const [isWithdrawError2012SnackbarOpen, setIsWithdrawError2012SnackbarOpen] = useState(false);
    const [isWithdrawError2013SnackbarOpen, setIsWithdrawError2013SnackbarOpen] = useState(false);

    const [holdingBalance, setHoldingBalance ] = useState(0);
    const [balanceToHoldingTimestamp, setBalanceToHoldingTimestamp ] = useState();
    const [daysBalanceToHoldingTimestamp, setDaysBalanceToHoldingTimestamp ] = useState();
    const [holdingTimestamp, setHoldingTimestamp ] = useState();
    const [daysHoldingTimestamp, setDaysHoldingTimestamp ] = useState();
    const withdrawNotAvailableDays = 20;
    const holdingPeriod = 90;

    const [balance, setBalance] = useState(0);
    const [cryptoCurrency, setCryptoCurrency] = useState("");
    const [pricePerCoin, setPricePerCoin] = useState(0);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
        setBalance(storedData.balance || 0);
        setCryptoCurrency(storedData.cryptoCurrency || "btc");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};


        // const registrationDate = storedData.registrationDate || 0; // ЭТО ПРАВИЛЬНЫЙ СТАРТ ОТСЧЕТА
        const registrationDate = 1709078400; // ограничение вывода до 20.03.2024


        // Рассчитываем разницу в днях между текущей датой и датой регистрации
        const currentDate = new Date();
        const registrationDateObject = new Date(registrationDate * 1000);
        const timeDifference = currentDate - registrationDateObject;

        // Рассчитываем, сколько периодов по 22 дня прошло с момента регистрации
        const periodsPassed = Math.floor(
            timeDifference / ((withdrawNotAvailableDays + 2) * 24 * 60 * 60 * 1000),
        );

        // Рассчитываем дату начала следующего периода вывода
        const nextWithdrawalStartDate = new Date(
            registrationDateObject.getTime() +
            (periodsPassed * (withdrawNotAvailableDays + 2) + withdrawNotAvailableDays) * 24 * 60 * 60 * 1000,
        );

        // Рассчитываем дни до следующего вывода
        const daysUntilWithdrawal = Math.ceil(
            (nextWithdrawalStartDate - currentDate) / (24 * 60 * 60 * 1000),
        );

        // Рассчитываем дни до окончания периода для перевода в холдинг
        const balanceToHoldingDays = Math.ceil(
            (currentDate - new Date(storedData.holding.balanceToHoldingTimestamp * 1000)) / (24 * 60 * 60 * 1000),
        );
        const daysBalanceToHoldingTimestamp = withdrawNotAvailableDays - balanceToHoldingDays;

        // Рассчитываем дни до окончания периода холдинга
        const holdingDays = Math.ceil(
            (currentDate - new Date(storedData.holding.holdingTimestamp * 1000)) / (24 * 60 * 60 * 1000),
        );
        const daysHoldingTimestamp = holdingPeriod - holdingDays;

        // Обновляем состояния
        setDaysUntilWithdrawal(daysUntilWithdrawal);
        setDaysBalanceToHoldingTimestamp(daysBalanceToHoldingTimestamp);
        setDaysHoldingTimestamp(daysHoldingTimestamp);

        // Обновляем состояния для холдинга
        setBalanceToHoldingTimestamp(storedData.holding.balanceToHoldingTimestamp);
        setHoldingBalance(storedData.holding.holdingBalance || 0);
        // setHoldingTimestamp(storedData.holding.holdingTimestamp);
    }, []);



    const handleWithdrawal = async () => {
        const prices = JSON.parse(localStorage.getItem("prices")) || [];
        // if (daysUntilWithdrawal > 0) {
        if (false) {
            setDaysErrorSnackbarOpen(true);
        } else {
            handleWithdraw()
            const checkInputs = handleWithdraw()
            const withdrawWalletAmount = parseFloat(amountInCoin)
            const withdrawHoldAmount = parseFloat(holdingBalance / prices['ton'])
            if (checkInputs) {
                window.Telegram.WebApp.showConfirm(
                    `${t("mining.pages.menu.withdraw.btn_helps.balance")}: ${withdrawWalletAmount.toFixed(5)} TON\n` +
                    `${withdrawHoldAmount > 0 ? `${t("mining.pages.menu.withdraw.btn_helps.balance_hold")}: ${withdrawHoldAmount.toFixed(5)} TON\n` : ''}` +
                    `${t("mining.pages.menu.withdraw.btn_helps.address")}: ${walletAddress}\n\n` +
                    `${t("mining.pages.menu.withdraw.btn_helps.question")}?` + `\n\n${withdrawHoldAmount > 0 ? `${t("mining.pages.menu.withdraw.btn_helps.warning")}` : ''}`,
                async (confirm) => {
                        if (confirm) {

                            try {
                                const withdrawalResponse = await miningWithdraw(
                                    parseFloat(withdrawAmount),
                                    walletAddress
                                );
                                fetchDataAndUpdateLocalStorageInSession()
                                if (withdrawalResponse && withdrawalResponse.errorCode) {
                                    switch (withdrawalResponse.errorCode) {
                                        case 404:
                                            setIsWithdrawError404SnackbarOpen(true);
                                            break;
                                        case 2010:
                                            setIsWithdrawError2010SnackbarOpen(true);
                                            break;
                                        case 2011:
                                            setIsWithdrawError2011SnackbarOpen(true);
                                            break;
                                        case 2012:
                                            setIsWithdrawError2012SnackbarOpen(true);
                                            break;
                                        case 2013:
                                            setIsWithdrawError2013SnackbarOpen(true);
                                            break;
                                        default:
                                            setIsWithdrawError404SnackbarOpen(true);
                                            console.log(
                                                `Unexpected error: ${withdrawalResponse.errorCode}`,
                                            );
                                            break;
                                    }
                                } else if (withdrawalResponse) {
                                    setSuccessSnackbarOpen(true);
                                }
                            } catch (error) {
                                console.error("Ошибка при выполнении miningWithdraw:", error);
                            }
                        }

                    }
                )
            }
        }
    }

    const handleWithdraw = () => {
        if (!walletAddress) {
            setEmptyFieldsErrorSnackbarOpen(true);
            return false;
        }

        const withdrawAmountFloat = parseFloat(withdrawAmount);
        if (
            // withdrawAmountFloat < minWithdrawAmount ||
            withdrawAmountFloat > balance

        ) {
            setAmountErrorSnackbarOpen(true);
            return false;
        }

        setTimeout(() => {
            setAmountErrorSnackbarOpen(false);
            setEmptyFieldsErrorSnackbarOpen(false);
        }, 3000);
        return true
    };

    const handleAmountChange = (e, inputType) => {
        const prices = JSON.parse(localStorage.getItem("prices")) || [];

        const value = e.target.value;

        // Удаление всех символов, кроме цифр, запятых и точек
        const sanitizedValue = value.replace(/[^\d.,]/g, '');

        // Проверка на пустое значение после удаления недопустимых символов
        if (sanitizedValue === '') {
            // Если значение пустое, установите его как пустую строку
            setWithdrawAmount('');
            setAmountInCoin('');
            return;
        }

        if (isNaN(value) || value < 0) {
            return;
        }

        if (inputType === "withdraw-amount") {
            const calculatedAmount = parseFloat(value) * pricePerCoin / prices['ton'];
            const formatedCalculatedAmount = parseFloat(Number(calculatedAmount.toString().slice(0, calculatedAmount.toString().indexOf('.') + 15)))
            const formatedValue = parseFloat(Number(value.toString().slice(0, value.toString().indexOf('.') + 15)))
            setWithdrawAmount(formatedValue);
            if(cryptoCurrency === 'ton') {
                setAmountInCoin(formatedValue)
            } else {
                setAmountInCoin(formatedCalculatedAmount);
            }

        } else {
            const calculatedAmount = parseFloat(value) / pricePerCoin * prices['ton'];
            const formatedCalculatedAmount = parseFloat(Number(calculatedAmount.toString().slice(0, calculatedAmount.toString().indexOf('.') + 15)))
            const formatedValue = parseFloat(Number(value.toString().slice(0, value.toString().indexOf('.') + 15)))
            setAmountInCoin(formatedValue);
            if(cryptoCurrency === 'ton') {
                setWithdrawAmount(formatedValue)
            } else {
                setWithdrawAmount(formatedCalculatedAmount);
            }
        }
    };

    const handleTrueAmountChange = (e, inputType) => {
        const value = e.target.value;
        setTrueAmount(value);
    };

    const handleMaxAmount = () => {
        const prices = JSON.parse(localStorage.getItem("prices")) || [];
        const calculatedAmount = parseFloat(balance) * pricePerCoin / prices['ton'];
        const formatedCalculatedAmount = parseFloat(Number(calculatedAmount.toString().slice(0, calculatedAmount.toString().indexOf('.') + 15)))
        const formatedValue = parseFloat(Number(balance.toString().slice(0, balance.toString().indexOf('.') + 15)))

        setWithdrawAmount(formatedValue);
        if(cryptoCurrency === 'ton') {
            setAmountInCoin(formatedValue)
        } else {
            setAmountInCoin(formatedCalculatedAmount);
        }
    };

    const { t } = useTranslation();

    const icons = {
        btc: btcIcon,
        ton: tonIcon,
        doge: dogeIcon,
        shib: shibIcon,
    };

    const miniIcons = {
        btc: btcMiniIcon,
        ton: tonMiniIcon,
        doge: dogeMiniIcon,
        shib: shibMiniIcon,
    };




    // const [priceObject, setPriceObject] = useState(null)

    useEffect(() => {
        const prices = JSON.parse(localStorage.getItem("prices")) || [];
        const priceObject = prices[cryptoCurrency];
        if (priceObject) {
            setPricePerCoin(priceObject);
        } else {
            setPricePerCoin(0); // или любое другое значение по умолчанию
        }
    }, [cryptoCurrency]);

    // Функция для форматирования баланса с заданным количеством знаков после запятой
    const formatNumber = (balance, digits) => {
        if (balance === undefined) {
            return ''; // Возвращаем пустую строку или другое значение по умолчанию
        }

        let formattedBalance = balance.toFixed(digits);
        if (formattedBalance.length > digits) {
            formattedBalance = formattedBalance.slice(0, digits);
        }
        return formattedBalance;
    };

    const [formatedCost, setFormatedCost] = useState('0.000000000');

    useEffect(() => {
        const prices = JSON.parse(localStorage.getItem("prices")) || [];
        if (pricePerCoin !== undefined) {
            setFormatedCost(formatNumber(pricePerCoin/prices['ton'], 9));
        }
    }, [pricePerCoin]);

    return (
        <>
            <Box className={style.withdraw}>
                <Box className={style.withdraw__content}>
                    <Box className={style.withdraw__content__input_box}>
                        <Box className={style.withdraw__content__input_box__label}>
                            {t("mining.pages.menu.withdraw.send")}
                        </Box>
                        <Box className={style.withdraw__content__input_box__input_text_box}>
                            <input
                                id="withdraw-amount"
                                type="number"
                                inputMode="numeric"
                                placeholder={t("mining.pages.menu.withdraw.textField_1")}
                                value={withdrawAmount}
                                onChange={(e) => handleAmountChange(e, "withdraw-amount")}
                                className={style.withdraw__content__input_box__input_text_box__input}
                            />
                            <Box className={style.withdraw__content__input_box__input_text_box__icon}>
                                <img
                                    src={icons[cryptoCurrency]}
                                    alt={cryptoCurrency}
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className={style.withdraw__content__input_box__all}>
                            <Box className={style.withdraw__content__input_box__all__button}
                                onClick={handleMaxAmount}>
                                {t("mining.pages.menu.withdraw.max")}
                            </Box>
                            <Box className={style.withdraw__content__input_box__all__min}>
                                min = {(1 / pricePerCoin).toFixed(7)}
                            </Box>
                        </Box>
                    </Box>
                        <Box className={style.withdraw__content__converter}>
                            <Box className={style.withdraw__content__converter__text}>
                                <img src={miniIcons[cryptoCurrency]} alt={'crypto'}
                                style={{
                                    width: cryptoCurrency == 'ton' || cryptoCurrency == 'doge' ? '15px' : '20px',
                                    height: cryptoCurrency == 'ton' || cryptoCurrency == 'doge' ? '15px' : '20px'
                                }}/>
                                <EastRoundedIcon
                                sx={{
                                    marginLeft: '5px'
                                }}/>
                                <img src={tonMiniIcon} alt={'crypto'}
                                     className={style.withdraw__content__converter__text_img}/>
                            </Box>
                            <Box className={style.withdraw__content__converter__count}>
                            <span className={style.withdraw__content__converter__count_big}>{formatedCost.split('.')[0]}</span>
                                <span className={style.withdraw__content__converter__count_small}>.{formatedCost.split('.')[1]}</span>
                            </Box>
                        </Box>
                    <Box className={style.withdraw__content__input_box}>
                        <Box  className={style.withdraw__content__input_box__label}>
                                {t("mining.pages.menu.withdraw.receive")}
                        </Box>
                        <Box className={style.withdraw__content__input_box__input_text_box}>
                            <input
                                id="withdraw-amount-coin"
                                type="number"
                                placeholder={t("mining.pages.menu.withdraw.textField_1")}
                                value={amountInCoin}
                                onChange={(e) => {
                                    handleAmountChange(e, "withdraw-amount-coin");
                                    handleTrueAmountChange(e, "withdraw-amount-coin");
                                }}
                                className={style.withdraw__content__input_box__input_text_box__input}
                            />
                            <Box className={style.withdraw__content__input_box__input_text_box__icon}>
                                <img
                                    src={tonIcon}
                                    alt={"TON"}
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className={style.withdraw__content__input_box__all}>
                            <Box
                                className={style.withdraw__content__input_box__all__button}
                                onClick={handleMaxAmount}>
                                {t("mining.pages.menu.withdraw.max")}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={style.withdraw__content__input_box__input_text_box}>
                        <input
                            id="wallet-address"
                            placeholder={t("mining.pages.menu.withdraw.textField_2")}
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className={style.withdraw__content__input_box__input_text_box__input}
                            style={{
                                marginTop: '20px'
                            }}
                        />
                    </Box>
                    {/*<Box className={style.withdraw__content__usdt}>*/}
                    {/*    <Box className={style.withdraw__content__usdt__info_box}>*/}
                    {/*       <img*/}
                    {/*           className={style.withdraw__content__usdt__info_box__img}*/}
                    {/*           src={info}*/}
                    {/*           alt={'info'}*/}
                    {/*           onClick={() => {*/}
                    {/*               window.Telegram.WebApp.showConfirm(*/}
                    {/*                   `${t("mining.pages.menu.withdraw.withdraw_alert_1")}`,*/}
                    {/*                   () => {*/}
                    {/*                       window.Telegram.WebApp.showConfirm(*/}
                    {/*                           balanceToHoldingTimestamp ? (*/}
                    {/*                               holdingBalance > 0 ?*/}
                    {/*                                   `${t("mining.pages.menu.withdraw.withdraw_alert_2")}\n\n${t("mining.pages.menu.withdraw.holding.alert_3")} ${daysHoldingTimestamp}  ${t("mining.pages.menu.withdraw.holding.alert_4")}` :*/}
                    {/*                                   `${t("mining.pages.menu.withdraw.withdraw_alert_2")}\n\n${t("mining.pages.menu.withdraw.holding.alert_1")} ${daysBalanceToHoldingTimestamp} ${t("mining.pages.menu.withdraw.holding.alert_2")}`*/}
                    {/*                           ) : (*/}
                    {/*                               `${t("mining.pages.menu.withdraw.withdraw_alert_2")}`*/}
                    {/*                           )*/}
                    {/*                       )*/}
                    {/*                   },*/}
                    {/*                   { hideCancelButton: true }*/}
                    {/*               );*/}
                    {/*           }}*/}
                    {/*       />*/}
                    {/*        <Box className={style.withdraw__content__usdt__info_box__text}>*/}
                    {/*            {t("mining.pages.menu.withdraw.usdt_count")}*/}
                    {/*        </Box>*/}
                    {/*    </Box>*/}
                    {/*    <Box className={style.withdraw__content__usdt__count}>*/}
                    {/*        {holdingBalance.toFixed(2)}$*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}
                    <CustomButton
                        content={t("mining.pages.menu.withdraw.menu_btn")}
                        onClick={handleWithdrawal}
                        style={{
                            margin: '20px'
                        }}
                    />
                </Box>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.success")} openState={isSuccessSnackbarOpen} setIsFunction={setSuccessSnackbarOpen}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error_balance")} openState={isAmountErrorSnackbarOpen} setIsFunction={setAmountErrorSnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error_full")} openState={isEmptyFieldsErrorSnackbarOpen} setIsFunction={setEmptyFieldsErrorSnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={`${t("mining.pages.cloudMining.days_snackbar_1")} ${daysUntilWithdrawal} ${t("mining.pages.cloudMining.days_snackbar_2")}`} openState={isDaysErrorSnackbarOpen} setIsFunction={setDaysErrorSnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error404")} openState={isWithdrawError404SnackbarOpen} setIsFunction={setIsWithdrawError404SnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error2010")} openState={isWithdrawError2010SnackbarOpen} setIsFunction={setIsWithdrawError2010SnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error2011")} openState={isWithdrawError2011SnackbarOpen} setIsFunction={setIsWithdrawError2011SnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error2012")} openState={isWithdrawError2012SnackbarOpen} setIsFunction={setIsWithdrawError2012SnackbarOpen} severity={'error'}/>
                <CustomSnackBar text={t("mining.pages.menu.withdraw.snackbars.error2013")} openState={isWithdrawError2013SnackbarOpen} setIsFunction={setIsWithdrawError2013SnackbarOpen} severity={'error'}/>
            </Box>
        </>
    );
};

export default Withdraw;
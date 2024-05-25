import React, {useEffect, useState} from 'react';
import style from './settingsDialog.module.sass'
import {Backdrop, Button, CircularProgress, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {tg} from "../../../shared/telegram/telegram.js";
import {useTranslation} from "react-i18next";

const SettingsDialog = ({
                            open,
                            setOpen,
                            gtrobotTheme,
                            setGtrobotTheme,
                            gtrobotSettings,
                            setGtrobotSettings,
                            useAccountMenuOpenTemp,
                            setOpenAccountMenu,
                            gtrobotTutorialsCheck
}) => {
    const { t} = useTranslation();

    function handleSettingsClose() {
        setOpen(false)
        if(useAccountMenuOpenTemp){
            setOpenAccountMenu(true)
        }
        tg.BackButton.isVisible = false
    }

    useEffect(() => {
        if (open) {
            tg.BackButton.isVisible = true
            window.Telegram.WebApp.BackButton.onClick(async () => {
                window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");

                handleSettingsClose()
            });
        }
    }, [open]);

    const root = document.documentElement; // Получение элемента root

    useEffect(() => {
        if (gtrobotTheme) {
            root.classList.add('gtrobot-theme'); // Добавление класса gtrobot-theme к :root
            root.classList.remove('telegram-theme')
            tg.setHeaderColor('#000')
            tg.setBackgroundColor('#000')
        } else {
            root.classList.add('telegram-theme'); // Добавление класса telegram-theme к :root
            root.classList.remove('gtrobot-theme')
            tg.setHeaderColor('bg_color')
            tg.setBackgroundColor('bg_color')
        }
    }, [gtrobotTheme]);


    const [themes, setThemes] = React.useState(gtrobotTheme ? 'gtrobot' : 'telegram');

    const [isFunctionLocked, setIsFunctionLocked] = useState(false)

    const handleChangeTheme = (event, newAlignment) => {
        if (isFunctionLocked) {
            return;
        }
        if (newAlignment !== null) {
            setIsFunctionLocked(true)
            setThemes(newAlignment);
            gtrobotSettings.theme = newAlignment
            tg.CloudStorage.setItem('gtrobotSettings',  JSON.stringify(gtrobotSettings))
            setTimeout(()=>{
                tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
                    if (error) {
                        // Handle error
                        console.error("Error:", error);
                    } else {
                        setGtrobotTheme(JSON.parse(value).theme);
                        setGtrobotSettings(JSON.parse(value))
                    }
                })
            }, 100)
        }
        setTimeout(()=>{
            setIsFunctionLocked(false)
        }, 800)
    };

    const [coin, setCoin] = React.useState('btc');

    const handleChangeCoin = (event, newAlignment) => {
        if (isFunctionLocked) {
            return;
        }
        if (newAlignment !== null) {
            setIsFunctionLocked(true)
            setCoin(newAlignment);
            gtrobotSettings.chartCoin = newAlignment
            tg.CloudStorage.setItem('gtrobotSettings',  JSON.stringify(gtrobotSettings))
            setTimeout(()=>{
                tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
                    if (error) {
                        // Handle error
                        console.error("Error:", error);
                    } else {
                        setCoin(JSON.parse(value).chartCoin);
                        setGtrobotSettings(JSON.parse(value))
                    }
                })
            }, 100)
        }
        setTimeout(()=>{
            setIsFunctionLocked(false)
        }, 800)
    };

    const [resetTutorials, setResetTutorials] = useState(false)

    function getTutorialsData(){
        tg.CloudStorage.getItem('gtrobotTutorialsCheck', (error, value) => {
            const parsedValue = JSON.parse(value)
            console.log(parsedValue)
            if (error) {
                console.error("Error:", error);
            } else {
                if (!parsedValue) {
                    const hasTrueValue = Object.values(parsedValue).some(val => val === true);
                    if (hasTrueValue) {
                        setResetTutorials(true);
                    }
                }
            }
        })
    }

    function setNewTutorialsData(){
        tg.CloudStorage.setItem('gtrobotTutorialsCheck', JSON.stringify(gtrobotTutorialsCheck), (error, success) => {
            if (error) {
                console.error("Ошибка обновления cloud storage:", error);
            }
        });
    }

    useEffect(() => {
        tg.CloudStorage.getItem('gtrobotSettings', (error, value) => {
            if (error) {
                // Handle error
                console.error("Error:", error);
            } else {
                setGtrobotTheme(JSON.parse(value).theme);
                setThemes(JSON.parse(value).theme)
                setCoin(JSON.parse(value).chartCoin)
                setGtrobotSettings(JSON.parse(value))
            }
        })
        getTutorialsData()
    }, []);

    return (
        <>
            {isFunctionLocked &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
            <div
            style={{
                width: '100vw',
                height: '100vh',
                position: "fixed",
                top: '0',
                left: open ? '0' : '100vw',
                transition: 'left 300ms ease',
                backgroundColor: 'var(--main-bg-color)',
            }}>
                <div className={style.settingsDialog}>
                    <div className={style.settingsDialog__title}>
                        <div className={style.settingsDialog__title_text}>
                            {t("mainMenu.settings.title")}
                        </div>
                    </div>
                    <div className={style.settingsDialog__setting__theme}>
                        <div className={style.settingsDialog__setting_text}>
                            {t("mainMenu.settings.settingsTheme")}:
                        </div>
                        <div className={style.settingsDialog__setting__theme__buttons}>
                            <ToggleButtonGroup
                                value={themes}
                                exclusive
                                onChange={handleChangeTheme}
                                aria-label="Platform"
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <ToggleButton
                                    value="gtrobot"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}
                                >
                                    GTRobot
                                </ToggleButton>
                                <ToggleButton
                                    value="telegram"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}
                                >
                                    Telegram
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    <div className={style.settingsDialog__setting__chart}>
                        <div className={style.settingsDialog__setting_text}>
                            {t("mainMenu.settings.settingsChart")}:
                        </div>
                        <div className={style.settingsDialog__setting__theme__buttons}>
                            <ToggleButtonGroup
                                value={coin}
                                exclusive
                                onChange={handleChangeCoin}
                                aria-label="Platform"
                                sx={{
                                    width: '100%'
                                }}
                            >
                                <ToggleButton
                                    value="BTCUSDT"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}
                                >BTC</ToggleButton>
                                <ToggleButton
                                    value="ETHUSDT"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}
                                >ETH</ToggleButton>
                                <ToggleButton
                                    value="DOGEUSDT"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}
                                >DOGE</ToggleButton>
                                <ToggleButton
                                    value="NOTUSDT"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}
                                >NOT</ToggleButton>
                                <ToggleButton
                                    value="SHIBUSDT"
                                    sx={toggleButtonStyle}
                                    style={{
                                        border: '1px solid var(--component-stroke-color)',
                                    }}>SHIB</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    {resetTutorials &&
                        <div className={style.settingsDialog__setting__tutorials}>
                            <div className={style.settingsDialog__setting_text}>
                                {t("mainMenu.settings.resetTutorials")}:
                            </div>
                            <div className={style.settingsDialog__setting__theme__buttons}>
                                <Button
                                    color={'error'}
                                    onClick={()=>{
                                        setResetTutorials(false)
                                        setNewTutorialsData()
                                    }}
                                >
                                    {t("mainMenu.settings.reset")}:
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

const toggleButtonStyle = {
    color: 'var(--text-color-light)',
    width: '100%',
    borderRadius: '20px',
    backgroundColor: 'var(--settings-inactive-color)',
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: 'Gilroy, sans-serif',
    textTransform: 'none',
    '&.Mui-selected': {
        color: 'var(--button-text-color)',
        backgroundColor: 'var(--menu-button-color)',
    },
    '&.MuiToggleButton-root:hover': {
        backgroundColor: 'var(--menu-button-color)'
    }
};

export default SettingsDialog;
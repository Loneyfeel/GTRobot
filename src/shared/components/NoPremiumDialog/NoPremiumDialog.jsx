import React from 'react';
import style from './noPremiumDialog.module.sass'
import {Box, Button, Dialog, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {tg} from "../../telegram/telegram.js";

const NoPremiumDialog = ({open, setOpen}) => {
    const {t, i18n} = useTranslation();
    function handleClose(){
        setOpen(false)
    }

    function handleClickOpenSite(){
        tg.openTelegramLink('https://t.me/GTRaibot/shop')
    }

    return (
        <>
            <Dialog
                className={style.noPremiumDialog}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: 'unset',
                        overflowY: 'unset'
                    }
                }}
            >
                <div className={style.noPremiumDialog__content}>
                <div className={style.noPremiumDialog__content__title}>
                    <div className={style.noPremiumDialog__content__title_text}>
                        {t("tracking.noPremiumDialog.title")}
                    </div>
                </div>
                <div className={style.noPremiumDialog__content__question}>
                    <div className={style.noPremiumDialog__content__question_text}>
                        {t("tracking.noPremiumDialog.question")}
                    </div>
                </div>
                <div className={style.noPremiumDialog__content__buttons}>
                    <Button
                        className={style.noPremiumDialog__content__buttons__button}
                        variant={'contained'}
                        onClick={handleClickOpenSite}
                        sx={{
                            marginRight: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '50px',
                            padding: '12px 10px',
                            boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                            fontFamily: 'Gilroy, sans-serif',
                            ':hover': {
                                backgroundColor: 'rgba(255,255,255, 0.7)',
                                boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#000',
                                fontWeight: '600',
                                fontFamily: 'Gilroy, sans-serif'
                            }}>
                            {t("tracking.yes")}
                        </Typography>
                    </Button>
                    <Button
                        className={style.noPremiumDialog__content__buttons__button}
                        variant={'contained'}
                        onClick={handleClose}
                        sx={{
                            backgroundColor: 'var(--no-premium-dialog)',
                            borderRadius: '50px',
                            boxShadow: 'unset',
                            fontFamily: 'Gilroy, sans-serif',
                            ':hover': {
                                backgroundColor: 'var(--inactive-color)',
                                boxShadow: 'unset',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'var(--button-text-color)',
                                fontWeight: '600',
                                fontFamily: 'Gilroy, sans-serif'
                            }}>
                            {t("tracking.no")}
                        </Typography>
                    </Button>
                </div>
                </div>
            </Dialog>
        </>
    );
}

export default NoPremiumDialog;
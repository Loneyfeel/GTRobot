import React from 'react';
import style from './final.module.sass'
import {Box, Button, IconButton, Typography} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded.js";
import like from "../../../../assets/bigCard/like.svg";
import {useTranslation} from "react-i18next";
import {tg} from "../../../../../../shared/telegram/telegram.js";

const Final = ({openConfirm, setOpenSuccess, setOpenConfirm, handleClose, gtrobotTheme }) => {
    const {t} = useTranslation();
    return (
        <>
            <Box className={style.final}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
                        setOpenSuccess(true)
                        setOpenConfirm(false)
                    }}
                    aria-label="close"
                    sx={{
                        width: '40px',
                        height: '40px',
                        pointerEvents: openConfirm ? 'auto' : 'none',
                        cursor: openConfirm ? '' : 'default',
                        opacity: openConfirm ? 1 : 0,
                        transition: 'opacity 200ms ease',
                        zIndex: '110'
                    }}
                >
                    <ArrowBackRoundedIcon/>
                </IconButton>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '10px'
                }}>
                    <Box>
                        <img src={like} alt={"Like"} style={{
                            width: '100px',
                            filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                        }}/>
                    </Box>
                    <Box>
                        {t("tracking.buyDialog.final")}
                    </Box>
                </Box>
                <Box className={style.final__button}>
                    <Button
                        variant={'contained'}
                        onClick={handleClose}
                        sx={{
                            height: '50px',
                            width: '100%',
                            backgroundColor: '#fff',
                            boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                            marginTop: '10px',
                            borderRadius: '15px',
                            ':hover': {
                                backgroundColor: 'rgba(255,255,255, 0.7)',
                                boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#000',
                                fontWeight: '700',
                                fontFamily: 'Gilroy, sans-serif'
                            }}>
                            {t("tracking.buyCard.confirmation_text_close")}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Final;
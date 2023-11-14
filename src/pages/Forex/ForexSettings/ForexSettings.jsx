import React, {useState} from 'react';
import {Alert, Backdrop, Box, Button, CircularProgress, Snackbar, Stack, Tab, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ForexSettings = ({isVisibleForexSettings, handleForexSettingsVisible}) => {

    //ТУТ НАДО БУДЕТ ДОБАВИТЬ ЗАГРУЗКУ СТРАНИЦЫ, ПОКА НЕ ПРИЙДЕТ ОТВЕТ ОТ СЕРВЕРА И АЛЕРТЫ УЖЕ ПОСЛЕ ЗАГРУЗКИ
    // добавить случай, если что-то пойдет не так (отобраить алерт, поставить кнопку в офф)
    // и кстати его можно добавить и в регистрацию

    const [isLoading, setIsLoding] = useState(false)
    const isLodaingFalse = () => {
        setIsLoding(false);
    };
    const isLodaingTrue = () => {
        setIsLoding(true);
    };

    const [tradeIsEnabled, setTradeIsEnabled] = useState(false);
    const handleToggle = () => {
        setTradeIsEnabled((prev) => !prev);
    };


    const [openSnackOn, setOpenSnackOn] = React.useState(false);
    const [openSnackOff, setOpenSnackOff] = React.useState(false);

    const handleSnackOnClick = () => {
        setOpenSnackOn(true);
    };
    const handleSnackOnClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackOn(false);
    };
    const handleSnackOffClick = () => {
        setOpenSnackOff(true);
    };
    const handleSnackOffClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackOff(false);
    };

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {t} = useTranslation()

    return (
        <>
            <Stack>
                <Box
                    sx={{
                        display: `${isVisibleForexSettings ? 'flex' : 'none'}`,
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                        color: 'var(--tg-theme-text-color)',
                        zIndex: '10',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            width: '100%',
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                bgcolor: 'var(--tg-theme-bg-color)',
                                marginBottom: '15px'
                            }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '90%',
                                }}>
                                <Box>
                                    <Typography
                                        sx={{
                                            paddingBlock: '30px 10px',
                                            width: '100%',
                                            color: 'var(--tg-theme-hint-color)'
                                        }}>
                                        {t('forex.settings.balance')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            paddingBlock: '0 30px',
                                            width: '100%',
                                            fontSize: '25px',
                                            color: 'var(--tg-theme-text-color)'
                                        }}>
                                        23432,47
                                        <Typography
                                            sx={{
                                                paddingLeft: '5px',
                                                fontSize: '25px',
                                                color: 'var(--tg-theme-hint-color)'
                                            }}>$</Typography>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                    <Button
                                        disabled={tradeIsEnabled}
                                        onClick={() => {
                                            handleToggle()
                                            handleSnackOnClick()
                                        }}
                                        sx={{
                                            fontSize: '18px',
                                            width: '85px',
                                            height: '35px',
                                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                                            backgroundColor: 'var(--tg-theme-button-color)',
                                            color: 'var(--tg-theme-text-color)',
                                            borderRadius: '5px',
                                            border: '1px solid var(--tg-theme-button-color)',
                                            '&:disabled': {
                                                backgroundColor: 'unset',
                                                color: '#666',
                                                border: '1px solid #666',
                                                boxShadow: 'unset'
                                            },
                                            '&:active': {
                                                boxShadow: 'unset'
                                            },
                                            marginBottom: '10px'
                                        }}
                                    >
                                        On
                                    </Button>
                                    <Button
                                        disabled={!tradeIsEnabled}
                                        onClick={() => {
                                            handleToggle()
                                            handleSnackOffClick()
                                        }}
                                        sx={{
                                            fontSize: '20px',
                                            width: '85px',
                                            height: '35px',
                                            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                                            backgroundColor: 'var(--tg-theme-button-color)',
                                            color: 'var(--tg-theme-text-color)',
                                            borderRadius: '5px',
                                            border: '1px solid var(--tg-theme-button-color)',
                                            '&:disabled': {
                                                backgroundColor: 'unset',
                                                color: '#666',
                                                border: '1px solid #666',
                                                boxShadow: 'unset'
                                            },
                                            '&:active': {
                                                boxShadow: 'unset'
                                            }
                                        }}
                                    >
                                        Off
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                bgcolor: 'var(--tg-theme-bg-color)',
                            }}>
                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList onChange={handleChange}
                                             sx={{
                                                 color: 'var(--tg-theme-text-color)'
                                             }}>
                                        <Tab
                                            sx={{
                                                color: 'var(--tg-theme-text-color)'
                                            }}
                                            label="24 часа" value="1"/>
                                        <Tab
                                            sx={{
                                                color: 'var(--tg-theme-text-color)'
                                            }}
                                            label="7 дней" value="2"/>
                                        <Tab
                                            sx={{
                                                color: 'var(--tg-theme-text-color)'
                                            }}
                                            label="30 дней" value="3"/>
                                    </TabList>
                                </Box>
                                <Box
                                    sx={{
                                        minHeight: '360px',
                                        paddingBlock: '5px'
                                    }}>
                                    <TabPanel value="1"
                                              sx={{
                                                  padding: '5px',
                                                  paddingBottom: '0',
                                                  bgcolor: 'var(--tg-theme-bg-color)',
                                                  borderRadius: '5px',
                                              }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                paddingBlock: '5px 10px',
                                                borderBottom: '1px solid var(--tg-theme-button-color)'
                                            }}>
                                            <Typography>
                                                Общий профит: 123
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    paddingLeft: '5px',
                                                    color: 'var(--tg-theme-hint-color)'
                                                }}>$</Typography>
                                        </Box>
                                        <FixedSizeList
                                            height={300}
                                            itemSize={46}
                                            itemCount={200}
                                            overscanCount={5}
                                        >
                                            {renderRow}
                                        </FixedSizeList>
                                    </TabPanel>
                                    <TabPanel value="2"
                                              sx={{
                                                  padding: '5px',
                                                  paddingBottom: '0',
                                                  bgcolor: 'var(--tg-theme-bg-color)',
                                                  borderRadius: '5px',
                                              }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                paddingBlock: '5px 10px',
                                                borderBottom: '1px solid var(--tg-theme-button-color)'
                                            }}>
                                            <Typography>
                                                Общий профит: 121
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    paddingLeft: '5px',
                                                    color: 'var(--tg-theme-hint-color)'
                                                }}>$</Typography>
                                        </Box>
                                        <FixedSizeList
                                            height={300}
                                            itemSize={46}
                                            itemCount={200}
                                            overscanCount={5}
                                        >
                                            {renderRow}
                                        </FixedSizeList>
                                    </TabPanel>
                                    <TabPanel value="3"
                                              sx={{
                                                  padding: '5px',
                                                  paddingBottom: '0',
                                                  bgcolor: 'var(--tg-theme-bg-color)',
                                                  borderRadius: '5px',
                                              }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                paddingBlock: '5px 10px',
                                                borderBottom: '1px solid var(--tg-theme-button-color)'
                                            }}>
                                            <Typography>
                                                Общий профит: 1212
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    paddingLeft: '5px',
                                                    color: 'var(--tg-theme-hint-color)'
                                                }}>$</Typography>
                                        </Box>
                                        <FixedSizeList
                                            height={300}
                                            itemSize={46}
                                            itemCount={200}
                                            overscanCount={5}
                                        >
                                            {renderRow}
                                        </FixedSizeList>
                                    </TabPanel>
                                </Box>
                            </TabContext>
                        </Box>
                        <Button
                            onClick={() => {
                                setTradeIsEnabled(false);
                                handleForexSettingsVisible();
                            }}
                            variant="contained"
                            sx={{
                                borderRadius: '5px',
                                width: '100px',
                                margin: '10px'
                            }}
                        >
                            {t('forex.auth.button_logOut')}
                        </Button>
                    </Box>
                </Box>
                <Snackbar
                    open={openSnackOn}
                    autoHideDuration={3000}
                    onClose={handleSnackOnClose}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <Alert onClose={handleSnackOnClose} severity="success"
                           sx={{
                               width: '100%',
                               backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                               color: 'var(--tg-theme-text-color)'
                           }}>
                        {t('forex.settings.alerts.success')}
                    </Alert>
                </Snackbar>
                <Snackbar open={openSnackOff} autoHideDuration={3000} onClose={handleSnackOffClose}
                          sx={{
                              display: 'flex',
                              justifyContent: 'center'
                          }}>
                    <Alert onClose={handleSnackOffClose} severity="info"
                           sx={{
                               width: '100%',
                               backgroundColor: 'var(--tg-theme-secondary-bg-color)',
                               color: 'var(--tg-theme-text-color)'
                           }}>
                        {t('forex.settings.alerts.info')}
                    </Alert>
                </Snackbar>
            </Stack>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isLoading}
                onClick={isLodaingFalse}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}
export default ForexSettings;

function renderRow(props) {
    const {index, style} = props;

    return (
        <ListItem
            style={style}
            key={index}
            component="div"
            disablePadding
            sx={{
                borderBottom: '1px solid var(--tg-theme-secondary-bg-color)'
            }}
        >
            <ListItemText primary={`День ${index + 1}:`}
            sx={{
                maxWidth: '25%'
            }}/>
            <Typography>{index * 7}$</Typography>
        </ListItem>
    );
}

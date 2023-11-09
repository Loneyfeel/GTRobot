import React, {useState} from 'react';
import {Box, Button, IconButton, Paper, TextField, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useTranslation} from "react-i18next";
import ForexSettings from "../ForexSettings/index.js";

const AuthPage = () => {
    const loginError = false
    const passwordError = false
    const serverError = false
    const [helperTextLogin, setHelperTextLogin] = useState('');
    const [helperTextPassword, setHelperTextPassword] = useState('');
    const [helperTextServer, setHelperTextServer] = useState('');
    const [isVisibleForexSettings, setVisibleForexSettings] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleForexSettingsVisible = () => {
        setVisibleForexSettings(!isVisibleForexSettings)
    }
    const {t} = useTranslation()

    return (
        <>
            <ForexSettings isVisibleForexSettings={isVisibleForexSettings} handleForexSettingsVisible={handleForexSettingsVisible}/>
            <Box
                component="form"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'var(--tg-viewport-height)',
                backgroundColor: 'var(--tg-theme-secondary-bg-color)'
            }}>
                <Box
                    component={Paper}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        backgroundColor: 'var(--tg-theme-bg-color)',
                        padding: '20px 25px'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            width: '100%',
                        }}>
                        <Typography
                            sx={{
                                padding: '10px 0'
                        }}>
                            {t('forex.auth.title')}
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            label={t('forex.auth.form.login')}
                            error={loginError}
                            helperText={helperTextLogin}
                            sx={{
                                maxHeight: '80px',
                                minHeight: '80px',
                                '& .MuiFormHelperText-contained': {
                                    marginTop: '0',
                                },
                                '& .MuiFormHelperText-input': {
                                    color: 'var(--tg-theme-text-color)',
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root fieldset': {
                                    border: loginError ? '1px solid red' : '1px solid var(--tg-theme-button-color)',
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
                                    border: '1px solid #fff'
                                }
                            }}
                            InputProps={{
                                inputProps: {
                                    style: {
                                        color: 'var(--tg-theme-text-color)',
                                        borderRadius: '5px',
                                        borderColor: 'var(--tg-theme-button-color)',
                                    },
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'var(--tg-theme-text-color)',
                                    backgroundColor: 'var(--tg-theme-bg-color)',
                                },
                            }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label={t('forex.auth.form.password')}
                            type={showPassword ? 'text' : 'password'}
                            error={passwordError}
                            helperText={helperTextPassword}
                            sx={{
                                maxHeight: '80px',
                                minHeight: '80px',
                                '& .MuiFormHelperText-contained': {
                                    marginTop: '0',
                                },
                                '& .MuiFormHelperText-input': {
                                    color: 'var(--tg-theme-text-color)',
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root fieldset': {
                                    /* Ваши стили для fieldset */
                                    border: '1px solid var(--tg-theme-button-color)'
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
                                    /* Ваши стили для fieldset */
                                    border: '1px solid #fff'
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={handleTogglePassword} edge="end"
                                    sx={{
                                        color: 'var(--tg-theme-hint-color)'
                                    }}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                ),
                                inputProps: {
                                    style: {
                                        color: 'var(--tg-theme-text-color)',
                                        borderRadius: '5px',
                                        borderColor: 'var(--tg-theme-button-color)',
                                    },
                                },
                                icon: {
                                    color: '#fff'
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'var(--tg-theme-text-color)',
                                    backgroundColor: 'var(--tg-theme-bg-color)',
                                },
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label={t('forex.auth.form.server')}
                            error={serverError}
                            helperText={helperTextServer}
                            sx={{
                                maxHeight: '80px',
                                minHeight: '80px',
                                '& .MuiFormHelperText-contained': {
                                    marginTop: '0',
                                },
                                '& .MuiFormHelperText-input': {
                                    color: 'var(--tg-theme-text-color)',
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root fieldset': {
                                    /* Ваши стили для fieldset */
                                    border: '1px solid var(--tg-theme-button-color)'
                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
                                    /* Ваши стили для fieldset */
                                    border: '1px solid #fff'
                                }
                            }}
                            InputProps={{
                                inputProps: {
                                    style: {
                                        color: 'var(--tg-theme-text-color)',
                                        borderRadius: '5px',
                                        borderColor: 'var(--tg-theme-button-color)',
                                    },
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'var(--tg-theme-text-color)',
                                    backgroundColor: 'var(--tg-theme-bg-color)',
                                },
                            }}
                        />
                    </Box>
                    <Button
                        onClick={handleForexSettingsVisible}
                        variant="contained"
                        sx={{
                            minWidth: '100px',
                            margin: '10px 0'
                        }}
                    >{t('forex.auth.button_logIn')}</Button>
                </Box>
            </Box>
        </>
    );
}

export default AuthPage;

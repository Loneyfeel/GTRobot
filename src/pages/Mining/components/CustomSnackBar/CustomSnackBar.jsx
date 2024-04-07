import React from 'react';
import style from './customSnackBar.module.sass'
import { Snackbar, Alert } from '@mui/material';

const CustomSnackBar = ({ text, openState, severity, setIsFunction }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsFunction(false)
    };

    return (
        <Snackbar
            open={openState}
            autoHideDuration={3000000}
            onClose={handleClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute'
            }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                className={style.alert}
                sx={{
                    "&.MuiAlert-root": {
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'unset',
                        borderRadius: '50px',
                        paddingInline: '20px',
                    },
                    "& .MuiAlert-action": {
                        paddingTop: '0'
                    }
                }}
            >
                {text}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;

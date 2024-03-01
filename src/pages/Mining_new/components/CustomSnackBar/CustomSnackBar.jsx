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
            autoHideDuration={3000}
            onClose={handleClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
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
                        paddingInline: '20px'
                    }
                }}
            >
                {text}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackBar;

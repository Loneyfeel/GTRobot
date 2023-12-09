import React from 'react';
import IconButton from '@mui/material/IconButton';
import EastIcon from '@mui/icons-material/East';
import {Box, Typography} from "@mui/material";

const Helps = () => {
    return (
        <>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                }}>
                    <IconButton
                        size='large'
                        color="primary"
                    >
                        <EastIcon/>
                    </IconButton>
                </Box>
                <Box
                sx={{
                    marginBlock: '40px',
                    marginInline: '20px'
                }}>
                    <Typography
                    sx={{
                        fontSize: '30px'
                    }}>
                        Облачный майнинг - новый способ заработка
                    </Typography>
                </Box>
                <Box>
                    Далее облако с криптой
                </Box>
            </Box>
        </>
    );
}
export default Helps;
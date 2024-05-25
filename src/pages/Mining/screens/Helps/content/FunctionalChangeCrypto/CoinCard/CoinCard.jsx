import React from 'react';
import {Box} from "@mui/material";

import style from './coinCard.module.sass'

const CoinCard = ({coin, name, isSelected, onClick}) => {
    return (
        <>
            <Box
                className={style.coinCard}
                onClick={onClick}
            >
                <Box
                    component={'img'}
                    src={coin}
                    alt={'coin'}
                    className={style.coinCard__img}
                    sx={{
                        transition: 'height 0.3s ease',
                        height: isSelected ? '70px' : '45px',
                        width: '70px'
                    }}
                />
                <Box
                    className={style.coinCard__button}
                    sx={{
                        bgcolor: isSelected ? 'var(--coin-card-active-color)' : 'var(--coin-card-inactive-color)',
                    }}
                >
                    <span style={{
                        fontSize: '10px',
                        fontWeight: '600'
                    }}>{name}</span>
                </Box>
            </Box>
        </>
    );
}

export default CoinCard;
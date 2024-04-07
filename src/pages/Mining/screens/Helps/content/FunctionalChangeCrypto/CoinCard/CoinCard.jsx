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
                        height: isSelected ? '70px' : '45px'
                    }}
                />
                <Box
                    className={style.coinCard__button}
                    sx={{
                        bgcolor: isSelected ? '#878787' : 'rgba(156, 156, 156, 0.2)'
                    }}
                >
                    {name}
                </Box>
            </Box>
        </>
    );
}

export default CoinCard;
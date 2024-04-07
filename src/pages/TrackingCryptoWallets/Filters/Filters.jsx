import React from 'react';
import style from './filters.module.sass'
import {Box} from "@mui/material";

const Filters = ({ filters, onClick, t }) => {
    return (
        <>
            <Box className={style.trackingCryptoWallets__content__box}>
                <Box className={style.trackingCryptoWallets__content__filters}>
                    {Object.keys(filters).map(filter => (
                        <Box
                            key={filter}
                            className={`${style.trackingCryptoWallets__content__filters__item} ${filters[filter] && style.trackingCryptoWallets__content__filters__item_active}`}
                            onClick={() => onClick(filter)}
                        >
                            <Box className={style.trackingCryptoWallets__content__filters__item_text}>{t(`tracking.filters.${filter}`)}</Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default Filters;
import React, { useRef, useEffect, useState } from 'react';
import style from './descriptionCard.module.sass';
import { Box } from '@mui/material';
import DescriptionTextBox from "../../../../../components/DescriptionTextBox/index.js";

const DescriptionCard = ({ coin, text }) => {
    return (
        <Box className={style.description}>
            <Box className={style.description__img_box}>
                <Box className={style.description__img_box__border}>
                    <Box className={style.description__img_box__border_1}>
                        <img src={coin} alt={'coin'} className={style.description__img_box__border_1__img} />
                    </Box>
                </Box>
            </Box>
            <DescriptionTextBox text={text} bgcolor={'rgba(108, 108, 108, 0.25)'}/>
        </Box>
    );
};

export default DescriptionCard;

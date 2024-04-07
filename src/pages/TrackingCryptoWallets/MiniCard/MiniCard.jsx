import React from 'react';
import style from './miniCard.module.sass'
import {Box} from "@mui/material";
import mark from '../assets/shared/checkmark.svg'
import favorites_check_active from '../assets/main/favorites_check_active.svg'
import favorites_check_disabled from '../assets/main/favorites_check_disabled.svg'

const MiniCard = ({
                      name,
                      description,
                      money,
                      appruvd,
                      photo,
                      role,
                  }) => {

    return (
        <>
            <Box className={style.miniCard}>
                <Box>
                    <Box className={style.miniCard__photo}>
                        <img src={photo} alt={'image'} className={style.miniCard__photo_img}/>
                    </Box>
                    <Box className={style.miniCard__name}>
                        <Box className={style.miniCard__name_text}>
                            {name}
                        </Box>
                        {appruvd && (
                            <Box className={style.miniCard__name_mark}>
                                <img src={mark} alt={'mark'} className={style.miniCard__name_mark_img}/>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box className={style.miniCard__description}>
                    {description}
                </Box>
                <Box className={style.miniCard__statistic}>
                    <Box className={style.miniCard__statistic__amount}>
                        ${money}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default MiniCard;
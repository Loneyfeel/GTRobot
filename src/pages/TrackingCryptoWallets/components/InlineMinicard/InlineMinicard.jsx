import React, {useState} from 'react';
import style from './inlineMinicard.module.sass'
import broken from '../../assets/card/broken.svg'
import {Avatar, Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import verified_img from '../../assets/shared/checkmark.svg'
import BigCard from "../BigCard/index.js";

const InlineMinicard = ({
                            photo,
                            address,
                            money,
                            verified,
                            name,
                            description,
                            chart,
                            stocks,
                            favorite
}) => {

    const { t } = useTranslation();
    const formatAmount = (amount) => {
        if (amount >= 1000000) {
            const formattedAmount = (amount / 1000000).toFixed(2);
            return formattedAmount.endsWith('.00') ? formattedAmount.slice(0, -3) + 'M' : formattedAmount + 'M';
        } else if (amount >= 1000) {
            const formattedAmount = (amount / 1000).toFixed(1);
            return formattedAmount.endsWith('.0') ? formattedAmount.slice(0, -2) + 'K' : formattedAmount + 'K';
        } else {
            return amount.toString();
        }
    }

    const formattedAmount = formatAmount(money);

    const [leftPosition, setLeftPosition] = useState('200vw');

    return (
        <>
            <Box className={style.inlineMinicard}
            onClick={()=>{
                setLeftPosition('0')
                document.body.style.overflow = 'hidden'
            }}>
                <Box className={style.inlineMinicard__avatar}>
                    <Avatar
                    src={photo}
                    sx={{
                        height: '40px',
                        width: '40px'
                    }}>
                        <img src={broken} alt={photo} style={{height: '40px', width: '40px'}}/>
                    </Avatar>
                </Box>
                <Box className={style.inlineMinicard__box}>
                    <Box className={style.inlineMinicard__box__address}>
                        {address}
                    </Box>
                    <Box className={style.inlineMinicard__box__verified}>
                        {verified ?
                            (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {t("tracking.verified")}
                                    <img src = {verified_img} alt={'ver'}
                                    style={{
                                        width: '15px',
                                        height: '15px',
                                        marginLeft: '3px'
                                    }}/>
                                </Box>
                            )
                            : t("tracking.Not_verified")}
                    </Box>
                </Box>
                <Box className={style.inlineMinicard__amount}>
                    {formattedAmount} $
                </Box>
            </Box>
            <BigCard
                leftPosition={leftPosition}
                favorite={favorite}
                setLeftPosition={setLeftPosition}
                photo={photo}
                name={name}
                verified={verified}
                address={address}
                description={description}
                money={money}
                chart={chart}
                stocks={stocks}
            />
        </>
    );
};

export default InlineMinicard;
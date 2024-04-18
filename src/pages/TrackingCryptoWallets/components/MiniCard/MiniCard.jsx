import React, {lazy, Suspense, useEffect, useState} from 'react';
import style from './miniCard.module.sass'
import {Avatar, Box} from "@mui/material";
import mark from '../../assets/shared/checkmark.svg'
import broken from '../../assets/card/broken.svg'
import BigCard from '../BigCard'
// const BigCard = lazy(() => import('../BigCard/index.js'));

const MiniCard = ({
                      setIsBigCardOpened,
                      setWalletsData,
                      name,
                      mini_description,
                      balance,
                      verified,
                      photo,
                      address,
                      description,
                      chart,
                      stocks,
                      favorite,
                      walletId,
                      setIsVisible
                  }) => {

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const openBigCard = () => {
        setIsVisible(true);
    };
    //
    // useEffect(() => {
    //         setIsBigCardOpened(isVisible);
    // }, [isVisible]);

    return (
        <>
            <Box className={style.miniCard}
                 onClick={()=>{
                     openBigCard()
                     document.body.style.overflow = 'hidden'
                 }}>
                <Box>
                    <Box className={style.miniCard__photo}>
                        {photo ?
                            <>
                                <img
                                    src={photo}
                                    alt="Фото не доступно"
                                    onError={(e) => {
                                        e.target.src = broken; // Устанавливаем альтернативное изображение в случае ошибки загрузки основного изображения
                                    }}
                                    className={style.miniCard__photo_img}
                                />
                            </>
                            :
                            <>
                                <img
                                    src={broken}
                                    alt="Фото не доступно"
                                    className={style.miniCard__photo_img}
                                />
                            </>
                        }
                    </Box>
                    {name &&
                        <Box className={style.miniCard__name}>
                            <Box className={style.miniCard__name_text}>
                                {name}
                            </Box>
                            {verified && (
                                <Box className={style.miniCard__name_mark}>
                                    <img src={mark} alt={'mark'} className={style.miniCard__name_mark_img}/>
                                </Box>
                            )}
                        </Box>
                    }
                </Box>
                {mini_description &&
                    <Box className={style.miniCard__description}>
                        {mini_description}
                    </Box>
                }
                {balance &&
                    <Box className={style.miniCard__statistic}>
                        <Box className={style.miniCard__statistic__amount}>
                            {formatNumber(balance)} $
                        </Box>
                    </Box>
                }
            </Box>
            {/*{isVisible &&*/}
            {/*    <Suspense>*/}
            {/*        <BigCard*/}
            {/*            setIsBigCardOpened={setIsBigCardOpened}*/}
            {/*            setWalletsData={setWalletsData}*/}
            {/*            leftPosition={leftPosition}*/}
            {/*            setIsVisible={setIsVisible}*/}
            {/*            favorite={favorite}*/}
            {/*            setLeftPosition={setLeftPosition}*/}
            {/*            photo={photo}*/}
            {/*            name={name}*/}
            {/*            verified={verified}*/}
            {/*            address={address}*/}
            {/*            description={description}*/}
            {/*            balance={balance}*/}
            {/*            chart={chart}*/}
            {/*            stocks={stocks}*/}
            {/*            walletId={walletId}*/}
            {/*        />*/}
            {/*    </Suspense>*/}
            {/*}*/}
        </>
    );
};

export default MiniCard;
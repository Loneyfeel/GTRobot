import React from 'react';
import style from './miniCard.module.sass'
import { Box} from "@mui/material";
import mark from '../../assets/shared/checkmark.svg'
import broken from '../../assets/card/broken.svg'
import lockImg from '../../assets/shared/lockWihte.svg'

const MiniCard = ({
                      setIsBigCardOpened,
                      name,
                      mini_description,
                      balance,
                      verified,
                      photo,
                      setIsVisible,
                      address,
                      lock,
                  }) => {

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const openBigCard = () => {
        setIsVisible();
        setIsBigCardOpened(true)
    };

    return (
        <>
            <Box className={style.miniCard}
                 onClick={() => {
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
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {lock &&
                            <Box className={style.miniCard__lock}>
                                <img src={lockImg} alt={'lock'} className={style.miniCard__lock_img}/>
                            </Box>
                        }
                        {name ? (
                            <Box className={style.miniCard__name}>
                                <Box className={style.miniCard__name_text}>
                                    {name}
                                </Box>
                                {verified && !lock && (
                                    <Box className={style.miniCard__name_mark}>
                                        <img src={mark} alt={'mark'} className={style.miniCard__name_mark_img}/>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <>
                                {address &&
                                    <Box className={style.miniCard__name}>
                                        <Box className={style.miniCard__name_text}>
                                            {address}
                                        </Box>
                                        {verified && !lock && (
                                            <Box className={style.miniCard__name_mark}>
                                                <img src={mark} alt={'mark'} className={style.miniCard__name_mark_img}/>
                                            </Box>
                                        )}
                                    </Box>
                                }
                            </>
                        )}
                    </Box>
                </Box>
                {mini_description &&
                    <Box className={style.miniCard__description}>
                        {mini_description}
                    </Box>
                }
                {balance &&
                    <Box className={style.miniCard__statistic}>
                        <Box className={style.miniCard__statistic__amount}
                        sx={{
                            filter: lock ? 'blur(3px)' : ''
                        }}>
                            {formatNumber(balance)} $
                        </Box>
                    </Box>
                }
            </Box>
        </>
    );
}

export default MiniCard;
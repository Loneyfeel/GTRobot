import React, {useEffect, useState} from 'react';
import style from './userAccount.module.sass'
import {useQueryClient} from "@tanstack/react-query";
import {tg, userId} from "../../../shared/telegram/telegram.js";
import star from '../assets/UserAccount/star.svg'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import arrowRight from '../assets/UserAccount/arrow-right.svg'
import {IconButton} from "@mui/material";
import UserAccountMenu from './UserAccountMenu'
import logo from "../../../assets/gtrobot_logo.svg";


const UserAccount = ({
                         setOpen,
                         gtrobotTheme,
                         setUseAccountMenuOpenTemp,
                         useAccountMenuOpenTemp,
                         openAccountMenu,
                         setOpenAccountMenu
}) => {

    const queryClient = useQueryClient()
    const [userData, setUserData] = useState([])
    const [photo, setPhoto] = useState('')
    // const [openAccountMenu, setOpenAccountMenu] = useState(false)

    useEffect(() => {
        if (queryClient.getQueryData('userMainData')) {
            setUserData(queryClient.getQueryData('userMainData').data);
        }
    }, [queryClient.getQueryData('userMainData')])

    const [imgSrc, setImgSrc] = useState(`static/assets/profile_photos/${userId}.jpg`);

    return (
        <>
            {userData &&
                <>
                    <div className={style.userAccount}>
                        <div className={style.userAccount__userData}
                             onClick={()=>{
                                 setOpenAccountMenu(true)
                                 setUseAccountMenuOpenTemp(true)
                             }}>
                            <div className={style.userAccount__userData__avatar}>
                                <div className={style.userAccount__userData__avatar__icon}>
                                    <img src={imgSrc} alt={'photo'}
                                         className={style.userAccount__userData__avatar__icon_img}
                                         style={{
                                             filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                         }}
                                         onError={(e) => {
                                             e.target.src = logo;
                                         }}
                                    />
                                </div>
                            </div>
                            <div className={style.userAccount__userData__data}>
                                <div className={style.userAccount__userData__data__name}>
                                    {tg.initDataUnsafe?.user.username}
                                </div>
                                <div className={style.userAccount__userData__data__level}>
                                    <div className={style.userAccount__userData__data__level__box}
                                         style={{
                                             filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                         }}>
                                        <img src={star} alt={'star'}
                                        style={{
                                            width: '16px',
                                            height: '16px'
                                        }}/>
                                        <div className={style.userAccount__userData__data__level__box_text}>
                                            {userData.subscriptionName ?
                                                <>
                                                    {userData.subscriptionName}
                                                </>
                                                :
                                                <>
                                                    Standard
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <img src={arrowRight} alt={'arrow-right'} style={{
                                        marginLeft: '3px',
                                        filter: gtrobotTheme === 'gtrobot' ? '' : tg.colorScheme === 'dark' ? '' : 'invert(1)',
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className={style.userAccount__settings}>
                            <IconButton
                                onClick={() => {
                                    setOpen(true)
                                }}
                                sx={{
                                    color: 'var(--text-color)'
                                }}
                            >
                                <SettingsRoundedIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <UserAccountMenu
                        useAccountMenuOpenTemp={useAccountMenuOpenTemp}
                        setUseAccountMenuOpenTemp={setUseAccountMenuOpenTemp}
                        open={openAccountMenu}
                        setOpen={setOpenAccountMenu}
                        gtrobotTheme={gtrobotTheme}
                        userData={userData}
                    />
                </>
            }
        </>
    );
}

export default UserAccount;
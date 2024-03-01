import React, {useState} from 'react';
import style from './menu.module.sass'

import clouds from '../../assets/shared/bottomNavigation/cloud.svg'
import referrals from '../../assets/shared/bottomNavigation/referrals.svg'
import btcCoin from '../../assets/Menu/btcCoin.svg'
import usdCoin from '../../assets/Menu/usdCoin.svg'
import wallet from '../../assets/Menu/wallet.svg'

import arrow from '../../assets/Menu/arrow.svg'

//Вывод
import btcIcon from '../../assets/Menu/Widthdraw/btcIcon.svg'
import dogeIcon from '../../assets/Menu/Widthdraw/dogeIcon.svg'
import shibIcon from '../../assets/Menu/Widthdraw/shibIcon.svg'
import tonIcon from '../../assets/Menu/Widthdraw/tonIcon.svg'
import infoCircle from '../../assets/Menu/Widthdraw/infoCircle.svg'
import {Box} from "@mui/material";
import PageTitle from "../../components/PageTitle/index.js";
import DescriptionTextBox from "../../components/DescriptionTextBox/index.js";

const Menu = () => {

    const [isText, setIsText] = useState('')

    return (
        <>
            <Box className={style.menu}>
            <PageTitle text={'Menu'}/>
                <Box className={style.menu__navigation}>
                    <DescriptionTextBox
                        text={isText}
                        width={'90vw'}
                        borderRadius={'50px'}
                        component={
                            'wasd'
                        }
                        style={{
                            marginInline: 'auto',
                            backgroundImage: 'linear-gradient(to top right, rgba(82, 82, 82, 1), rgba(192, 192, 192, 1))',
                            border: '1px solid var(--component_stroke_color)'
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Menu;
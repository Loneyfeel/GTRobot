import React, {lazy, useState} from 'react';
import { Box, IconButton } from "@mui/material";

import Start from "./Start/index.js";
import ChangeCrypto from "./ChangeCrypto/index.js";
import MoreMoney from "./MoreMoney/index.js";
import Referrals from "./Referrals/index.js";
import Collect from "./Collect/index.js";
import GettingStart from "./GettingStart/index.js";

const EastIcon = lazy(() => import('@mui/icons-material/East'));

const componentsList = [
    <Start key="Start" />,
    <ChangeCrypto key="ChangeCrypto" />,
    <MoreMoney key="MoreMoney" />,
    <Referrals key="Referrals" />,
    <Collect key="Collect" />,
    <GettingStart key="GettingStart" />
];

const Helps = ({ hideHelps }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allComponentsViewed, setAllComponentsViewed] = useState(false);

    const handleNextComponent = () => {
        const nextIndex = (currentIndex + 1) % componentsList.length;
        setCurrentIndex(nextIndex);

        if (nextIndex === 0) {
            // Если мы вернулись к первому компоненту, то проверяем, были ли все компоненты просмотрены
            if (allComponentsViewed) {
                // Если все компоненты были просмотрены и мы вернулись к первому компоненту,
                // то скрываем Helps
                hideHelps();
            }
        } else {
            // Если мы переходим к следующему компоненту, помечаем, что текущий компонент просмотрен
            setAllComponentsViewed(true);
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                }}
            >
                <IconButton
                    color="primary"
                    onClick={handleNextComponent}
                >
                    <EastIcon
                        sx={{
                            width: '30px',
                            height: '30px',
                        }}
                    />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'default'
                }}
            >
                {componentsList[currentIndex]}
            </Box>
        </Box>
    );
};

export default Helps;

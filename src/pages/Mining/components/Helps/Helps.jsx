import React, { lazy, useState } from 'react';
import { Box, IconButton } from "@mui/material";

import Start from "./Start/index.js";
import ChangeCrypto from "./ChangeCrypto/index.js";
import MoreMoney from "./MoreMoney/index.js";
import Referrals from "./Referrals/index.js";
import Collect from "./Collect/index.js";
import GettingStart from "./GettingStart/index.js";
import FunctionalChangeCrypto from "./FunctionalChangeCrypto/index.js";
import Survey from "./Survey/index.js";

const EastIcon = lazy(() => import('@mui/icons-material/East'));

const componentsList = [
    <Start key='Start'/>,
    <ChangeCrypto key='ChangeCrypto'/>,
    <MoreMoney key='MoreMoney'/>,
    // <Referrals key='Referrals'/>,
    // <Collect key="Collect" />,
    // <GettingStart key="GettingStart" />,
    <Survey key='survey'/>,
    <FunctionalChangeCrypto key="FunctionalChangeCrypto" />,
];

const Helps = ({ hideHelps }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allComponentsViewed, setAllComponentsViewed] = useState(false);

    const handleNextComponent = () => {
        const nextIndex = (currentIndex + 1) % componentsList.length;
        setCurrentIndex(nextIndex);
        if(nextIndex === 4){
            setAllComponentsViewed(true);
        }
        if(allComponentsViewed){
            hideHelps();
        }
    };

    const handleOverlayClick = () => {
        // Проверяем, можно ли нажать на зону
        if (componentsList[currentIndex].type !== FunctionalChangeCrypto) {
            handleNextComponent();
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}
        >
            <Box
                sx={{
                    display: componentsList[currentIndex].type === Survey ? 'none' : 'block',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '0',
                    zIndex: 2
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
            {(componentsList[currentIndex].type !== FunctionalChangeCrypto && componentsList[currentIndex].type !== Survey) &&
                <Box
                    onClick={handleOverlayClick}
                    sx={{
                        position: 'absolute',
                        width: '50%',
                        height: '100%',
                        zIndex: 100,
                        cursor: 'pointer',
                    }}
                />
            }
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'default',
                    position: 'relative',
                }}
            >
                {componentsList[currentIndex].type === FunctionalChangeCrypto ? (
                    <FunctionalChangeCrypto
                        key="FunctionalChangeCrypto"
                        handleNextComponent={handleNextComponent}
                    />
                ) : componentsList[currentIndex].type === Survey ? (
                    <Survey key="Survey" handleNextComponent={handleNextComponent} />
                ) : (
                    componentsList[currentIndex]
                )}
            </Box>
        </Box>
    );
}

export default Helps;

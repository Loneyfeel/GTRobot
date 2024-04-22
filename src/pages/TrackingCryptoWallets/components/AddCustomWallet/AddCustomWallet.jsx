import React, {useState} from 'react';
import style from './addCustomWallet.module.sass'
import {Box, Button, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {
    getWhaleWalletData,
    getWhaleWallets,
    setWhaleWallet,
    setWhaleWalletFirst,
    setWhaleWalletFollow
} from "../../api/api.js";
import BigCard from "../BigCard/index.js";
import CircularProgress from '@mui/material/CircularProgress';
import {tg} from "../../../../shared/telegram/telegram.js";


const AddCustomWallet = ({
                             setSearchResultsCount,
                             searchValue,
                             display,

                             setWalletsData,
                             activeTab,
                             setIsBigCardOpened,
                             leftPosition,
                             setLeftPosition,
                             bigCardStates,
                             setBigCardStates,
}) => {
    const {t, i18n} = useTranslation();

    const [tempSet, setTempSet] = useState(false)
    const [dataWallet, setDataWallet] = useState([])
    const [loading, setLoading] = useState(false)
    function handleAddWalletClick(){
        setLoading(true)
        setWhaleWalletFirst(searchValue)
            .then(response => {
                if (response.errorCode === 1006){
                    window.location.href = "/premium";
                }
                addWhaleWalletUntilSuccess(response.taskId);
            })
            .catch(error => {
                console.error('Ошибка при добавлении кошелька до id задачи:', error);
            })
        const addWhaleWalletUntilSuccess = (taskId) => {
            setWhaleWallet(taskId)
                .then(response => {
                    if (response.errorCode === 1006){
                        window.location.href = "/premium";
                    }
                    if (response.state === 'SUCCESS') {
                        setSearchResultsCount(1)
                        getWhaleWalletData(response.walletId)
                            .then(response => {
                                setDataWallet(response.data)
                                setIsBigCardOpened(true)
                                setLoading(false)
                                setBigCardStates(prevStates => ({
                                    ...prevStates,
                                    [response.data.address]: true
                                }));
                                getWhaleWallets(setTempSet, 'search', response.data.address, '', [], '')
                                    .then(response => {
                                        setWalletsData(response.data.data);
                                        console.log(response.data.data)
                                    })
                                    .catch(error => {
                                        // Обрабатываем ошибку, если она возникла
                                        console.error('Ошибка при получении данных о кошельках китов:', error);
                                    });
                            })

                    } else if (response.state === 'FAILURE') {
                        setLoading(false)
                        tg.showPopup({
                            message: `${t("tracking.buyDialog.error")}`
                        })
                    }  else {
                        setTimeout(() => {
                            addWhaleWalletUntilSuccess(taskId);
                        }, 3000);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при копировании после id задачи:', error);
                })
        };
    }

    return (
        <>
            <Box className={style.addCustomWallet}
            sx={{
                display: display ? '' : 'none'
            }}>
                {loading ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                marginBlock: '10px'
                            }}>
                            <CircularProgress
                                sx={{
                                    color: '#fff'
                                }}/>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography className={style.addCustomWallet__text}>
                            {t("tracking.addCustomWallet.noResult")} "{searchValue}"
                        </Typography>
                        <Button
                            className={style.addCustomWallet__button}
                            variant={'contained'}
                            onClick={()=>{
                                handleAddWalletClick()
                            }}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '50px',
                                marginTop: '10px',
                                padding: '15px 20px',
                                boxShadow: '0px 0px 15px 3px rgba(0, 0, 255, 0.5)',
                                ':hover': {
                                    backgroundColor: 'rgba(255,255,255, 0.7)',
                                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 255, 0.5)',
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#000',
                                    fontWeight: '700',
                                    fontFamily: 'Gilroy, sans-serif'
                                }}>
                                {t("tracking.addCustomWallet.addBtn")}
                            </Typography>
                        </Button>
                    </>
                )}
            </Box>
            {Object.keys(dataWallet).length > 0 &&
                <BigCard
                    setTempWalletVisible={setTempWalletVisible}
                    setIsBigCardOpened={setIsBigCardOpened}
                    setWalletsData={setWalletsData}
                    leftPosition={leftPosition}
                    bigCardStates={bigCardStates}
                    setBigCardStates={setBigCardStates}
                    setIsVisible={() => setBigCardStates({
                        ...bigCardStates,
                        [dataWallet.address]: false
                    })}
                    favorite={dataWallet.isFollow}
                    setLeftPosition={setLeftPosition}
                    photo={`/assets/whales/${dataWallet.walletId}.png`}
                    verified={dataWallet.isVerified}
                    address={dataWallet.address}
                    name={dataWallet.name}
                    description={dataWallet.description[i18n.language]}
                    balance={dataWallet.balance.toFixed(0)}
                    chart={dataWallet.chart}
                    stocks={dataWallet.stocks}
                    walletId={dataWallet.walletId}
                    activeTab={activeTab}
                />
            }
        </>
    );
};

export default AddCustomWallet;
import React, {useState} from 'react';
import style from './searchCustomWallet.module.sass'
import {Box, FormControl, Input, InputAdornment, MenuItem} from "@mui/material";
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded.js";
import {useTranslation} from "react-i18next";
import {getWhaleWallets} from "../../api/api.js";

import search from "../../assets/main/search.svg";
import lock from '../../assets/shared/lockGrey.svg'

const SearchCustomWallet = ({
                                setSearchResultsCount,
                                setWalletsData,
                                activeTab,
                                searchValue,
                                setSearchValue,
                                networkMenu,
                                network,
                                handleChange,
                                setLoading,
                                setSearchInputValueEmpty,
                                userData

}) => {
    const {t} = useTranslation();
    const [tempFunc, setTempFunc] = useState(false)
    const [searchValueLocally, setSearchValueLocally] = useState('');

    // Состояние для хранения ID таймера
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [valueInput, setValueInput] = useState('')

    // Обработчик изменения значения в инпуте
    const handleChangeInput = (e) => {
        const value = e.target.value;
        setValueInput(value)
        if (value === null || value === undefined || value === ''){
            setSearchInputValueEmpty(true)
        } else {
            setSearchInputValueEmpty(false)
        }
        setSearchValueLocally(value);

        // Если уже есть запущенный таймер, очищаем его
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Запускаем новый таймер для вызова функции через 1.5 секунды после прекращения ввода
        const timeoutId = setTimeout(() => {
            handleTypingFinished(value);
        }, 1500);

        // Сохраняем ID таймера в состоянии
        setTypingTimeout(timeoutId);
    };

    function walletSearch(value){
        setLoading(true);
        let type = 'search'
        if (value === ''){
            type = 'all'
        }
        getWhaleWallets(setTempFunc, type, value, '', [], '')
            .then(response => {
                if(response.data.data.length > 0) {
                    if(response.data.data[0].name || response.data.data[0].address){
                        setSearchResultsCount(1)
                    } else {
                        setSearchResultsCount(0)
                    }
                } else {
                    setSearchResultsCount(0)
                }
                setWalletsData(response.data.data);
            })
            .catch(error => {
                // Обрабатываем ошибку, если она возникла
                console.error('Ошибка при получении данных о кошельках:', error);
            })
            .finally(() => {
                setTimeout(()=>{
                    setLoading(false);
                },[1000])
            });
    }

    // Функция вызываемая после прекращения ввода
    const handleTypingFinished = (value) => {
        // Вызываем функцию, которую нужно выполнить после прекращения ввода
        walletSearch(value)
    };

    return (
        <>
            <Box className={style.search__box}
                sx={{
                position: 'absolute',
                left: activeTab === 'all' ? 0 : '-100vw',
                height: '55px',
                transition: 'left 200ms ease'
            }}>
                <Box className={style.search__box_search}>
                    <Input
                        placeholder={t('tracking.search_network')}
                        value={searchValue}
                        disableUnderline={true}
                        onChange={(e) => {
                            setLoading(true);
                            setSearchValue(e.target.value);
                            handleChangeInput(e)
                        }}
                        sx={{
                            color: 'var(--text_color)',
                            borderRadius: '50px',
                            bgcolor: '#1B1B1B',
                            padding: '10px 15px',
                            width: '100%',
                            '& .MuiInput-input': {
                                padding: '0',
                                paddingTop: '1px',
                                fontFamily: 'Gilroy',
                            },
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    {userData.isPremiumUser ?
                                        <img src={search} alt={''}/>
                                        :
                                        <img src={lock} alt={''}/>
                                    }
                                        </Box>
                                        </InputAdornment>
                        }
                                />
                            </Box>
                <Box className={style.search__box_network}>
                    <FormControl fullWidth sx={{
                        '& .MuiInputBase-formControl': {
                            color: 'rgb(111,111,111)',
                            borderRadius: '50px',
                            backgroundColor: '#1B1B1B',
                            width: '100%',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0000 !important',
                                '& legend': {fontSize: '1.5rem'}
                            },
                        },
                    }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={network}
                            label="network"
                            onChange={handleChange}
                            sx={{
                                '&.Mui-focused': {borderColor: '#fff'},
                                '& .MuiSelect-icon': {color: '#fff', marginRight: '5px'},
                            }}
                            IconComponent={ExpandMoreRoundedIcon}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        backgroundColor: '#1B1B1B',
                                        borderRadius: '20px'
                                    }
                                }
                            }}
                        >
                            {networkMenu && networkMenu.map(item => (
                                <MenuItem key={item.name} value={item.value}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </>
    );
}

export default SearchCustomWallet;
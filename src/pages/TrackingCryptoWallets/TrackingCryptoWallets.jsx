import React, { useState } from 'react';
import style from './trackingCryptoWallets.module.sass';
import { useTranslation } from 'react-i18next';
import {Box, TextField, InputAdornment, Input, FormControl, InputLabel, MenuItem} from '@mui/material'; // Import TextField and Autocomplete
import { tg } from '../../shared/telegram/telegram.js';
import { motion, AnimatePresence } from 'framer-motion';
import Tab from './Tab'
import Filters from './Filters'
import MiniCard from './MiniCard'
import { data } from './data.js'

import all_active from './assets/main/all_active.svg'
import all_disabled from './assets/main/all_disabled.svg'
import favorites_tab_active from './assets/main/favorites_tab_active.svg'
import favorites_tab_disabled from './assets/main/favorites_tab_disabled.svg'
import search from './assets/main/search.svg'
import Select from "@mui/material/Select";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const TrackingCryptoWallets = () => {
    tg.setHeaderColor('#000');

    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({ business: false, stars: false, investors: false });
    const [searchValue, setSearchValue] = useState('');
    const [searchValueVerified, setSearchValueVerified] = useState('');

    function handleTabClick(tab) {
        setActiveTab(tab);
        if (tab === 'all'){
            setFilters({ business: false, stars: false, investors: false })
        }
    }

    function handleFilterClick(filter) {
        setFilters({ ...filters, [filter]: !filters[filter] });
    }
    const [network, setNetwork] = useState('btc');

    const handleChange = (event) => {
        setNetwork(event.target.value);
    };

    return (
        <Box className={style.trackingCryptoWallets}>
            <Box className={style.trackingCryptoWallets__content}>
                {/*коробка для двух поисков*/}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                    position: 'relative',
                    height: '60px'
                }}>
                    {/*поиск по сети + сеть*/}
                    <Box className={style.trackingCryptoWallets__content__search__box}
                   sx={{
                       position: 'absolute',
                       left: activeTab === 'all' ? 0 : '-100vw',
                       height: '55px',
                       transition: 'left 200ms ease'
                   }}>
                        <Box className={style.trackingCryptoWallets__content__search__box_search}>
                            <Input
                                placeholder="Поиск"
                                value={searchValue}
                                disableUnderline={true}
                                defaultValue={'Поиск'}
                                onChange={(e) => setSearchValue(e.target.value)}
                                sx={{
                                    color: 'var(--text_color)',
                                    borderRadius: '50px',
                                    bgcolor: '#1B1B1B',
                                    padding: '10px 15px',
                                    width: '100%',
                                    "& .MuiInput-input":{
                                        padding: '0',
                                        paddingTop: '1px',
                                        fontFamily: 'Gilroy'
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <img src={search} alt={''}/>
                                        </Box>
                                    </InputAdornment>}
                            />
                        </Box>
                        <Box className={style.trackingCryptoWallets__content__search__box_network}>
                            <FormControl fullWidth
                            sx={{
                                '& .MuiInputBase-formControl':{
                                    color: 'rgb(111,111,111)',
                                    borderRadius: '50px',
                                    backgroundColor: '#1B1B1B',
                                    width: '100%',
                                    '& .MuiOutlinedInput-notchedOutline':{
                                        borderColor: '#0000 !important',
                                        '& legend':{
                                            fontSize: '1.5rem'
                                        }
                                    }
                                },
                            }}>
                                {/*<InputLabel id="demo-simple-select-label"*/}
                                {/*sx={{*/}
                                {/*    color: 'rgb(111,111,111)',*/}
                                {/*    '&.Mui-focused': {*/}
                                {/*        color: 'rgb(161,161,161)'*/}
                                {/*    },*/}
                                {/*}}>network</InputLabel>*/}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={network}
                                    label="network"
                                    onChange={handleChange}
                                    sx={{
                                        '&.Mui-focused': {
                                            borderColor: '#fff'
                                        },
                                        '& .MuiSelect-icon':{
                                            color: '#fff',
                                            marginRight: '5px'
                                        }
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
                                    <MenuItem value={'btc'}>Bitcoin (BTC)</MenuItem>
                                    <MenuItem value={'etc'}>Etherium (ETH)</MenuItem>
                                    <MenuItem value={'bep20'}>Binance Smart Chain (BEP20)</MenuItem>
                                    <MenuItem value={'matic'}>Polygon (MATIC)</MenuItem>
                                    <MenuItem value={'avax'}>Avalanche (AVAX)</MenuItem>
                                    <MenuItem value={'ftm'}>Fantom (FTM)</MenuItem>
                                    <MenuItem value={'op'}>Optimism (OP)</MenuItem>
                                    <MenuItem value={'arb'}>Arbitrium (ARB)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={style.trackingCryptoWallets__content__search__box_search}>
                </Box>
                    {/*поиск верифицированных*/}
                    <Input
                        placeholder="Поиск"
                        value={searchValueVerified}
                        disableUnderline={true}
                        defaultValue={'Поиск'}
                        onChange={(e) => setSearchValueVerified(e.target.value)}
                        sx={{
                            position: 'absolute',
                            left: activeTab === 'all' ? '100vw' : '0',
                            transition: 'left 200ms ease',
                            color: 'var(--text_color)',
                            borderRadius: '50px',
                            bgcolor: '#1B1B1B',
                            padding: '10px 15px',
                            width: '100%',
                            height: '55px',
                            "& .MuiInput-input":{
                                padding: '0',
                                paddingTop: '1px',
                                fontFamily: 'Gilroy'
                            }
                        }}
                        startAdornment={
                        <InputAdornment position="start">
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <img src={search} alt={'search'}/>
                            </Box>
                        </InputAdornment>}
                    />
                </Box>
                <Box className={style.trackingCryptoWallets__sticky}
                     sx={{
                         height: activeTab === 'all' ? '33px' : '70px',
                         overflow: 'hidden',
                         transition: 'height 100ms ease'
                     }}>
                    <Box className={style.trackingCryptoWallets__content__pages}>
                        <Tab
                            name="all"
                            iconActive={all_active}
                            iconDisabled={all_disabled}
                            onClick={handleTabClick}
                            activeTab={activeTab}
                            text={t('tracking.page_all')}
                        />
                        <Tab
                            name="verified"
                            iconActive={favorites_tab_active}
                            iconDisabled={favorites_tab_disabled}
                            onClick={handleTabClick}
                            activeTab={activeTab}
                            text={t('tracking.page_verified')}
                        />
                    </Box>
                    <Filters
                        filters={filters}
                        onClick={handleFilterClick}
                        t={t}
                    />
                </Box>
                    <Box sx={{
                        position: 'absolute',
                        top: '120px',
                        width: '90%',
                        paddingBottom: '10px',
                        left: activeTab === 'all' ? 'calc((100vw - 90%)/2)' : '-100vw',
                        transition: 'left 200ms ease'
                    }}>
                        <Box className={style.trackingCryptoWallets__content__cards}>
                            <AnimatePresence>
                                {data.map((item, index) => {
                                    const matchesFilter =
                                        (!filters.business || item.role.includes('business')) &&
                                        (!filters.stars || item.role.includes('star')) &&
                                        (!filters.investors || item.role.includes('investor'));
    
                                    const matchesSearch = item.name.toLowerCase().includes(searchValue.toLowerCase());
    
                                    if (activeTab === 'all' && matchesSearch) {
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                transition={{ delay: 0.2 }}
                                                style={{
                                                    maxHeight: '100%'
                                                }}
                                            >
                                                <MiniCard
                                                    name={item.name}
                                                    description={item.description}
                                                    money={item.money}
                                                    likes={item.likes}
                                                    favorite={item.favorite}
                                                    appruvd={item.appruvd}
                                                    photo={item.photo}
                                                    role={item.role}
                                                />
                                            </motion.div>
                                        );
                                    }
                                    return null;
                                })}
                            </AnimatePresence>
                        </Box>
                    </Box>
                <Box sx={{
                    position: 'absolute',
                    top: '155px',
                    width: '90%',
                    paddingBottom: '10px',
                    left: activeTab === 'all' ? '100vw' : 'calc((100vw - 90%)/2)',
                    transition: 'left 200ms ease'
                }}>
                    <Box className={style.trackingCryptoWallets__content__cards}>
                        <AnimatePresence>
                            {data.map((item, index) => {
                                const matchesFilter =
                                    (!filters.business || item.role.includes('business')) &&
                                    (!filters.stars || item.role.includes('star')) &&
                                    (!filters.investors || item.role.includes('investor'));

                                const matchesSearch = item.name.toLowerCase().includes(searchValueVerified.toLowerCase());

                                if (activeTab === 'verified' && matchesFilter && matchesSearch) {
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                            transition={{ delay: 0.2 }}
                                            style={{
                                                maxHeight: '100%'
                                            }}
                                        >
                                            <MiniCard
                                                name={item.name}
                                                description={item.description}
                                                money={item.money}
                                                likes={item.likes}
                                                favorite={item.favorite}
                                                appruvd={item.appruvd}
                                                photo={item.photo}
                                                role={item.role}
                                            />
                                        </motion.div>
                                    );
                                }
                                return null;
                            })}
                        </AnimatePresence>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default TrackingCryptoWallets;

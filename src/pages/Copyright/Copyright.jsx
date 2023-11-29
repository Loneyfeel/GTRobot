import React, {useState} from 'react';
import {TabContext, TabList} from "@mui/lab";
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";
import CustomTab from "../../shared/components/Tabs/Tab/index.js";
import TopTraders from "./components/CopyTabPanels/TopTraders/index.js";

const Copyright = () => {
    // window.Telegram.WebApp.BackButton.isVisible = true;
    // window.Telegram.WebApp.ready();
    // window.Telegram.WebApp.BackButton.onClick(async () => {
    //     window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
    //
    //     window.location.href = '/tools';
    // });


    const { t } = useTranslation();
    const [value, setValue] = useState('1');
    const [selected, setSelected] = useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelected(true)
    };

    return (
        <>
            <TabContext value={value}>
                <Box>
                    <TabList
                    sx={{
                        bgcolor: 'var(--tg-theme-bg-color)',
                        '& .MuiTabs-scrollButtons.Mui-disabled': {
                            opacity: '0.3',
                        },
                        '& .MuiTabs-scrollButtons': {
                            color: 'var(--tg-theme-button-color)',
                            opacity: '1',
                        }
                    }}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    >
                        <CustomTab label={`топ трейдеров`} selected={selected} value="1" handleChange={handleChange} />
                        <CustomTab label={`выбранные трейдеры`} selected={selected} value="2" handleChange={handleChange} />
                        <CustomTab label={`статистика торговли`} selected={selected} value="3" handleChange={handleChange} />
                        <CustomTab label={`смена API`} selected={selected} value="4" handleChange={handleChange} />
                    </TabList>
                </Box>
                    <TopTraders value='1'/>
            </TabContext>
        </>
    );
};

export default Copyright;
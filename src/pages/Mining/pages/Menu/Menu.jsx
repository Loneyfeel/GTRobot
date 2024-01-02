import React, {lazy, useEffect, useState} from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

import PeopleIcon from '@mui/icons-material/People'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

import Mining from './Mining';
import Withdraw from './Withdraw';
import ChangeCrypto from './ChangeCrypto';
import GTRobotMining from './GTRobotMining/index.js';
import Referrals from './Referrals/index.js';
import Coins from './Coins/index.js';
import GTRobotInfo from "./GTRobotInfo/index.js";

const Menu = ({activeMenuSection}) => {

    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if(activeMenuSection){
            setExpanded(activeMenuSection)
        }
    }, []);

    const sections = [
        {
            id: 'mining',
            title: 'mining.pages.menu.mining.title',
            icon: <FilterDramaIcon sx={{ width: '50px' }} />,
            component: <Mining setIsSectionOpen={setExpanded}/>,
        },
        {
            id: 'gtrobot-mining',
            title: 'mining.pages.menu.gtrobot-mining.title',
            icon: <CurrencyExchangeIcon sx={{ width: '50px' }} />,
            component: <GTRobotMining setIsSectionOpen={setExpanded}/>,
        },
        // {
        //     id: 'gtrobot-info',
        //     title: 'mining.pages.menu.gtrobot-info.title',
        //     icon: <SmartToyOutlinedIcon sx={{ width: '50px' }} />,
        //     component: <GTRobotInfo setIsSectionOpen={setExpanded}/>,
        // },
        {
            id: 'referral',
            title: 'mining.pages.menu.referral.title',
            icon: <PeopleIcon sx={{ width: '50px' }} />,
            component: <Referrals setIsSectionOpen={setExpanded}/>,
        },
        {
            id: 'coins',
            title: 'mining.pages.menu.coins.title',
            icon: <CurrencyBitcoinIcon sx={{ width: '50px' }} />,
            component: <Coins setIsSectionOpen={setExpanded}/>,
        },
        {
            id: 'withdraw',
            title: 'mining.pages.menu.withdraw.title',
            icon: <AccountBalanceWalletIcon sx={{ width: '50px' }} />,
            component: <Withdraw setIsSectionOpen={setExpanded}/>,
        },
        {
            id: 'changeCrypto',
            title: 'mining.pages.menu.changeCrypto.menu_btn',
            icon: <ChangeCircleIcon sx={{ width: '50px' }} />,
            component: <ChangeCrypto setIsSectionOpen={setExpanded}/>,
        },
    ];

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ bgcolor: 'var(--tg-theme-bg-color)', color: 'var(--tg-theme-text-color)' }}>
            {sections.map((section) => (
                <Accordion
                    key={section.id}
                    expanded={expanded === section.id}
                    onChange={handleAccordionChange(section.id)}
                    sx={{
                        '&.Mui-expanded': {
                            margin: '0',
                        },
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'var(--tg-theme-text-color)' }} />}
                        aria-controls={`${section.id}-content`}
                        id={`${section.id}-header`}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems:'center'
                        }}>{section.icon}</Box>
                        <Typography sx={{ fontSize: '18px', width: '100%', marginLeft: '10px' }}>
                            {t(section.title)}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>{section.component}</AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default Menu;

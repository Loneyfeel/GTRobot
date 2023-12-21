import React, { lazy, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

const PeopleIcon = lazy(() => import('@mui/icons-material/People'));
const CurrencyExchangeIcon = lazy(() => import('@mui/icons-material/CurrencyExchange'));
const FilterDramaIcon = lazy(() => import('@mui/icons-material/FilterDrama'));
const ChangeCircleIcon = lazy(() => import('@mui/icons-material/ChangeCircle'));
const CurrencyBitcoinIcon = lazy(() => import('@mui/icons-material/CurrencyBitcoin'));
const AccountBalanceWalletIcon = lazy(() => import('@mui/icons-material/AccountBalanceWallet'));

import Mining from './Mining';
import Withdraw from './Withdraw';
import ChangeCrypto from './ChangeCrypto';
import GTRobotMining from './GTRobotMining/index.js';
import Referrals from './Referrals/index.js';
import Coins from './Coins/index.js';

const Menu = ({activeMenuSection}) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);
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
            title: 'mining.pages.menu.withdraw.menu_btn',
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
                        {section.icon}
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

import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";
import ToolsButton from "./ToolsButton";
import {lazy} from "react";

const SearchIcon = lazy(() => import('@mui/icons-material/Search'));
const AnalyticsOutlinedIcon = lazy(() => import('@mui/icons-material/AnalyticsOutlined'));
const AutoModeIcon = lazy(() => import('@mui/icons-material/AutoMode'));
const FilterDramaIcon = lazy(() => import('@mui/icons-material/FilterDrama'));

function ToolsButtons() {
    const {t, i18n} = useTranslation()

    const appendLocaleToUrl = (url) => {
        const currentLocale = i18n.language;
        return `${url}/?locale=${currentLocale}`;
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    gap: '20px',
                }}>
                <ToolsButton id="Analysis" icon={<SearchIcon />} text={t('toolsMenu.buttons.analysis')} url={appendLocaleToUrl("/signals")}/>
                <ToolsButton id="Monitoring" icon={<AnalyticsOutlinedIcon />} text={t('toolsMenu.buttons.monitoring')} url={appendLocaleToUrl("/klines")}/>
                <ToolsButton id="Forex" icon={<AutoModeIcon />} text={t('toolsMenu.buttons.forex')} url={appendLocaleToUrl("/forex")}/>
                <ToolsButton id="Mining" icon={<FilterDramaIcon />} text={t('toolsMenu.buttons.mining')} url={appendLocaleToUrl("/mining")}/>
            </Box>
        </>
    )
}

export default ToolsButtons

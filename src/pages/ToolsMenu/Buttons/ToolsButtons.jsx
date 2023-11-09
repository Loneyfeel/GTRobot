import SearchIcon from '@mui/icons-material/Search';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import {useTranslation} from "react-i18next";
import {Box} from "@mui/material";
import ToolsButton from "./ToolsButton";

function ToolsButtons() {
    const {t, i18n} = useTranslation()

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
                <ToolsButton id="Analysis" icon={<SearchIcon />} text={t('toolsMenu.buttons.analysis')} url="/signals"/>
                <ToolsButton id="Monitoring" icon={<AnalyticsOutlinedIcon />} text={t('toolsMenu.buttons.monitoring')} url="/klines"/>
            </Box>
        </>
    )
}

export default ToolsButtons

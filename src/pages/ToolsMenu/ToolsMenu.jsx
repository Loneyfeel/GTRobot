import ToolsMenuTitle from './Title'
import ToolsButtons from './Buttons'
import {Box} from "@mui/material";

function ToolsMenu() {
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.BackButton.onClick(async () => {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');

        window.location.href = '/';
    });
    return (
        <>
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                height: 'var(--tg-viewport-height)',
                backgroundColor: 'var(--tg-theme-bg-color)'
            }}>
                <ToolsMenuTitle/>
                <ToolsButtons/>
            </Box>
        </>
    )
}

export default ToolsMenu

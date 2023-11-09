import ToolsMenuTitle from './Title'
import ToolsButtons from './Buttons'
import {Box} from "@mui/material";

function ToolsMenu() {

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

import MainButtons from "./MainButtons/index.js";
import MainTitle from "./MainTitle/index.js";
import {Box} from "@mui/material";

const MainMenu = () => {
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
                <MainTitle/>
                <MainButtons/>
            </Box>
        </>
    );
}

export default MainMenu;
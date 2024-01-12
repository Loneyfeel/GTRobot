import React, {useMemo} from 'react';

import '../../../../assets/fonts/benzin-bold.ttf'
import '../../../../assets/fonts/benzin-semibold.ttf'

import Stories from 'react-insta-stories';

import {Box} from "@mui/material";

const StoryComponent = ({storyData}) => {
    return (
        <>
            <Box
            sx={{
                // position: 'fixed',
                // top: '0',
                // left: '0',
                // width: '100vw',
                // height: '100vh',
                bgcolor: 'var(--tg-theme-bg-color)'
            }}>
                <Stories
                    stories={storyData}
                    defaultInterval={1500}
                    width={'100vw'}
                    height={'100vh'}
                    storyStyles={{
                    }}
                />
            </Box>
        </>
    );
}

export default StoryComponent;

import React from 'react';
import style from './pageTitle.module.sass'
import {Box} from "@mui/material";

const PageTitle = ({text}) => {
    return (
        <>
            <Box className={style.pageTitle}>
                {text}
            </Box>
        </>
    );
};

export default PageTitle;
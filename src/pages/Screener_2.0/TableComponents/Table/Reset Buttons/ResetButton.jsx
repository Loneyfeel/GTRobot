import React from 'react';
import {IconButton} from "@mui/material";

const ResetButton = ({id, onClick, disabled, children}) => {

    return (
        <div>
            <IconButton
                id={id}
                variant="contained"
                onClick={onClick}
                disabled={disabled}
                sx={{
                    color: 'primary.dark',
                    minWidth: '0px',
                    maxWidth: '30px',
                    padding: '0 3px',
                }}
            >
                {children}
            </IconButton >
        </div>
    );
};

export default ResetButton;
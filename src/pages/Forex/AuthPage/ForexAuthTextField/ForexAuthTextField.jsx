import React from 'react';
import {IconButton, TextField} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ForexAuthTextField = ({ label, type, showPassword, handleTogglePassword, value, onChange }) => {
    return (
        <TextField
            id={`outlined-${label.toLowerCase()}-input`}
            label={label}
            type={showPassword ? 'text' : type}
            value={value}  // Добавлено значение из пропсов
            onChange={onChange}  // Добавлено событие onChange из пропсов
            sx={{
                maxHeight: '80px',
                minHeight: '80px',
                '& .MuiFormHelperText-contained': {
                    marginTop: '0',
                },
                '& .MuiFormHelperText-input': {
                    color: 'var(--tg-theme-text-color)',
                },
                '& .MuiInputBase-root.MuiOutlinedInput-root fieldset': {
                    border: '1px solid var(--tg-theme-button-color)'
                },
                '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
                    border: '1px solid #fff'
                }
            }}
            InputProps={{
                endAdornment: type === 'password' && (
                    <IconButton onClick={handleTogglePassword} edge="end"
                                sx={{
                                    color: 'var(--tg-theme-hint-color)'
                                }}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                ),
                inputProps: {
                    style: {
                        color: 'var(--tg-theme-text-color)',
                        borderRadius: '5px',
                        borderColor: 'var(--tg-theme-button-color)',
                    },
                },
            }}
            InputLabelProps={{
                style: {
                    color: 'var(--tg-theme-text-color)',
                },
            }}
        />
    );
};

export default ForexAuthTextField;

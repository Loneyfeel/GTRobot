import React from 'react';
import {serverOptions} from './serverOptions.js'
import { TextField, Autocomplete } from '@mui/material';
import {useTranslation} from "react-i18next";

const ForexServerAutocomplete = ({ value, onChange }) => {
    const { t } = useTranslation()
    return (
        <Autocomplete
            freeSolo
            options={serverOptions}
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t('forex.auth.form.server')}
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
                            border: '1px solid var(--tg-theme-button-color)',
                        },
                        '& .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset': {
                            border: '1px solid #fff',
                        },
                        '& .MuiAutocomplete-clearIndicator': {
                            color: 'var(--tg-theme-text-color)',
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'var(--tg-theme-text-color)',
                        },
                    }}
                />
            )}
        />
    );
};

export default ForexServerAutocomplete;

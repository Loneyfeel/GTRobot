import React from 'react';
import Select from "@mui/material/Select";

const FiltersSelect = ({ label, variable, filters, setFilters, setIsFilteringActive, children }) => {
    return (
        <>
            <Select
                label={label}
                value={filters[variable]}
                onChange={(e) => {
                    setFilters({ ...filters, [variable]: e.target.value });
                    setIsFilteringActive(e.target.value !== '');
                }}
                sx={{
                    height: '30px',
                    width: '55px',
                    fontSize: '12px',
                    marginRight: '12px',
                    backgroundColor: 'var(--tg-theme-bg-color)',
                    borderRadius: '5px',
                    border: '1px solid var(--tg-theme-button-color)',
                    "& .MuiSelect-icon": {
                        color: "var(--tg-theme-button-color)",
                    },
                }}
            >
                {children}
            </Select>
        </>
    );
};

export default FiltersSelect;
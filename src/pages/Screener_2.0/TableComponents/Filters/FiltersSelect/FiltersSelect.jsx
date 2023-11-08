import React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
                    marginRight: '10px',
                    backgroundColor: 'var(--tg-theme-bg-color)',
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
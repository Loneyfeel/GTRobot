import './filter.sass'
import React, { useState, useEffect, useRef } from "react"
import {formatNumber} from '../helps/FormatNumber/FormatNumber.js'
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Filters = ({filteredData, filters, setFilters}) => {

    const [isFilteringActive, setIsFilteringActive] = useState(false);

    const resetFilters = () => {
        setFilters({ raz: '', cd: '', dal: '', name: '' });
        setIsFilteringActive(false);

    };

    useEffect(() => {
        resetFilters(); // Сбрасываем фильтры при загрузке страницы
    }, []);

    return (
        <>
            <Button
                id="reset_filters"
                variant="contained"
                color="secondary"
                onClick={() => {
                    resetFilters();
                    setIsFilteringActive(false);
                }}
                disabled={!isFilteringActive}
            >
                Сбросить фильтры
            </Button>
            <Autocomplete
                id="coinNameFilter"
                options={filteredData.filter((item, index) => index % 2 === 1).map((item) => item.name)} // Фильтруем каждое второе название
                renderInput={(params) => (
                    <TextField {...params} label="Name Filter" />
                )}
                onInputChange={(e, value) => {
                    // Обновите фильтр по имени монеты на основе value
                    setFilters({ ...filters, name: value });
                }}
            />
            <Select
                label="Raz Filter"
                value={filters.raz}
                onChange={(e) => {
                    setFilters({ ...filters, raz: e.target.value });
                    setIsFilteringActive(e.target.value !== '');
                }}
            >
                {['', 3, 5, 10, 20].map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
            <Select
                label="CD Filter"
                value={filters.cd}
                onChange={(e) => {
                    setFilters({ ...filters, cd: e.target.value });
                    setIsFilteringActive(e.target.value !== '');
                }}
            >
                {['', 100000, 250000, 500000, 1000000, 2000000, 3000000].map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
            <Select
                label="Dal Filter"
                value={filters.dal}
                onChange={(e) => {
                    setFilters({ ...filters, dal: e.target.value });
                    setIsFilteringActive(e.target.value !== '');
                }}
            >
                {['', 0.5, 1, 1.5, 2, 3].map((value) => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </>
    )
}

export default Filters
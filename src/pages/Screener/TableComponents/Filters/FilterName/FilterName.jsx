import style from './fiterName.module.sass'
import React, {useState} from 'react';
import {TextField} from "@mui/material";

const FilterName = ({filters, setFilters, setSearchTerm, setIsFilteringActive, searchResults, searchTerm, setSelectedItem, selectedItem }) => {

    const [isNameListOpen, setIsNameListOpen] = useState(false);

    const handleNameFilterChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        setFilters({ ...filters, name: newSearchTerm });
        setIsFilteringActive(!!newSearchTerm);
        setIsFilteringActive(true);
    };

    return (
        <>
            <div className={style.custom_dropdown}>
                <TextField
                    size={"small"}
                    label="...."
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleNameFilterChange}
                    onFocus={() => {
                        setFilters({ ...filters, name: "" });
                        setSearchTerm("");
                        setSelectedItem("");
                        setIsNameListOpen(true);
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            if (!document.activeElement.classList.contains("name_list__li")) {
                                setIsNameListOpen(false);
                            }
                        }, 100);
                    }}
                    sx={{
                        padding: '0',
                        width: '70px'
                    }}
                    InputProps={{
                        style: {
                            padding: '0',
                            height: '30px',
                            width: '68px',
                            backgroundColor: "var(--tg-theme-bg-color)",
                        },
                        inputProps: {
                            style: {
                                padding: '0 5px',
                                height: '30px',
                                fontSize: '12px'
                            },
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: 'var(--tg-theme-text-color)',
                            top: '0',
                        },
                    }}
                />
                {isNameListOpen && searchResults.length > 0 && (
                    <ul className={style.dropdown_list}>
                        {searchResults
                            .filter((_, index) => index % 2 === 0)
                            .map((coin) => (
                                <li
                                    className={style.name_list__li}                                    key={coin.id}
                                    onClick={() => {
                                        setSearchTerm(coin.name);
                                        setIsFilteringActive(true);
                                        setFilters({ ...filters, name: coin.name });
                                        setIsNameListOpen(false);
                                    }}
                                >
                                    {coin.name}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default FilterName;
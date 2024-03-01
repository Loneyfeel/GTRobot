import React from "react";
import Select from "@mui/material/Select";

const FiltersSelect = ({
  label,
  variable,
  filters,
  setFilters,
  setIsFilteringActive,
  children,
  setPage,
}) => {
  return (
    <>
      <Select
        label={label}
        value={filters[variable]}
        onChange={(e) => {
          setFilters({ ...filters, [variable]: e.target.value });
          setIsFilteringActive(e.target.value !== "");
          setPage(0);
        }}
        sx={{
          height: "30px",
          width: "55px",
          fontSize: "12px",
          marginRight: "12px",
          backgroundColor: "var(--tg-theme-bg-color)",
          borderRadius: "5px",
          border: "1px solid var(--tg-theme-button-color)",
          "& .MuiInputBase-root.MuiOutlinedInput-root fieldset": {
            padding: "0",
          },
          "& .MuiSelect-icon": {
            right: "0",
            width: "20px",
            color: "var(--tg-theme-button-color)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none", // Цвет границы при активации
          },
          "& .MuiSelect-select": {
            borderRadius: "5px",
            marginTop: "3px",
            padding: "0 7px",
          },
        }}
      >
        {children}
      </Select>
    </>
  );
};

export default FiltersSelect;

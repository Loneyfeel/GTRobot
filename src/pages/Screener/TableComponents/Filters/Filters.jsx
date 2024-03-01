import React, { useState, useEffect, useRef } from "react";
import { formatNumber } from "../helps/FormatNumber/FormatNumber.js";
import { MenuItem, Box } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ResetButton from "../Reset Buttons";
import FiltersSelect from "./FiltersSelect";
import FilterName from "./FilterName";

const Filters = ({ filteredData, filters, setFilters, setPage }) => {
  const [isFilteringActive, setIsFilteringActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const results = filteredData.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm, filteredData]);

  const resetFilters = () => {
    setFilters({ raz: "", cd: "", dal: "", name: "" });
    setIsFilteringActive(false);
    setSearchTerm("");
    setSelectedItem("");
  };

  useEffect(() => {
    resetFilters();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          borderBottom: "none",
          borderRadius: "0",
          height: "35px",
          backgroundColor: "var(--tg-theme-secondary-bg-color)",
        }}
      >
        <ResetButton
          id="reset_filters"
          onClick={() => resetFilters()}
          disabled={!isFilteringActive}
          children={<RotateLeftIcon />}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FilterName
              filters={filters}
              setFilters={setFilters}
              setSearchTerm={setSearchTerm}
              setIsFilteringActive={setIsFilteringActive}
              searchResults={searchResults}
              searchTerm={searchTerm}
              setSelectedItem={setSelectedItem}
              setPage={setPage}
            />
            <FiltersSelect
              variable={"raz"}
              filters={filters}
              setFilters={setFilters}
              setIsFilteringActive={setIsFilteringActive}
              setPage={setPage}
              children={["", 3, 5, 10, 20].map((value) => (
                <MenuItem
                  key={value}
                  value={value}
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--tg-theme-hint-color)",
                    },
                  }}
                >
                  {value}
                </MenuItem>
              ))}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <FiltersSelect
              variable={"cd"}
              filters={filters}
              setFilters={setFilters}
              setIsFilteringActive={setIsFilteringActive}
              setPage={setPage}
              children={[
                "",
                100000,
                250000,
                500000,
                1000000,
                2000000,
                3000000,
              ].map((value) => (
                <MenuItem
                  key={value}
                  value={value}
                  sx={{
                    padding: "5px",
                    "&:hover": {
                      backgroundColor: "var(--tg-theme-hint-color)",
                    },
                  }}
                >
                  {formatNumber(value)}
                </MenuItem>
              ))}
            />
            <FiltersSelect
              variable={"dal"}
              filters={filters}
              setFilters={setFilters}
              setIsFilteringActive={setIsFilteringActive}
              setPage={setPage}
              children={["", 0.5, 1, 1.5, 2, 3].map((value) => (
                <MenuItem
                  key={value}
                  value={value}
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--tg-theme-hint-color)",
                    },
                  }}
                >
                  {value}
                </MenuItem>
              ))}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Filters;

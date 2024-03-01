import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const CopyTableContainer = ({ children }) => (
  <TableContainer
    component={Paper}
    sx={{
      overflow: "hidden",
      width: "100%",
      borderRadius: "0",
      bgcolor: "var(--tg-theme-secondary-bg-color)",
    }}
  >
    {children}
  </TableContainer>
);

export default CopyTableContainer;

import React from "react";
import style from './titles.module.sass'
import { Box } from "@mui/material";

function Titles({ text }) {
  return (
    <>
      <Box
          className={style.titles}>
        <Box
            className={style.titles__text}>
          {text}:
        </Box>
      </Box>
    </>
  );
}

export default Titles;

import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import React, { useEffect } from "react";

const Timer = ({ timeRemaining, animation1, animation2 }) => {
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const pad = (value) => (value < 10 ? `0${value}` : value);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const getAnimationData = () => {
    const currentTime = new Date().getHours();
    // Ваша логика для определения анимации в зависимости от времени
    if (currentTime >= 0 && currentTime < 8) {
      return animation1;
    } else if (currentTime >= 8 && currentTime < 16) {
      return animation2;
    } else {
      // Добавьте обработку других временных диапазонов, если необходимо
      return animation1;
    }
  };

  const animationData = getAnimationData();

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "8px",
        }}
      >
        {formatTime(timeRemaining)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Lottie
          animationData={animationData}
          style={{
            width: "180px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Timer;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import startIcon from "../../../assets/HelpsAnimations/Start/cloud-mining.svg";
import helps_video_1 from "../../../assets/HelpsAnimations/helps_video_1.mp4";
import { useTranslation } from "react-i18next";

const Start = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: "-50%" },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={transition}
    >
      {/*<motion.div*/}
      {/*    variants={textVariants}*/}
      {/*    initial="hidden"*/}
      {/*    animate="visible"*/}
      {/*    transition={{ ...transition, delay: 0.3 }}*/}
      {/*>*/}
      {/*    <Typography*/}
      {/*        sx={{*/}
      {/*            fontSize: '34px',*/}
      {/*            color: 'var(--tg-theme-text-color)',*/}
      {/*            margin: '20px'*/}
      {/*        }}>*/}
      {/*        {t('mining.components.helps.start')}*/}
      {/*    </Typography>*/}
      {/*</motion.div>*/}
      {/*<motion.div*/}
      {/*    variants={imageVariants}*/}
      {/*    initial="hidden"*/}
      {/*    animate="visible"*/}
      {/*    transition={{ ...transition, delay: 0.8 }}*/}
      {/*    style={{*/}
      {/*        display: 'flex',*/}
      {/*        justifyContent: 'center'*/}
      {/*    }}*/}
      {/*>*/}
      {/*    <motion.img*/}
      {/*        src={startIcon}*/}
      {/*        alt="Start Icon"*/}
      {/*        style={{*/}
      {/*            marginTop: '50px',*/}
      {/*            height: '200px',*/}
      {/*            width: '200px',*/}
      {/*        }}*/}
      {/*    />*/}
      {/*</motion.div>*/}
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            bgcolor: "#000",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "#000",
        }}
      >
        <video
          controls={false}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="https://cdn.indiawealth.in/public/images/transparent-background-mini.png"
          style={{
            height: "100vh",
            width: "100vw",
            visibility: isLoading ? "hidden" : "visible",
          }}
          onLoadedData={() => setIsLoading(false)}
        >
          <source src={helps_video_1} type="video/mp4" />
        </video>
      </Box>
    </motion.div>
  );
};

export default Start;

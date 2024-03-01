import React, { useState } from "react";
import { motion } from "framer-motion";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import Coins from "../../../assets/HelpsAnimations/moreMoney/Coins.svg";
import PulsatingImages from "./PulsatingImages/PulsatingImages.jsx";
import { useTranslation } from "react-i18next";
import helps_video_3 from "../../../assets/HelpsAnimations/helps_video_3.mp4";

const MoreMoney = () => {
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/*<motion.div*/}
      {/*    variants={textVariants}*/}
      {/*    initial="hidden"*/}
      {/*    animate="visible"*/}
      {/*    transition={{ ...transition, delay: 0.3 }}*/}
      {/*>*/}
      {/*    <Typography*/}
      {/*        sx={{*/}
      {/*            fontSize: '32px',*/}
      {/*            color: 'var(--tg-theme-text-color)',*/}
      {/*            margin: '20px',*/}
      {/*            position: 'relative',*/}
      {/*        }}*/}
      {/*    >*/}
      {/*        {t('mining.components.helps.more-money')}*/}
      {/*    </Typography>*/}
      {/*</motion.div>*/}
      {/*<motion.div*/}
      {/*    variants={imageVariants}*/}
      {/*    initial="hidden"*/}
      {/*    animate="visible"*/}
      {/*    transition={{ ...transition, delay: 1 }}*/}
      {/*    style={{*/}
      {/*        display: 'flex',*/}
      {/*        justifyContent: 'center',*/}
      {/*    }}*/}
      {/*>*/}
      {/*    <motion.img*/}
      {/*        src={Coins}*/}
      {/*        alt="Coins"*/}
      {/*        style={{*/}
      {/*            marginTop: '50px',*/}
      {/*            width: '70%',*/}
      {/*        }}*/}
      {/*    />*/}
      {/*    <PulsatingImages/>*/}
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
          <source src={helps_video_3} type="video/mp4" />
        </video>
      </Box>
    </motion.div>
  );
};

export default MoreMoney;

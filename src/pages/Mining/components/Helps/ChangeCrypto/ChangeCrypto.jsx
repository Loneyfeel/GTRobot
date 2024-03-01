import React, { useState } from "react";
import { motion } from "framer-motion";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import changeCrypto from "../../../assets/HelpsAnimations/changeCrypto/ChangeCrypto.svg";
import bitcoinIcon from "../../../assets/bitcoin-btc-logo.svg";
import dogeIcon from "../../../assets/dogecoin-doge-logo.svg";
import shibaIcon from "../../../assets/shiba-inu-shib-logo.svg";
import tonIcon from "../../../assets/ton_symbol.svg";
import { useTranslation } from "react-i18next";
import helps_video_2 from "../../../assets/HelpsAnimations/helps_video_2.mp4";

const ChangeCrypto = () => {
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

  const iconsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };

  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
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
        {/*        {t('mining.components.helps.change-crypto')}*/}
        {/*    </Typography>*/}
        {/*</motion.div>*/}
        {/*<motion.div*/}
        {/*    variants={imageVariants}*/}
        {/*    initial="hidden"*/}
        {/*    animate="visible"*/}
        {/*    transition={{ ...transition, delay: 0.3 }}*/}
        {/*    style={{*/}
        {/*        display: 'flex',*/}
        {/*        justifyContent: 'center',*/}
        {/*        position: 'relative',*/}
        {/*        height: '300px',*/}
        {/*    }}*/}
        {/*>*/}
        {/*    <motion.div*/}
        {/*        variants={iconsContainerVariants}*/}
        {/*        initial="hidden"*/}
        {/*        animate="visible"*/}
        {/*    >*/}
        {/*        <motion.img*/}
        {/*            variants={iconVariants}*/}
        {/*            initial="hidden"*/}
        {/*            animate="visible"*/}
        {/*            src={bitcoinIcon}*/}
        {/*            alt="Bitcoin Icon"*/}
        {/*            style={{*/}
        {/*                position: 'absolute',*/}
        {/*                top: '25%',*/}
        {/*                left: '10%',*/}
        {/*                transform: 'translate(-50%, -50%)',*/}
        {/*                width: '50px',*/}
        {/*                height: '50px',*/}
        {/*            }}*/}
        {/*            transition={{ ...transition, delay: 1.5 }}*/}
        {/*        />*/}
        {/*        <motion.img*/}
        {/*            variants={iconVariants}*/}
        {/*            initial="hidden"*/}
        {/*            animate="visible"*/}
        {/*            src={dogeIcon}*/}
        {/*            alt="Doge Icon"*/}
        {/*            style={{*/}
        {/*                position: 'absolute',*/}
        {/*                top: '5%',*/}
        {/*                left: '30%',*/}
        {/*                transform: 'translate(-50%, -50%)',*/}
        {/*                width: '50px',*/}
        {/*                height: '50px',*/}
        {/*            }}*/}
        {/*            transition={{ ...transition, delay: 1.8 }}*/}
        {/*        />*/}
        {/*        <motion.img*/}
        {/*            variants={iconVariants}*/}
        {/*            initial="hidden"*/}
        {/*            animate="visible"*/}
        {/*            src={shibaIcon}*/}
        {/*            alt="Shiba Icon"*/}
        {/*            style={{*/}
        {/*                position: 'absolute',*/}
        {/*                top: '5%',*/}
        {/*                right: '30%',*/}
        {/*                transform: 'translate(-50%, -50%)',*/}
        {/*                width: '50px',*/}
        {/*                height: '50px',*/}
        {/*            }}*/}
        {/*            transition={{ ...transition, delay: 2.1 }}*/}
        {/*        />*/}
        {/*        <motion.img*/}
        {/*            variants={iconVariants}*/}
        {/*            initial="hidden"*/}
        {/*            animate="visible"*/}
        {/*            src={tonIcon}*/}
        {/*            alt="TON Icon"*/}
        {/*            style={{*/}
        {/*                position: 'absolute',*/}
        {/*                top: '25%',*/}
        {/*                right: '10%',*/}
        {/*                transform: 'translate(-50%, -50%)',*/}
        {/*                width: '50px',*/}
        {/*                height: '50px',*/}
        {/*            }}*/}
        {/*            transition={{ ...transition, delay: 2.4 }}*/}
        {/*        />*/}
        {/*    </motion.div>*/}
        {/*    <motion.img*/}
        {/*        src={changeCrypto}*/}
        {/*        alt="Start Icon"*/}
        {/*        style={{*/}
        {/*            position: 'fixed',*/}
        {/*            bottom: '0',*/}
        {/*            left: '15px',*/}
        {/*            width: '100%',*/}
        {/*            opacity: 0,*/}
        {/*        }}*/}
        {/*        variants={imageVariants}*/}
        {/*        initial="hidden"*/}
        {/*        animate="visible"*/}
        {/*        transition={{ ...transition, delay: 1 }}*/}
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
            <source src={helps_video_2} type="video/mp4" />
          </video>
        </Box>
      </motion.div>
    </>
  );
};

export default ChangeCrypto;

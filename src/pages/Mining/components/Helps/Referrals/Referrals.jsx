import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

import Devises from "../../../assets/HelpsAnimations/referrals/Devises.svg";
import character_1 from "../../../assets/HelpsAnimations/referrals/character-1.svg";
import character_2 from "../../../assets/HelpsAnimations/referrals/character-2.svg";
import character_3 from "../../../assets/HelpsAnimations/referrals/character-3.svg";
import character_4 from "../../../assets/HelpsAnimations/referrals/character-4.svg";
import Lines from "../../../assets/HelpsAnimations/referrals/Lines.svg";
import Coin from "../../../assets/HelpsAnimations/Coin.svg";
import { useTranslation } from "react-i18next";

const Referrals = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: "-50%" },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: "-80%" },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const coinVariants = {
    hidden: { opacity: 0, y: "-80%" },
    visible: { opacity: 1, y: 0 },
  };

  const characterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const deviseVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };
  const linesVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };

  const { t } = useTranslation();

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: 0.3 }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              color: "var(--tg-theme-text-color)",
              margin: "20px",
              position: "relative",
            }}
          >
            {t("mining.components.helps.referrals")}
          </Typography>
        </motion.div>
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: 1 }}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.img
            src={Devises}
            alt="Devises"
            style={{
              position: "absolute",
              top: "70px",
              transform: "translate(-50%, -50%)",
              width: "330px",
            }}
            variants={deviseVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 1 }}
          />
          {/* Персонажи появляются по очереди с задержкой */}
          <motion.img
            src={character_1}
            alt="Character 1"
            style={{
              position: "absolute",
              top: "160px",
              left: "33%",
              transform: "translate(-50%, -50%)",
              width: "40px",
              zIndex: "1000",
            }}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 1.5 }}
          />
          <motion.img
            src={character_2}
            alt="Character 2"
            style={{
              position: "absolute",
              top: "160px",
              right: "33%",
              transform: "translate(-50%, -50%)",
              width: "40px",
              zIndex: "1000",
            }}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 1.8 }}
          />
          <motion.img
            src={character_3}
            alt="Character 3"
            style={{
              position: "absolute",
              top: "115px",
              left: "35%",
              transform: "translate(-50%, -50%)",
              width: "43px",
            }}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 2.1 }}
          />
          <motion.img
            src={character_4}
            alt="Character 4"
            style={{
              position: "absolute",
              top: "115px",
              right: "35%",
              transform: "translate(-50%, -50%)",
              width: "40px",
            }}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 2.4 }}
          />

          {/* Линии появляются с задержкой */}
          <motion.img
            src={Lines}
            alt="Lines"
            style={{
              position: "absolute",
              top: "170px",
              // transform: 'translate(-50%, -50%)',
              width: "150px",
              heidht: "50px",
            }}
            variants={linesVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 2.7 }}
          />

          {/* Монета появляется с задержкой */}
          <motion.img
            src={Coin}
            alt="Coin"
            style={{
              position: "absolute",
              top: "100px",
              transform: "translate(-50%, -50%)",
            }}
            variants={coinVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 3.2 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Referrals;

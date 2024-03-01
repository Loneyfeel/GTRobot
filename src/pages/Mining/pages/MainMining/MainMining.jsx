import React, { startTransition, useEffect, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  getMiningUserData,
  startMining,
} from "../../components/Requests/Requests.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { motion, useAnimation } from "framer-motion";
import Timer from "./components/Timer";
import StartButton from "./components/StartButton";
import Balance from "./components/Balance";
import UserLevels from "./components/UserLevels/index.js";

import animationCloud from "../../assets/referral.json";
import animationBtc from "../../assets/referral.json";

import "../../assets/fonts/benzin-bold.ttf";
import ult_background from "../../assets/UserLevels/ult/ultra_background.png";
import Free_img from "../../assets/UserLevels/Free_img.png";
import standard from "../../assets/UserLevels/standard.png";
import pro_button from "../../assets/UserLevels/pro/pro_button.png";
import pro_title from "../../assets/UserLevels/pro/pro_title.png";
import ult_button from "../../assets/UserLevels/ult/ultra_button.png";
import ult_title from "../../assets/UserLevels/ult/ultra_title.png";
import CloseIcon from "@mui/icons-material/Close.js";
import pro_background from "../../assets/UserLevels/pro/pro_background.png";
import i18n from "i18next";
import laptop from "../../assets/UserLevels/laptop.mp4";
import laptop_uz from "../../assets/UserLevels/laptop_uz.mp4";
import phone from "../../assets/UserLevels/phone.mp4";
import phone_uz from "../../assets/UserLevels/phone_uz.mp4";
import two_phone_title from "../../assets/UserLevels/two_phone_title.png";
import two_phone from "../../assets/UserLevels/two_phone.png";
import two_phone_uz from "../../assets/UserLevels/two_phone_uz.png";
import { tg, initData } from "../../../../shared/telegram/telegram.js";
import axios from "axios";
import { host } from "../../../../shared/host/host.js";

const getRandomHashrate = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz01234567890123456789";
  const randomText = Array.from(
    { length: 12 },
    () => characters[Math.floor(Math.random() * characters.length)],
  );
  return `${randomText.join("")}`;
};

const RandomTextComponent = () => {
  const [randomText, setRandomText] = useState(getRandomHashrate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomText(getRandomHashrate());
    }, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography
      sx={{
        marginBlock: "12px",
        textAlign: "center",
        fontSize: "12px",
        color: "var(--tg-theme-hint-color)",
      }}
    >
      {randomText}
    </Typography>
  );
};

const CountdownTimer = ({ fetchDataAndUpdateLocalStorage }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const nowInTashkent = DateTime.local().setZone("Asia/Tashkent");
    const targetTime = setTargetTime(23, 59, 59, 0, "Asia/Tashkent");

    const timeDiff = targetTime
      .diff(nowInTashkent, ["hours", "minutes", "seconds"])
      .toObject();

    const hours = Math.max(0, Math.floor(timeDiff.hours));
    const minutes = Math.max(0, Math.floor(timeDiff.minutes));
    const seconds = Math.max(0, Math.floor(timeDiff.seconds));

    // Вызываем вашу функцию при достижении нуля
    if (hours === 0 && minutes === 0 && seconds === 0) {
      fetchDataAndUpdateLocalStorage();
    }

    return { hours, minutes, seconds };
  }

  function setTargetTime(hours, minutes, seconds, milliseconds, timeZone) {
    const targetTime = DateTime.local().setZone(timeZone).set({
      hour: hours,
      minute: minutes,
      second: seconds,
      millisecond: milliseconds,
    });

    return targetTime;
  }

  return (
    <Typography>
      {`${String(timeRemaining.hours).padStart(2, "0")}:${String(timeRemaining.minutes).padStart(2, "0")}:${String(timeRemaining.seconds).padStart(2, "0")}`}
    </Typography>
  );
};

const MainMining = ({ setValue, setActiveMenuSection }) => {
  const { t } = useTranslation();

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showBalanceChange, setShowBalanceChange] = useState(false);
  const [randomIncrement, setRandomIncrement] = useState(0);
  const [isMiningActive, setIsMiningActive] = useState(false);
  const [endUserMiningTimestamp, setEndUserMiningTimestamp] = useState(null);
  const [startUserMiningTimestamp, setStartUserMiningTimestamp] =
    useState(null);
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [hasUpdatedMiningData, setHasUpdatedMiningData] = useState(false);
  const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState("standard");

  const fetchDataAndUpdateLocalStorage = async () => {
    try {
      const response = await getMiningUserData();
      const userDataResponse = response.data;
      localStorage.setItem("miningUserData", JSON.stringify(userDataResponse));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateMiningData = (data) => {
    const storedData = data
      ? data.data
      : JSON.parse(localStorage.getItem("miningUserData")) || {};
    // setIsMiningActive(storedData.mining.isMiningActive || false);
    // setEndUserMiningTimestamp(storedData.mining.endUserMiningTimestamp || null);
    // setStartUserMiningTimestamp(storedData.mining.startUserMiningTimestamp || null);
    // setShowBalanceChange(storedData.mining.endUserMiningTimestamp !== null);
    // setCryptoCurrency(storedData.cryptoCurrency || 'btc');
    // setLevel(storedData.userSubscription || 'standard')
    // if (storedData.mining.endUserMiningTimestamp !== null) {
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     const remainingTime = storedData.mining.endUserMiningTimestamp - currentTime;
    //     setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
    // }
  };

  const onClickStartButton = async () => {
    if (isMiningActive) {
      setIsLoading(true);
      let currentProgress = 0;

      const intervalId = setInterval(async () => {
        currentProgress += 20;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(intervalId);
          currentProgress = 0;
          setTimeout(() => {
            setIsLoading(false);
          }, 100);

          // Выполняйте вашу логику для начала майнинга (startMining) здесь
          await startMining("regular");

          // Загружайте новые данные для таймера
          const newData = await getMiningUserData();
          updateMiningData(newData);
          localStorage.setItem("miningUserData", JSON.stringify(newData.data));
        }
      }, 1000);
    } else {
      window.Telegram.WebApp.showAlert(
        `${t("mining.pages.mainMining.alert_1")}\n\n${t("mining.pages.mainMining.alert_2")}`,
      );
    }
  };

  useEffect(() => {

      setProgress(0);
      // setLevel(JSON.parse(localStorage.getItem('miningUserData')).userSubscription || 'standard')


      const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
      const registrationDate = storedData.registrationDate || 0;

      // Рассчитываем разницу в днях
      const currentDate = new Date();
      const registrationDateObject = new Date(registrationDate * 1000); // Преобразуем timestamp в объект Date
      const timeDifference = currentDate - registrationDateObject;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setDaysUntilWithdrawal(20 - daysDifference);


      const intervalId = setInterval(() => {
          setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      // Функция возвращается из useEffect и будет вызвана при размонтировании компонента
      return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!hasUpdatedMiningData) {
      updateMiningData();
      setHasUpdatedMiningData(true);
    }
  }, [hasUpdatedMiningData]);

  const handleWithdrawal = () => {
    if (daysUntilWithdrawal >= 0) {
      setSnackbarOpen(true);
    } else {
      startTransition(() => {
        setActiveMenuSection("withdraw");
        navigate("/menu");
        setValue(3);
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();

  const [userLevelsVisible, setUserLevelsVisible] = useState(false);
  const [userLevelsInfoVisible, setUserLevelsInfoVisible] = useState(false);

  const controls = useAnimation();
  const handleButtonLevelClick = () => {
    setUserLevelsVisible(true);
  };

  useEffect(() => {
    let isMounted = true;

    const animateWithDelay = async () => {
      if (isMounted) {
        await controls.start({
          y: [0, -8, 0, 0, -8, 0, 0, -8, 0],
          transition: {
            repeat: 0,
            duration: 1.5,
            delay: 1,
            ease: "easeOut",
          },
        });
        setTimeout(animateWithDelay, 5000);
      }
    };

    animateWithDelay();

    // Устанавливаем флаг isMounted в false при размонтировании компонента
    return () => {
      isMounted = false;
    };
  }, [99999999]);

  const [isLevelButtonLoading, setILevelButtonsLoading] = useState(false);

  const handleButtonClick = async (subscription) => {
    try {
      // Отправка POST запроса на сервер
      const response = await axios.post(
        `${host}/api/get-subscription-payment`,
        { subscription, initData },
      );
      // Проверка наличия данных в ответе
      if (
        response.data &&
        response.data.data &&
        response.data.data.directPayLink
      ) {
        const directPayLink = response.data.data.directPayLink;

        // Открытие ссылки с помощью функции openTelegramLink
        openTelegramLink(directPayLink);
      } else {
        console.error("Ошибка получения directPayLink из ответа сервера");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    } finally {
      // Установка isLevelButtonLoading в false с задержкой
      setTimeout(() => {
        setILevelButtonsLoading(false);
      }, 2000);
    }
  };

  const openTelegramLink = (url) => {
    tg.openTelegramLink(url);
  };

  const VideoStory = ({ src, preloadResource }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: "#000",
            position: "relative",
          }}
        >
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
          <video
            controls={false}
            autoPlay
            muted
            playsInline
            preload={preloadResource ? "auto" : "metadata"}
            poster="https://cdn.indiawealth.in/public/images/transparent-background-mini.png"
            style={{
              height: "100vh",
              width: "100vw",
              visibility: isLoading ? "hidden" : "visible", // Hide video until loaded
            }}
            onLoadedData={() => setIsLoading(false)}
          >
            <source src={src} type="video/mp4" />
          </video>
        </Box>
      </motion.div>
    );
  };

  const storyDataLevel = useMemo(
    () => [
      {
        preloadResource: true,
        duration: 10000,
        content: (props) => {
          const [isLoading, setIsLoading] = React.useState(true);
          if (level == "standard") {
            return (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <Box
                    sx={{
                      width: "100vw",
                      height: "100vh",
                      bgcolor: "#000",
                    }}
                  >
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
                        position: "relative",
                        backgroundImage: `url(${ult_background})`,
                        backgroundSize: "100% 100%",
                        height: "100vh",
                        padding: "20px",
                        opacity: isLoading ? 0 : 1, // Скрыть скелет после загрузки
                      }}
                      onLoad={() => setIsLoading(false)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "40px",
                        }}
                      >
                        <Box
                          component="img"
                          src={Free_img}
                          alt={"button"}
                          sx={{
                            width: "200px",
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "50px",
                          }}
                        />
                        <Box
                          component={"img"}
                          src={standard}
                          sx={{
                            width: "350px",
                            zIndex: "1",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "120px",
                            height: "2px",
                            width: "94vw",
                            bgcolor: "#fff",
                            borderRadius: "50px",
                            zIndex: "1",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height:
                              window.innerHeight < 600 ? "250px" : "300px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                              marginTop: "60px",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.standart.dailyUse",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.standart.tasks",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.standart.speed",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.standart.time",
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </>
            );
          }
          if (level === "pro") {
            return (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <Box
                    sx={{
                      width: "100vw",
                      height: "100vh",
                      bgcolor: "#000",
                    }}
                  >
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
                        position: "relative",
                        backgroundImage: `url(${ult_background})`,
                        backgroundSize: "100% 100%",
                        height: "100vh",
                        padding: "20px",
                        opacity: isLoading ? 0 : 1, // Скрыть скелет после загрузки
                      }}
                      onLoad={() => setIsLoading(false)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "40px",
                        }}
                      >
                        <Box
                          component="img"
                          src={pro_button}
                          alt={"button"}
                          sx={{
                            width: "200px",
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "50px",
                          }}
                        />
                        <Box
                          component={"img"}
                          src={pro_title}
                          sx={{
                            width: "150px",
                            zIndex: "1",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "120px",
                            height: "2px",
                            width: "94vw",
                            bgcolor: "#fff",
                            borderRadius: "50px",
                            zIndex: "1",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height:
                              window.innerHeight < 600 ? "250px" : "300px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                              marginTop: "60px",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.pro.dailyUse",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t("mining.pages.mainMining.userLevels.pro.tasks")}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t("mining.pages.mainMining.userLevels.pro.speed")}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t("mining.pages.mainMining.userLevels.pro.limit")}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            · {t("mining.pages.mainMining.userLevels.pro.time")}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </>
            );
          }
          if (level === "ultra") {
            return (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <Box
                    sx={{
                      width: "100vw",
                      height: "100vh",
                      bgcolor: "#000",
                    }}
                  >
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
                        position: "relative",
                        backgroundImage: `url(${ult_background})`,
                        backgroundSize: "100% 100%",
                        height: "100vh",
                        padding: "20px",
                        opacity: isLoading ? 0 : 1, // Скрыть скелет после загрузки
                      }}
                      onLoad={() => setIsLoading(false)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginTop: "40px",
                        }}
                      >
                        <Box
                          component="img"
                          src={ult_button}
                          alt={"button"}
                          sx={{
                            width: "200px",
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "50px",
                          }}
                        />
                        <Box
                          component={"img"}
                          src={ult_title}
                          sx={{
                            width: "250px",
                            zIndex: "1",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "120px",
                            height: "2px",
                            width: "94vw",
                            bgcolor: "#fff",
                            borderRadius: "50px",
                            zIndex: "1",
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height:
                              window.innerHeight < 600 ? "300px" : "350px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                              marginTop: "60px",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.ultra.dailyUse",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.ultra.tasks",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.ultra.speed",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.ultra.limit",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t("mining.pages.mainMining.userLevels.ultra.time")}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.ultra.withdraw",
                            )}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "700",
                              fontSize: "18px",
                              fontFamily: "Montserrat, san-serif",
                            }}
                          >
                            ·{" "}
                            {t(
                              "mining.pages.mainMining.userLevels.ultra.notification",
                            )}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </>
            );
          }
        },
      },
      {
        preloadResource: true,
        duration: 0,
        content: () => {
          const [selectedBox, setSelectedBox] = useState("left");

          const handleBoxClick = (box) => {
            setSelectedBox(box);
          };

          const [isLoading, setIsLoading] = useState(true);

          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <Box
                  sx={{
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "#000",
                  }}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => setUserLevelsVisible(false)}
                    sx={{
                      position: "absolute",
                      top: "15px",
                      right: "10px",
                      zIndex: "1",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
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
                      display: "flex",
                      marginTop: "50px",
                      padding: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "120px",
                        height: "2px",
                        width: "94vw",
                        bgcolor: "#fff",
                        borderRadius: "50px",
                        zIndex: "1",
                      }}
                    />
                    <Box
                      onClick={() => handleBoxClick("left")}
                      sx={{
                        width: selectedBox === "left" ? "100%" : 100,
                        height: 80,
                        cursor: "pointer",
                        transition: "width 500ms",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        onClick={() => handleBoxClick("left")}
                        component={"img"}
                        src={pro_title}
                        sx={{
                          width: selectedBox === "left" ? "200px" : "80px",
                          transition: "all 500ms",
                          zIndex: "1",
                        }}
                        onLoad={() => setIsLoading(false)}
                      />
                    </Box>
                    {
                      <motion.div
                        initial={{ opacity: 0, y: "50%" }}
                        animate={{
                          opacity: 1,
                          y: "0%",
                          left: selectedBox === "left" ? 0 : "-100%",
                        }}
                        exit={{ opacity: 1, y: "50%" }}
                        transition={{ duration: 0.4 }}
                        style={{
                          position: "absolute",
                          top: 130,
                          transform:
                            selectedBox === "right"
                              ? "translateX(50%)"
                              : "none",
                        }}
                      >
                        <Box
                          sx={{
                            width: "200vw",
                            height: "30px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              alignContent: "space-between",
                              width: "100vw",
                              height: "75vh",
                            }}
                          >
                            <Box
                              sx={{
                                paddingInline: "20px",
                                width: "380px",
                              }}
                            >
                              <Box
                                component={"img"}
                                src={pro_background}
                                alt={"background"}
                                sx={{
                                  position: "absolute",
                                  top: "-130px",
                                  left: "0",
                                  width: "100vw",
                                  height: "100vh",
                                  zIndex: "-1",
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  height:
                                    window.innerHeight < 600
                                      ? "250px"
                                      : "300px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat, san-serif",
                                    marginTop: "30px",
                                  }}
                                >
                                  ·{" "}
                                  {t(
                                    "mining.pages.mainMining.userLevels.pro.dailyUse",
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat, san-serif",
                                  }}
                                >
                                  ·{" "}
                                  {t(
                                    "mining.pages.mainMining.userLevels.pro.tasks",
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat, san-serif",
                                  }}
                                >
                                  ·{" "}
                                  {t(
                                    "mining.pages.mainMining.userLevels.pro.speed",
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat, san-serif",
                                  }}
                                >
                                  ·{" "}
                                  {t(
                                    "mining.pages.mainMining.userLevels.pro.limit",
                                  )}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: "700",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat, san-serif",
                                  }}
                                >
                                  ·{" "}
                                  {t(
                                    "mining.pages.mainMining.userLevels.pro.time",
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: "auto",
                              }}
                            >
                              <Box
                                component="img"
                                src={pro_button}
                                alt={"button"}
                                sx={{
                                  width: "200px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (!isLevelButtonLoading) {
                                    handleButtonClick("pro");
                                  }
                                  setILevelButtonsLoading(true);
                                }}
                              />
                              <Typography
                                sx={{
                                  fontWeight: "500",
                                  fontSize: "18px",
                                  fontFamily: "Montserrat, san-serif",
                                }}
                              >
                                {t(
                                  "mining.pages.mainMining.userLevels.btnText",
                                )}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100vw",
                                height: "75vh",
                              }}
                            >
                              <Box
                                sx={{
                                  paddingInline: "20px",
                                  width: "380px",
                                }}
                              >
                                <Box
                                  component={"img"}
                                  src={ult_background}
                                  alt={"background"}
                                  sx={{
                                    position: "absolute",
                                    top: "-130px",
                                    left: "100vw",
                                    width: "100vw",
                                    height: "100vh",
                                    zIndex: "-1",
                                  }}
                                />
                                <Box
                                  sx={{
                                    paddingInline: "10px",
                                    width: "380px",
                                    marginTop: "30px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      height:
                                        window.innerHeight < 590
                                          ? "270px"
                                          : "53vh",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.dailyUse",
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.tasks",
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.speed",
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.limit",
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.time",
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.withdraw",
                                      )}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontWeight: "700",
                                        fontSize: "18px",
                                        fontFamily: "Montserrat, san-serif",
                                      }}
                                    >
                                      ·{" "}
                                      {t(
                                        "mining.pages.mainMining.userLevels.ultra.notification",
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={ult_button}
                                  alt={"button"}
                                  sx={{
                                    width: "200px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    if (!isLevelButtonLoading) {
                                      handleButtonClick("ultra");
                                    }
                                    setILevelButtonsLoading(true);
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontWeight: "500",
                                    fontSize: "18px",
                                    fontFamily: "Montserrat, san-serif",
                                  }}
                                >
                                  {t(
                                    "mining.pages.mainMining.userLevels.btnText",
                                  )}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    }
                    <Box
                      onClick={() => handleBoxClick("right")}
                      sx={{
                        width: selectedBox === "right" ? "100%" : 100,
                        height: 80,
                        marginLeft: "3px",
                        marginRight: "10px",
                        cursor: "pointer",
                        transition: "width 0.4s",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "15px",
                      }}
                    >
                      <Box
                        onClick={() => handleBoxClick("right")}
                        component={"img"}
                        src={ult_title}
                        sx={{
                          width: selectedBox === "right" ? "230px" : "80px",
                          transition: "all 500ms",
                          zIndex: "1",
                        }}
                        onLoad={() => setIsLoading(false)}
                      />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </>
          );
        },
      },
    ],
    [],
  );
  const storyDataInfo = useMemo(
    () => [
      {
        duration: 15000,
        preloadResource: true,
        content: (props) => (
          <VideoStory
            src={i18n.language == "ru" ? laptop : laptop_uz}
            duration={15000}
            preloadResource={true}
          />
        ),
      },
      {
        duration: 15000,
        preloadResource: true,
        content: (props) => (
          <>
            <VideoStory
              src={i18n.language == "ru" ? phone : phone_uz}
              duration={15000}
              preloadResource={true}
            />
          </>
        ),
      },
      {
        preloadResource: true,
        duration: 10000,
        content: (props) => {
          const [isLoading, setIsLoading] = React.useState(true);

          return (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <Box
                  sx={{
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "#000",
                  }}
                >
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
                      position: "relative",
                      backgroundImage: `url(${ult_background})`,
                      backgroundSize: "100% 100%",
                      height: "100vh",
                      paddingTop: "25px",
                      opacity: isLoading ? 0 : 1, // Скрыть скелет после загрузки
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component={"img"}
                      src={two_phone_title}
                      sx={{
                        height: "18svh",
                        marginX: "auto",
                        display: "block",
                      }}
                    />
                    <Box
                      component={"img"}
                      src={i18n.language === "ru" ? two_phone : two_phone_uz}
                      sx={{
                        position: "fixed",
                        bottom: "0",
                        height: "82svh",
                        maxWidth: "400px",
                        marginX: "auto",
                        display: "block",
                      }}
                      onLoad={() => setIsLoading(false)}
                    />
                  </Box>
                </Box>
                <IconButton
                  color="inherit"
                  onClick={() => setUserLevelsInfoVisible(false)}
                  sx={{
                    position: "absolute",
                    top: "15px",
                    right: "10px",
                    color: "#fff",
                    zIndex: "1",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </motion.div>
            </>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "var(--tg-theme-bg-color)",
          color: "var(--tg-theme-text-color)",
            minHeight: '75vh',
        }}
      >
        {!isMiningActive && !endUserMiningTimestamp && (
          <Box
            sx={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>
              {t("mining.pages.mainMining.deactiveTimer")}:
            </Typography>
            <CountdownTimer
              fetchDataAndUpdateLocalStorage={fetchDataAndUpdateLocalStorage}
            />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/*<IconButton*/}
          {/*    onClick={() => {*/}
          {/*        setUserLevelsInfoVisible(true)*/}
          {/*    }}*/}
          {/*    sx={{*/}
          {/*        position: 'absolute',*/}
          {/*        top: '45px',*/}
          {/*        left: '115px',*/}
          {/*        color: 'var(--tg-theme-text-color)'*/}
          {/*    }}*/}
          {/*>*/}
          {/*    <InfoOutlinedIcon*/}
          {/*        sx={{*/}
          {/*            width: '27px',*/}
          {/*            height: '27px',*/}
          {/*        }}*/}
          {/*    />*/}
          {/*</IconButton>*/}
          {/*Button*/}
          {/*    variant='contained'*/}
          {/*    sx={{*/}
          {/*        position: 'absolute',*/}
          {/*        top: '54px',*/}
          {/*        left: '0',*/}
          {/*        color: 'var(--tg-theme-button-text-color)',*/}
          {/*        backgroundColor: level === 'standard' ? '#b87333' : level === 'pro' ? '#B9B9B9' : level === 'ultra' ? '#E1C00E' : 'inherit',*/}
          {/*        borderRadius: '0 30px 30px 0',*/}
          {/*        width: '120px',*/}
          {/*        height: '25px'*/}
          {/*    }}*/}
          {/*    onClick={handleButtonLevelClick}*/}
          {/*>*/}
          {/*    {level}*/}
          {/*</Button>*/}
          {/*{level == 'standard' && (*/}
          {/*    <motion.div*/}
          {/*        animate={controls}*/}
          {/*        style={{*/}
          {/*            position: 'absolute',*/}
          {/*            top: '85px',*/}
          {/*            left: '10px',*/}
          {/*            fontSize: '12px',*/}
          {/*            color: 'var(--tg-theme-hint-color)',*/}
          {/*        }}*/}
          {/*    >*/}
          {/*        {t('mining.pages.mainMining.userLevels.upLevel')}*/}
          {/*    </motion.div>*/}
          {/*)}*/}
          {/*{(userLevelsVisible || userLevelsInfoVisible) && (*/}
          {/*    <Box*/}
          {/*    sx={{*/}
          {/*        position: 'fixed',*/}
          {/*        top: '0',*/}
          {/*        left: '0',*/}
          {/*        zIndex: '3000',*/}
          {/*    }}>*/}
          {/*        <UserLevels*/}
          {/*        storyData={userLevelsVisible ? storyDataLevel : storyDataInfo}*/}
          {/*        />;*/}
          {/*    </Box>*/}
          {/*)}*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "44px",
                cursor: "default",
              }}
            >
              {endUserMiningTimestamp !== null && <RandomTextComponent />}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoading && (
                <Box
                  sx={{
                    position: "relative",
                    height: "125px",
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={100}
                    sx={{}}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                    }}
                  >
                    {progress}%
                  </Typography>
                </Box>
              )}
              {!isLoading && !endUserMiningTimestamp && (
                <StartButton
                  onClick={onClickStartButton}
                  text={t("mining.pages.mainMining.start_btn")}
                />
              )}
              {/*{!isLoading && endUserMiningTimestamp !== null && (*/}
              {true && (
                <Timer
                  timeRemaining={timeRemaining}
                  animation1={animationCloud}
                  animation2={animationBtc}
                />
              )}
            </Box>
            <Balance
              showBalanceChange={showBalanceChange}
              randomIncrement={randomIncrement}
              setRandomIncrement={setRandomIncrement}
              endUserMiningTimestamp={endUserMiningTimestamp}
              startUserMiningTimestamp={startUserMiningTimestamp}
              t={t}
            />
          </Box>
        </Box>
        <Button
          onClick={handleWithdrawal}
          variant="contained"
          sx={{
            marginTop: "20px",
            width: "max-content",
            borderRadius: "7px",
          }}
        >
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: "14px",
              color: "var(--tg-theme-button-text-color)",
            }}
          >
            {t("mining.pages.menu.withdraw.main_btn")}
          </Typography>
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={`${t("mining.pages.mainMining.days_snackbar_1")} ${daysUntilWithdrawal} ${t("mining.pages.mainMining.days_snackbar_2")}`}
      />
    </>
  );
};

export default MainMining;

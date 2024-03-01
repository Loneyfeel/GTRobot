import React, { useState, useEffect, startTransition, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import animationRobot1 from "../../assets/robot-mining-bitcoin.json";
import animationRobot2 from "../../assets/robot-mining-bitcoin_2.json";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import InfoIcon from "@mui/icons-material/Info";
import {
  startMining,
  getMiningUserData,
} from "../../components/Requests/Requests.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SecHelps from "./SecHelps";
import Timer from "../MainMining/components/Timer/index.js";
import { tg, initData } from "../../../../shared/telegram/telegram.js";
import axios from "axios";
import { host } from "../../../../shared/host/host.js";
import { motion } from "framer-motion";

import Lottie from "lottie-react";
import on from "../../assets/SecMining/on.png";
import onImg from "../../assets/SecMining/onImg.png";
import off from "../../assets/SecMining/off.json";

const fetchDataAndUpdateLocalStorage = async () => {
  try {
    const response = await getMiningUserData();
    const userDataResponse = response.data;
    localStorage.setItem("miningUserData", JSON.stringify(userDataResponse));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const StartButton = ({ onClick, isDisabled, text }) => {
  const [disabledTest, setDisabledTest] = useState(false);
  return (
    <>
      {/*{!isDisabled ? (*/}
      {/*{isDisabled ? (*/}
      {/*    <>*/}
      {/*        <Lottie*/}
      {/*            animationData={on}*/}
      {/*            style={{*/}
      {/*                width: '180px',*/}
      {/*            }}*/}
      {/*        />*/}
      {/*    </>*/}
      {/*) : (*/}
      <Button
        variant="contained"
        onClick={onClick}
        disabled={isDisabled}
        sx={{
          flexDirection: "column",
          paddingTop: "12px",
          width: "125px",
          height: "125px",
          borderRadius: "100px",
          color: "var(--tg-theme-button-text-color)",
          "&.Mui-disabled": {
            bgcolor: "#444",
          },
        }}
      >
        <TouchAppIcon
          sx={{
            position: "absolute",
            top: "30px",
            width: "40px",
            height: "40px",
          }}
        />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "600",
            marginTop: "40px",
          }}
        >
          {text}
        </Typography>
      </Button>
      {/*)}*/}
      {/*{disabledTest ? (*/}
      {/*    <>*/}
      {/*        <motion.div*/}
      {/*            onClick={() => {*/}
      {/*                setDisabledTest(!disabledTest);*/}
      {/*            }}*/}
      {/*            initial={{ opacity: 0 }}*/}
      {/*            animate={{ opacity: 1 }}*/}
      {/*            transition={{ duration: 1 }} // Укажи желаемую длительность анимации*/}
      {/*            style={{*/}
      {/*                width: '180px',*/}
      {/*                height: '180px',*/}
      {/*                cursor: 'pointer',*/}
      {/*                display: 'flex',*/}
      {/*                justifyContent: 'center',*/}
      {/*                alignItems: 'center'*/}
      {/*            }}*/}
      {/*        >*/}
      {/*            <motion.img*/}
      {/*                src={on}*/}
      {/*                style={{*/}
      {/*                    width: '150px',*/}
      {/*                    height: '150px',*/}
      {/*                }}*/}
      {/*            />*/}
      {/*        </motion.div>*/}
      {/*    </>*/}
      {/*) : (*/}
      {/*    <>*/}
      {/*        <Box*/}
      {/*            onClick={() => {*/}
      {/*                setDisabledTest(!disabledTest)*/}
      {/*            }}*/}
      {/*            sx={{*/}
      {/*                width: '180px',*/}
      {/*                height: '180px',*/}
      {/*                cursor: 'pointer',*/}
      {/*                display: 'flex',*/}
      {/*                justifyContent: 'center',*/}
      {/*                alignItems: 'center'*/}
      {/*            }}*/}
      {/*        >*/}
      {/*            <Lottie*/}
      {/*                loop={false}*/}
      {/*                animationData={off}*/}
      {/*                style={{*/}
      {/*                    width: '190px',*/}
      {/*                }}*/}
      {/*            />*/}
      {/*        </Box>*/}
      {/*    </>*/}
      {/*)}*/}
    </>
  );
};

const Balance = ({
  showBalanceChange,
  randomIncrement,
  setRandomIncrement,
  endUserMiningTimestamp,
}) => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [balance, setBalance] = useState(0);
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [isCryptoDataLoaded, setIsCryptoDataLoaded] = useState(false);
  const [referralBonus, setReferralBonus] = useState(0);

  const maxTotalLength = 12;
  const startTimerRef = useRef(new Date().getTime());
  const endTimerRef = endUserMiningTimestamp * 1000;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (endTimerRef !== 0 && endTimerRef !== null) {
      if (
        JSON.parse(localStorage.getItem("miningUserData")).userSubscription !==
        "ultra"
      ) {
        setValue(10 - ((endTimerRef - startTimerRef.current) / 1000) * 0.00011);
      } else {
        setValue(30 - ((endTimerRef - startTimerRef.current) / 1000) * 0.00033);
      }
    }
  }, [endTimerRef]); // Зависимость добавлена для пересчета значения при изменении endTimerRef

  // Функция для обновления счетчика
  const updateCounter = () => {
    // Увеличиваем значение
    if (
      JSON.parse(localStorage.getItem("miningUserData")).userSubscription !==
      "ultra"
    ) {
      setValue((prevValue) => prevValue + 0.00011);
    } else {
      setValue((prevValue) => prevValue + 0.00033);
    }
    // Увеличиваем start_timer
    startTimerRef.current += 1;
  };
  // Вызываем функцию updateCounter каждую секунду
  useEffect(() => {
    const intervalId = setInterval(updateCounter, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []); // Пустой массив зависимостей, чтобы useEffect выполнился только при монтировании

  useEffect(() => {
    // Загружаем данные из local.storage при монтировании компонента
    const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
    setBalance(storedData.dailyMiningBalance || 0);
    setReferralBonus(storedData.referralBonus || 0);
    setCryptoCurrency(storedData.cryptoCurrency || "btc");

    // Запрашиваем цены криптовалют при монтировании компонента
    const fetchCryptoPrices = async () => {
      try {
        const prices = JSON.parse(localStorage.getItem("prices")) || {};
        setCryptoPrices(prices);

        setIsCryptoDataLoaded(true);
      } catch (error) {
        console.error("Ошибка при получении цен криптовалют:", error);
      }
    };

    fetchCryptoPrices();
  }, []);

  function roundToDecimal(number, decimalPlaces) {
    if (Math.floor(number) == 0) {
      return (number % 1).toFixed(decimalPlaces);
    } else {
      return (number % 1).toFixed(decimalPlaces).replace(/^0/, "");
    }
  }

  // Отображение баланса после получения цен криптовалют
  const getDisplayedBalance = () => {
    if (cryptoPrices[cryptoCurrency]) {
      const displayedBalance = balance;
      let newDisplayedBalance = Math.floor(displayedBalance).toString();
      if (newDisplayedBalance.length < maxTotalLength - 1) {
        newDisplayedBalance += roundToDecimal(
          displayedBalance,
          maxTotalLength - newDisplayedBalance.length - 1,
        );
        newDisplayedBalance = newDisplayedBalance.toString().replace(/^0/, "");
        return newDisplayedBalance;
      }
    }
  };

  const getTimerDisplayedBalance = () => {
    if (cryptoPrices[cryptoCurrency]) {
      const displayedBalance = balance + value;
      let newDisplayedBalance = Math.floor(displayedBalance).toString();
      if (newDisplayedBalance.length < maxTotalLength - 1) {
        newDisplayedBalance += roundToDecimal(
          displayedBalance,
          maxTotalLength - newDisplayedBalance.length - 1,
        );
        newDisplayedBalance = newDisplayedBalance.toString().replace(/^0/, "");
        return newDisplayedBalance;
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomIncrement(0.00001 + Math.random() * (0.000001 - 0.000008));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!isCryptoDataLoaded) {
    // Пока данные о ценах криптовалют загружаются, можно показывать начальный баланс
    return <Typography>- - - - - - - - - -</Typography>;
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "60px",
      }}
    >
      <Typography
        sx={{
          cursor: "default",
        }}
      >
        {endUserMiningTimestamp !== null
          ? getTimerDisplayedBalance()
          : getDisplayedBalance()}{" "}
        $
      </Typography>
      {showBalanceChange && (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(45, 176, 25, 0.8)",
            }}
          >
            {`+${randomIncrement.toFixed(7)}$`}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(45, 176, 25, 0.8)",
              marginLeft: "10px",
            }}
          >
            Boost +{referralBonus}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const getRandomHashrate = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz01234567890123456789";
  const randomText = Array.from(
    { length: 40 },
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

const SecMining = ({ setValue, setActiveMenuSection }) => {
  const { t } = useTranslation();

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showBalanceChange, setShowBalanceChange] = useState(false);
  const [randomIncrement, setRandomIncrement] = useState(0);
  const [isMiningActive, setIsMiningActive] = useState(false);
  const [endUserMiningTimestamp, setEndUserMiningTimestamp] = useState(null);
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [hasUpdatedMiningData, setHasUpdatedMiningData] = useState(false);
  const [daysUntilWithdrawal, setDaysUntilWithdrawal] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDailyMiningActivated, setIsDailyMiningActivated] = useState(true);

  const [promocode, setPromocode] = useState();

  const updateMiningData = (data) => {
    // const storedData = data ? data.data : JSON.parse(localStorage.getItem('miningUserData')) || {};
    // setIsMiningActive(storedData.mining.isDailyMiningActive || false);
    // setEndUserMiningTimestamp(storedData.mining.endUserDailyMiningTimestamp || null);
    // setShowBalanceChange(storedData.mining.endUserDailyMiningTimestamp !== null);
    // setCryptoCurrency(storedData.cryptoCurrency || 'btc');
    //
    // if (storedData.mining.endUserDailyMiningTimestamp !== null) {
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     const remainingTime = storedData.mining.endUserDailyMiningTimestamp - currentTime;
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
          setIsLoading(false);

          // Выполняйте вашу логику для начала майнинга (startMining) здесь
          await startMining("daily");

          // Загружайте новые данные для таймера
          const newData = await getMiningUserData();
          updateMiningData(newData);
          localStorage.setItem("miningUserData", JSON.stringify(newData.data));
        }
      }, 1000);
    } else {
      window.Telegram.WebApp.showAlert(
        `${t("mining.pages.secMining.text_alert_1")} <a href="https://t.me/Granduzb">@GrandUzb</a> ${t("mining.pages.secMining.text_alert_2")}`,
      );
    }
  };

  // useEffect для сброса прогресса после монтирования компонента
  useEffect(() => {
    setProgress(0);
    setIsDailyMiningActivated(
      JSON.parse(localStorage.getItem("isDailyMiningActivated")),
    );
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
    const registrationDate = storedData.registrationDate || 0;

    // Рассчитываем разницу в днях
    const currentDate = new Date();
    const registrationDateObject = new Date(registrationDate * 1000); // Преобразуем timestamp в объект Date
    const timeDifference = currentDate - registrationDateObject;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setDaysUntilWithdrawal(20 - daysDifference);

    const promoCodeLocal = localStorage.getItem("promoCode");
    // Устанавливаем promocode сразу
    setPromocode(promoCodeLocal || null);
  }, []);

  const openTelegramLink = (url) => {
    tg.openTelegramLink(url);
  };

  const handleInviteClick = async (promocode) => {
    startTransition(() => {
      const textField = document.createElement("textarea");
      textField.innerText = promocode;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    });
  };

  const handleGetPromocode = async () => {
    tg.showAlert(
      `${t("mining.pages.secMining.promoCode.alert_1")}`,
      async () => {
        try {
          // Отправляем запрос на получение промокода
          const response = await axios.post(
            `${host}/api/get-daily-promo-code`,
            { initData },
          );

          // Проверяем наличие данных и promoCode в ответе
          if (
            response.data &&
            response.data.data &&
            response.data.data.promoCode
          ) {
            const promoCode = response.data.data.promoCode;

            // Обновляем состояние промокода
            setPromocode(promoCode);
            // Сохраняем promoCode в localStorage
            localStorage.setItem("promoCode", promoCode);

            fetchDataAndUpdateLocalStorage();
          } else if (response.data && response.data.errorCode) {
            // Обрабатываем ошибки
            const errorCode = response.data.errorCode;

            if (errorCode === 2020) {
              console.error(
                "Ошибка 2020: У пользователя не достаточный баланс для вывода",
              );
              tg.showAlert(`${t("mining.pages.secMining.promoCode.alert_2")}`);
            } else if (errorCode === 2021) {
              console.error(
                "Ошибка 2021: Ошибка отправки сообщения пользователю",
              );
            } else {
              console.error("Неизвестная ошибка:", errorCode);
            }
          } else {
            console.error("Ошибка получения промокода из ответа сервера");
          }
        } catch (error) {
          console.error("Ошибка при отправке запроса:", error);
        }
      },
    );
  };

  const handleUsePromocode = (promocode) => {
    window.Telegram.WebApp.showConfirm(
      `${t("mining.pages.secMining.promoCode.alert_3")}`,
      (confirm) => {
        if (confirm) {
          handleInviteClick(promocode);
          openTelegramLink("https://t.me/Granduzb");
        }
      },
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      {!isDailyMiningActivated && (
        <SecHelps setIsDailyMiningActivated={setIsDailyMiningActivated} />
      )}
      {isDailyMiningActivated && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "80vh",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "var(--tg-theme-bg-color)",
              color: "var(--tg-theme-text-color)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton
                onClick={() => {
                  startTransition(() => {
                    setActiveMenuSection("gtrobot-mining");
                    navigate("/menu");
                    setValue(3);
                  });
                }}
                sx={{
                  position: "absolute",
                  top: "44px",
                  right: "0",
                  color: "var(--tg-theme-hint-color)",
                }}
              >
                <InfoIcon />
              </IconButton>
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
                        sx={{
                          position: "absolute",
                          top: "0",
                          left: "37%",
                        }}
                      />
                      <Typography
                        sx={{
                          paddingBottom: "25px",
                        }}
                      >
                        {progress}%
                      </Typography>
                    </Box>
                  )}
                  {!isLoading && !endUserMiningTimestamp && (
                    <>
                      <StartButton
                        onClick={onClickStartButton}
                        isDisabled={!isMiningActive}
                        text={t("mining.pages.mainMining.start_btn")}
                      />
                    </>
                  )}
                  {!isLoading && endUserMiningTimestamp !== null && (
                    <Timer
                      timeRemaining={timeRemaining}
                      animation1={animationRobot1}
                      animation2={animationRobot2}
                    />
                  )}
                </Box>
                <Balance
                  showBalanceChange={showBalanceChange}
                  randomIncrement={randomIncrement}
                  setRandomIncrement={setRandomIncrement}
                  endUserMiningTimestamp={endUserMiningTimestamp}
                />
              </Box>
            </Box>
            {!isMiningActive && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {promocode && promocode !== "" ? (
                  <>
                    <Typography>
                      {t("mining.pages.secMining.promoCode.text")}: {promocode}
                    </Typography>
                    <Button
                      onClick={() => handleUsePromocode(promocode)}
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
                          color: "var(--tg-theme-text-color)",
                        }}
                      >
                        {t("mining.pages.secMining.promoCode.useButton")}
                      </Typography>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        handleGetPromocode();
                      }}
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
                        {t("mining.pages.secMining.promoCode.getButton")}
                      </Typography>
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default SecMining;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const Balance = ({
  showBalanceChange,
  randomIncrement,
  setRandomIncrement,
  endUserMiningTimestamp,
  startUserMiningTimestamp,
  t,
}) => {
  const [balance, setBalance] = useState(0);
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [referralBonus, setReferralBonus] = useState(0);

  const maxTotalLength = 12;
  const startTimerRef = useRef(Math.floor(Date.now() / 1000));
  const endTimerRef = startUserMiningTimestamp;
  const [value, setValue] = useState(0);

  const pricesData = JSON.parse(localStorage.getItem("prices")) || {};
  const pricePerCoin = pricesData[cryptoCurrency];

  const addBalance = 0.007;

  useEffect(() => {
    if (endTimerRef) {
      setValue(
        Math.abs(
          ((startTimerRef.current - endTimerRef) * addBalance) / pricePerCoin / (endUserMiningTimestamp - startUserMiningTimestamp),
        ),
      );
    }
  }, [endTimerRef]); // Зависимость добавлена для пересчета значения при изменении endTimerRef

  // Функция для обновления счетчика
  const updateCounter = useCallback(() => {
    setValue(
      (prevValue) =>
        prevValue +
        addBalance /
          pricePerCoin /
          (endUserMiningTimestamp - startUserMiningTimestamp),
    );
    // Увеличиваем start_timer
    startTimerRef.current += 1;
  }, [
    startUserMiningTimestamp,
    endUserMiningTimestamp,
    pricePerCoin,
    value,
    cryptoCurrency,
  ]);

  // Вызываем функцию updateCounter каждую секунду
  useEffect(() => {
    const intervalId = setInterval(updateCounter, 1000);
    return () => clearInterval(intervalId);
  }, [
    updateCounter,
    startUserMiningTimestamp,
    endUserMiningTimestamp,
    pricePerCoin,
    value,
  ]);

  useEffect(() => {
    // Загружаем данные из local.storage при монтировании компонента
    const storedData = JSON.parse(localStorage.getItem("miningUserData")) || {};
    setBalance(storedData.balance || 0);
    setReferralBonus(storedData.referralBonus || 0);
    setCryptoCurrency(storedData.cryptoCurrency || "btc");
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
  };

  const getTimerDisplayedBalance = () => {
    let displayedBalance = 0;
    if (value == Infinity) {
      displayedBalance = balance + 0;
    } else {
      displayedBalance = balance + value;
    }
    // const displayedBalance = (balance + value);
    console.log(value);
    let newDisplayedBalance = Math.floor(displayedBalance).toString();
    if (newDisplayedBalance.length < maxTotalLength - 1) {
      newDisplayedBalance += roundToDecimal(
        displayedBalance,
        maxTotalLength - newDisplayedBalance.length - 1,
      );
      newDisplayedBalance = newDisplayedBalance.toString().replace(/^0/, "");
      return newDisplayedBalance;
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

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70px",
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
        {cryptoCurrency.toUpperCase()}
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
      <Typography
        sx={{
          fontSize: "11px",
          marginTop: "10px",
        }}
      >
        {t("mining.pages.mainMining.future_balance_1")}:{" "}
        {startUserMiningTimestamp !== null
          ? (
              100 *
              pricePerCoin *
              parseFloat(getTimerDisplayedBalance())
            ).toFixed(2)
          : (100 * pricePerCoin * parseFloat(getDisplayedBalance())).toFixed(2)}
        ${t("mining.pages.mainMining.future_balance_2")}
      </Typography>
    </Box>
  );
};

export default Balance;

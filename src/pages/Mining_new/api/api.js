import axios from "axios";
import { initData, userId } from '../../../shared/telegram/telegram.js'
import {testData} from "../testData/testData.js";
import {host} from "../../../shared/host/host.js";

const baseURL = `${host}/api`;

const axiosInstance = axios.create({
    baseURL,
});

const handleError = (error) => {
    let errorMessage = "";

    if (error.response) {
        errorMessage = error.response.data;
    } else if (error.request) {
        errorMessage = "No response from the server";
    } else {
        errorMessage = error.message;
    }

    return errorMessage;
};

export const getMiningUserData = async (currentCrypto) => {
    try {
        const response = await axiosInstance.post("/get-mining-user-data", {
            initData,
            currentCrypto
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const miningUserExists = async () => {
    try {
        // Выполняем запрос только если хост установлен
        const response = await axiosInstance.post("/mining-user-exists", {
            initData,
        });
        return response.data;
    } catch (error) {
        return { status: false };
    }
};

export const startMining = async (miningType) => {
    try {
        await axiosInstance.post("/start-mining", { initData, userId, miningType });
    } catch (error) {
        handleError(error);
    }
};

export const saveMiningUserTask = async (taskId) => {
    try {
        return await axiosInstance.post("/save-mining-user-task", {
            initData,
            taskId,
        }); // Вернуть результат выполнения запроса
    } catch (error) {
        handleError(error);
        // Если возникла ошибка, можно вернуть объект с информацией об ошибке
        return { status: error };
    }
};

export const getMiningTickersPrice = async () => {
    try {
        const response = await axiosInstance.post("/mining-tickers-price", {
            initData,
        });
        return response.data;
    } catch (error) {
        return { data: {} };
    }
};

export const saveMiningUserCryptoCurrency = async (cryptoCurrency) => {
    console.log(cryptoCurrency)
    console.log(typeof cryptoCurrency)
    try {
        await axiosInstance.post("/save-mining-user-crypto-currency", {
            initData,
            cryptoCurrency,
        });
    } catch (error) {
        handleError(error);
    }
};

export async function getDailyPromoCode(initData) {
    try {
        const response = await axios.post(`${host}/api/get-daily-promo-code`, { initData });
        return response.data.data.promoCode || null;
    } catch (error) {
        handleError(error)
    }
}

export const miningWithdraw = async (withdrawAmount, withdrawAddress, isWithdrawHold) => {
    try {
        // Отправляем запрос на /api/mining-withdraw с указанными данными
        const response = await axiosInstance.post("/mining-withdraw", {
            initData,
            withdrawAmount,
            withdrawAddress,
            isWithdrawHold
        });

        // Возвращаем результат выполнения запроса
        return response.data;
    } catch (error) {
        // Обрабатываем ошибку и возвращаем объект с информацией об ошибке
        return handleError(error);
    }
};

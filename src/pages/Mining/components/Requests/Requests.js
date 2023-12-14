// Requests.js
import axios from 'axios';
import { host } from "../../../../shared/host/host.js";
import { initData, userId } from '../../../../shared/telegram/telegram.js';

const baseURL = `${host}/api`;

export let miningUserDataResult = {};
export let miningUserExistsResult = {};
export let startMiningResult = {};
export let miningTickersPriceResult = {};
export let saveMiningUserTaskResult = {};
export let saveMiningUserCryptoCurrencyResult = {};

export let miningUserDataError = null;
export let miningUserExistsError = null;
export let startMiningError = null;
export let miningTickersPriceError = null;
export let saveMiningUserTaskError = null;
export let saveMiningUserCryptoCurrencyError = null;

const axiosInstance = axios.create({
    baseURL,
});

const handleError = (error, errorVar) => {
    if (error.response) {
        errorVar = error.response.data;
    } else if (error.request) {
        errorVar = 'No response from the server';
    } else {
        errorVar = error.message;
    }
};

export const getMiningUserData = async () => {
    try {
        const response = await axiosInstance.post('/get-mining-user-data', { initData, userId });
        miningUserDataResult = response.data;
        return response.data;
    } catch (error) {
        handleError(error, miningUserDataError);
    }
};

export const miningUserExists = async () => {
    try {
        const response = await axiosInstance.post('/mining-user-exists', { initData, userId });
        miningUserExistsResult = response.data;
        return response.data;
    } catch (error) {
        handleError(error, miningUserExistsError);
        return { status: false };
    }
};

export const startMining = async (miningType) => {
    try {
        const response = await axiosInstance.post('/start-mining', { initData, userId, miningType });
        startMiningResult = response.data;
    } catch (error) {
        handleError(error, startMiningError);
    }
};

export const getMiningTickersPrice = async () => {
    try {
        const response = await axiosInstance.post('/mining-tickers-price', { initData });
        miningTickersPriceResult = response.data;
        return response.data;
    } catch (error) {
        handleError(error, miningTickersPriceError);
        return { data: {} }; // Возвращаем пустой объект в случае ошибки
    }
};

export const saveMiningUserTask = async (taskId) => {
    try {
        const response = await axiosInstance.post('/save-mining-user-task', { initData, userId, taskId });
        saveMiningUserTaskResult = response.data;
    } catch (error) {
        handleError(error, saveMiningUserTaskError);
    }
};

export const saveMiningUserCryptoCurrency = async (cryptoCurrency) => {
    try {
        const response = await axiosInstance.post('/save-mining-user-crypto-currency', { initData, userId, cryptoCurrency });
        saveMiningUserCryptoCurrencyResult = response.data;
    } catch (error) {
        handleError(error, saveMiningUserCryptoCurrencyError);
    }
};
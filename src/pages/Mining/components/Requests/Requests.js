import axios from 'axios';
import {host} from "../../../../shared/host/host.js";
import {initData, userId} from '../../../../shared/telegram/telegram.js';

const baseURL = `${host}/api`;

const axiosInstance = axios.create({
    baseURL,
});

const handleError = (error) => {
    let errorMessage = '';

    if (error.response) {
        errorMessage = error.response.data;
    } else if (error.request) {
        errorMessage = 'No response from the server';
    } else {
        errorMessage = error.message;
    }

    return errorMessage;
};

export const getMiningUserData = async () => {
    try {
        const response = await axiosInstance.post('/get-mining-user-data', { initData, userId });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const miningUserExists = async () => {
    try {
        const response = await axiosInstance.post('/mining-user-exists', { initData, userId });
        return response.data;
    } catch (error) {
        return { status: false };
    }
};

export const startMining = async (miningType) => {
    try {
        await axiosInstance.post('/start-mining', { initData, userId, miningType });
    } catch (error) {
        handleError(error);
    }
};

export const saveMiningUserTask = async (taskId) => {
    try {
        return await axiosInstance.post('/save-mining-user-task', {initData, userId, taskId});  // Вернуть результат выполнения запроса
    } catch (error) {
        handleError(error);
        // Если возникла ошибка, можно вернуть объект с информацией об ошибке
        return { status: error};
    }
};

export const getMiningTickersPrice = async () => {
    try {
        const response = await axiosInstance.post('/mining-tickers-price', { initData });
        return response.data;
    } catch (error) {
        return { data: {} };
    }
};

export const saveMiningUserCryptoCurrency = async (cryptoCurrency) => {
    try {
        await axiosInstance.post('/save-mining-user-crypto-currency', { initData, userId, cryptoCurrency });
    } catch (error) {
        handleError(error);
    }
};

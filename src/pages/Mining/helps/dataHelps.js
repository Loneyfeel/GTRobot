import {currentQueryId} from "../../../shared/telegram/telegram.js";
import {getMiningTickersPrice, getMiningUserData, miningUserExists} from '../api/api.js';
import {testData} from "../testData/testData.js";

//Проверка существует ли пользователь
export async function checkUserExists() {
    try {
        const userExistsResponse = await miningUserExists();
        return userExistsResponse.status;
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
}

export async function fetchDataAndUpdateLocalStorage(setBackdropVisible) {
    try {
        const storedQueryId = localStorage.getItem('miningQueryId');
        if (storedQueryId !== currentQueryId) {
            const response = await getMiningUserData();
            localStorage.setItem('miningQueryId', currentQueryId);

            // Cохранение данных в локальное хранилище
            if (response.data) {
                localStorage.setItem('miningUserData', JSON.stringify(response.data));
                setBackdropVisible(false)
            } else {
                // Устанавливаем начальные тестовые данные в локальное хранилище при возникновении ошибки
                localStorage.setItem('miningUserData', JSON.stringify(testData.userData));
            }
        } else if (storedQueryId === currentQueryId){
            setBackdropVisible(false)
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export async function fetchDataAndUpdateLocalStorageInSession() {
    try {
        const response = await getMiningUserData();
        if (response.data) {
            localStorage.setItem('miningUserData', JSON.stringify(response.data));
        } else {
            // Устанавливаем начальные тестовые данные в локальное хранилище при возникновении ошибки
            localStorage.setItem('miningUserData', JSON.stringify(testData.userData));
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

export async function fetchTickersPricesAndUpdateLocalStorage () {
    try {
        const response = await getMiningTickersPrice();

        const tickersPrices = response.data;

        if (tickersPrices) {
            localStorage.setItem('prices', JSON.stringify(tickersPrices));
            localStorage.setItem('prices', JSON.stringify(testData.prices));
        } else {
            localStorage.setItem('prices', JSON.stringify(testData.prices));
        }
    } catch (error) {
        console.error('Error fetching tickers prices:', error);
    }
}
import axios from "axios";
import {currentQueryId, initData, userId} from '../../../shared/telegram/telegram.js'
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

export const getWhaleWalletData = async (walletId) => {
    try {
            const response = await axiosInstance.post('/get-whale-wallet-data', {
                initData: initData,
                walletId: walletId,
            });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getWhaleNetworks = async () => {
    try {
        const response = await axiosInstance.post('/get-whale-networks', {
            initData: initData,
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getWhaleWallets = async (setBackdropVisible, type, address, network, tags, name) => {
    try {
        const response = await axiosInstance.post('/get-whale-wallets', {
            initData: initData,
            "type": type,
            "address": address,
            "network": network,
            "tags": tags,
            "name": name
        });
        setBackdropVisible(false)
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const setWhaleWalletFollow = async (walletId, walletName) => {
    try {
        const response = await axiosInstance.post('/set-whale-wallet-follow', {
            initData: initData,
            walletId: walletId,
            walletName: walletName
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getWhaleTags = async () => {
    try {
        const response = await axiosInstance.post('/get-whale-tags', {
            initData: initData,
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getUserPurchasedAssets = async () => {
    try {
        const response = await axiosInstance.post('/get-user-purchased-assets', {
            initData: initData,
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
export const copyWhaleWalletFirst = async (blackList, amount, walletId) => {
    try {
        const response = await axiosInstance.post('/copy-whale-wallet', {
            initData: initData,
            assetsBlackList: blackList,
            purchaseSum: amount,
            walletId: walletId
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const copyWhaleWallet = async (taskId) => {
    try {
        const response = await axiosInstance.post('/copy-whale-wallet', {
            initData: initData,
            taskId: taskId
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
export const setWhaleWalletFirst = async (address) => {
    try {
        const response = await axiosInstance.post('/set-whale-wallet', {
            initData: initData,
            address: address
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
export const setWhaleWallet = async (taskId) => {
    try {
        const response = await axiosInstance.post('/set-whale-wallet', {
            initData: initData,
            taskId: taskId
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};
export const setWhaleWalletName = async (walletId, walletName) => {
    try {
        const response = await axiosInstance.post('/set-whale-wallet-name', {
            initData: initData,
            walletId: walletId,
            walletName: walletName
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const sendMessage = async () => {
    try {
        const response = await axiosInstance.post("/send-message", {
            initData: initData,
            message: "whale_menu"
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

import axios from "axios";
import { initData } from '../../../shared/telegram/telegram.js'
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

export const sendCommand = async (message) => {
    try {
        const response = await axiosInstance.post("/send-message", {
            initData,
            message
        });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

import axios from "axios";
import { initializeMsal, acquireToken } from "../utils/getToken";

const ApiRequest = axios.create({
    baseURL: "https://graph.microsoft.com/v1.0/me",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
});

ApiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        throw Error(error);
    }
);

// Add a response interceptor to handle 401 errors
ApiRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log(originalRequest)
            originalRequest._retry = true;
            try {
                await initializeMsal();
                const newToken = await acquireToken();
                if (newToken) {
                    localStorage.setItem("accessToken", newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return ApiRequest(originalRequest);
                }
            } catch (authError) {
                console.error("Error re-authenticating", authError);
            }
        }
        throw Error(error);
    }
);


export default ApiRequest;
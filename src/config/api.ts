import axios from "axios";

const ApiRequest = axios.create({
    baseURL: "https://graph.microsoft.com/v1.0/me",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
});

export default ApiRequest;
import axios from "axios";
import { json } from "stream/consumers";

const BaseAxios = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
BaseAxios.defaults.withCredentials = true;

BaseAxios.interceptors.request.use(
    async (config) => {
        let item = await localStorage.getItem("accessToken");
        let token
        try {
            token = item ? JSON.parse(item) : null; //get token từ localStorage của mn
        } catch (e) {
            console.log(e);
        }

        if (token !== null) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);
// after send request
BaseAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default BaseAxios;
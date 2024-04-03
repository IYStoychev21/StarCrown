import { axiosConfig } from "./config/axiosConfig";
import axios from "axios";

export const userAPI = {
    getCurrentUser: async () => {
        return (await axios.get('/user', axiosConfig)).data;
    },
    logOut: async () => {
        return (await axios.get('/logout', axiosConfig)).data;
    },
    refreshToken: async () => {
        return (await axios.get(`/refresh-token?refresh=${localStorage.getItem('refreshToken')}`, axiosConfig)).data;
    }
};
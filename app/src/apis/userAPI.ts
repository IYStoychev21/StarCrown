import { axiosConfig } from "./config/axiosConfig";
import axios from "axios";

export const userAPI = {
    getCurrentUser: async () => {
        return (await axios.get('/user', axiosConfig)).data;
    },
};
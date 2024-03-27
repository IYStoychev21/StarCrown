import { axiosGoogleConfig } from "./config/axiosConfig";
import axios from "axios";

export const googleDriveAPI = {
    initGoogleConfig: async () => {
        return (await axios.get('/init/config', axiosGoogleConfig)).data;
    }, 
};
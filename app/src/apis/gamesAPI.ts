
import { axiosConfig } from "./config/axiosConfig";
import axios from "axios";

export const gamesAPI = {
    getGames: async () => {
        return (await axios.get('/games', axiosConfig)).data.applist.apps;
    },
    getGameDetails: async (id: number) => {
        return (await axios.get(`/games/${id}`, axiosConfig)).data.data;
    }
};
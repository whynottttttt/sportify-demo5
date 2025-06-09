import axios from "axios";
import { REACT_APP_SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
    baseURL: REACT_APP_SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
})

api.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${localStorage.getItem("access_token"

    )}`;
    return request;
})

export default api;
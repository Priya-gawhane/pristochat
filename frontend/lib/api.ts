import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const API = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

export default API;
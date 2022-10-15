import axios from "axios";

export const api = axios.create({
    baseURL: "https://www.boredapi.com/api/activity/"
})
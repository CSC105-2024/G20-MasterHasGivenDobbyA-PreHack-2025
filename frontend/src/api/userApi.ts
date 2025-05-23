import { Axios } from "../utils/axiosInstance";

export const registerUser = async (username: string, password: string) => {
    const response = await Axios.post("/auth/register", { username, password });
    return response.data;
}

export const loginUser = async (username: string, password: string) => {
    const response = await Axios.post("/auth/login", { username, password });
    return response.data;
}
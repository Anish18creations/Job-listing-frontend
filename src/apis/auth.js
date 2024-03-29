import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async({ name, email, mobile, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/register`;
        const requestPayload = { name, email, mobile, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        return;
    }
}

export const loginUser = async({ email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/login`;
        const requestPayload = {  email, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        return;
    }
}
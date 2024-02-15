import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async({ name, email, mobile, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/register`;
        const requestPayload = { name, email, mobile, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        console.log(error);
        //toast message(another form of alert message)
        <Toaster>
            toast('User cannot be registered');
        </Toaster>
    }
}

export const loginUser = async({ email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/login`;
        const requestPayload = {  email, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response.data;
    } catch (error) {
        console.log(error);
        //toast message(another form of alert message)
        <Toaster>
            toast('User cannot be logged in');
        </Toaster>
    }
}
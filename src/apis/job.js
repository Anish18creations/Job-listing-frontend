import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


export const getalljobs = async ({ skills, title }) => {
    try {
        let requestUrl;
        if (skills == "" && title == "") {
            requestUrl = `${backendUrl}/job/all`;
        }
        else if (!skills && title) {
            requestUrl = `${backendUrl}/job/all?title=${title}`;
        }
        else if (skills && !title) {
            requestUrl = `${backendUrl}/job/all?skills=${skills}`;
        }
        else {
            requestUrl = `${backendUrl}/job/all?skills=${skills}&title=${title}`;
        }

        const response = await axios.get(requestUrl);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error.response.data);
        toast.error("No such jobs found based on the given filter , try again!!", { duration: 3000 });
        <Toaster>
            toast('Job with the given filters cannot be fetched');
        </Toaster>
    }
}

export const getjobinfo = async (jobid) => {
    try {
        const requestUrl = `${backendUrl}/job/job-description/${jobid}`;

        const response = await axios.get(requestUrl);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        //toast message(another form of alert message)
    }
}

export const createJobPost = async ({ companyName, title, description, logourl,
    salary, location, about, information, size, duration,
    skills, type, mode }) => {

    try {
        const requestUrl = `${backendUrl}/job/createjob`;
        const reqpayload = {
            companyName, title, description, logourl,
            salary, location, about, information, size, duration,
            skills, type, mode
        }
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(requestUrl, reqpayload);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

export const editJobPost = async (jobid, { companyName, title, description, logourl,
    salary, location, about, information, size, duration,
    skills, type, mode }) => {

    try {
        const requestUrl = `${backendUrl}/job/editjob/${jobid}`;
        const reqpayload = {
            companyName, title, description, logourl,
            salary, location, about, information, size, duration,
            skills, type, mode
        }
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(requestUrl, reqpayload);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}
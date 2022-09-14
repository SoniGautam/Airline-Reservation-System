import axios from "axios";
//import auth from "./authService";
import { toast } from "react-toastify";


axios.defaults.baseURL = process.env.MYSPACE_API_BASE_URL || 'http://localhost:5000';


axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.error(error);
        toast.error("An unexpected error occurred.");
    }

    else if (error.response.status === 401) {
        toast.error("Unauthorized");   
    }

    else if (error.response.status === 400) {
        toast.error("Invalid username or password");   
    }

    else if (error.response.status === 403) {
        toast.error("Forbidden");   
    }

    else if (error.response.status === 404) {
        toast.error("404 Not Found");   
    }

    else if (error.response.status === 500) {
        toast.error("Internal Server Error");   
    }

    else {
        toast.error("Some error occurred");   
    }    

    return Promise.reject(error);
});

export function setJwt (jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};

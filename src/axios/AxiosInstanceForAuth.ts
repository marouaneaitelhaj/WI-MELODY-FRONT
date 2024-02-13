import axios from "axios";


const AxiosInstanceForAuth = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});



export default AxiosInstanceForAuth;
import axios from "axios";


const AxiosInstanceForMyApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});



if(localStorage.getItem('token') != null)
AxiosInstanceForMyApi.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
export default AxiosInstanceForMyApi;
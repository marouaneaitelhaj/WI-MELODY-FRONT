import axios, { AxiosError } from "axios";


const AxiosInstanceForMyApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});



if (localStorage.getItem('token') != null)
    AxiosInstanceForMyApi.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');




axios.interceptors.response.use(
    (config) => config,
    async (error: AxiosError) => {
        const { data, status } = error.response!
        if (status === 403) {
            localStorage.removeItem('access_token')
        }
    })

export default AxiosInstanceForMyApi;
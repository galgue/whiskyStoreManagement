import axios from 'axios';

const storeAxios = axios.create({
    // baseURL: 'http://localhost:8080/',
    withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.headers = {"Access-Control-Allow-Origin": "*"}

export const baseUrl = 'http://localhost:8080/';

export default storeAxios;
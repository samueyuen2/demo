import axios from 'axios';

const initAxios = axios.create();

export default async function axiosWrapper(method, url, data) {
    return initAxios({
        method: method,
        url: "https://demo-backend-kappa.vercel.app" + url,
        responseType: 'json',
        data: data
    });
}
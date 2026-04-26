import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
});

api.interceptors.request.use((config) => {
    // Attach token automatically so every protected request stays authenticated.
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

}, (error) => {
    return Promise.reject(error);
});

export default api;
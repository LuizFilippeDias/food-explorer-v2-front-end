import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://food-explorer-v2-back-end.onrender.com'
});


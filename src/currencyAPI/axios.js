import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.currencylayer.com/',
});

export default instance;
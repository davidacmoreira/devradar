import axios from 'axios';

import content_config from '../config.json';


const uri = 'http://localhost:' + content_config.PORT_BACKEND;

const api = axios.create({
    baseURL: uri
});

export default api;
import axios from 'axios';

import content_config from '../config.json';


const uri = 'http://' + content_config.URI_BACKEND;

const api = axios.create({
    baseURL: uri
});

export default api;
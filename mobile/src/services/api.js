import axios from 'axios';

import content_config from '../../config.json';


const ip = 'http://' + content_config.LOCAL_IP + ':' + content_config.PORT_BACKEND;

const api = axios.create({
    baseURL: ip
});

export default api;
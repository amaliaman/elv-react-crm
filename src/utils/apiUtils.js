import axios from 'axios';

const queryApi = async (url) => {
    return axios.get(url);
};

const apiUtils = {
    // Constants
    SERVER_URL: 'http://localhost:8080',
    CLIENTS_API: '/clients',
    // Methods
    queryApi: queryApi
};

export default apiUtils;
import axios from 'axios';

const putApi = async (url, body) => {
    try {
        const response = await axios.put(url, body);
        return response;
    }
    catch (error) {
        console.log(error);/////////////////// handle errors
    }
};

const postApi = async (url, body) => {
    try {
        const response = await axios.post(url, body);
        return response;
    }
    catch (error) {
        console.log(error);/////////////////// handle errors
    }
};

const queryApi = async url => {
    let result = {};
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            result.isSuccess = true;
            result.data = response.data;
        }
        else {
            console.error(response.statusText);
            result.isSuccess = false;
            result.error = response.statusText;
        }
    }
    catch (error) {
        console.error(error);
        result.isSuccess = false;
        result.error = error.toString()
    }
    return result;
};

const getData = async url => {
    const result = await queryApi(url);
    if (result.isSuccess) {
        return result.data;
    }
    return null;
}

const apiUtils = {
    // Constants
    SERVER_URL: 'http://localhost:8080',
    CLIENTS_API: '/clients',
    OWNERS_API: '/owners',
    CLIENT_NAMES_API: '/clientnames',
    ANALYTICS_BASE:'/analytics',
    ANALYTICS_NEW_COUNT: '/new',
    ANALYTICS_EMAILS_COUNT: '/emails',
    ANALYTICS_OUTSTANDING_COUNT: '/outstanding',
    ANALYTICS_COUNTRY_COUNT: '/country',
    // Methods
    queryApi: queryApi,
    getData: getData,
    postApi: postApi,
    putApi: putApi
};

export default apiUtils;
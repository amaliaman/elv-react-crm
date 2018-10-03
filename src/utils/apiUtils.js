import axios from 'axios';

const postApi = async (url, body) => { // convert to async/await
    console.log(url, body)
    axios.post(url, body)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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
    // Methods
    queryApi: queryApi,
    getData: getData,
    postApi: postApi
};

export default apiUtils;
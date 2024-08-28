import axios from "axios";
/** 
    * Fetch data from API.
    * @param {string} method - HTTP methods.
    * @param {string} url - Rest API URL address.
    * @param {string|object} dataForSend - Data for send to API.
    * @param {boolean} serverMode - true or false, set to true to use in `server.js` or false to use in react .jsx file.
    * @returns {object} - Data received from Rest API.
*/

const FetchData = async (method = 'get', url = '', dataForSend = '', serverMode = false) => {
    try {
        method = method?.toLowerCase();
        let response = {};
        let result = {};
        let str = dataForSend;
        if (method === 'get' && typeof dataForSend === 'object') {
            //convert object to query strings
            str = '';
            for (let item in dataForSend)
                str += `${item}=${dataForSend[item]}&`;
            str = str.slice(0, -1); //last & remover
        }
        if (method && url)
            await axios({
                method: method,
                url: url + (method === 'get' ? `?${str}` : ''),
                data: (method === 'post' || method === 'put' || method === 'patch' || method === 'delete') ? dataForSend : {},
                headers: { "Content-type": "application/json; charset=UTF-8" },
                timeout: 20000,
            }).then(function (res) {
                response = res.data;
            }).catch((err) => {
                if (serverMode)
                    response = [];
                else
                    response = err;
            });

        if (response instanceof Error)
            return response;

        if (serverMode) {
            result['firstData'] = response;
            return result;
        }
        else return response;

    } catch (err) {
        if (serverMode)
            return [];
        return new Error(err);
    }
};
export default FetchData;
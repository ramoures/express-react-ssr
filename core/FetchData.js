import axios from "axios";
/** 
    * Fetch data from API.
    * @param {string} method - HTTP methods.
    * @param {string} url - RESTful API URL address.
    * @param {string|object} dataForSend - Data for send to API.
    * @param {boolean} serverMode - true or false, set to true to use in `server.js` or false to use in react .jsx file.
    * @returns {Promise} - Data received from RESTful API.
*/

export const FetchData = async (method = 'get', url = '', dataForSend = '', serverMode = false) => {
    try {
        method = method?.toLowerCase();
        let result = {};
        let response;
        if (!url || url === null)
            return {};
        let str = "";
        if (dataForSend && typeof dataForSend === 'object') for (let item in dataForSend) str += `${item}=${dataForSend[item]}&`;
        str = str.slice(0, -1); //last & remover
        await axios({
            method: method,
            url: url + ((method === 'get') ? (typeof dataForSend === 'object') ? str : `?${dataForSend}` : ''),
            data: (method === 'post' || method === 'put' || method === 'patch') ? dataForSend : {},
            headers: { "Content-Type": "application/json", "X-TOKEN": "", Authorization: "" },
            timeout: 20000,
        }).then(function (res) {
            response = res.data;
        }).catch((err) => {
            if (serverMode)
                response = [];
            else response = err?.response?.status || err?.code;
        });

        const data = response;
        if (serverMode) {
            result['firstData'] = data;
            return result;
        }
        else return data;

    } catch (err) {
        if (serverMode)
            return [];
        return err.toString();
    }
};
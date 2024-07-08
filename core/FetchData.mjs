import axios from "axios";
import { getEnv, input, safeString } from "./Utils.mjs";
import { decode } from "html-entities";

export const FetchData = async (name, url, sendData = {}) => {
    try {
        let result = {};
        if (!url || url === null)
            return {};
        // url = safeString(input(url));
        let str = "";
        if (sendData) for (let item in sendData) str += `${item}=${sendData[item]}&`;
        str = str.slice(0, -1);
        const response = await axios
            .get(
                `${url}?${str}`,
                {
                    headers: { "Content-Type": "application/json", "X-TOKEN": getEnv('API_TOKEN') },
                    timeout: 60000,
                }
            )
        const data = await response.data;
        result[decode(name)] = data;
        return result;
    } catch (err) {
        if (getEnv('DEVELOP_MODE', 'boolean')) {
            const errors = err;
            if (!axios.isAxiosError(errors))
                return err.toString();
            return err;
        }
        return '500 Internal Server Error!'
    }
}; 
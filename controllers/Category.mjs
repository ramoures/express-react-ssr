import { decode } from "html-entities";
import { addRemoveSlash, getEnv, logger } from "../core/Utils.mjs";
import Base from "./Base.mjs";
export default class Category extends Base {

    async home(req, res) {
        try {
            const abiBase = addRemoveSlash(getEnv('API_BASE_URL'), false, true);
            const sendData = {};
            const name = req?.params?.name;
            const apiURL = abiBase + "products/category/" + name;
            const apiName = 'category' + '_' + decode(name);
            return await this.Creator(req, res, apiName, apiURL, sendData);
        } catch (err) {
            return logger(err, res);
        }
    }

}

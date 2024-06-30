import { addRemoveSlash, getEnv, logger } from "../core/Utils.mjs";
import Base from "./Base.mjs";
export default class Main extends Base {
    async notFound(req, res) {
        try {
            const sendData = {};
            const apiURL = "";
            return await this.Creator(req, res, apiURL, sendData);
        } catch (err) {
            return logger(err, res);
        }
    }
    async home(req, res) {
        try {
            const abiBase = addRemoveSlash(getEnv('API_BASE_URL'), false, true);
            const sendData = { limit: getEnv('ITEM_PER_PAGE_LIMIT', 'number') };
            const apiURL = abiBase + "products";
            return await this.Creator(req, res, apiURL, sendData);
        } catch (err) {
            return logger(err, res);
        }
    }

}

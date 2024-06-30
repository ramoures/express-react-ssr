import { addRemoveSlash, getEnv, logger } from "../core/Utils.mjs";
import Base from "./Base.mjs";
export default class Main extends Base {

    async home(req, res) {
        try {
            const abiBase = addRemoveSlash(getEnv('API_BASE_URL'), false, true);
            const sendData = { limit: getEnv('ITEM_PER_PAGE_LIMIT', 'number') };
            const apiURL = abiBase + "home";
            return await this.Creator(req, res, apiURL, sendData);
        } catch (err) {
            return logger(err, res);
        }
    }

}

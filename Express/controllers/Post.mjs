import { decode } from "html-entities";
import { addRemoveSlash, getEnv, logger } from "../core/Utils.mjs";
import Base from "./Base.mjs";
export default class Post extends Base {

    async home(req, res) {
        try {
            const abiBase = addRemoveSlash(getEnv('API_BASE_URL'), false, true);
            const sendData = {};
            const slug = req?.params?.slug;
            const category = req?.params?.name;
            const apiURL = abiBase + "products/" + slug;
            const apiName = 'post' + '_' + decode(category) + '_' + slug;
            return await this.Creator(req, res, apiName, apiURL, sendData);
        } catch (err) {
            return logger(err, res);
        }
    }

}

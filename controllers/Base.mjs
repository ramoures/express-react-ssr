import autoBind from "auto-bind";
import { addRemoveSlash, getEnv, input, logger, safeString } from "../core/Utils.mjs";
import { Bootstrap } from "../core/Bootstrap.mjs";

export default class Base {
    constructor() {
        if (this.constructor === Base)
            throw new Error('Attention! Base Controller is abstract class')
        autoBind(this);
    }
    async Creator(req, res, apiName, apiURL, dataForSend) {
        try {
            const vite = req?.app?.get('vite');
            const ssr = req?.app?.get('ssr');
            let url = safeString(input(req.originalUrl));
            url = url.split('?')[0];
            if (getEnv('APP_DIRECTORY_NAME'))
                url = url.replace(addRemoveSlash(getEnv('APP_DIRECTORY_NAME'), false, true), '');
            const html = await Bootstrap(url, apiName, apiURL, dataForSend, vite, ssr);
            return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (err) {
            return logger(err, res);
        }
    }
}
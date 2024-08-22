import Head from './Head.mjs';
import { Transform } from 'node:stream';
import { addRemoveSlash, getEnv } from './Utils.mjs';
/**
    * Transformer
    * @param {object} res 
    * @param {boolean} didError 
    * @param {string} template 
    * @param {string} apiDataInScript 
    * @returns node:stream Transform
*/
const Transformer = (res = {}, didError = true, template = '', apiDataInScript = '') => {
    try {
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        // Use the node:stream Transform
        const transformStream = new Transform({
            transform(chunk, encoding, callback) {
                res.write(chunk, encoding);
                callback();
            }
        });
        // Inserts the metadata into the <head> of the HTML source
        template = template.replace('<!--app-head-->', Head(getEnv('WEBSITE_DIRECTORY_NAME') ? addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true) : '/'));
        // Inserts the windows.__data__ into the <script> of the HTML source. 
        template = template.replace('<!--client-script-->', apiDataInScript);
        // Splits the template based on <!--app-html-->
        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);
        // Writes htmlStart into the HTML source
        res.write(htmlStart);

        transformStream.on('finish', () => {
            // Writes htmlEnd(React Components)
            res.end(htmlEnd);
        });
        return transformStream;

    } catch (error) {
        throw new Error(error);
    }
}
export default Transformer;
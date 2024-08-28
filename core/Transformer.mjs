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

        // It uses the node:stream Transform
        const transformStream = new Transform({
            transform(chunk, encoding, callback) {
                res.write(chunk, encoding);
                callback();
            }
        });
        // Inserts the metadata into the <head> of the index.html source
        template = template.replace('<!--app-head-->', Head(getEnv('WEBSITE_DIRECTORY_NAME') ? addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true) : '/'));
        // Inserts the windows.__data__ into the <script> of the index.html source. 
        template = template.replace('<!--client-script-->', apiDataInScript);
        // Splits the template based on <!--app-html-->
        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);
        // Writes htmlStart into the index.html source. From the first line to <div id="root">
        res.write(htmlStart);

        transformStream.on('finish', () => {
            // Writes htmlEnd(React Components) into the index.html source. From <div id="root"> to the end line.
            res.end(htmlEnd);
        });
        return transformStream;

    } catch (error) {
        throw new Error(error);
    }
}
export default Transformer;
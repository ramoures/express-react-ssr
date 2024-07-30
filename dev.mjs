/**
    @name: Express React SSR
    @description: Server Side Rendering React JS template (shopping website) with Express JS and Vite. Data fetching from Restful API, Sitemap addon, SEO friendly.
    @version: 0.1
    @author: github.com/ramoures
    Repository: github.com/ramoures/express-react-ssr/
    Helper: github.com/bluwy/create-vite-extra/tree/master/template-ssr-react
    @copyright: 2024, Under MIT License - github.com/ramoures/express-react-ssr/blob/main/LICENSE
*/
import fs from 'node:fs/promises';
import { Transform } from 'node:stream';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router } from 'express';
import { FetchData } from './core/FetchData.js';
import API from './core/API.js';
import Head from './core/Head.js';
import sitemap from './sitemap/sitemap.js';
import { addRemoveSlash, getEnv, logger } from './core/Utils.mjs';


// Constants
const urlWithPort = addRemoveSlash(getEnv('WEBSITE_BASE_URL')) + (getEnv('DEV_PORT') ? ':' + addRemoveSlash(getEnv('DEV_PORT'), false, true) : '');
const port = getEnv('DEV_PORT', 'number') || 4173;;
const ABORT_DELAY = getEnv('ABORT_DELAY', 'number') || 10000;

// Create http server
const app = express();


// Express optional setting
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));


const compression = (await import('compression')).default;
app.use(compression());

// Add Vite or respective production middlewares
let vite;

const { createServer } = await import('vite');
vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
});
app.use(vite.middlewares);


// Set static directory.
app.use(`/${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'))}`, express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), `./dist${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}/client`), { index: false }));

const route = Router();

app.use(getEnv('WEBSITE_DIRECTORY_NAME') ? addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true) : '', route)

//Sitemap, use middleware and controller. controller: sitemap/sitemap.js
route.use('/sitemap', async (req, res, next) => { req.app.set('port', getEnv('DEV_PORT')); next(); }, sitemap);

// Serve HTML
route.get('*', async (req, res) => {
    try {
        let url = req.originalUrl;
        if (getEnv('WEBSITE_DIRECTORY_NAME'))
            url = url.replace(addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true), '');
        else url = url.replace('/', '');
        //Split url and params:
        url = url.split('?');
        //Get full pathName
        let pathName = url[0];
        //Get params:
        const dataForSend = url[1];
        /**
           * Get API information for this path name.
           * @type {{method:string,url:string}}
           */
        const apiInfo = API(pathName ? pathName : 'Index');
        /**
         * Get API object data.
         * @type {{firstData:object}}
        */
        const dataFromServer = await FetchData(apiInfo?.method, apiInfo?.url, dataForSend, true);

        /**
         * Inserting stringify object of API data in `<script>window.__data__`. For calling from client side (entry-client.jsx).
         * @type {string}
        */
        const apiDataInScript = `<script>window.__data__=[${port},${JSON.stringify(dataFromServer)}]</script>`;


        let template, render;

        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(pathName, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;


        let didError = false;
        const { pipe, abort } = render(port, pathName, dataFromServer, {
            onShellError() {
                res.status(500);
                res.set({ 'Content-Type': 'text/html' });
                res.send('<h1>Something went wrong</h1>');
            },
            onShellReady() {
                res.status(didError ? 500 : 200);
                res.set({ 'Content-Type': 'text/html' });

                const transformStream = new Transform({
                    transform(chunk, encoding, callback) {
                        res.write(chunk, encoding);
                        callback();
                    }
                })
                template = template.replace('<!--app-head-->', Head(urlWithPort + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), false, true)));
                const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

                res.write(htmlStart)

                transformStream.on('finish', () => {
                    res.end(apiDataInScript + htmlEnd);
                });

                pipe(transformStream);
            },
            onError(error) {
                didError = true;
                logger(error, res);
            }
        });
        setTimeout(() => {
            abort();
        }, ABORT_DELAY);
    } catch (e) {
        vite?.ssrFixStacktrace(e);
        logger(e.stack, res);
    }
})

// Start http server
app.listen(port, () => {
    console.log(`Server started at ${urlWithPort + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'))}`);
})
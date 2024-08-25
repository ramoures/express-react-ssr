/**
    @name: Express React SSR
    @description: Server Side Rendering React JS template (shopping website) with Express JS and Vite. Data fetching from Restful API, Sitemap add-on, SEO friendly.
    @author: github.com/ramoures
    Repository: github.com/ramoures/express-react-ssr/
    Helper: github.com/bluwy/create-vite-extra/tree/master/template-ssr-react
    @copyright: 2024, Under MIT License - github.com/ramoures/express-react-ssr/blob/main/LICENSE
*/
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { Router } from 'express';
import FetchData from './core/FetchData.mjs';
import API from './core/API.mjs';
import Transformer from './core/Transformer.mjs';
import sitemap from './sitemap/sitemap.mjs';
import { addRemoveSlash, botDetector, getEnv, logger } from './core/Utils.mjs';

// Constants
const port = getEnv('DEV_PORT', 'number') || 4173;;
const ABORT_DELAY = getEnv('ABORT_DELAY', 'number') || 10000;
const urlWithPort = addRemoveSlash(getEnv('WEBSITE_BASE_URL')) + (getEnv('DEV_PORT') ? ':' + addRemoveSlash(getEnv('DEV_PORT')) : '');

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

//Param decoding checker - URIError
app.use(function (req, res, next) {
    try {
        decodeURIComponent(req.path);
        next();
    }
    catch (e) {
        return res.redirect(`/${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'))}`);
    }
});

// Create route to add website directory name
const route = Router();
// Use route
app.use(getEnv('WEBSITE_DIRECTORY_NAME') ? addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true) : '', route);

//Sitemap, use middleware and controller. controller: sitemap/sitemap.js
route.use('/sitemap', sitemap);

// Serve HTML
route.get('*', async (req, res) => {
    try {
        let url = req.originalUrl;
        if (getEnv('WEBSITE_DIRECTORY_NAME'))
            url = url.replace(addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true), '');
        else url = url.replace('/', '');
        //Split url and Query-strings:
        url = url.split('?');
        //Get full pathName
        let path = url[0];
        //Get Query-strings:
        const dataForSend = url[1];
        /**
           * Get API information for this path name.
           * @type {{method:string,url:string}}
           */
        const apiInfo = API(path ? path : 'Index');
        /**
         * Get API object data.
         * @type {{firstData:object}}
        */
        const dataFromServer = await FetchData(apiInfo?.method, apiInfo?.url, dataForSend || apiInfo?.dfs, true);

        /**
         * Inserting stringify object of API data in `<script>window.__data__`. For calling from client side (entry-client.jsx).
         * @type {string}
        */
        const apiDataInScript = `<script>window.__data__=${JSON.stringify(dataFromServer)}</script>`;

        // Always read fresh template in development
        const templateIndex = await fs.readFile('./index.html', 'utf-8');
        let template = await vite.transformIndexHtml(path, templateIndex);
        const render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;

        // Bot detection
        const isCrawler = botDetector(req.get("user-agent"));

        //Rendering
        let didError = false;
        const { pipe, abort } = render(path, dataFromServer, {
            onShellError() {
                res.status(500);
                res.set({ 'Content-Type': 'text/html' });
                return res.send('<h1>Something went wrong</h1>');
            },
            onShellReady() {
                if (!isCrawler) {
                    const transformStream = Transformer(res, didError, template, apiDataInScript);
                    pipe(transformStream);
                }
            },
            onAllReady() {
                if (isCrawler) {
                    const transformStream = Transformer(res, didError, template, apiDataInScript);
                    pipe(transformStream);
                }
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
});

// 404 Error page - (Outside of React Routes)
app.get('*', async (req, res) => {
    return res.status(404).send(`<h1>404, Data not found!</h1><p><a href="${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}"><h2>Got to Home Page</h2></a></p>`)
});

// Start http server
app.listen(port, () => {
    console.log(`Server started at ${urlWithPort + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}`);
})

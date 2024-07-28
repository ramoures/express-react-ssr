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
import express from 'express';
import { FetchData } from './core/FetchData.js';
import API from './core/API.js';
import Head from './core/Head.js';
import sitemap from './sitemap/route.js';
import { getEnv, logger } from './core/Utils.mjs';

// Constants
const isProduction = getEnv('DEVELOP_MODE', 'boolean') ? false : true;
const port = getEnv('PORT', 'number') || 5173;;
const base = getEnv('WEBSITE_DIRECTORY_NAME') || '/';
const ABORT_DELAY = getEnv('ABORT_DELAY', 'number') || 10000;

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';
// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

//Sitemap route. sitemap/sitemap.js
app.use('/sitemap', sitemap);

// Serve HTML
app.use('*', async (req, res) => {
  try {
    let url = req.originalUrl.replace(base, '');

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
    const apiDataInScript = `<script>window.__data__=${JSON.stringify(dataFromServer)}</script>`;


    let template, render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(pathName, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    let didError = false;
    const { pipe, abort } = render(pathName, dataFromServer, {
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
        template = template.replace('<!--app-head-->', Head());
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
  console.log(`Server started at http://localhost:${port}`);
})

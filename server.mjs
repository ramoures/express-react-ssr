/**
    @name: Express React SSR
    @description: Shopping website template by React.js, server side rendered with Express.js and Vite. 
    Fetching data from RESTFul API. Sitemap add-on. SEO friendly.
    Repository: github.com/ramoures/express-react-ssr/
    @author: github.com/ramoures
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
const port = process.env.PORT || getEnv('SERVER_PORT', 'number') || 5173;
const ABORT_DELAY = getEnv('ABORT_DELAY', 'number') || 10000;
const urlWithPort = addRemoveSlash(getEnv('WEBSITE_BASE_URL')) + (getEnv('SERVER_PORT') ? ':' + addRemoveSlash(getEnv('SERVER_PORT')) : '');

// Read index.html file
const templateIndex = await fs.readFile(`./dist${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}/client/index.html`, 'utf-8');

// Create http server
const app = express();

// Express optional setting
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
const compression = (await import('compression')).default;
app.use(compression());

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

// Create route
const route = Router();
// Use route
app.use(getEnv('WEBSITE_DIRECTORY_NAME') ? addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true) : '', route);

// Use Sitemap route
route.use('/sitemap', sitemap);

// Serve HTML
route.get('*', async (req, res) => {
  try {
    let url = req.originalUrl;
    if (getEnv('WEBSITE_DIRECTORY_NAME'))
      url = url.replace(addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true), '');
    else url = url.replace('/', '');
    //Split url and query-strings:
    url = url.split('?');
    //Get full path names
    let path = url[0];
    //Get query-strings:
    const dataForSend = url[1];

    /**
       * API required information gets the current path name.
       * @type {{method:string,url:string,dfs:object|string}}
    */
    const apiInfo = API(path ? path : 'Index');

    /**
     * Receives API data as an object.
     * @type {{firstData:object}}
    */
    const dataFromServer = await FetchData(apiInfo?.method, apiInfo?.url, dataForSend || apiInfo?.dfs, true);

    /**
     * The object inserts a string of API data into the `<script>window.__data__=`. 
     * For use on the client side. entry-client.jsx
     * @type {string}
    */
    const apiDataInScript = `<script>window.__data__=${JSON.stringify(dataFromServer)}</script>`;

    // Use index.html file
    let template = templateIndex;

    //Import and uses the enter-server.jsx render function
    const render = (await import(`./dist${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}/server/entry-server.js`)).render;

    // Bot detection
    const isCrawler = botDetector(req.get("user-agent"));

    //Rendering
    let didError = false;
    const { pipe, abort } = render(path, dataFromServer, {
      //React RenderToPipeableStream Options:

      //A callback that fires if there was an error rendering the initial shell.
      onShellError() {
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        return res.send('<h1>Something went wrong</h1>');
      },
      // A callback that fires right after the initial shell has been rendered
      onShellReady() {
        //For Regular visitors
        if (!isCrawler) {
          const transformStream = Transformer(res, didError, template, apiDataInScript);
          // Pipe outputs the HTML into the provided Writable Node.js Stream.
          // React RenderToPipeableStream return.
          pipe(transformStream);
        }
      },
      // A callback that fires when all rendering is complete, including both the shell and all additional content.
      onAllReady() {
        //For Web crawlers
        if (isCrawler) {
          const transformStream = Transformer(res, didError, template, apiDataInScript);
          // Pipe outputs the HTML into the provided Writable Node.js Stream.
          // React RenderToPipeableStream return.
          pipe(transformStream);
        }
      },
      // A callback that fires whenever there is a server error, whether recoverable or not.
      onError(error) {
        didError = true;
        logger(error, res);
      }
    });
    setTimeout(() => {
      // Lets you abort server rendering and render the rest on the client.
      // React RenderToPipeableStream return
      abort();
    }, ABORT_DELAY);
  } catch (e) {
    logger(e?.stack, res);
  }
});

// 404 Error page - (Outside of React Routes)
app.get('*', async (req, res) => {
  return res.status(404).send(`<h1>404, Data not found!</h1><p><a href="${addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}"><h2>Go to Home Page</h2></a></p>`)
});

// Start http server
// The hostname for the demo version is defined as 0.0.0.0 in railway.app. you can change or delete it.
app.listen(port, "0.0.0.0", () => {
  console.log(`Server started at ${urlWithPort + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true)}`);
})

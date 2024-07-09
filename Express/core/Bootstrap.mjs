import { addRemoveSlash, getEnv, logger } from "./Utils.mjs";
import { Helmet } from 'react-helmet';
import fs from 'fs';

export const Bootstrap = async (url, apiName, apiURL, sendData, vite, ssr = true) => {
  try {
    let template, render, script;
    const baseURL = ssr ? addRemoveSlash(getEnv('SERVER_BASE_URL'), false, true) : addRemoveSlash(getEnv('DEVELOP_BASE_URL'), false, true)

    if (ssr) {
      template = fs.readFileSync(`./dist/${getEnv('APP_DIRECTORY_NAME') ? addRemoveSlash(getEnv('APP_DIRECTORY_NAME'), false, true) : ''}index.html`, 'utf-8');
      var { FetchData } = await import('./FetchData.mjs');
    } else {
      template = fs.readFileSync("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      var { FetchData } = await vite.ssrLoadModule('./Express/core/FetchData.mjs');
    }
    const data = await FetchData(apiName, apiURL, sendData);
    script = `<script>window.__data__=${JSON.stringify(data)}</script>`;

    if (ssr)
      render = (await import(`../../dist/${getEnv('APP_DIRECTORY_NAME') ? addRemoveSlash(getEnv('APP_DIRECTORY_NAME'), false, true) : ''}Server.js`)).render(data, { path: url });
    else
      render = (await vite.ssrLoadModule("./React/src/Server.jsx")).render(data, { path: url });

    const appHtml = `${render} ${script}`;
    const helmet = Helmet.renderStatic()
    // <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    const head = `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href="${baseURL}${getEnv('APP_DIRECTORY_NAME') ? addRemoveSlash(getEnv('APP_DIRECTORY_NAME'), false, true) : ''}" />
    ${helmet?.title ? helmet?.title?.toString() : ''}
    ${helmet?.link ? helmet?.link?.toString() : ''}
    ${helmet?.meta ? helmet?.meta?.toString() : ''}`
    var html = template.replace(`<!--Head-->`, head);
    html = html.replace(`<!--outlet-->`, appHtml);
    return html;
  } catch (err) {
    logger(err)
  }
}
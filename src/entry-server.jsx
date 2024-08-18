import { renderToPipeableStream } from 'react-dom/server'
import App from './App'
import { StaticRouter } from "react-router-dom/server";
import { addRemoveSlash } from './Core/Utils';
/**
 * @param {string} url
 * @param {string} [ssrManifest]
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 * @param {object} dataFromServer
 */
const appDir = process.env.WEBSITE_DIRECTORY_NAME ?? "";
export function render(path, dataFromServer, options) {
  return renderToPipeableStream(
    <StaticRouter basename={addRemoveSlash(appDir, true)} location={`${addRemoveSlash(appDir, true, true) + path}`}>
      <App dataFromServer={dataFromServer} />
    </StaticRouter>,
    options
  )
}

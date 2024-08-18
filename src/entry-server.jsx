import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from "react-router-dom/server";
import { addRemoveSlash } from './Core/Utils';
import App from './App'

const appDir = process.env.WEBSITE_DIRECTORY_NAME ?? "";
/**
 * @param {string} path
 * @param {object} dataFromServer
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(path, dataFromServer, options) {
  return renderToPipeableStream(
    <StaticRouter basename={addRemoveSlash(appDir, true)} location={`${addRemoveSlash(appDir, true, true) + path}`}>
      <App dataFromServer={dataFromServer} />
    </StaticRouter>,
    options
  )
}

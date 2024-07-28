import { renderToPipeableStream } from 'react-dom/server'
import App from './App'
import { StaticRouter } from "react-router-dom/server";
/**
 * @param {string} url
 * @param {string} [ssrManifest]
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 * @param {object} dataFromServer
 */
export function render(url, dataFromServer, options) {
  return renderToPipeableStream(
    <StaticRouter location={`/${url}`}>
      <App dataFromServer={dataFromServer} />
    </StaticRouter>,
    options
  )
}

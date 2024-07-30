import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { addRemoveSlash } from './Core/Utils';
const appDir = process.env.WEBSITE_DIRECTORY_NAME ?? "";

let port;
let dataFromServer;
if (typeof window !== 'undefined') {
  port = window.__data__?.[0];
  dataFromServer = window.__data__?.[1];
}

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter basename={addRemoveSlash(appDir, true)}>
    <App port={port} dataFromServer={dataFromServer} />
  </BrowserRouter>

)

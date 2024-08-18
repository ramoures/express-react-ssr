import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { addRemoveSlash } from './Core/Utils';
import App from './App'

const appDir = process.env.WEBSITE_DIRECTORY_NAME ?? "";

let dataFromServer;
if (typeof window !== 'undefined') {
  dataFromServer = window.__data__;
}

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter basename={addRemoveSlash(appDir, true)}>
    <App dataFromServer={dataFromServer} />
  </BrowserRouter>

)

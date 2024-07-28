import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

let dataFromServer;
if (typeof window !== 'undefined')
  dataFromServer = window.__data__;

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App dataFromServer={dataFromServer} />
  </BrowserRouter>

)

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { addRemoveSlash } from "./core/Utils";
const appDir = process.env.APP_DIRECTORY_NAME ?? "";
let data;
if (typeof window !== "undefined") {
  data = window.__data__;
}
ReactDOM.hydrateRoot(
  document.getElementById("app"),
  <BrowserRouter basename={`${addRemoveSlash(appDir, true)}`}>
    <Router data={data} />
  </BrowserRouter>
);

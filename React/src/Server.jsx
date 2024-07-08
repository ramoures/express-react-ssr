import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Router } from "./Router";
import { addRemoveSlash } from "./core/Utils";
const appDir = process.env.APP_DIRECTORY_NAME ?? "";
export const render = (data, { path }) => {
  return renderToString(
    <StaticRouter
      basename={`${addRemoveSlash(appDir, true)}`}
      location={`${addRemoveSlash(appDir, true) + path}`}
    >
      <Router data={data} />
    </StaticRouter>
  );
};

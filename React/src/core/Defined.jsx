import { addRemoveSlash } from "./Utils";
const serverUrl = process.env.SERVER_BASE_URL ?? "";
let apiUrl = process.env.API_BASE_URL ?? "";
apiUrl = addRemoveSlash(apiUrl, false, true);
const appDir = process.env.APP_DIRECTORY_NAME ?? "";
const webStaticTitle = process.env.WEB_STATIC_TITLE ?? "";
const Defined = {
  website: appDir
    ? addRemoveSlash(serverUrl) + addRemoveSlash(appDir, true, false)
    : addRemoveSlash(serverUrl),
  apiURL: {
    home: apiUrl + "products/",
    products: apiUrl + "products/",
    category: apiUrl + "products/category/",
  },
  title: webStaticTitle
};

export default Defined;
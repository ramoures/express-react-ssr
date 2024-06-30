import { addRemoveSlash } from "./Utils";
const serverUrl = process.env.SERVER_BASE_URL ?? "";
let apiUrl = process.env.API_BASE_URL ?? "";
apiUrl = addRemoveSlash(apiUrl, false, true);
const appDir = process.env.APP_DIRECTORY_NAME ?? "";
const itemPerPageLimit = Number(process.env.ITEM_PER_PAGE_LIMIT) ?? 15;
const Defined = {
  website: appDir
    ? addRemoveSlash(serverUrl) + addRemoveSlash(appDir, true, false)
    : addRemoveSlash(serverUrl),
  urls: {
    products: apiUrl + "products",
    categories: apiUrl + "products/category",
    carts: apiUrl + "carts",
    userCarts: apiUrl + "carts/users",
    users: apiUrl + "users",
    login: apiUrl + "auth/login",
  },
  itemPerPage: itemPerPageLimit,
};

export default Defined;

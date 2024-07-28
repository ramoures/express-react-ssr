const Paths = (url = "") => {
    try {
        /**
         * set key `index`  for index page path = `http://your-web-site-name`
         * @type {{your_react_route_path_name:key_in_API.js_APIInfo}}
        */
        const obj = {
            "index": 'products',
            "products": 'products',
            "men's clothing": "men's clothing",
            "electronics": "electronics",
            "jewelery": "jewelery",
            "women's clothing": "women's clothing"
        }
        return (!url ? obj["index"] : obj[url]) || "";
    } catch (err) {
        return "";
    }
}

export default Paths;
/** 
 * Call API information
 * @param {string} path- Route path name (App.jsx)
 * @param {string} urlSuffix - API URL Suffix.
 * @return {{method:string,url:string,dfs:object|string}} API Data of selected array (for FetchData.js).
*/
const API = (path = "", urlSuffix = "") => {
  try {

    //Make whatever shape you want according to restful API:

    if (path.split('/')[path.split('/').length - 2] === 'products') {
      urlSuffix = path.split('/')[path.split('/').length - 1]
      path = 'single_products'
    }

    if (path === 'signin') {
      path = 'products';
    }

    /**
     * base of api url.
     * @type {string}
   */
    const baseUrl = 'https://fakestoreapi.com';
    /**
      * @description 
      * API information object.
      * - route_path_name - This route path name - (App.jsx)
      *   - method - This route API method
      *   - url - This route API url
      * > Set `Index` for home index page. `Index:{method:'',url:''}`.
      * @type {{route_path_name:{method:string,url:string}}}
    */
    const APIInfo = {

      //Home page:
      "Index": {
        method: 'get',
        url: baseUrl + '/products',
        //data for send
        dfs: {}
      },
      "products": {
        method: 'get',
        url: baseUrl + '/products',
        //data for send
        dfs: {}
      },
      "categories": {
        method: 'get',
        url: baseUrl + '/products/categories',
        //data for send
        dfs: {}
      },
      "single_products": {
        method: 'get',
        url: baseUrl + '/products/' + urlSuffix,
        //data for send
        dfs: {}
      },
      "category/jewelery": {
        method: 'get',
        url: baseUrl + '/products/category/jewelery',
        //data for send
        dfs: {}
      },
      "category/electronics": {
        method: 'get',
        url: baseUrl + '/products/category/electronics',
        //data for send
        dfs: {}
      },
      "category/men": {
        method: 'get',
        url: baseUrl + "/products/category/men's clothing",
        //data for send
        dfs: {}
      },
      "category/women": {
        method: 'get',
        url: baseUrl + "/products/category/women's clothing",
        //data for send
        dfs: {}
      }
    }
    return APIInfo?.[path] || { method: '', url: '' };

  } catch (err) {
    return {
      method: '',
      url: ''
    }
  }
}
export default API;
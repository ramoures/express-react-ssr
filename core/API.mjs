/** 
 * Call API information
 * @param {string} path- Route path name (App.jsx)
 * @param {string} urlSuffix - API URL Suffix.
 * @return {object} API Data of selected array (for FetchData.js).
*/
const API = (path, urlSuffix = "") => {
  try {

    //Make whatever shape you want according to restful API:

    if (path.split('/')[path.split('/').length - 2] === 'products') {
      urlSuffix = path.split('/')[path.split('/').length - 1]
      path = 'single_products'
    }
    /**
     * base of api url.
     * @type {string}
   */
    const baseUrl = 'https://api.escuelajs.co/api/v1';
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
        dfs: { limit: 100, offset: 0 }
      },
      "products": {
        method: 'get',
        url: baseUrl + '/products'
      },
      "single_products": {
        method: 'get',
        url: baseUrl + '/products/' + urlSuffix
      },
      "category/clothes": {
        method: 'get',
        url: baseUrl + '/categories/1/products',
        //data for send
        dfs: { limit: 20, offset: 0 }
      },
      "category/electronics": {
        method: 'get',
        url: baseUrl + '/categories/2/products',
        //data for send
        dfs: { limit: 20, offset: 0 }
      },
      "category/furniture": {
        method: 'get',
        url: baseUrl + '/categories/3/products',
        //data for send
        dfs: { limit: 20, offset: 0 }
      },
      "category/shoes": {
        method: 'get',
        url: baseUrl + '/categories/4/products',
        //data for send
        dfs: { limit: 20, offset: 0 }
      },
      "category/miscellaneous": {
        method: 'get',
        url: baseUrl + '/categories/5/products',
        //data for send
        dfs: { limit: 20, offset: 0 }
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
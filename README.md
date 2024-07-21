# Express React SSR

[فارسی](https://awaweb.ir/blog/posts/express-react-ssr) | English

#### Simple shopping website example by React - Server Side Rendering by Express with Vite. **_(SEO Friendly)_**

> SSR, lets you generate HTML before any JavaScript loads, [ExpressJS](https://expressjs.com/) with [Vite](https://vitejs.dev/guide/ssr) does this work for you.

---

**Installation**

1. `git clone https://github.com/ramoures/express-react-ssr/`
2. `cd express-react-ssr`
3. `npm install`
4. `npm run build`
5. `npm run serve` or `node Server.mjs`
6. Browse `http://localhost:5173/shop/`

---

**Developement**

- Tailwind CLI build and minify process:

  `npm run tailwind`

  [Tailwind installation docs](https://tailwindcss.com/docs/installation)

- `npm run dev` or `node Develop.mjs`

  Browse `http://localhost:4173/shop/`

## Build

After development completion:

1. Remove **older** **_dist_** directory. (If it exists in the project root)
2. `npm run build` for build new _dist_ directory.
3. `npm run serve` or `node Server.mjs`
4. Browse `http://localhost:5173/shop/`

---

### Explanation

`Express/Bootstrap.mjs`:
Gets index.html and page loaded html content, Gets data from API And inserts required html(head and body) content into loaded page before any JavaScript loads.

`React/Server.jsx`: Inserts API data into data parameter `render(data)`.

`React/Client.jsx`: Inserts stringified data into `window.__data__` for client side hydrator and data parameter `render(data)`.

> [!TIP]
>
> If you're using the latest version of NodeJS and npm, check out the following links(High-level API), but if use NextJS or you're using older versions of NodeJS and npm, you can check out my repository.
>
> - [Next JS SSR](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)
> - [SSR frameworks and libraries in awesome vite](https://github.com/vitejs/awesome-vite#ssr)
> - [React SSR by Remix](https://remix.run/blog/react-server-components)
> - [React Server Components Demo](https://github.com/reactjs/server-components-demo)
>
> I got help from this tutorial:
>
> - [Vite SSR tutorial](https://vitejs.dev/guide/ssr#example-projects)
>
> I tried to make it better by including different routers, adding fetch API data function, bootstrap function and controllers to ExpressJS. I hope succeeded and it is useful for you.

## I Used

- Axios - _get data from API (fakestoreapi.com)_
- react router dom
- react helmet
- Tailwind CSS framework
- XML Sitemap
- ...

## HELP

### For replace your react project in this repository:

1. Remove existing file in `React/src/` directory and copy/paste your react files to `React/src/`.
2. Edit the `.env` for your required defined configuration.
3. Add or edit your required routers in `React/router.jsx`.
4. See `Express/routes/Router.mjs` and edit similar to `React/router.jsx` routes.
5. Add new or edit your required controller mjs file in `Express/controllers`.

> [!IMPORTANT]
>
> **Anything that doesn't come on the first moment the page loads, won't come on the server side either.**
>
> Avoid anything that prevents the page or part of it from being displayed the first moment the page loads.
>
> ```
> Example:
>
> ✗ const sample = lazy(() => import('./sample.mjs'));
> ✓ import {sample} from './sample.mjs'
>
> and
>
> ✗ const [loading,isLoading] = useState(true);
> ✓ const [loading,isLoading] = useState(false);
> useEffect(()=>{
>   isLoading(true);
>   //Other code
> },[]);
> return (
>     {loading && <div>Please wait...</div>}
>     {!loading && <div>Hello World!</div>}
> )
> ```
>
> You always try to see the `page source` through the `view page source` to make sure everything you wanted is in the source.
>
> **If you are using JavaScript for the DOM control, put it in the following condition:**
>
> ```
> if (typeof window !== 'undefined'){
>
>     // your code here
>
>     // Example:
>     // window.scrollTo(0, 0);
>     // const u = document.getElementById('u');
> }
> ```
>
> You always try to see the page `console` through the `inspect` to see possible errors.

#### If you want to add and use environment in React jsx/tsx files:

1.  Add your environment required defined in `.env` file.
2.  Edit `vite.config.js` and add your new env defined name to `EnvironmentPlugin` Array.

        ['NEW_ENV1','NEW_ENV2','APP_DIRECTORY_NAME', 'WEB_STATIC_TITLE', 'API_BASE_URL', 'SERVER_BASE_URL', 'DEVELOP_MODE', 'TWITTER_ACCOUNT_NAME']

3.  Rerun `npm run dev` or `npm run serve`
4.  Call In the react .jsx or .tsx files:

        const new_env_1 = process.env.NEW_ENV1;
        const new_env_2 = process.env.NEW_ENV2;

#### If you want tailwind css configure your template paths:

1. Edit `tailwindcss.config.js` **_content_** object and add your new path to array. [Tailwind installation docs](https://tailwindcss.com/docs/installation)

## LICENSE

[Under The MIT License](./LICENSE)

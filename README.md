# Express React SSR (Demo)

#### Simple Shopping website by React - Server Side Rendering by Express with Vite. **_(SEO Friendly)_**

1. `git clone https://github.com/ramoures/express-react-ssr/`
2. `cd express-react-ssr`
3. `npm install`
4. `npm run build`
5. `npm run serve` or `node Server.mjs`
6. Browse `http://localhost:5173/shop/`

- Developement:

  1.  Tailwind CLI build and minify process:

          npx tailwindcss -i ./React/src/input.css -o ./React/src assets/css/output.css --watch --minify

  2.  `npm run dev` or `node Develop.mjs`

      - Browse `http://localhost:4173/shop/`

  - **After development completion**
    1. Remove older `dist` directory. (If it exists in the project root)
    2. `npm run build` for build new `dist` directory.
    3. `npm run serve` or `node Server.mjs`
    4. Browse `http://localhost:5173/shop/`

---

**Attention**: If you're using the latest version of NodeJS, check out the following links, but if that doesn't work and you're using older versions of NodeJS, you can check out this my repository.

- [Next JS SSR](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)
- [React SSR by Remix](https://remix.run/blog/react-server-components)
- [React Server Components Demo](https://github.com/reactjs/server-components-demo)
- [SSR in awesome vite](https://github.com/vitejs/awesome-vite#ssr)

I got help from this tutorial:

- [Vite SSR tutorial](https://vitejs.dev/guide/ssr#example-projects)

## I Used

- Axios - _get data from API (fakestoreapi.com)_
- react router dom
- react helmet
- Tailwind CSS framework
- XML Sitemap

## HELP

### For replace your react project in this repository:

1. Remove existing file in `React/src/` directory and copy/paste your react files to `React/src/`.
2. Edit the `.env` for your required defined configuration.
3. Add or edit your required routers in `React/router.jsx`.
4. See `Express/routes/Router.mjs` and edit similar to `React/router.jsx` routes.
5. Add new or edit your required controller in `Express/controllers`.

### Attention!

- Avoid anything that prevents the page or part of it from being displayed the first moment the page loads. Example:

      ✗ const sample = lazy(() => import('./sample.mjs'));
      ✓ import {sample} from './sample.mjs'
      or
      ✗ const [loading,isLoading] = useState(true);
      ✓ const [loading,isLoading] = useState(false);

- If you are using JavaScript for the DOM control, put it in the following condition:

        if (typeof window !== 'undefined'){

            // your code here

            // Example:
            // window.scrollTo(0, 0);
            // const u = document.getElementById('u');
        }

#### If you want to add and use environment in React jsx/tsx files:

1.  Add your environment required defined in `.env` file.
2.  Edit `vite.config.js` and add your new env defined name to `EnvironmentPlugin` Array.

        ['NEW_ENV1','NEW_ENV2','APP_DIRECTORY_NAME', 'WEB_STATIC_TITLE', 'API_BASE_URL', 'SERVER_BASE_URL', 'DEVELOP_MODE', 'TWITTER_ACCOUNT_NAME']

3.  Rerun `npm run dev` or `npm run serve`
4.  Call In the react .jsx or .tsx files:

        const new_env_1 = process.env.NEW_ENV1;
        const new_env_2 = process.env.NEW_ENV2;

#### If you want tailwind css configure your template paths:

1. Edit `tailwindcss.config.js` **_content_** object and add your new path to array. [Docs](https://tailwindcss.com/docs/installation)

## LICENSE

[Under The MIT License](./LICENSE)

# Express React SSR

[فارسی](https://awaweb.ir/blog/posts/express-react-ssr) | English

ReactJS server side rendering template (simple shopping website) with ExpressJS and ViteJS.

- Data fetching from RESTful API
- Sitemap add-on
- SEO friendly

---

<img src="screenshot.png">

---

**[View Demo](https://erssr.awaweb.ir/shop/)** - _[(Mirror Link)](https://express-react-ssr.onrender.com/shop/)_

---

### Installation

1. `git clone https://github.com/ramoures/express-react-ssr.git`
2. `cd express-react-ssr`
3. `npm install`
4. `npm run build`
5. `npm start` or `node server.mjs`
6. Browse `http://localhost:5173/shop/`

> Update the `.env` file to edit/remove the _shop_ directory from the URL.

---

### Develop

- Tailwind CLI build and minify process: `npm run tw`
- `npm run dev` (In another command line)

  Browse `http://localhost:4173/shop/`

Always ready fresh template in development.

### Build

After development completion:

1. `npm run build` for build new _dist_ directory.
2. `npm start` or `node server.mjs`
3. Browse `http://localhost:5173/shop/`

---

### I Used

- [Node.js Stream](https://nodejs.org/api/stream.html)
- [isbot](https://github.com/omrilotan/isbot)
- [Axios](https://github.com/axios/axios)
- [React Router](https://reactrouter.com/en/main)
- [React Helmet](https://github.com/nfl/react-helmet)
- [Tailwind CSS framework](https://github.com/tailwindlabs/tailwindcss)
- [XML Sitemap](https://www.sitemaps.org/)
- ...

> API source: [fakestoreapi.com](https://fakestoreapi.com)

---

With the help of [template-ssr-react-streaming](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react-streaming)

License [Under The MIT License](./LICENSE)

Email: ramoures@gmail.com

# Express React SSR

React Server Side Rendering by Express with Vite.
(SEO Friendly)

1. `git clone https://github.com/ramoures/express-react-ssr/`
2. `npm install`
3. `npm run build`
4. `npm run serve` or `node Server.mjs`
5. Browse `http://localhost:5173/shop/`

- Developement:
  `npm run dev` or `node Develop.mjs`
  - Browse `http://localhost:4173/shop/`

## I Used

### Template:

- Simple Shoping website
- Get data from API (fakestoreapi.com)
- TailwindCSS framework

### Packages:

- ### React
  - react-dom
  - **react router dom**
  - **react helmet**
  - **axios**
  - **tailwindcss**
- ### Express
  - **dotenv**
  - compression
  - dotenv expand
  - html entities
  - auto bind
  - cookie parser
- ### Vite
  - vite plugin environment
  - vite plugin minify

## HELP

### For replace your react project in this repository:

1. Remove existing React/src directory and copy/paste your React files to React/src.
2. See .env file and change info to your defined informations.
3. See React/router.jsx and change routes to your routes.
4. See Express/routes/Router.mjs and change similar to router.jsx routes.
5. Add new or chnage controller in Express/controllers for your routes.

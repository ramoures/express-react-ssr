import { Helmet } from "react-helmet"
const Head = (baseUrl = '/') => {
    try {
        const helmet = Helmet.renderStatic();
        const regExp = / data-react-helmet="true"/g
        const meta = `<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href="${baseUrl}" />
    <link rel="icon" type="image/svg+xml" href="./images/icon.svg" />
    <meta name="theme-color" content="#CCF7F0" />
    <meta name="generator" content="https://github.com/ramoures/express-react-ssr" />
    ${helmet?.title ? helmet?.title?.toString().replace(regExp, '') : ''}
    ${helmet?.meta ? helmet?.meta?.toString().replace(regExp, '') : ''}
    ${helmet?.link ? helmet?.link?.toString().replace(regExp, '') : ''}`
        return meta;
    } catch (err) {
        return ''
    }
}
export default Head;

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
        // For disable scalable:
        // <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        // For insert Manifest file for PWA: (create manifest.json in public directory first)
        // <link rel="manifest" href="manifest.json" />
        return meta;
    } catch (err) {
        return ''
    }
}
export default Head;

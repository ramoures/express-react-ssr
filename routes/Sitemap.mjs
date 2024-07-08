import { Router } from "express";
import { addRemoveSlash, getEnv } from "../core/Utils.mjs";
import { indexXml } from "../src/sitemaps/index.mjs";
import { pagesXml } from "../src/sitemaps/pages.mjs";
import { categoriesXml } from "../src/sitemaps/categories.mjs";
import { productsXml } from "../src/sitemaps/products.mjs";

const sitemap = Router();
const sitemapNeeds = (ssr) => {
    const clientOrServer = ssr ? addRemoveSlash(getEnv('SERVER_BASE_URL'), false, true) : addRemoveSlash(getEnv('DEVELOP_BASE_URL'), false, true)
    return {
        dir: `${clientOrServer}${getEnv('APP_DIRECTORY_NAME') ? addRemoveSlash(getEnv('APP_DIRECTORY_NAME'), false, true) : ''}`,
        apiUrl: getEnv('API_BASE_URL')
    }
}
sitemap.get('/', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await indexXml(sitemapNeeds(ssr));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/pages', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await pagesXml(sitemapNeeds(ssr));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/categories', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await categoriesXml(sitemapNeeds(ssr));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/products', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await productsXml(sitemapNeeds(ssr));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }

});

export default sitemap;
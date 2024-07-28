import { Router } from "express";
import { addRemoveSlash, getEnv } from "../core/Utils.mjs";
import { indexXml } from "./view/index.mjs";
import { pagesXml } from "./view/pages.mjs";
import { categoriesXml } from "./view/categories.mjs";
import { productsXml } from "./view/products.mjs";


const sitemap = Router();
const sitemapNeeds = {
    url: addRemoveSlash(getEnv('WEBSITE_BASE_URL'), false, true),
    apiUrl: addRemoveSlash(getEnv('API_BASE_URL'), false, true)
}
sitemap.get('/', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const xmlContent = await indexXml(sitemapNeeds);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/pages', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await pagesXml(sitemapNeeds);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/categories', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await categoriesXml(sitemapNeeds);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/products', async (req, res) => {
    try {
        const ssr = req?.app?.get('ssr')
        res.set('Content-Type', 'application/xml');
        const xmlContent = await productsXml(sitemapNeeds);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }

});

export default sitemap;
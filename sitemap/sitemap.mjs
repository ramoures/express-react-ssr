/**
 * sitemap controller
 */

import { Router } from "express";
import { addRemoveSlash, getEnv } from "../core/Utils.mjs";
import { indexXml } from "./view/index.mjs";
import { pagesXml } from "./view/pages.mjs";
import { categoriesXml } from "./view/categories.mjs";
import { productsXml } from "./view/products.mjs";
const sitemap = Router();
const sitemapNeeds = (port = '') => {
    try {
        return {
            url: addRemoveSlash(getEnv('WEBSITE_BASE_URL')) + (port ? ':' + port : '') + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true),
            apiUrl: addRemoveSlash(getEnv('API_BASE_URL'), false, true)
        }
    } catch (err) {
        return {}
    }
}
sitemap.get('/', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const port = req?.app?.get('port') || '';
        const xmlContent = await indexXml(sitemapNeeds(port));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/pages', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const port = req?.app?.get('port') || '';
        const xmlContent = await pagesXml(sitemapNeeds(port));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/categories', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const port = req?.app?.get('port') || '';
        const xmlContent = await categoriesXml(sitemapNeeds(port));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/products', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const port = req?.app?.get('port') || '';
        const xmlContent = await productsXml(sitemapNeeds(port));
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }

});

export default sitemap;
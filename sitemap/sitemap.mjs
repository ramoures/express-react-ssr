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


// In Production, with PORT
// const url = addRemoveSlash(getEnv('WEBSITE_BASE_URL')) + (getEnv('SERVER_PORT') ? (':' + addRemoveSlash(getEnv('SERVER_PORT'))) : '') + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true);

// In Production, without PORT
// const url = addRemoveSlash(getEnv('WEBSITE_BASE_URL')) + addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true);

// In Development
const url = addRemoveSlash(getEnv('WEBSITE_DIRECTORY_NAME'), true, true);

sitemap.get('/', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const xmlContent = await indexXml(url);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/pages', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const xmlContent = await pagesXml(url);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/categories', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const xmlContent = await categoriesXml(url);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }
});
sitemap.get('/products', async (req, res) => {
    try {
        res.set('Content-Type', 'application/xml');
        const xmlContent = await productsXml(url);
        return res.send(xmlContent);
    } catch (err) {
        return res.status(500).send('500, Internal Server Error!');
    }

});

export default sitemap;
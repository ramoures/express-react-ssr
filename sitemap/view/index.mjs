import API from "../../core/API.mjs";
import FetchData from "../../core/FetchData.mjs";

export const indexXml = async (url) => {
    try {
        const now = new Date();
        const apiInfo = API('products');
        const data = await FetchData('get', apiInfo.url);

        var xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${url}style.xsl"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        xml += `<sitemap>
<loc>${url}sitemap/pages</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
</sitemap>`;

        xml += `<sitemap>
<loc>${url}sitemap/categories</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
</sitemap>`;

        xml += `<sitemap>
<loc>${url}sitemap/products</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
</sitemap>`;

        xml += `</sitemapindex>`;

        return xml;

    } catch (err) {
        return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${url}style.xsl"?>`;
    }

}
import API from "../../core/API.mjs";
import FetchData from "../../core/FetchData.mjs";

export const pagesXml = async (url) => {
    try {
        const now = new Date();

        const apiInfo = API('products');
        const data = await FetchData('get', apiInfo.url);

        var xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${url}style.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        xml += `<url>
<loc>${url}</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`;

        xml += `</urlset>`;

        return xml;

    } catch (err) {
        return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${url}style.xsl"?>`;
    }

}
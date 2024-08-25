import API from "../../core/API.mjs";
import FetchData from "../../core/FetchData.mjs";
import { Lowercase } from "../../core/Utils.mjs";

export const categoriesXml = async (url) => {
    try {
        const now = new Date();

        const apiInfo = API('categories');
        const data = await FetchData('get', apiInfo.url, apiInfo?.dfs);

        var xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${url}style.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        for (let i in data) {
            xml += `<url>
            <loc>${url}category/${Lowercase(data?.[i].split("'")[0])}</loc>
            <lastmod>${data?.[i]?.updatedAt || now}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
            </url>`;
        };

        xml += `</urlset>`;

        return xml;

    } catch (err) {
        return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${url}style.xsl"?>`;
    }

}
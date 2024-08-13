import axios from "axios";
import { encode } from "html-entities";
import { getEnv } from "../../core/Utils.mjs";

export const categoriesXml = async (obj = {}) => {
    try {
        const now = new Date();
        const response = await axios
            .get(
                `${obj.apiUrl}products/categories`,
                {
                    headers: { "Content-Type": "application/json" },
                    proxy: false,
                    timeout: 20000,
                }
            )
        const data = await response.data;
        var xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${obj?.url}style.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        for (let i in data) {
            xml += `<url>
            <loc>${obj?.url}category/${encodeURI(encode(encode(data?.[i])))}</loc>
            <lastmod>${data?.[i]?.updatedAt || now}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
            </url>`;
        }

        xml += `</urlset>`
        return xml;
    } catch (err) {
        return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${obj.url}style.xsl"?>`
    }

}
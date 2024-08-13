import axios from "axios";

export const indexXml = async (obj = {}) => {
    try {
        const now = new Date();

        const response = await axios
            .get(
                `${obj.apiUrl}products`,
                {
                    headers: { "Content-Type": "application/json" },
                    proxy: false,
                    timeout: 20000,
                }
            )
        const data = await response.data;
        var xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${obj.url}style.xsl"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        xml += `<sitemap>
<loc>${obj.url}sitemap/pages</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
</sitemap>`;
        xml += `<sitemap>
<loc>${obj.url}sitemap/categories</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
</sitemap>`;
        xml += `<sitemap>
<loc>${obj.url}sitemap/products</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
</sitemap>`;
        xml += `</sitemapindex>`
        return xml;
    } catch (err) {
        return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${obj.url}style.xsl"?>`
    }

}
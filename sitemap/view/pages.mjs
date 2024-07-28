import axios from "axios";

export const pagesXml = async (obj = {}) => {
    try {
        const now = new Date();
        const response = await axios
            .get(
                `${obj.apiUrl}products`,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 20000,
                }
            )
        const data = await response.data;
        var xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${obj.url}style.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        xml += `<url>
<loc>${obj.url}</loc>
<lastmod>${data?.updatedAt || now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`;

        xml += `</urlset> `
        return xml;
    } catch (err) {
        return `<?xml version="1.0" encoding="UTF-8"?>`
    }

}
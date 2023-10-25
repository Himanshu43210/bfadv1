import axios from "axios";
import fs from 'fs/promises';
import path from "path";
import { APP_ROUTES } from "./RouteJson.js";
import { generatePropertyUrl } from "./components/utils/propertyUtils.js";

const sitemapGenerator = async () => {
    const staticUrls = [], dynamicUrls = [];
    const appUrl = `https://builderfloor.com`;
    const appRoutes = APP_ROUTES;
    for (const routeKey of Object.keys(appRoutes)) {
        if (routeKey.includes(':')) {
            const limit = 100;
            const apiUrl = 'https://builder-floor-backend-n2ib.onrender.com/api/properties/getHomeData';
            for (let page = 0; page < 100; page += 1) {
                const res = await axios.get(`${apiUrl}?page=${page}&limit=${limit}`);
                if (res.data && res.data.length > 0) {
                    // push into the dynamicUrls list
                    res.data.forEach((item) => {
                        dynamicUrls.push({
                            url: appUrl + generatePropertyUrl(item),
                            lastmod: new Date().toISOString().slice(0, 10),
                        });
                    });
                    if (res.data.length < limit) break;
                } else {
                    break;
                }
            }
        } else {
            // push into the staticUrls list
            staticUrls.push({
                url: appUrl + routeKey,
                lastmod: new Date().toISOString().slice(0, 10),
            });
        }
    }
    console.log('====== STATIC URLS & DYNAMIC URLS LISTS ======', staticUrls[0], dynamicUrls[0], staticUrls.length, dynamicUrls.length);
    let urlsInXML = '';
    staticUrls.forEach((entry) => {
        urlsInXML += `
        <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastmod}</lastmod>
        </url>
        `;
    });
    dynamicUrls.forEach((entry) => {
        urlsInXML += `
        <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastmod}</lastmod>
        </url>
        `;
    });
    const sitemapXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urlsInXML}
        </urlset>
    `;

    fs.writeFile(path.join("..", "public", "sitemap.xml"), sitemapXML)
        .then((res) => {
            console.log('*** SUCCESS : sitemap.xml generation ***');
        })
        .catch((error) => {
            console.log('*** FAILED : sitemap.xml generation ***', error);
        });
};

sitemapGenerator();

export default sitemapGenerator;
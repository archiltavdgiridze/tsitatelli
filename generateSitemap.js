const fs = require("fs");

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tsitatelli.vercel.app/</loc>
    <lastmod>2023-07-17</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://tsitatelli.vercel.app/filter</loc>
    <lastmod>2023-07-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tsitatelli.vercel.app/search</loc>
    <lastmod>2023-07-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tsitatelli.vercel.app/generator</loc>
    <lastmod>2023-07-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://tsitatelli.vercel.app/about_us</loc>
    <lastmod>2023-07-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemapContent);

// Beispiel: Dynamische Erstellung einer Sitemap aus Templates
function generateSitemap(templates) {
    const baseUrl = "https://gamer08yt.github.io/UniFi-Talk-Repo/?template=";
    let xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    templates.forEach(template => {
        xmlSitemap += `  <url>\n`;
        xmlSitemap += `    <loc>${baseUrl}${template.name}</loc>\n`;
        xmlSitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xmlSitemap += `    <priority>0.8</priority>\n`;
        xmlSitemap += `  </url>\n`;
    });

    xmlSitemap += `</urlset>`;
    return xmlSitemap;
}

// Angenommen, du fetchst die Templates so:
$.get("https://api.github.com/repos/Gamer08YT/UniFi-Talk-Repo/contents/", (data) => {
    console.log("SITEMAP");

    const templates = data.filter(file => file.name.endsWith('.json') && file.name !== "package.json");
    const sitemap = generateSitemap(templates);

    // Output oder Speicherung
    console.log(sitemap);
});
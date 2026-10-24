export default function (eleventyConfig) {
  for (const d of ["media", "fonts", "css", "js"]) eleventyConfig.addPassthroughCopy(`src/${d}`);
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  const current = (site) => (site.season === "letni" ? site.hours_summer : site.hours_winter);

  eleventyConfig.addFilter("hoursNow", (site) => {
    const h = current(site);
    return `codziennie ${h.open}–${h.close}`;
  });
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  // schema.org Restaurant data, built from site.json so the CMS keeps it in sync
  eleventyConfig.addFilter("schema", (site, menu) => {
    const h = current(site);
    const close = h.close === "24:00" ? "23:59" : h.close;
    const prices = [];
    for (const c of menu.categories || [])
      for (const it of c.items || [])
        for (const p of it.prices || []) {
          const n = parseFloat(String(p).replace(/[^\d,.]/g, "").replace(",", "."));
          if (!isNaN(n) && n >= 10) prices.push(n);
        }
    const data = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: site.name,
      url: site.url + "/",
      image: site.url + site.og_image,
      telephone: site.phone,
      servesCuisine: ["Kebab", "Turecka", "Fast food"],
      priceRange: prices.length ? `${Math.min(...prices)}–${Math.max(...prices)} zł` : "$",
      hasMenu: site.url + "/menu/",
      acceptsReservations: false,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.street.replace(/^ul\.\s*/, "ul. "),
        postalCode: site.postal_code,
        addressLocality: site.city,
        addressRegion: site.region,
        addressCountry: "PL",
      },
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: h.open,
        closes: close,
      }],
      sameAs: [site.facebook, site.instagram].filter(Boolean),
    };
    return JSON.stringify(data).replace(/</g, "\\u003c");
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
  };
}

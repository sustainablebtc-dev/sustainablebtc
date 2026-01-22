import { MetadataRoute } from "next";

const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

export default function robots(): MetadataRoute.Robots {
   return {
      rules: [
         {
            userAgent: "*", // Allow all user agents
            allow: isProduction ? "/" : "", // Allow all pages
            disallow: isProduction ? ["/studio"] : ["/"], // Disallow the /studio path in production
         },
      ],
      sitemap: isProduction ? "https://www.sustainablebtc.org/sitemap.xml" : "",
   };
}

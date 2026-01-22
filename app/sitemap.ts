import { MetadataRoute } from "next";
import { getNewsPageData } from "@/sanity/sanity-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const baseUrl = "https://www.sustainablebtc.org";
   const lastModified = new Date().toISOString();

   // Define static routes
   const staticRoutes = [
      { url: `${baseUrl}/`, lastModified },
      { url: `${baseUrl}/about-us`, lastModified },
      { url: `${baseUrl}/our-team`, lastModified },
      { url: `${baseUrl}/sustainable-bitcoin-certificate`, lastModified },
      { url: `${baseUrl}/investors`, lastModified },
      { url: `${baseUrl}/miners`, lastModified },
      { url: `${baseUrl}/learn/download-whitepaper`, lastModified },
      { url: `${baseUrl}/learn/faq`, lastModified },
      { url: `${baseUrl}/learn/news`, lastModified },
      { url: `${baseUrl}/learn/learning-center`, lastModified },
      { url: `${baseUrl}/contact-us`, lastModified },
      { url: `${baseUrl}/get-started`, lastModified },
      { url: `${baseUrl}/page/terms-and-conditions`, lastModified },
      { url: `${baseUrl}/page/privacy-policy`, lastModified },
      { url: `${baseUrl}/page/disclaimer`, lastModified },
      { url: `${baseUrl}/events`, lastModified },
      { url: `${baseUrl}/invest`, lastModified },
   ];

   // Fetch dynamic routes from Sanity (with error handling)
   const newsData = await getNewsPageData().catch((error) => {
      console.error("Error fetching news data:", error);
      return { news: [] };
   });

   const filteredNewsData = (newsData?.news || []).filter(
      (news: any) => news.slug?.current
   );

   const newsDynamicRoutes = filteredNewsData.map((news: any) => ({
      url: `${baseUrl}/learn/news/${news.slug.current}`,
      lastModified,
   }));

   return [...staticRoutes, ...newsDynamicRoutes];
}

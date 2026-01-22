import React from "react";

// import components
import HomeHero from "./HomeHero";
import HomeMiners from "./HomeMiners";
import HomeSBC from "./HomeSBC";
import HomeAbout from "./HomeAbout";
import HomeTestimonials from "./HomeTestimonials";
import HomeTrust from "./HomeTrust";
import HomeWhitepaperDownload from "./HomeWhitepaperDownload";
import HomeFaq from "./HomeFaq";

// import Sanity
import { getHomePageData, getMinerPageData,getFaqPageData } from "@/sanity/sanity-utils";

export default async function HomePage() {
   // Get Data
   const homePageData = await getHomePageData();
   const minerPageData = await getMinerPageData();
   const faqPageData = await getFaqPageData();

   const heroData = homePageData.hero || null;
   const minerData = minerPageData.hero || null;
   const sbcData = homePageData.sbc || null;
   const aboutData=homePageData.about || null;
   const testimonialData = homePageData.testimonials || null;
   const trustData = homePageData.trust || null;
   const whitepaperdownloadData = homePageData.whitepaperdownload || null;
   const faqData=homePageData.faq || null;
   const faqsData = faqPageData.faqs || [];


   return (
      <>
         <HomeHero heroData={heroData} />
         <HomeMiners minerData={minerData} />
         <HomeAbout aboutData={aboutData} />
         <HomeSBC sbcData={sbcData} />
         <HomeTestimonials testimonialData={testimonialData} />
         <HomeTrust trustData={trustData} />
         <HomeWhitepaperDownload
            whitepaperdownloadData={whitepaperdownloadData}
         />
         <HomeFaq faqData={faqData} faqsData={faqsData} />
      </>
   );
}

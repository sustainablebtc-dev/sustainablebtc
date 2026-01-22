import React from "react";

// import components
import GetStartedHero from "./GetStartedHero";

// import Sanity
import { getGetStartedPageData } from "@/sanity/sanity-utils";

export default async function GetStartedPage() {
   const investorPageData = await getGetStartedPageData();
   const heroData = investorPageData.hero || null;

   return (
      <>
         <GetStartedHero heroData={heroData} />
      </>
   );
}

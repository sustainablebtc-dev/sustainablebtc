import React from "react";

import SBCHero from "./SBCHero";
import SBCBenefit from "./SBCBenefit";
import SBCComparison from "./SBCComparison";
import SBCAbout from "./SBCAbout";
import SBCBitcoinMiners from "./SBCBitcoinMiners";

// import Sanity
import { getSBCPageData } from "@/sanity/sanity-utils";

export default async function SBCPage() {
   const sbcPageData = await getSBCPageData();
   const heroData = sbcPageData.hero || null;
   const benefitsData = sbcPageData.benefits || null;
   const comparisonData = sbcPageData.comparison || null;
   const aboutSbcData = sbcPageData.aboutSBC || null;
   const bitcoinMinersData = sbcPageData.bitcoinMiners || null;

   return (
      <>
         <SBCHero heroData={heroData} />
         <SBCBenefit benefitsData={benefitsData} />
         <SBCComparison comparisonData={comparisonData} />
         <SBCAbout aboutSbcData={aboutSbcData} />
         <SBCBitcoinMiners bitcoinMinersData={bitcoinMinersData} />
      </>
   );
}

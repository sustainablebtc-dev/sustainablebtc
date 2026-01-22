import React from "react";

import TransparencyHero from "./TransparencyHero";

// import Sanity
import { getTransparencyPageData } from "@/sanity/sanity-utils";

export default async function TransparencyPage() {
   const transparencyPageData = await getTransparencyPageData();
   const heroData = transparencyPageData.hero || null;

   return (
      <>
         <TransparencyHero heroData={heroData} />
      </>
   );
}

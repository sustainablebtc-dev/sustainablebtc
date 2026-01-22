import React from "react";

import SBC2025Hero from "./SBCHero";
import HomeMiners from "../HomeNew/HomeMiners";
import SBCScheduleCall from "./SBCScheduleCall";
import SBCBenefits from "./SBCBenefits";
import SBCProblemAndSolution from "./SBCProblemAndSolution";
import SBCKeyFeatures from "./SBCKeyFeatures";

// import Sanity
import { getSBC2025PageData, getMinerPageData } from "@/sanity/sanity-utils";
import SBCFaq from "./SBCFaq";
import SBCWhatIsSBC from "./SBCWhatIsSBC";

export default async function SBC2025Page() {
   const sbcPageData = await getSBC2025PageData();
   const minerPageData = await getMinerPageData();

   const heroData = sbcPageData.hero || null;
   const whatSBCData = sbcPageData.whatSBC || null;
   const keyFeaturesData = sbcPageData.keyFeatures || null;
   const minerData = minerPageData.hero || null;
   const scheduleCallData = sbcPageData.scheduleCall || null;
   const faqData = sbcPageData.howSBC || null;
   const benefitsOfSBCData = sbcPageData.benefitsOfSBC || null;
   const problemAndSolutionData = sbcPageData.problemAndSolution || null;

   return (
      <>
         {/* Hero */}
         <SBC2025Hero heroData={heroData} />

         {/* What are SBC */}
         <SBCWhatIsSBC whatSBCData={whatSBCData}/>

         {/* Trusted by global leaders */}
         <HomeMiners minerData={minerData}/>

         {/* Key features of SBC */}
         <SBCKeyFeatures keyFeaturesData = {keyFeaturesData} />

         {/* Problem & Solution */}
         <SBCProblemAndSolution problemAndSolutionData={problemAndSolutionData}/>

         {/* How SBCs are created */}
         <SBCFaq faqData={faqData} />

         {/* Schedule a call */}
         <SBCScheduleCall scheduleCallData={scheduleCallData}/>

         {/* Benefits of investing */}
         <SBCBenefits benefitsOfSBCData={benefitsOfSBCData} />
      </>
   );
}

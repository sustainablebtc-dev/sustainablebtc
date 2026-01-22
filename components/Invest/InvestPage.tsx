import React from "react";

// import components
import InvestorHero from "./InvestHero";
import InvestSBC from "./InvestSBC";
import InvestUseCases from "./InvestUseCases";
import InvestScheduleCall from "./InvestScheduleCall";
import InvestPayWall from "./InvestPayWall";

// import Sanity
import { getInvestPageData } from "@/sanity/sanity-utils";

export default async function InvestPage() {
   const investPageData = await getInvestPageData();
   const paywall = investPageData.paywall || null;
   const heroData = investPageData.hero || null;
   const sbcData = investPageData.sbc || null;
   const useCaseData = investPageData.useCase || null;
   const scheduleCallData = investPageData.scheduleCall || null;

   return (
      <>
         {/* This is a limited access wall */}
         <InvestPayWall paywall={paywall}/>

         {/* If access granted, then show the below */}
         <InvestorHero heroData={heroData} />
         <InvestSBC sbcData={sbcData} />
         <InvestUseCases useCaseData={useCaseData} />
         <InvestScheduleCall scheduleCallData={scheduleCallData} />
      </>
   );
}

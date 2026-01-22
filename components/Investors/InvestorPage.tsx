import React from "react";

// import components
import InvestorHero from "./InvestorHero";
import InvestorInvestment from "./InvestorInvestment";
import InvestorSupport from "./InvestorSupport";
import InvestorHelp from "./InvestorHelp";
import InvestorScheduleCall from "./InvestorScheduleCall";

// import Sanity
import { getInvestorPageData } from "@/sanity/sanity-utils";

export default async function InvestorPage() {
   const investorPageData = await getInvestorPageData();
   const heroData = investorPageData.hero || null;
   const investmentData = investorPageData.investment || null;
   const supportData = investorPageData.support || null;
   const investorHelpData = investorPageData.investorHelp || null;
   const scheduleCallData = investorPageData.scheduleCall || null;

   return (
      <>
         <InvestorHero heroData={heroData} />
         <InvestorHelp investorHelpData={investorHelpData} />
         {/* <InvestorInvestment investmentData={investmentData} /> */}
         <InvestorScheduleCall scheduleCallData={scheduleCallData}/>
         {/* <InvestorSupport supportData={supportData} /> */}
      </>
   );
}

import React from "react";

// import components
import AboutUsHero from "./AboutUsHero";
import AboutUsSBP from "./AboutUsSBP";
import AboutUsCommitment from "./AboutUsCommitment";
import AboutUsTeam from "../OurTeam/OurTeam";
import AboutUsSupport from "./AboutUsSupport";

// import Sanity
import { getAboutPageData } from "@/sanity/sanity-utils";

export default async function AboutUsPage() {
   const aboutPageData = await getAboutPageData();
   const heroData = aboutPageData.hero || null;
   const sbpData = aboutPageData.sbp || null;
   const commitmentData = aboutPageData.commitment || null;
   // const teamData = aboutPageData.team || null;
   const supportData = aboutPageData.support || null;

   return (
      <div>
         <AboutUsHero heroData={heroData} />
         <AboutUsSBP sbpData={sbpData} />
         {/* <AboutUsTeam teamData={teamData} /> */}
         <AboutUsCommitment commitmentData={commitmentData} />
         <AboutUsSupport supportData={supportData} />
      </div>
   );
}

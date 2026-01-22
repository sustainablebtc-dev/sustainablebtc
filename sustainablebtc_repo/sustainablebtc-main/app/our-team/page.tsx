import React from "react";

import { Metadata } from "next";

// Import
import OurTeamPage from "@/components/OurTeam/OurTeamPage";

export const metadata: Metadata = {
   title: "Team",
   description:
      "Meet the leadership team driving Bitcoin's clean energy transition. Sustainable Bitcoin Protocol (SBP) is led by experts in sustainable finance, digital asset markets, and renewable energy innovation, united by a mission to align Bitcoin with global climate goals. Our team combines deep industry experience with cutting-edge market solutions to create the world's first appreciating climate asset—Sustainable Bitcoin Certificates (SBCs). By bridging institutional capital with verifiable sustainability solutions, we empower investors to drive measurable environmental impact while enhancing their portfolios. Learn more about the visionaries shaping the future of finance and accelerating the energy transition through Bitcoin.",
   keywords: [
      "Renewable energy Bitcoin mining",
      "Bitcoin mining renewable energy",
      "Bitcoin environmental impact",
      "Bitcoin mining environmental impact",
      "Clean energy Bitcoin mining"
   ]
};

const page = () => {
   return (
      <>
         <OurTeamPage />
      </>
   );
};

export default page;

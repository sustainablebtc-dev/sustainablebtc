import React from "react";

import { Metadata } from "next";

// Import
import AboutUsPage from "@/components/AboutUs/AboutUsPage";

export const metadata: Metadata = {
   title: "About Us",
   description:
      "Unlock a new era of climate-positive investments with Sustainable Bitcoin Protocols (SBP Token) from Sustainable Bitcoin Protocol. By harnessing Bitcoin's unique role as a decentralized, location-agnostic energy buyer, SBP Token transform Bitcoin into a revolutionary asset class driving the global clean energy transition. Pair Bitcoin's performance as the best asset of the past decade with SBP Token's unparalleled climate impact—combining financial growth with meaningful environmental progress.",
   keywords: [
      "Renewable energy Bitcoin mining",
      "Bitcoin mining renewable energy",
      "Bitcoin environmental impact",
      "Bitcoin mining environmental impact",
      "Climate-positive investments",
      "Sustainable Bitcoin Protocols (SBP Token)",
      "Sustainable Bitcoin Protocol",
      "Bitcoin",
      "Decentralized energy buyer",
      "Location-agnostic energy buyer",
      "Revolutionary asset class",
      "Global clean energy transition",
      "Financial growth",
      "Environmental progress",
      "Best asset of the past decade",
      "Climate impact"
   ]
};

const page = () => {
   return (
      <>
         <AboutUsPage />
      </>
   );
};

export default page;

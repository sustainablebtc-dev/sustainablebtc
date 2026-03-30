import React from "react";
import { Metadata } from "next";

// Import
import MicaWhitepaperPage from "@/components/Legal/MicaWhitepaperPage";

export const metadata: Metadata = {
   title: "MiCA Whitepaper | Sustainable Bitcoin Protocol",
   description:
      "View the official MiCA (Markets in Crypto-Assets Regulation) whitepaper for Sustainable Bitcoin Protocol (SBP Token). Notified to the Central Bank of Ireland in accordance with EU Regulation 2023/1114.",
   keywords: [
      "MiCA whiteaper",
      "MiCA compliance",
      "EU regulation",
      "Sustainable Bitcoin Protocol",
      "SBP Token",
      "Regulatory notification",
      "Central Bank of Ireland",
      "Regulation 2023/1114"
   ]
};

const page = () => {
   return (
      <>
         <MicaWhitepaperPage />
      </>
   );
};

export default page;

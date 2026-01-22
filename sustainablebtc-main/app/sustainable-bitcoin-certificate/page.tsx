import React from "react";
import { Metadata } from "next";
import SBC2025Page from "@/components/SBC2025/SBCPage";
import SBCPage from "@/components/SBC/SBCPage";

export const metadata: Metadata = {
   title: "Sustainable Bitcoin Certificates",
   description:
      "Sustainable Bitcoin Certificates (SBCs): Pioneering Renewable Energy in Bitcoin Mining. Discover how SBCs align Bitcoin mining with renewable energy innovation. As the first environmental commodity tied to Bitcoin, SBCs monetize clean energy use, providing a unique investment opportunity that supports the global clean energy transition. SBCs help reduce the environmental impact of Bitcoin mining while offering financial appreciation as Bitcoin's energy consumption grows. Explore sustainable Bitcoin investment strategies, climate-positive cryptocurrency assets, and green energy solutions for the future. Ready to drive real-world renewable energy adoption while diversifying your portfolio? Learn how SBCs bridge renewable energy and Bitcoin's decentralized infrastructure today.",
   keywords: [
      "renewable energy bitcoin mining",
      "bitcoin mining renewable energy",
      "bitcoin environmental impact",
      "bitcoin mining environmental impact",
      "Sustainable Bitcoin Mining",
      "Sustainable Investment Strategies",
      "Climate Change Investment Funds",
      "Bitcoin and Climate Impact Investing",
      "Carbon Neutral Bitcoin Investment",
      "Green Cryptocurrency Investments",
      "Green Energy Bitcoin Investments",
      "Sustainable Bitcoin Investment Opportunities",
      "Renewable energy use in Bitcoin mining",
      "How Bitcoin mining drives renewable energy innovation",
      "Monetizing renewable energy with Bitcoin mining",
      "Clean energy Bitcoin mining"
   ]
};

const SBC = () => {
   return (
      <>
         <SBC2025Page />
         {/* <SBCPage /> */}
      </>
   );
};

export default SBC;

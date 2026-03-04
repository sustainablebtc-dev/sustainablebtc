import React from "react";
import { Metadata } from "next";
import FaqPage from "@/components/FAQs/FaqPage";

export const metadata: Metadata = {
   title: "FAQs",
   description: "Find answers to key questions about Bitcoin's energy use, Proof of Work vs. Proof of Stake, and Sustainable Bitcoin Protocols (SBP Token). Learn how SBP's data-driven transparency ensures Bitcoin mining supports renewable energy growth, mitigates environmental impact, and aligns with global clean energy goals. Explore how SBP Token incentivize verified clean energy use, how we audit Bitcoin mining sustainability, and why Bitcoin's security model remains crucial. Get clear insights on SBP Token pricing, Energy Attribute Certificates (EACs), and how Bitcoin can be a climate-positive asset. Start exploring Bitcoin's sustainable future today!",
   keywords: [
      "Bitcoin's energy use",
      "Proof of Work vs. Proof of Stake",
      "Sustainable Bitcoin Protocols (SBP Token)",
      "Data-driven transparency",
      "Renewable energy growth",
      "Environmental impact",
      "Clean energy goals",
      "Verified clean energy use",
      "Audit Bitcoin mining sustainability",
      "Bitcoin mining sustainability",
      "SBP Token pricing",
      "Energy Attribute Certificates (EACs)",
      "Climate-positive asset",
      "Bitcoin's sustainable future"
   ]
};

const page = () => {
   return <FaqPage />;
};

export default page;

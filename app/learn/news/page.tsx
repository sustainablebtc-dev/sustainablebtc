import React from "react";
import { Metadata } from "next";
import NewsPage from "@/components/News/NewsPage";

export const metadata: Metadata = {
   title: "SBP in the Media",
   description:
      "Discover how Sustainable Bitcoin Protocol (SBP) is pioneering the most impactful climate asset, directly linking institutional capital to renewable energy investment. Stay up to date with the latest industry insights on Bitcoin mining's role in the energy transition, sustainable finance, and high-growth environmental assets.",
   keywords: [
      "Bitcoin mining drives renewable energy adoption",
      "clean energy transition",
      "most impactful climate asset",
      "financially incentivizing renewable energy development",
      "sustainable investments",
      "Bitcoin's environmental impact",
      "renewable energy-powered Bitcoin mining",
      "climate-positive digital assets"
   ]
};

const page = () => {
   return <NewsPage />;
};

export default page;

import React from "react";
import { Metadata } from "next";
import LearningCentrePage from "@/components/LearningCentre/LearningCentrePage";

export const metadata: Metadata = {
   title: "Learning Center",
   description:
      "Explore the fundamentals of Bitcoin, how Bitcoin mining works, and its role in the clean energy transition with free, on-demand lessons from Sustainable Bitcoin Protocol (SBP). Learn how Bitcoin mining supports renewable energy, improves grid stability, and creates a new climate-positive investment opportunity. Our expert-led videos cover topics like Bitcoin sustainability, proof-of-work, energy-efficient mining, and Bitcoin's environmental impact—giving you the insights you need to understand Bitcoin's role in the future of clean energy and finance.",
   keywords: [
      "Bitcoin mining",
      "Bitcoin mining supports renewable energy",
      "Renewable energy Bitcoin mining",
      "Bitcoin sustainability",
      "Proof-of-work",
      "Energy-efficient mining",
      "Bitcoin's environmental impact",
      "Clean energy transition",
      "Grid stability",
      "Climate-positive investment",
      "Sustainable Bitcoin Protocol (SBP)",
      "Clean energy and finance"
   ]
};

const page = () => {
   return <LearningCentrePage />;
};

export default page;

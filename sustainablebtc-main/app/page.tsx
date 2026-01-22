import { Metadata } from "next";

// Import
import HomePage from "@/components/HomeNew/HomePage";

export const metadata: Metadata = {
   title: "Sustainable Bitcoin Protocol | Accelerating the Clean Energy Transition: Powered by Bitcoin",
   description:
      "Discover how Sustainable Bitcoin Protocol (SBP) aligns Bitcoin mining with renewable energy to drive financial returns and climate impact. Learn about Sustainable Bitcoin Certificates (SBCs), a climate-positive asset and the groundbreaking solution for clean energy Bitcoin investments, methane mitigation, and environmental transparency. Explore how institutional investors can accelerate renewable energy adoption, decarbonize digital assets, and create a new class of appreciating environmental commodities.",
   keywords: [
      "Sustainable Bitcoin Protocol",
      "Bitcoin mining",
      "renewable energy",
      "financial returns",
      "climate impact",
      "Sustainable Bitcoin Certificates",
      "clean energy Bitcoin investments",
      "methane mitigation",
      "environmental transparency",
      "institutional investors",
      "Sustainable digital portfolio",
      "clean energy transition",
      "renewable energy Bitcoin mining",
      "Bitcoin mining renewable energy",
      "Percentage of Bitcoin mining done with renewable energy",
      "Bitcoin environmental impact",
      "Bitcoin mining environmental impact"
   ]
};

export default function Home() {
   return (
      <>
         <HomePage />
      </>
   );
}

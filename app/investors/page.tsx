import { Metadata } from "next";

// Import
import InvestorPage from "@/components/Investors/InvestorPage";

export const metadata: Metadata = {
   title: "Investors",
   description:
      "Gain exclusive access to sustainable Bitcoin investment opportunities through Sustainable Bitcoin Protocol (SBP). Our Sustainable Bitcoin Certificates (SBCs) align Bitcoin mining renewable energy with institutional  investment strategies, offering a groundbreaking approach to green cryptocurrency investments. Tailored for accredited investors, family offices, climate investors, green technology funds, Bitcoin miners, climate-focused NGOs, and energy market participants, our portal provides insights into Bitcoin environmental impact, renewable energy Bitcoin mining, and the future of eco-friendly Bitcoin blockchain solutions. Request access now and invest in a carbon-neutral Bitcoin future.",
      keywords: [
          "sustainable Bitcoin investment opportunities",
          "Sustainable Bitcoin Protocol (SBP)",
          "Sustainable Bitcoin Certificates (SBCs)",
          "Bitcoin mining renewable energy",
          "green cryptocurrency investments",
          "institutional investors",
          "family offices",
          "Bitcoin miners",
          "climate-focused NGOs",
          "university endowments",
          "energy market participants",
          "Bitcoin environmental impact",
          "renewable energy Bitcoin mining",
          "eco-friendly Bitcoin blockchain solutions",
          "carbon-neutral Bitcoin future"
      ]
};

const investors = () => {
   return (
      <>
         <InvestorPage />
      </>
   );
};

export default investors;

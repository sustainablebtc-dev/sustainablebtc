import React from "react";
import { Metadata } from "next";
import SBCPage from "@/components/SBC/SBCPage";

export const metadata: Metadata = {
   title: "Sustainable Bitcoin Certificate | Sustainable Bitcoin Protocol",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

const SBC = () => {
   return (
      <>
         <SBCPage />
      </>
   );
};

export default SBC;

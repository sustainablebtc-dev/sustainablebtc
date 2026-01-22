import React from "react";
import { Metadata } from "next";
import TransparencyPage from "@/components/Transparency/TransparencyPage";
import NotFound from "../not-found";

export const metadata: Metadata = {
   title: "Transparency | Sustainable Bitcoin Protocol",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

const page = () => {
   // return <TransparencyPage />;
   return <NotFound />;
};

export default page;

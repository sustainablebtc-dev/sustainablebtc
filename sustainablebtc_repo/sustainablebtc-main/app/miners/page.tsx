import React from "react";
import { Metadata } from "next";
import MinerPage from "@/components/Miner/MinerPage";

export const metadata: Metadata = {
   title: "Miners",
   description:
      "Earn new revenue while ensuring transparency in clean energy Bitcoin mining. Sustainable Bitcoin Protocol (SBP) allows miners to verify their clean energy use and earn Sustainable Bitcoin Certificates (SBCs)—a new asset that rewards environmentally responsible mining. By meeting strict verification standards based on the Greenhouse Gas Protocol, miners can monetize their clean energy efforts while supporting a carbon-neutral Bitcoin future. Qualify for SBCs through renewable energy sources like RECs, PPAs, waste methane gas, and behind-the-meter clean power. Get started today and maximize your mining profitability while driving sustainability.",
      keywords: [
          "clean energy Bitcoin mining",
          "Sustainable Bitcoin Certificates (SBCs)",
          "renewable energy Bitcoin mining",
          "Bitcoin environmental impact",
          "carbon-neutral Bitcoin future",
          "green cryptocurrency mining",
          "mining Bitcoin with renewable energy"
      ]
};

const page = () => {
   return <MinerPage />;
};

export default page;

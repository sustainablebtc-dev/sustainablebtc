import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Invest | Sustainable Bitcoin Protocol",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

import InvestPage from '@/components/Invest/InvestPage';

const page = () => {
  return (
    <div>
      <InvestPage />
    </div>
  )
}

export default page
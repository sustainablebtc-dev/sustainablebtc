import React from 'react';
import { Metadata } from "next";
import RegisterForAnEventPage from '@/components/Events/RegisterForAnEventPage';

export const metadata: Metadata = {
   title: "Register for an Event",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

const events = () => {
   return (
      <>
         <RegisterForAnEventPage />
      </>
   )
}

export default events
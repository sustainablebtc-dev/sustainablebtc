import React from "react";

// import components
import ContactUsHero from "./ContactUsHero";

// import Sanity
import { getContactPageData } from "@/sanity/sanity-utils";

export default async function ContactUsPage() {
   const contactPageData = await getContactPageData();
   const heroData = contactPageData.hero || null;

   return (
      <>
         <ContactUsHero heroData={heroData} />
      </>
   );
}

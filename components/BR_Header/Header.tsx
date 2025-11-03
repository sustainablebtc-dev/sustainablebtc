import React from "react";

// Importing Components
import HeaderContent from "./HeaderContent";

// Importing Sanity
import {
   getNavbarData,
   getNavbarGlobalLeaderstData,
} from "@/sanity/sanity-utils";

export default async function Header() {
   const navbarData = await getNavbarData();
   const navbarGlobalLeadersData = await getNavbarGlobalLeaderstData();
   return (
      <>
         <HeaderContent
            navbarData={navbarData}
            navbarGlobalLeadersData={
               navbarGlobalLeadersData.hero.heroCompanyImages
            }
         />
      </>
   );
}

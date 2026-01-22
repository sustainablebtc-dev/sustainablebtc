"use client";

// Importing styles
import styles from "@/styles/components/Footer.module.scss";

// Next Imports
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
   const pathname = usePathname();

   // Hide footer on /energyweb page as it has its own custom footer
   if (pathname?.includes("/energyweb")) {
      return null;
   }

   return (
      <footer className={styles.footer}>
         <div className={`${styles.container} container`}>
            <div className="flex justify-center items-center py-8">
               <p className="text-gray-500 text-sm">Deal Room Materials: non-binding</p>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
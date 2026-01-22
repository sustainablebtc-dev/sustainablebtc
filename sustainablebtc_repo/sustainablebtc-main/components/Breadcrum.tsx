"use client";

// Styles
import styles from "@/styles/components/Breadcrum.module.scss";

// Next/React
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

const convertBreadcrumb = (str: any) => {
   return str
      .replace(/-/g, " ")
      .replace(/oe/g, "ö")
      .replace(/ae/g, "ä")
      .replace(/ue/g, "ü");
};

const Breadcrum = () => {
   const router = usePathname();
   const [breadcrumbs, setBreadcrumbs] = useState<any>(null);

   useEffect(() => {
      if (router) {
         const linkPath = router.split("/");
         linkPath.shift();

         const pathArray = linkPath.map((path, i) => {
            return {
               breadcrumb: path,
               href: "/" + linkPath.slice(0, i + 1).join("/"),
            };
         });

         setBreadcrumbs(pathArray);
      }
   }, [router]);

   if (!breadcrumbs) {
      return null;
   }

   return (
      <div
         className={`${styles.breadcrum} 
         ${breadcrumbs[0].href == "/" ? styles.hide : ""}`}
      >
         <div className={`${styles.container} container`}>
            <ul>
               <li>
                  <Link href="/" title="Home">
                     <i className="bi bi-house-fill"></i>
                  </Link>
               </li>
               <li>/</li>
               {breadcrumbs.map((breadcrumb: any, i: any) => {
                  return (
                     <React.Fragment key={i}>
                        <li key={`breadcrumb-${i}`}>
                           <Link href={breadcrumb.href}>
                              {convertBreadcrumb(breadcrumb.breadcrumb)}
                           </Link>
                        </li>
                        <li key={`separator-${i}`}>/</li>
                     </React.Fragment>
                  );
               })}
            </ul>
         </div>
      </div>
   );
};

export default Breadcrum;

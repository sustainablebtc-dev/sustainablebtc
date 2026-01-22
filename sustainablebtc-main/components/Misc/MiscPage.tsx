import React from "react";

import styles from "@/styles/pages/MiscPages.module.scss";

import { getMiscPageData } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";

import MiscPageContent from "./MiscPageContent";
import { error } from "console";

export default async function MiscPage({ slug }: { slug: string }) {
   const miscPageData = await getMiscPageData(slug);
   if (miscPageData == null) {
      notFound();
   }
   return (
      <section className={`${styles.miscPage} hero`}>
         <div className={`${styles.container} container`}>
            <MiscPageContent miscPageData={miscPageData} />
         </div>
      </section>
   );
}

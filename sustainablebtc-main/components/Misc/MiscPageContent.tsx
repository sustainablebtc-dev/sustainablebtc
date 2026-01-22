"use client";

// Styles
import styles from "@/styles/pages/MiscPages.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images

const MiscPageContent = ({ miscPageData }: { miscPageData: any }) => {
   return (
      <>
         {/* SEO */}
         <title>{miscPageData.pageTitle}</title>
         <meta
            property="og:title"
            content={miscPageData.pageTitle}
            key="title"
         />

         {/* Content */}
         <div className={styles.MiscPageContent}>
            {/* Title */}
            <h1 className={`${styles.miscTitle} heading heading-2`}>
               <span>{miscPageData.pageTitle}</span>
            </h1>

            {/* Content */}
            <div className={`${styles.miscBody} portableText`}>
               <PortableText value={miscPageData.content} />
            </div>
         </div>
      </>
   );
};

export default MiscPageContent;

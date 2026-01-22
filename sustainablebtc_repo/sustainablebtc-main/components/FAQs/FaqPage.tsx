import React from "react";

// Styles
import styles from "@/styles/pages/Faq.module.scss";


// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Components
import FaqQuestions from "./FaqQuestions";
import { getFaqPageData } from "@/sanity/sanity-utils";

export default async function TransparencyPage() {
   const faqPageData = await getFaqPageData();
   const faqsData = faqPageData.faqs || [];

   return (
      <>
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container`}>
               {/* Heading */}
               <div className={`${styles.faqHeader}`}>
                  <h1 className={`${styles.heading} heading heading-2`}>
                     Frequently Asked Questions
                  </h1>
               </div>

               <div className={`${styles.faqWrapper}`}>
                  {faqsData.map((item:any, i:number) => (
                     
                     <FaqQuestions 
                        key={i}
                        question={item.faqQuestion}
                        answer={item.faqAnswer}
                     />
                  ))}
               </div>
            </div>
         </section>
      </>
   );
}

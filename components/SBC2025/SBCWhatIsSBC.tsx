"use client";
import styles from "@/styles/pages/SBC2025.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imageWhatIsSBC from "@/public/sbc/whatIsSBC.png"

const SBCWhatIsSBC = ({ whatSBCData }: { whatSBCData: any }) => {

   return (
      <>
      <section className={styles.whatSBC}>
         <div className={`${styles.container} container`}>
            <div className={styles.wrapper}>
               {/* Image */}
               <div className={styles.image}>
                  {/* Modal Video */}
                  <Image
                     src={imageWhatIsSBC}
                     width={800}
                     height={600}
                     alt={"What is SBC"}
                  />
               </div>


               {/* Content */}
               <div className={styles.content}>
                  <div className={`${styles.heading} portableText`}>
                     <PortableText value={whatSBCData.whatSBCHeading} />
                  </div>
                  <div className={`${styles.trustDescription} portableText`}>
                     <PortableText value={whatSBCData.whatSBCDescription} />
                  </div>
                  <div></div>
                  <div className={styles.aboutCTA}>
                     {whatSBCData.benefitsCTA.map((cta: any, i: number) => (
                        <Link
                           key={i}
                           href={cta.btnOptions.btnSlug}
                           className={`btn btn-${cta.btnOptions.btnType}`}
                        >
                           <span>{cta.btnText}</span>
                           {cta.btnOptions.btnIcon !== "NA" && (
                              <i
                                 className={`bi bi-${cta.btnOptions.btnIcon}`}
                              ></i>
                           )}
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
      <div className={styles.saperator}></div>
      </>
   );
};

export default SBCWhatIsSBC;

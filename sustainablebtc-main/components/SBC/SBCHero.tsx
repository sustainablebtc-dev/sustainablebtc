"use client";

// Styles
import styles from "@/styles/pages/SBC.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imgHero from "@/public/sbc/hero-img.svg";
import imgHeroBg from "@/public/sbc/heroBg.svg";

const SBCHero = ({ heroData }: { heroData: any }) => {
   return (
      <>
         {/* Background */}
         <Image
            className={styles.heroBg}
            src={imgHeroBg}
            alt="Hero Background"
         />
         {/* Hero */}
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container container-tight`}>
               {heroData && (
                  <>
                     <div className={styles.heroHeadingWrapper}>
                        <div className={`${styles.heroHeading} portableText`}>
                           <PortableText value={heroData.heroHeading} />
                        </div>
                        <div
                           className={`${styles.heroSubHeading} portableText`}
                        >
                           <PortableText value={heroData.heroSubHeading} />
                        </div>
                     </div>
                     {/* Image */}
                     <Image
                        className={styles.heroImg}
                        src={imgHero}
                        alt="Hero Image"
                     />
                  </>
               )}
            </div>
         </section>
      </>
   );
};

export default SBCHero;

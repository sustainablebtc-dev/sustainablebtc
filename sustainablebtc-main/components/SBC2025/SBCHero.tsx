"use client";

// Styles
// import styles from "@/styles/pages/SBC.module.scss";
import styles from "@/styles/pages/SBC2025.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imgHero from "@/public/sbc/sbcHeroForeground.png";
import imgHeroBg from "@/public/sbc/heroBg.svg";
import imgTrustBase from "@/public/home/trust.svg";
import imgBitcoinIcon from "@/public/home/bitcoin-icon.svg";

const SBC2025Hero = ({ heroData }: { heroData: any }) => {
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
            <div className={`${styles.container} container`}>
               {heroData && (
                  <>
                     <div className={styles.heroWrapper}>
                        <div className={`${styles.heroSubHeading} portableText`}>
                           <PortableText value={heroData.heroSubHeading} />
                        </div>
                        <div className={`${styles.heroHeading} portableText`}>
                           <PortableText value={heroData.heroHeading} />
                        </div>
                        <div
                           className={`${styles.heroPara} portableText`}
                        >
                           <PortableText value={heroData.heroPara} />
                        </div>
                     </div>
                     {/* Image */}
                     <div className={styles.heroImages}>
                        <Image
                           className={styles.heroImg}
                           src={imgHero}
                           alt="Hero Image"
                        />
                        {/* Image */}
                        <div className={styles.sbcImage}>
                           <Image src={imgTrustBase} alt="Investor Help" />

                           {/* Bitcoins */}
                           <Image
                              src={imgBitcoinIcon}
                              alt="Bitcoin"
                              width={20}
                              height={20}
                              className={`${styles.bitcoin} ${styles.bitcoin1}`}
                           />
                           <Image
                              src={imgBitcoinIcon}
                              alt="Bitcoin"
                              width={20}
                              height={20}
                              className={`${styles.bitcoin} ${styles.bitcoin2}`}
                           />
                           <Image
                              src={imgBitcoinIcon}
                              alt="Bitcoin"
                              width={20}
                              height={20}
                              className={`${styles.bitcoin} ${styles.bitcoin3}`}
                           />
                           <Image
                              src={imgBitcoinIcon}
                              alt="Bitcoin"
                              width={20}
                              height={20}
                              className={`${styles.bitcoin} ${styles.bitcoin4}`}
                           />
                           <Image
                              src={imgBitcoinIcon}
                              alt="Bitcoin"
                              width={20}
                              height={20}
                              className={`${styles.bitcoin} ${styles.bitcoin5}`}
                           />
                        </div>
                     </div>
                  </>
               )}
            </div>
         </section>
      </>
   );
};

export default SBC2025Hero;

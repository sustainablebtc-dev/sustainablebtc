// Styles
import styles from "@/styles/pages/Investors.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images
// import imgHero from "@/public/investors/heroImg.png";

const InvestorHero = ({ heroData }: { heroData: any }) => {
   return (
      <>
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container`}>
               {/* Headings */}
               {heroData && (
                  <>
                     <div>
                        <h2
                           className={`${styles.heroSubHeading} heading heading-4`}
                        >
                           {heroData.heroSubHeading}
                        </h2>
                        <h1
                           className={`${styles.heroHeading} heading heading-1`}
                        >
                           {heroData.heroHeading}
                        </h1>
                     </div>

                     <div className={styles.heroPara}>
                        <PortableText value={heroData.heroPara} />
                     </div>

                     {/* <div className={styles.heroImg}>
                        <Image src={imgHero} alt="Hero Image" loading="eager" />
                     </div> */}
                  </>
               )}
            </div>
         </section>
      </>
   );
};

export default InvestorHero;

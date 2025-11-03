// Styles
import styles from "@/styles/pages/HomeNew.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity

// Lib
import { PortableText } from "@portabletext/react";

// Images
import imgSbcIcon from "@/public/home/sbc-icon.svg";

// Component
export default function HomeHero({ heroData }: { heroData: any }) {
   return (
      <section className={`${styles.hero} hero`}>
         <div className={`${styles.container} container`}>
            {/* content */}
            {heroData && (
               <>
                  {/* descriptive */}
                  <div className={styles.heroDescription}>
                     <div className={`${styles.heroIcon}`}>
                        <Image src={imgSbcIcon} alt="SBC Icon" loading="lazy"/>
                     </div>
                     <div className={`${styles.heroHeading} portableText`}>
                        <PortableText value={heroData.heroHeading} />
                     </div>
                     <div className={`${styles.heroPara} portableText`}>
                        <PortableText value={heroData.heroDesc} />
                     </div>
                     <div className={styles.heroBtnWrapper}>
                        {heroData.heroCTA1.heroBtn1Visible && (
                           <Link
                              href={heroData.heroCTA1.heroBtn1Slug}
                              className={`btn btn-${heroData.heroCTA1.heroBtn1Type} ${styles.heroBtn}`}
                           >
                              <span>{heroData.heroCTA1.heroBtn1Text}</span>
                              {heroData.heroCTA1.heroBtn1Icon !== "NA" ? (
                                 <>
                                    <i
                                       className={`bi bi-${heroData.heroCTA1.heroBtn1Icon}`}
                                    ></i>
                                 </>
                              ) : (
                                 <></>
                              )}
                           </Link>
                        )}
                        {heroData.heroCTA2.heroBtn2Visible && (
                           <Link
                              href={heroData.heroCTA2.heroBtn2Slug}
                              className={`btn btn-${heroData.heroCTA2.heroBtn2Type} ${styles.heroBtn}`}
                           >
                              <span>{heroData.heroCTA2.heroBtn2Text}</span>
                              {heroData.heroCTA2.heroBtn2Icon !== "NA" ? (
                                 <>
                                    <i
                                       className={`bi bi-${heroData.heroCTA2.heroBtn2Icon}`}
                                    ></i>
                                 </>
                              ) : (
                                 <></>
                              )}
                           </Link>
                        )}
                     </div>
                  </div>
               </>
            )}


            {/* Hero Video */}
            <div className={styles.videoHeroBg}>
               <video autoPlay loop muted preload="metadata">
                  <source src="/about/hero-bg-video.mp4" type="video/mp4" />
               </video>
            </div>
         </div>
      </section>
   );
}

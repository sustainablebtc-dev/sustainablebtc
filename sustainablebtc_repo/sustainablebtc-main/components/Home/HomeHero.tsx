// Styles
import styles from "@/styles/pages/Home.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images
import imgHeroBg from "@/public/home/hero-bg.png";
import imgHeroWindmill from "@/public/home/windmill.svg";
import imgHeroCloud from "@/public/home/cloud.svg";

export default function HomeHero({ heroData }: { heroData: any }) {
   return (
      <section className={`${styles.hero} hero`}>
         <div className={`${styles.container} container`}>
            {/* content */}
            {heroData && (
               <>
                  {/* descriptive */}
                  <div className={styles.heroDescription}>
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

                  {/* logos */}
                  {/* <div className={styles.heroClient}>
                     <h3 className={styles.heroClientLogoTitle}>
                        {heroData.heroCompanyIconsTitle}
                     </h3>

                     <div className={styles.heroClientLogo}>
                        {heroData.heroCompanyImages.map(
                           (item: any, i: number) => (
                              <div key={i}>
                                 <Image
                                    src={urlFor(item).url()}
                                    alt="client logo"
                                    layout="responsive"
                                    width={100}
                                    height={50}
                                 />
                              </div>
                           )
                        )}
                     </div>
                  </div> */}
               </>
            )}


            {/* Hero Video */}
            <div className={styles.videoHeroBg}>
               <video
                  autoPlay
                  loop
                  muted
                  preload="none"
               >
                  <source src="/about/hero-bg-video.mp4" />
               </video>
            </div>
         </div>

         {/* Background Image */}
         {/* <Image
            src={imgHeroBg}
            alt="Hero Background"
            className={styles.imgHeroBg}
            objectFit="contain"
            fetchPriority="high"
         /> */}
      </section>
   );
}

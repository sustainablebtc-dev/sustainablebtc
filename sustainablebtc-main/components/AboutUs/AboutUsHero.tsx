// Styles
import styles from "@/styles/pages/About.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imgHeroOverlay from "@/public/about/hero-overlay.png";
import imgHeroShape from "@/public/about/hero-shape.svg";

const AboutUsHero = ({ heroData }: { heroData: any }) => {
   return (
      <section className={`${styles.hero} hero`}>
         {/* Hero Video */}
         <video
            autoPlay
            loop
            muted
            preload="none"
            className={styles.videoHeroBg}
         >
            <source src="/about/hero-bg-video.mp4" />
         </video>

         {/* Hero Overlay */}
         <Image
            src={imgHeroOverlay}
            alt="Hero Overlay"
            className={styles.imgHeroOverlay}
            loading="eager"
            priority

         />

         {/* Hero Shape */}
         <Image
            src={imgHeroShape}
            alt="Hero Shape"
            className={styles.imgHeroShape}
         />

         <div className={`${styles.container} container`}>
            {/* Heading */}
            <div className={`${styles.heroHeading} portableText`}>
               <PortableText value={heroData.heroHeading} />
            </div>

            {/* Description */}
            <div className={`${styles.heroDescription} portableText`}>
               <PortableText value={heroData.heroDescription} />
            </div>

            {/* CTA */}
            <div className={styles.heroCTA}>
               {heroData.heroCTA.map((cta: any, i: number) => (
                  <>
                     {cta.btnOptions.btnVisible && (
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
                     )}
                  </>
               ))}
            </div>
         </div>
      </section>
   );
};

export default AboutUsHero;

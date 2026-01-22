// Styles
import styles from "@/styles/pages/GetStarted.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images

const GetStartedHero = ({ heroData }: { heroData: any }) => {
   return (
      <>
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container container-tight`}>
               {/* Heading */}
               <div className={`${styles.heroHeading} portableText`}>
                  <PortableText value={heroData.heroHeading} />
               </div>
               {/* Sub Heading */}
               <div className={`${styles.heroSubHeading} portableText`}>
                  <PortableText value={heroData.heroSubHeading} />
               </div>

               {/* Type */}
               <div className={styles.heroLoginTypeWrapper}>
                  {heroData.heroLoginType.map((type: any) => (
                     <>
                        <div className={styles.heroLoginType}>
                           {/* Image */}
                           <div className={styles.heroLoginTypeImage}>
                              <Image
                                 src={urlFor(type.heroLoginTypeImage).url()}
                                 alt={type.heroLoginTypeImage.alt}
                                 width={50}
                                 height={50}
                              />
                           </div>
                           {/* Heading */}
                           <h3
                              className={`${styles.heroLoginTypeHeading} heading heading-4`}
                           >
                              {type.heroLoginTypeHeading}
                           </h3>
                           {/* Para */}
                           <div
                              className={`${styles.heroLoginTypeDescription} portableText`}
                           >
                              <PortableText
                                 value={type.heroLoginTypeDescription}
                              />
                           </div>
                           {/* CTA */}
                           {type.heroLoginTypeCTA && (
                              <Link
                                 href={type.heroLoginTypeCTA.btnOptions.btnSlug}
                                 className={`${styles.heroLoginTypeCTA} btn btn-${type.heroLoginTypeCTA.btnOptions.btnType}`}
                              >
                                 <span>{type.heroLoginTypeCTA.btnText}</span>
                                 {type.heroLoginTypeCTA.btnOptions.btnIcon !==
                                    "NA" && (
                                    <i
                                       className={`bi bi-${type.heroLoginTypeCTA.btnOptions.btnIcon}`}
                                    ></i>
                                 )}
                              </Link>
                           )}
                        </div>
                     </>
                  ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default GetStartedHero;

// Styles
import styles from "@/styles/pages/Miners.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image

const MinerUse = ({ useData }: { useData: any }) => {
   return (
      <>
         <section className={styles.use}>
            <div className={`${styles.container} container`}>
               {/* Heading */}
               <div className={`${styles.useHeading} heading heading-2`}>
                  <PortableText value={useData.useHeading} />
               </div>

               {/* Desctiotion */}
               <div className={`${styles.useDescription} para`}>
                  <PortableText value={useData.useDescription} />
               </div>

               {/* Features */}
               <ul className={styles.useFeatures}>
                  {useData.useFeatures.map((feature: any) => (
                     <>
                        <li>
                           {/* Heading */}
                           <h3
                              className={`${styles.useFeatureHeading} heading heading-5`}
                           >
                              {feature.useFeatureHeading}
                           </h3>

                           {/* Desc */}
                           <div
                              className={`${styles.useFeatureDescription} para`}
                           >
                              <PortableText
                                 value={feature.useFeatureDescription}
                              />
                           </div>
                        </li>
                     </>
                  ))}
               </ul>

               {/* CTA */}
               <div className={styles.useCTA}>
                  {useData.useCTA.map((cta: any, i: number) => (
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
      </>
   );
};

export default MinerUse;

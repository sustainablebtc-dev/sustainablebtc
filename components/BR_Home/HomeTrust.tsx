// Styles
import styles from "@/styles/pages/HomeNew.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images
import imgTrustBase from "@/public/home/trust.svg";
import imgBitcoinIcon from "@/public/home/bitcoin-icon.svg";

const HomeTrust = ({ trustData }: { trustData: any }) => {
   return (
      <section className={styles.trust}>
         <div className={`${styles.container} container container-tight`}>
            <div className={styles.wrapper}>
               {/* Image */}
               <div className={styles.image}>
                  <Image src={imgTrustBase} alt="Trust" />

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
               {/* Content */}
               <div className={styles.content}>
                  <div className={`${styles.trustHeading} portableText`}>
                     <PortableText value={trustData.trustHeading} />
                  </div>
                  <div className={`${styles.trustDescription} portableText`}>
                     <PortableText value={trustData.trustDescription} />
                  </div>
                  <div className={styles.trustCTA}>
                     {trustData.trustCTA.map((cta: any, i: number) => (
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
            </div>
         </div>
      </section>
   );
};

export default HomeTrust;

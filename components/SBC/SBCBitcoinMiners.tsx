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

const SBCBitcoinMiners = ({
   bitcoinMinersData,
}: {
   bitcoinMinersData: any;
}) => {
   return (
      <section className={styles.bitcoinMiners}>
         <div className={`${styles.container} container container-tight`}>
            {bitcoinMinersData && (
               <>
                  {/* Heading */}
                  <div
                     className={`${styles.bitcoinMinersHeading} portableText`}
                  >
                     <PortableText
                        value={bitcoinMinersData.bitcoinMinersHeading}
                     />
                  </div>

                  {/* Features */}
                  <ul className={styles.bitcoinMinersFeatures}>
                     {bitcoinMinersData.bitcoinMinersFeatures.map(
                        (feature: string) => (
                           <li key={feature}>{feature}</li>
                        )
                     )}
                  </ul>

                  {/* Images */}
                  <div className={styles.bitcoinMiners}>
                     {bitcoinMinersData.heroCompanyImages.map(
                        (item: any, i: number) => (
                           <div key={i} className={styles.bitcoinMinersImage}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                 src={urlFor(item).url()}
                                 alt="bitcoinminnerimg"
                                 width={`auto`}
                                 height={`auto`}
                              />
                           </div>
                        )
                     )}
                  </div>
               </>
            )}
         </div>
      </section>
   );
};

export default SBCBitcoinMiners;

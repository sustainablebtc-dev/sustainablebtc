import React from 'react';
import styles from "@/styles/pages/SBC2025.module.scss";
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

const SBCKeyFeatures = ({keyFeaturesData} : {keyFeaturesData: any}) => {
   return (
      <>
         <section className={styles.keyFeatures}>
            {/* Background image */}

            {/* Content */}
            <div className={`container ${styles.container}`}>
               <div className={`${styles.keyFeaturesContent}`}>
                  <div className={`${styles.keyFeaturesHeading} portableText`}>
                     <PortableText value={keyFeaturesData.keyFeaturesHeading}/>
                  </div>
                  <div className={styles.keyFeaturesItems}>
                     {keyFeaturesData.keyFeaturesItems.map((item: any, i: number) => (
                        <>
                           <div className={styles.keyFeaturesItem} key={i}>
                              <h2 className={`${styles.keyFeaturesItemImage} heading heading-2`}>
                                 {item.keyFeaturesItemImage}
                              </h2>
                              <h3 className={`${styles.keyFeaturesItemTitle} heading heading-5`}>
                                 {item.keyFeaturesItemTitle}
                              </h3>
                              <p className={`${styles.keyFeaturesItemDescription} para`}>
                                 {item.keyFeaturesItemDescription}
                              </p>
                           </div>
                        </>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default SBCKeyFeatures;
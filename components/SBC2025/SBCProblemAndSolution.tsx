import React from 'react';
import styles from "@/styles/pages/SBC2025.module.scss";
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import imgTrustBase from "@/public/home/trust.svg";
import imgBitcoinIcon from "@/public/home/bitcoin-icon.svg";

const SBCProblemAndSolution = ({ problemAndSolutionData }: { problemAndSolutionData: any }) => {
   return (
      <>
         <section className={`${styles.problemAndSolution}`}>
            <div className={`${styles.container} container`}>
               <div className={styles.wrapper}>
                  <div className={styles.problemAndSolutionItem}>
                     <div className={`${styles.heading} portableText`}>
                        <PortableText value={problemAndSolutionData.problemsHeading} />
                     </div>
                     <div className={`${styles.description} portableText`}>
                        <PortableText value={problemAndSolutionData.problems} />
                     </div>
                  </div>
                  <div className={styles.problemAndSolutionItem}>
                     <div className={`${styles.heading} portableText`}>
                        <PortableText value={problemAndSolutionData.solutionHeading} />
                     </div>
                     <div className={`${styles.description} portableText`}>
                        <PortableText value={problemAndSolutionData.solution} />
                     </div>
                  </div>
               </div>

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
         </section>
      </>
   )
}

export default SBCProblemAndSolution
"use client";

import React from "react";
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

const ReIntroducingSBPRepresentation = () => {
   return (
      <section className={`${styles.representation} representation`}>
         <div className={`${styles.container} container container-tight`}>
            <div className={styles.representationWrapper}>
               {/* Heading */}
               <div className={styles.representationIntro}>
                  <h2 className={styles.representationHeading}>
                     What SBP <span className={styles.gradientText}>Represents</span>
                  </h2>
                  <p className={styles.representationIntroText}>
                     The SBP token is not a certificate, offset, or derivative. It is a <strong>protocol-native environmental asset</strong> generated exclusively through proof of sustainable Bitcoin mining. It transforms verifiable clean energy usage into a digitally native commodity, driven by Bitcoin and auditable on-chain.
                  </p>
               </div>

               {/* Section 1: No Pre-Mine */}
               <div className={styles.representationSection}>
                  <div className={styles.sectionBadge}>
                     <span className={styles.badgeNumber}>1</span>
                  </div>
                  <div className={styles.sectionContent}>
                     <h3 className={styles.sectionTitle}>No Pre-Mine. No Allocations.</h3>
                     <p className={styles.sectionText}>
                        There is no investor allocation, pre-mining, or speculative issuance. SBP tokens can only be generated through real-world, verified sustainable mining activity. Supply is programmatically linked to energy consumption, an extension of Bitcoin&apos;s Proof-of-Work ethos.
                     </p>
                  </div>
               </div>

               {/* Section 2: Commodification of Transparency */}
               <div className={styles.representationSection}>
                  <div className={styles.sectionBadge}>
                     <span className={styles.badgeNumber}>2</span>
                  </div>
                  <div className={styles.sectionContent}>
                     <h3 className={styles.sectionTitle}>A Commodification of Transparency</h3>

                     {/* Info Box with Bullets */}
                     <div className={styles.infoBox}>
                        <p className={styles.boxIntroText}>
                           Traditional environmental commodities like carbon credits and energy attribute certificates (EACs) have catalyzed renewable deployment but often suffer from:
                        </p>
                        <div className={styles.bulletList}>
                           <div className={styles.bulletItem}>
                              <span className={styles.bulletBubble}></span>
                              <p>Registry opacity and centralized governance</p>
                           </div>
                           <div className={styles.bulletItem}>
                              <span className={styles.bulletBubble}></span>
                              <p>Double-counting risks</p>
                           </div>
                           <div className={styles.bulletItem}>
                              <span className={styles.bulletBubble}></span>
                              <p>Settlement inefficiencies</p>
                           </div>
                        </div>
                     </div>

                     {/* Callout Box */}
                     <div className={styles.calloutBoxRepresentation}>
                        <p>The SBP token is not an offset. It is not a credit. It is a market-based recognition of measurable energy behavior.</p>
                     </div>
                  </div>
               </div>

               {/* Section 3: Institutional On-Ramp */}
               <div className={styles.representationSection}>
                  <div className={styles.sectionBadge}>
                     <span className={styles.badgeNumber}>3</span>
                  </div>
                  <div className={styles.sectionContent}>
                     <h3 className={styles.sectionTitle}>An Institutional On-Ramp</h3>
                     <p className={styles.sectionText}>
                        No one needs SBP tokens to own Bitcoin. But many investors from sovereign wealth funds to climate-aligned retail investors require a defensible sustainability framework around digital asset exposure.
                     </p>
                     <p className={styles.sectionText}>
                        SBP tokens provide that bridge. They separate environmental attributes from the underlying BTC, enabling:
                     </p>

                     {/* Feature Grid */}
                     <div className={styles.featureGrid}>
                        <div className={styles.featureBox}>
                           <p>Transparent sustainability accounting</p>
                        </div>
                        <div className={styles.featureBox}>
                           <p>Market-based claims</p>
                        </div>
                        <div className={styles.featureBox}>
                           <p>Independent auditability</p>
                        </div>
                        <div className={styles.featureBox}>
                           <p>Capital formation aligned with the energy transition</p>
                        </div>
                     </div>

                     <p className={styles.sectionText}>
                        This unlocks access to the trillions of dollars of climate-constrained capital currently unable to engage with Bitcoin directly, providing optionality to those investors who need it through a market-based solution.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ReIntroducingSBPRepresentation;

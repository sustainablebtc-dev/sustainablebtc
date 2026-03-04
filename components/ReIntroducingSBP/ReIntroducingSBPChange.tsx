"use client";

import React from "react";
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

const ReIntroducingSBPChange = () => {
   return (
      <section className={`${styles.change} change`}>
         <div className="container container-tight">
            <div className={styles.changeWrapper}>
               {/* Heading */}
               <h2 className={styles.changeHeading}>
                  Why the <span className={styles.gradientText}>Change</span>?
               </h2>

               {/* First paragraph */}
               <p className={styles.changeParagraph}>
                  When we launched the Protocol, our objective was clear: create the first environmental asset derived directly from verifiable, sustainable Bitcoin mining. In doing so, we can financially reward miners for choosing clean energy, and enable investors to hold BTC in a verifiably climate-positive manner, without compromising bitcoin&apos;s fungibility.
               </p>

               {/* Second section with context paragraph and bullet points */}
               <div className={styles.contextSection}>
                  <p className={styles.changeParagraph}>
                     However, we hear from our bitcoin mining and institutional investor partners that the nomenclature of &quot;Sustainable Bitcoin Protocol&quot; (SBP), vs our native token (SBC), is confusing. The word &quot;Certificate&quot; also created unintended signals in the market:
                  </p>

                  {/* Bullet points container */}
                  <div className={styles.bulletContainer}>
                     <div className={styles.bulletPoint}>
                        <span className={styles.bulletDot}></span>
                        <p>It suggested a <strong>static instrument</strong> rather than a <strong>dynamic system</strong>.</p>
                     </div>
                     <div className={styles.bulletPoint}>
                        <span className={styles.bulletDot}></span>
                        <p>It implied a framing in which Bitcoin needed to be <strong>&quot;fixed&quot;</strong> or <strong>&quot;made green.&quot;</strong></p>
                     </div>
                     <div className={styles.bulletPoint}>
                        <span className={styles.bulletDot}></span>
                        <p>It resembled <strong>legacy environmental commodities</strong> that rely on centralized registries and opaque accounting.</p>
                     </div>
                  </div>
               </div>

               {/* Callout box */}
               <div className={styles.calloutBox}>
                  <p>Bitcoin does not need fixing. Bitcoin is already the most secure, decentralized, and transparent monetary network ever created. Its Proof-of-Work architecture enables an unprecedented degree of energy transparency and verifiability, the largest compute network on Earth.</p>
               </div>

               {/* Final paragraph */}
               <p className={styles.changeParagraph}>
                  We are not here to alter Bitcoin. We are here to build a protocol layer that leverages Bitcoin&apos;s network properties to monetize its sustainable energy footprint - one satoshi at a time. The SBP token name reflects that reality.
               </p>
            </div>
         </div>
      </section>
   );
};

export default ReIntroducingSBPChange;

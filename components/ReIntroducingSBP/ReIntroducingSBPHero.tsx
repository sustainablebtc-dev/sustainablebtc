"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

const ReIntroducingSBPHero = () => {
   return (
      <section className={`${styles.hero} hero`}>
         <div className={`${styles.container} container container-tight`}>
            {/* ReIntroducingSBPHero */}
            <div className={styles.heroWrapper}>
               {/* Tag Line */}
               <div className={styles.tagLine}>
                  <div className={styles.gradientLine}></div>
                  <span className={styles.tagLineText}>Protocol Evolution</span>
                  <div className={styles.gradientLine}></div>
               </div>

               {/* Content Grid */}
               <div className={styles.contentWrapper}>
                  {/* Vertical Divider */}
                  <div className={styles.divider}></div>

                  {/* Left Column - Heading */}
                  <div className={styles.leftColumn}>
                     <h1 className={styles.heading}>
                        <span>(Re)-Introducing</span>
                        <span>the</span>
                        <span className={styles.sbpToken}>SBP Token</span>
                     </h1>
                  </div>

                  {/* Right Column - Description & Buttons */}
                  <div className={styles.rightColumn}>
                     <p className={styles.description}>
                        From static instrument to dynamic protocol. SBP represents the next generation of Bitcoin mining transparency.
                     </p>

                     <div className={styles.buttonGroup}>
                        <Link 
                           href="/sbp-token"
                           className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                           <span>Learn About SBP Token</span>
                           <i className="bi bi-arrow-right"></i>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ReIntroducingSBPHero;

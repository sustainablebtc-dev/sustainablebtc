"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/pages/SBPJoinsCanton.module.scss";

const SBPJoinsCantonHero = () => {
   return (
      <section className={`${styles.hero} hero`}>
         <div className={`${styles.container} container `}>
            <div className={styles.heroWrapper}>
               {/* Main Heading */}
               <h1 className={styles.heading}>
                  <span>Sustainable Bitcoin Protocol Approved as </span>
                  <span className={styles.gradientText}>Validator</span>
                  <span> on the </span>
                  <span className={styles.gradientText}>Canton Network</span>
               </h1>

               {/* Description */}
               <p className={styles.description}>
                  Sustainable Bitcoin Protocol (SBP) has been approved as a validator on the Canton Network, joining a {" "}
                  <a href="https://www.cantonecosystem.com/" target="_blank" rel="noopener noreferrer" className={styles.gradientText}>
                     cohort
                  </a> {" "}
                  that includes Zodia Custody, GSR, Copper, BitGo, and DRW Cumberland.
               </p>

               {/* Button Group */}
               <div className={styles.buttonGroup}>
                  <a href="#about" className={`${styles.button} ${styles.buttonPrimary}`}>
                     <span>Learn About cwBTC</span>
                     <i className="bi bi-arrow-right"></i>
                  </a>
                  <Link href="/contact-us" className={`${styles.button} ${styles.buttonSecondary}`}>
                     <span>Contact Our Team</span>
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SBPJoinsCantonHero;

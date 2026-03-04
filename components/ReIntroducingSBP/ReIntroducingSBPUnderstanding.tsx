"use client";

import React from "react";
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

const ReIntroducingSBPUnderstanding = () => {
   return (
      <section className="container container-tight">
         <div className={styles.understandingSection}>
            {/* Icon Badge */}
            <div className={styles.iconBadge}>
               <i className="bi bi-lightbulb"></i>
            </div>

            {/* Heading */}
            <h2 className={styles.understandingHeading}>
               Bitcoin doesn&apos;t need to <span className={styles.gradientText}>be green</span>.
               <br />
               &nbsp; It needs to be <span className={styles.gradientText}>understood</span>.
            </h2>
            {/* Description */}
            <p className={styles.understandingDescription}>
               The SBP token provides that understanding in a form institutional capital can recognize, trade, and allocate. Not as moral judgment. As economic infrastructure.
            </p>

            {/* Divider */}
            <div className={styles.gradientDivider} />
            {/* Buttons */}
            <div className={styles.buttonGroup}>
               <a href="/learn/faq" className={`${styles.button} ${styles.buttonSecondary}`}>
                  <span>Explore FAQs</span>
                  <i className="bi bi-arrow-right"></i>
               </a>
               <a href="/learn/download-whitepaper" className={`${styles.button} ${styles.buttonPrimary}`}>
                  <span>Read Whitepaper</span>
                  <i className="bi bi-arrow-right"></i>
               </a>
            </div>
         </div >
      </section >
   );
};

export default ReIntroducingSBPUnderstanding;

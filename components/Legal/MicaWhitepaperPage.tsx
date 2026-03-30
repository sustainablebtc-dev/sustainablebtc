"use client";

import React from "react";
import styles from "@/styles/pages/Legal.module.scss";

const MicaWhitepaperPage = () => {
   return (
      <div className={styles.legal}>
         {/* Hero Section */}
         <section className={styles.hero}>
            <div className={styles.container}>
               <div className={styles.heroWrapper}>
                  <div className={styles.tagLine}>
                     <div className={styles.gradientLine}></div>
                     <span className={styles.tagLineText}>Regulatory Documentation</span>
                     <div className={styles.gradientLine}></div>
                  </div>

                  <div className={styles.heroContent}>
                     <h1 className={styles.heading}>
                        MiCA <span className={styles.gradientText}>Whitepaper</span>
                     </h1>
                     <p className={styles.description}>
                        Notified to the Central Bank of Ireland in accordance with Regulation (EU) 2023/1114
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Disclaimer Section */}
         <section className={styles.disclaimerSection}>
            <div className={styles.container}>
               <div className={styles.disclaimerWrapper}>
                  <div className={styles.disclaimerBanner}>
                     <h3 className={styles.disclaimerTitle}>Regulatory Notification</h3>
                     <p className={styles.disclaimerText}>
                        This white paper was notified to the <span className={styles.highlight}>Central Bank of Ireland</span> in accordance with <span className={styles.highlight}>Regulation (EU) 2023/1114</span> on <span className={styles.dateHighlight}>February 27th, 2026</span>.
                     </p>
                     <p className={styles.disclaimerText}>
                        It was subsequently amended on <span className={styles.dateHighlight}>[Date]</span> to include the <span className={styles.highlight}>Digital Token Identifier (DTI)</span> and <span className={styles.highlight}>Equivalent Digital Token Group Identifier (FFG/EDTG)</span>. These updates are non-material and do not affect the rights, obligations, or characteristics of the SBP token.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Download Section */}
         <section className={styles.downloadSection}>
            <div className={styles.container}>
               <div className={styles.downloadWrapper}>
                  <div className={styles.downloadContent}>
                     <h2 className={styles.downloadTitle}>Full Document Download</h2>
                     <p className={styles.downloadDescription}>
                        Access the complete MiCA whitepaper in XHTML format:
                     </p>
                     <div className={styles.buttonGroup}>
                        <a
                           href="/sbp-mica-whitepaper.xhtml"
                           download="sbp-mica-whitepaper.xhtml"
                           className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                           <i className="bi bi-download"></i>
                           <span>Download XHTML</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default MicaWhitepaperPage;

"use client";

import React from "react";
import styles from "@/styles/pages/Legal.module.scss";

const MicaWhitepaperPage = () => {
   return (
      <div className={styles.legal}>
         {/* Hero Section */}
         <section className={styles.hero}>
            <div className={styles.container}>
               <div className={styles.heroContent}>
                  <h1 className={styles.heading}>
                     MiCA <span className={styles.gradientText}>Whitepaper</span>
                  </h1>
                  <p className={styles.notification}>
                     This white paper was notified to the Central Bank of Ireland in accordance with Regulation (EU) 2023/1114 on February 27th, 2026.
                  </p>
               </div>
            </div>
         </section>

         {/* Embedded Whitepaper Viewer */}
         <section className={styles.contentSection}>
            <div className={styles.container}>
               <div className={styles.viewerWrapper}>
                  <iframe
                     src="/sbp-mica-whitepaper.xhtml"
                     className={styles.whitepapeViewer}
                     title="MiCA Whitepaper"
                     sandbox="allow-same-origin"
                  />
                  <p className={styles.viewerFallback}>
                     Having trouble viewing the whitepaper?{" "}
                     <a 
                        href="/sbp-mica-whitepaper.xhtml" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.fallbackLink}
                     >
                        <span>Open in new window</span>
                        <i className="bi bi-box-arrow-up-right ml-2"></i>
                     </a>
                  </p>
               </div>
            </div>
         </section>

         {/* Download Section */}
         <section className={styles.downloadSection}>
            <div className={styles.container}>
               <div className={styles.downloadWrapper}>
                  <div className={styles.downloadContent}>
                     <h2 className={styles.downloadTitle}>Download Full Whitepaper</h2>
                     <p className={styles.downloadDescription}>
                        Access the complete MiCA-compliant whitepaper document:
                     </p>
                     <div className={styles.buttonGroup}>
                        <a
                           href="/sbp-mica-whitepaper.xhtml"
                           download="sbp-mica-whitepaper.xhtml"
                           className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                           <i className="bi bi-download"></i>
                           <span>Download Whitepaper (XHTML)</span>
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

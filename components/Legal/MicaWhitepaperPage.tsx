"use client";

import React from "react";
import styles from "@/styles/pages/Legal.module.scss";

const MicaWhitepaperPage = () => {
   const isProduction = process.env.NODE_ENV === "production";
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
                  {isProduction ? (
                     <iframe
                        src="/sbp-mica-whitepaper.pdf"
                        className={styles.pdfViewer}
                        title="MiCA Whitepaper"
                        sandbox="allow-same-origin allow-scripts"
                     />
                  ) : (
                     <div className={styles.devNotice}>
                        <p>
                           <strong>Note:</strong> The PDF viewer is disabled in development mode due to Firefox security restrictions on localhost. The PDF will display normally in production.
                        </p>
                        <a 
                           href="/sbp-mica-whitepaper.pdf" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className={styles.devLink}
                        >
                           <i className="bi bi-file-pdf"></i>
                           <span>View PDF in New Window</span>
                        </a>
                     </div>
                  )}

                  <p className={styles.viewerFallback}>
                     Having trouble viewing the whitepaper?{" "}
                     <a 
                        href="/sbp-mica-whitepaper.pdf" 
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
                           href="/sbp-mica-whitepaper.pdf"
                           download="sbp-mica-whitepaper.pdf"
                           className={`${styles.button} ${styles.buttonPrimary}`}
                        >
                           <i className="bi bi-download"></i>
                           <span>Download Whitepaper</span>
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

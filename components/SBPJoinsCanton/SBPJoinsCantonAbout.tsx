"use client";

import styles from "@/styles/pages/SBPJoinsCanton.module.scss";

const SBPJoinsCantonAbout = () => {
   const features = [
      { label: "Configurable Privacy" },
      { label: "Interoperable Smart Contracts" },
      { label: "Capital Markets-Grade Infrastructure" },
   ];

   return (
      <section id="about" className={`${styles.about} about`}>
         <div className={`${styles.container} container`}>
            {/* Header Section */}
            <div className={styles.aboutHeader}>
               {/* Section Label */}
               <div className={styles.sectionLabel}>
                  <div className={styles.labelLine}></div>
                  <span className={styles.labelText}>Infrastructure Context</span>
                  <div className={styles.labelLine}></div>
               </div>

               {/* Heading */}
               <h2 className={styles.aboutHeading}>
                  <span>About</span>
                  <span className={styles.gradientText}>{` Canton Network`}</span>
               </h2>
            </div>

            {/* Description */}
            <p className={styles.aboutDescription}>
               Canton is designed specifically for institutional finance, providing configurable privacy, interoperable smart contracts, and capital markets-grade infrastructure.
            </p>

            {/* Features */}
            <div className={`${styles.featuresContainer} container-tight`}>
               {features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                     <div className={styles.featureLine}></div>
                     <p className={styles.featureLabel}>{feature.label}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default SBPJoinsCantonAbout;

"use client";

import React from "react";
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

const ReIntroducingSBPBitcoinFixing = () => {
   return (
      <section className={`${styles.bitcoinFixing} bitcoinFixing`}>
         <div
            className={`container`}
         >
            <div
               className={`${styles.parallaxContainer} `}
               style={{
                  backgroundImage: "url('/sbc/understanding-bg.png')",
                  backgroundAttachment: "fixed",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            >
               <div className={styles.parallaxOverlay}></div>
               <div className={styles.radialOverlay}></div>
               <div className={styles.parallaxContent}>
                  <h2 className={styles.parallaxHeading}>Bitcoin does not need fixing.</h2>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ReIntroducingSBPBitcoinFixing;

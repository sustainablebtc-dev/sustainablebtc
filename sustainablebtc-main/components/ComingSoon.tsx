import React from "react";
import styles from "@/styles/components/ComingSoon.module.scss";
import Link from "next/link";

const ComingSoon = () => {
   return (
      <div className={styles.comingSoon}>
         <div className={`${styles.container} container`}>
            <p className={`${styles.para} para`}>
               — The page will be live soon
            </p>
            <h1 className={`${styles.heading} heading heading-1`}>
               Coming Soon...
            </h1>

            <div className={styles.doYouKnow}>
               <h6 className="heading heading-6">
                  <strong>Do you know?</strong>
               </h6>
               <p className="para mt-2">
                  Data transparency is a core tenet of Sustainable Bitcoin
                  Protocol. Transparency is the most valuable lever we have to
                  drive credibility and trust.
               </p>
               <p className="para mt-2">
                  SBP will publish all clean energy data pertaining to the
                  issuance of Sustainable Bitcoin Certificates so that all
                  stakeholders including investors, governments, and climate
                  organizations can make informed decisions.
               </p>
            </div>

            <div className={styles.btnWrapper}>
               <Link href="/" className="btn btn-primary">
                  <span>Visit Home</span>
                  <i className="bi bi-arrow-up-right-circle"></i>
               </Link>
               {/* <Link href="/get-started" className="btn btn-secondary">
                  <span>Get started</span>
               </Link> */}
            </div>
         </div>
      </div>
   );
};

export default ComingSoon;

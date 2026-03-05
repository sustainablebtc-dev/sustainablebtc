"use client";

import React from "react";
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

const ReIntroducingSBPAnnouncement = () => {
   return (
      <section className={`${styles.announcement} announcement`}>
         <div className={`${styles.container} container container-tight`}>
            <div className={styles.announcementContent}>
               <h2 className={styles.announcementHeading}>
                  The Sustainable Bitcoin Certificate (SBC) is now the Sustainable Bitcoin Protocol token (SBP).
               </h2>
               <p className={styles.announcementDescription}>
                  This is more than a renaming. It is a sharper articulation of what we have always been building, and an invitation to the miners and investors who will define this market alongside us.
               </p>
            </div>
         </div>
      </section>
   );
};

export default ReIntroducingSBPAnnouncement;

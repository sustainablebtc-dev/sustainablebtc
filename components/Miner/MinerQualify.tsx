// Styles
import styles from "@/styles/pages/Miners.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image

const MinerQualify = ({ qualifyData }: { qualifyData: any }) => {
   return (
      <section className={styles.qualify}>
         <div className={`${styles.container} container`}>
            {/* Heading */}
            <div className={`${styles.qualifyHeading} heading heading-2`}>
               <PortableText value={qualifyData.qualifyHeading} />
            </div>

            {/* List */}
            <div className={styles.qualifyPractices}>
               {qualifyData.qualifyPractices.map((item: any) => (
                  <>
                     <div className={`${styles.card} para`}>{item}</div>
                  </>
               ))}
            </div>
         </div>
      </section>
   );
};

export default MinerQualify;

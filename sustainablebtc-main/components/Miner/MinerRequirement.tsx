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

const MinerRequirement = ({ requirementData }: { requirementData: any }) => {
   return (
      <>
         <section className={styles.requirement}>
            <div className={`${styles.container} container`}>
               {/* Heading */}
               <div
                  className={`${styles.requirementHeading} heading heading-2`}
               >
                  <PortableText value={requirementData.requirementHeading} />
               </div>
               {/* Image */}
               <div className={styles.requirementImage}>
                  <Image
                     src={urlFor(requirementData.requirementImage).url()}
                     alt={requirementData.requirementImage.alt}
                     width={1200}
                     height={1200}
                  />
               </div>

               {/* Notes */}
               <div className={`${styles.requirementNotes} para`}>
                  <PortableText value={requirementData.requirementNotes} />
               </div>
            </div>
         </section>
      </>
   );
};

export default MinerRequirement;

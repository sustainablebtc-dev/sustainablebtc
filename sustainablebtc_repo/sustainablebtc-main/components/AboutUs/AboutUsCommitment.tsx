// Styles
import styles from "@/styles/pages/About.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image

const AboutUsCommitment = ({ commitmentData }: { commitmentData: any }) => {
   return (
      <section className={styles.commitment}>
         <div className={`${styles.container} container`}>
            {/* Heading */}
            <div className={`${styles.commitmentHeading} portableText`}>
               <PortableText value={commitmentData.commitmentHeading} />
            </div>

            {/* Commitments */}
            <div className={styles.commitments}>
               {commitmentData.commitmentItems.map((item: any) => (
                  <>
                     <div className={styles.commitmentItem}>
                        <h3 className="heading heading-5">
                           {item.commitmentItemHeading}
                        </h3>
                        <div className="portableText">
                           <PortableText
                              value={item.commitmentItemBlockDescription}
                           />
                        </div>
                     </div>
                  </>
               ))}
            </div>
         </div>
      </section>
   );
};

export default AboutUsCommitment;

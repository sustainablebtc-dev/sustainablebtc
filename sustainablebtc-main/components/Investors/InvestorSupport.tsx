// Styles
import styles from "@/styles/pages/Investors.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

const InvestorSupport = ({ supportData }: { supportData: any }) => {
   return (
      <>
         <section className={styles.support}>
            <div className={`${styles.container} container`}>
               {/* Heading */}
               <div>
                  <div className={`${styles.supportHeading} heading heading-2`}>
                     <PortableText value={supportData.supportHeading} />
                  </div>
                  {/* Sub Heading */}
                  <div
                     className={`${styles.supportSubHeading} heading heading-6`}
                  >
                     {supportData.supportSubHeading}
                  </div>
               </div>

               {/* Support type */}
               {supportData.supportTypes.map((supportType: any) => (
                  <>
                     <div className={styles.supportType}>
                        {/* Heading */}
                        <h3
                           className={`${styles.supportTypeHeading} heading heading-4`}
                        >
                           {supportType.supportTypeHeading}
                        </h3>

                        {/* Images */}
                        <div className={styles.supportTypeLogoWrapper}>
                           {supportType.supportTypeLogos.map(
                              (logo: any, i: number) => (
                                 <div
                                    key={i}
                                    className={styles.supportTypeLogo}
                                 >
                                    <Image
                                       src={urlFor(logo).url()}
                                       alt="client logo"
                                       width={300}
                                       height={100}
                                    />
                                 </div>
                              )
                           )}
                        </div>
                     </div>
                  </>
               ))}
            </div>
         </section>
      </>
   );
};

export default InvestorSupport;

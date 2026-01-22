// Styles
import styles from "@/styles/pages/HomeNew.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";
import imgFooterFormBg from "@/public/home/whitepaperBG.svg";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

const HomeWhitepaperDownload = ({
   whitepaperdownloadData,
}: {
   whitepaperdownloadData: any;
}) => {
   return (
      <section className={styles.downloadwhitepaper}>
         <div className={`${styles.container} container`}>
            <div className={styles.wrapper}>
               {/* Content */}
               <div className={styles.content}>
                  <div
                     className={`${styles.downloadWhitepaperHeading} portableText`}
                  >
                     <PortableText
                        value={whitepaperdownloadData.whitepaperdownloadHeading}
                     />
                  </div>
                  <div className={`${styles.trustDescription} portableText`}>
                     <PortableText
                        value={
                           whitepaperdownloadData.whitepaperdownloadDescription
                        }
                     />
                  </div>
               </div>
               <div className={styles.downloadwhitepaperCTA}>
                  {whitepaperdownloadData.whitepaperdownloadCTA.map(
                     (cta: any, i: number) => (
                        <>
                           {cta.btnOptions.btnVisible && (
                              <Link
                                 key={i}
                                 href={cta.btnOptions.btnSlug}
                                 className={`btn btn-${cta.btnOptions.btnType} ${styles.whitepaperdownloadCTABtn}`}
                              >
                                 {cta.btnOptions.btnIcon !== "NA" && (
                                    <i
                                       className={`bi bi-${cta.btnOptions.btnIcon}`}
                                    ></i>
                                 )}
                                 <span>{cta.btnText}</span>
                              </Link>
                           )}
                        </>
                     )
                  )}
               </div>
            </div>

            {/* Image */}
            <Image
               src={imgFooterFormBg}
               alt="Background Whitepaper Form"
               className={styles.whitepaperBg}
            />
         </div>
      </section>
   );
};

export default HomeWhitepaperDownload;

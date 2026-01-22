// Styles
import styles from "@/styles/pages/Investors.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images
import imgTrustBase from "@/public/home/trust.svg";
import imgBitcoinIcon from "@/public/home/bitcoin-icon.svg";

const InvestorHelp = ({ investorHelpData }: { investorHelpData: any }) => {
   return (
      <section className={styles.investorHelp}>
         <div className={`${styles.container} container`}>
            <div className={styles.wrapper}>
               {/* Image */}
               <div className={styles.image}>
                  <Image src={imgTrustBase} alt="Investor Help" />

                  {/* Bitcoins */}
                  <Image
                     src={imgBitcoinIcon}
                     alt="Bitcoin"
                     width={20}
                     height={20}
                     className={`${styles.bitcoin} ${styles.bitcoin1}`}
                  />
                  <Image
                     src={imgBitcoinIcon}
                     alt="Bitcoin"
                     width={20}
                     height={20}
                     className={`${styles.bitcoin} ${styles.bitcoin2}`}
                  />
                  <Image
                     src={imgBitcoinIcon}
                     alt="Bitcoin"
                     width={20}
                     height={20}
                     className={`${styles.bitcoin} ${styles.bitcoin3}`}
                  />
                  <Image
                     src={imgBitcoinIcon}
                     alt="Bitcoin"
                     width={20}
                     height={20}
                     className={`${styles.bitcoin} ${styles.bitcoin4}`}
                  />
                  <Image
                     src={imgBitcoinIcon}
                     alt="Bitcoin"
                     width={20}
                     height={20}
                     className={`${styles.bitcoin} ${styles.bitcoin5}`}
                  />
               </div>
               {/* Content */}
               <div className={styles.content}>
                  <div className={`${styles.trustHeading} portableText`}>
                     <PortableText value={investorHelpData.investorHelpHeading} />
                  </div>
                  <div className={`${styles.trustDescription} portableText`}>
                     <PortableText value={investorHelpData.investorHelpDescription} />
                  </div>
                  <div className={`${styles.trustBullet} portableText`}>
                     <PortableText value={investorHelpData.investorHelpBulletHeading} />
                  </div>
                  <div className={`${styles.trustBullet} portableText`}>
                     <PortableText value={investorHelpData.investorHelpBullets} />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default InvestorHelp;

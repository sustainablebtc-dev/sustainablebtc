// Styles
import styles from "@/styles/pages/Transparency.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imgCloud from "@/public/home/cloud.svg";

const TransparencyHero = ({ heroData }: { heroData: any }) => {
   return (
      <section className={`${styles.hero} hero`}>
         {/* Cloud */}
         <Image src={imgCloud} alt="Cloud" className={styles.imgCloud}  loading="eager" />
         <Image src={imgCloud} alt="Cloud" className={styles.imgCloud2} loading="eager" priority />

         <div className={`${styles.container} container`}>
            {/* Heading */}
            <div className={`${styles.heroHeading} heading heading-1`}>
               <PortableText value={heroData.heroHeading} />
            </div>
            {/* Sub Heading */}
            <div className={`${styles.heroSubHeading} heading heading-5`}>
               <PortableText value={heroData.heroSubHeading} />
            </div>
            {/* Types */}
            <div className={styles.heroType}>
               {heroData.heroType.map((type: any) => (
                  <>
                     <div className={styles.type}>
                        {/* Heading */}
                        <div>
                           <PortableText value={type.heroTypeHeading} />
                        </div>
                        {/* Image */}
                        <Image
                           src={urlFor(type.heroTypeImage).url()}
                           alt={type.heroTypeImage.alt}
                           className={styles.heroTypeImage}
                           width={200}
                           height={200}
                           
                        />
                     </div>
                  </>
               ))}
            </div>
            {/* Descriotion */}
            <div className={styles.separator}></div>
            <div className={`${styles.heroDescription} para`}>
               <PortableText value={heroData.heroDescription} />
            </div>
         </div>
      </section>
   );
};

export default TransparencyHero;

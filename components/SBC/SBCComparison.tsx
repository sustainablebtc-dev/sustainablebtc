"use client";

// Styles
import styles from "@/styles/pages/SBC.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";
import {
   ReactCompareSlider,
   ReactCompareSliderImage,
} from "react-compare-slider";

// Image

const SBCComparison = ({ comparisonData }: { comparisonData: any }) => {
   const handlePositionChange: any = useCallback((position: any) => {}, []);

   return (
      <section className={styles.comparison}>
         <div className={`${styles.container} container container-tight`}>
            {comparisonData && (
               <>
                  {/* Heading */}
                  <div className={`${styles.comparisonHeading} portableText`}>
                     <PortableText value={comparisonData.comparisonTitle} />
                  </div>
                  {/* Features */}
                  <ul className={styles.comparisonFeatures}>
                     {comparisonData.comparisonFeatures.map(
                        (feature: string) => (
                           <li key={feature}>{feature}</li>
                        )
                     )}
                  </ul>
                  {/* Comparison */}
                  <ReactCompareSlider
                     className={styles.comparisonSlider}
                     itemOne={
                        <ReactCompareSliderImage
                           className={styles.comparisonSliderImg}
                           src={urlFor(
                              comparisonData.comparisonImageGreen
                           ).url()}
                           alt={comparisonData.comparisonImageGreen.alt}
                        />
                     }
                     itemTwo={
                        <ReactCompareSliderImage
                           className={styles.comparisonSliderImg}
                           src={urlFor(
                              comparisonData.comparisonImageDark
                           ).url()}
                           style={{ filter: "grayscale(1) brightness(0.8)" }}
                           alt={comparisonData.comparisonImageDark.alt}
                        />
                     }
                     onPositionChange={handlePositionChange}
                     changePositionOnHover={handlePositionChange}
                  />
               </>
            )}
         </div>
      </section>
   );
};

export default SBCComparison;

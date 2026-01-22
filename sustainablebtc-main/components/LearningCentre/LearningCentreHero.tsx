import React from 'react';

// Styles
import styles from "@/styles/pages/LearningCentre.module.scss";

// Lib
import { PortableText } from "@portabletext/react";

const LearningCentreHero = ({ heroData }: { heroData: any }) => {
   return (
      <>
         <section className={styles.hero}>
            {heroData &&
               <>
                  <div className='portableText'>
                     <PortableText value={heroData.heroHeading} />
                  </div>
                  <div className={`portableText ${styles.heroDescription}`}>
                     <PortableText value={heroData.heroDescription} />
                  </div>
                  <div className={styles.heroTags}>
                     {heroData.heroTags.map((tag: string) => (
                        <>
                           <span>{tag}</span>
                        </>
                     ))}
                  </div>
               </>
            }
         </section>

      </>
   )
}

export default LearningCentreHero
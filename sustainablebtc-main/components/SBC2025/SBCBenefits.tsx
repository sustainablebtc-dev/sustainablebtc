import React from 'react'
import styles from "@/styles/pages/SBC2025.module.scss";
import { PortableText } from '@portabletext/react';

const SBCBenefits = ({benefitsOfSBCData}:{benefitsOfSBCData : any}) => {
  return (
    <>
      <section className={styles.sbcBenefits}>
         <div className={`${styles.container} container container-tight`}>
            <div className={`${styles.heading} portableText`}>
               <PortableText value={benefitsOfSBCData.benefitsOfSBCHeading}/>
            </div>
            <div className={styles.benefitsItems}>
               {benefitsOfSBCData.benefitsOfSBCItems && 
                  benefitsOfSBCData.benefitsOfSBCItems.map((item:any, index:any) => (
                     <>
                        <div className={styles.benefitsItem} key={index}>
                           <i className={`${styles.icon} bi bi-check-circle-fill`}></i>
                           <p className={`${styles.para} para`}>{item}</p>
                        </div>
                     </>
                  ))
               }
            </div>
         </div>
      </section>
    </>
  )
}

export default SBCBenefits
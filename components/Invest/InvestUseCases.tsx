import React from 'react'
// Styles
import styles from "@/styles/pages/Invest.module.scss";

import { PortableText } from '@portabletext/react'

const InvestUseCases = ({useCaseData} : {useCaseData:any}) => {
  return (
    <section className={styles.useCases}>
      <div className={`${styles.container} container`}>
         <div className={`${styles.useCaseHeading} portableText`}>
            <PortableText value={useCaseData.useCaseHeading} />
         </div>
         <div>
            <ul className={styles.useCaseScenerioList}>
               {useCaseData.useCaseScenerio.map((element: any, i: any) => (
                  <li key={i} className={styles.useCaseScenerioItem}>
                     {element.useCaseScenerioItem}
                  </li>
               ))}
            </ul>
         </div>
      </div>
    </section>
  )
}

export default InvestUseCases
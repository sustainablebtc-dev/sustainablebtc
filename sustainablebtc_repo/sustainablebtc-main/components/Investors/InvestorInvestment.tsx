// Styles
import styles from "@/styles/pages/Investors.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

const InvestorInvestment = ({ investmentData }: { investmentData: any }) => {
   return (
      <>
         <section className={styles.investment}>
            <div className={`${styles.container} container`}>
               {/* Heading */}
               <div>
                  <div
                     className={`${styles.investmentHeading} heading heading-2`}
                  >
                     <PortableText value={investmentData.investmentHeading} />
                  </div>
                  {/* Sub Heading */}
                  <div
                     className={`${styles.investmentSubHeading} heading heading-6`}
                  >
                     {investmentData.investmentSubHeading}
                  </div>
               </div>

               {/* Formula */}
               <div className={styles.investmentFormula}>
                  {/* LHS */}
                  <div className={styles.investmentFormulaLHS}>
                     <div className={styles.investmentFormulaValue}>
                        {investmentData.investmentFormula.investmentFormulaLHS}
                     </div>
                  </div>
                  {/* RHS */}
                  <div>
                     <div className={styles.investmentFormulaValue}>
                        {investmentData.investmentFormula.investmentFormulaRHS}
                     </div>
                     <div className={styles.investmentFormulaSubHeading}>
                        {
                           investmentData.investmentFormula
                              .investmentFormulaRHSSubHeading
                        }
                     </div>
                     <ul className={styles.investmentFormulaTags}>
                        {investmentData.investmentFormula.investmentFormulaRHSTags.map(
                           (tag: string) => (
                              <li key={tag}>{tag}</li>
                           )
                        )}
                     </ul>
                  </div>
               </div>

               {/* Para */}
               <div className={`${styles.investmentDescription} para`}>
                  <PortableText value={investmentData.investmentDescription} />
               </div>

               {/* CTA */}
               <div className={styles.investmentCTA}>
                  {investmentData.investmentCTA.map((cta: any, i: number) => (
                     <>
                        {cta.btnOptions.btnVisible && (
                           <Link
                              key={i}
                              href={cta.btnOptions.btnSlug}
                              className={`btn btn-${cta.btnOptions.btnType}`}
                           >
                              <span>{cta.btnText}</span>
                              {cta.btnOptions.btnIcon !== "NA" && (
                                 <i
                                    className={`bi bi-${cta.btnOptions.btnIcon}`}
                                 ></i>
                              )}
                           </Link>
                        )}
                     </>
                  ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default InvestorInvestment;

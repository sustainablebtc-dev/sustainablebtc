// Styles
import styles from "@/styles/pages/Faq.module.scss";
// Next/React
import Link from "next/link";

import FaqQuestions from "../FAQs/FaqQuestions";
//import faqPage from "@/sanity/schemas/faqPage-schema";
// Lib
import { PortableText } from "@portabletext/react";

const HomeFaq = ({ faqData, faqsData }: { faqData: any; faqsData: any }) => {
   return (
      <>
         <section className={styles.homeFaq}>
            <div className={`${styles.container} container container-tight`}>
               <div className={styles.wrapper}>
                  {/* Content */}
                  <div className={styles.content}>
                     <div className={`${styles.faqHeading} portableText`}>
                        <PortableText value={faqData.faqHeading} />
                     </div>
                  </div>
                  <div className={styles.faqCTA}>
                     {faqData.faqCTA && faqData.faqCTA.map((cta: any, i: number) => (
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
               <div className={`${styles.faqWrapper}`}>
                  {faqsData &&
                     faqsData
                        .filter((item: any) => {
                           return item.faqAvailableOnHomePage == true;
                        })
                        .map((item: any, i: number) => (
                           <FaqQuestions
                              key={i}
                              question={item.faqQuestion}
                              answer={item.faqAnswer}
                           />
                        ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default HomeFaq;

// Styles
import styles from "@/styles/pages/Faq.module.scss";
// Next/React
import Link from "next/link";

import FaqQuestions from "../FAQs/FaqQuestions";
//import faqPage from "@/sanity/schemas/faqPage-schema";
// Lib
import { PortableText } from "@portabletext/react";

const SBCFaq = ({ faqData }: { faqData: any }) => {
   return (
      <>
         <section className={`${styles.homeFaq} ${styles.SBCFaq}`}>
            <div className={`${styles.container} container container-tight`}>
               <div className={styles.wrapper}>
                  {/* Content */}
                  <div className={styles.content}>
                     <div className={`${styles.howSBC} portableText`}>
                        <PortableText value={faqData.howSBCHeading} />
                     </div>
                  </div>
               </div>
               <div className={`${styles.faqWrapper}`}>
                  {faqData &&
                     faqData.howSBCItems
                        .map((item: any, i: number) => (
                           <FaqQuestions
                              key={i}
                              question={item.howSBCItemQuestion}
                              answer={item.howSBCItemAnswer}
                           />
                        ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default SBCFaq;

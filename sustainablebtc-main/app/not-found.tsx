"use client";

import styles from "@/styles/components/404.module.scss";

// Libraries
import { useEffect, useRef, useState } from "react";
import type { LottiePlayer } from "lottie-web";

export default function NotFound() {
   const ref = useRef<HTMLDivElement>(null);
   const [lottie, setLottie] = useState<LottiePlayer | null>(null);

   useEffect(() => {
      import("lottie-web").then((Lottie) => setLottie(Lottie.default));
   }, []);

   useEffect(() => {
      if (lottie && ref.current) {
         const animation = lottie.loadAnimation({
            container: ref.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            // path to your animation file, place it inside public folder
            path: "../404-lottie.json",
         });

         return () => animation.destroy();
      }
   }, [lottie]);
   return (
      <section className={`${styles.hero} hero`}>
         <div className={`${styles.container} container container-tight`}>
            <div ref={ref} className={styles.lottie} />
            <h2 className={`${styles.heading} heading heading-1`}>Not Found</h2>
            <h2 className={`${styles.subHeading} heading heading-6`}>
               The page you are looking for is not available
            </h2>
            <div className={styles.btnGroup}>
               <a

                  href="/sustainable-bitcoin-certificate"
                  className="btn btn-primary"
               >
                  <span>Learn about SBC</span>
               </a>
               <a href="/" className="btn btn-secondary">
                  <span>Visit Home</span>
                  <i className="bi bi-arrow-up-right-circle"></i>
               </a>
            </div>
         </div>
      </section>
   );
}

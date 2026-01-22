"use client";
import { useState, useRef, useEffect } from "react";

// Styles
import styles from "@/styles/pages/Invest.module.scss";
import "plyr/dist/plyr.css";

// Lib
import { PortableText } from "@portabletext/react";

const InvestHero = ({ heroData }: { heroData: any }) => {

   // #region autoplay YouTube video
   const videoRef = useRef(null);
   const [isInView, setIsInView] = useState(false);

   useEffect(()=>{
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsInView(true);
               observer.disconnect();
            }
         },
         { threshold: 0.5 }
      );

      if(videoRef.current){
         observer.observe(videoRef.current);
      }

      return () => {
         if (videoRef.current) {
            observer.disconnect(); // Ensure cleanup of the observer
         }
      };
   },[])
   // #endregion

   return (
      <>
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container`}>
               {/* Headings */}
               {heroData && (
                  <>
                     <div className={`${styles.heroHeading} portableText`}>
                        <PortableText value={heroData.heroHeading} />
                     </div>

                     <div className={styles.image} id="player" style={{
                        width: "100%",
                        borderRadius: "1rem",
                        aspectRatio: "16 / 9"
                     }}>
                        {heroData.heroVideo?.asset && 
                           <video controls width="600" 
                                 className={styles.image}
                                 onContextMenu={(event) => event.preventDefault()}>
                              <source
                                 src="https://cdn.sanity.io/files/6e7plt23/production/9247eecac69a79701ebceca8a1dbe5c18b5929f9.mp4" // Dynamically resolves the asset URL
                                 type="video/mp4"
                              />
                              Your browser does not support the video tag.
                           </video>
                        }
                        {/* <iframe
                           src={`${heroData.heroYoutubVideo}?autoplay=1&rel=0&controls=0&modestbranding=1&disablekb=1`}
                           title="YouTube video player"
                           frameBorder="0"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                           referrerPolicy="strict-origin-when-cross-origin"
                           allowFullScreen
                           className={styles.videoIframe}>
                        </iframe> */}
                     </div>
                  </>
               )}
            </div>
         </section>
      </>
   )
}

export default InvestHero
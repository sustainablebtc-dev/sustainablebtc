"use client";
import styles from "@/styles/pages/HomeNew.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imgAboutBase from "@/public/home/about.svg";

const HomeAbout = ({ aboutData }: { aboutData: any }) => {
   // const [isOpen, setIsOpen] = useState(false);

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
      <section className={styles.about}>
         <div className={`${styles.container} container`}>
            <div className={styles.wrapper}>
               {/* Image */}
               <div ref={videoRef} className={styles.image}>
                  {isInView && 
                     <iframe
                        className={styles.image}
                        src="https://www.youtube.com/embed/qOxwcyU8AdA?autoplay=1&rel=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                     </iframe>
                  }
               </div>

               {/* Modal Video */}
               {/* <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="qOxwcyU8AdA?autoplay=0"
                  onClose={() => setIsOpen(false)}
               /> */}

               {/* Content */}
               <div className={styles.content}>
                  <div className={`${styles.heading} portableText`}>
                     <PortableText value={aboutData.aboutHeading} />
                  </div>
                  <div className={`${styles.trustDescription} portableText`}>
                     <PortableText value={aboutData.aboutDescription} />
                  </div>
                  <div></div>
                  <div className={styles.aboutCTA}>
                     {aboutData.aboutCTA.map((cta: any, i: number) => (
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
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default HomeAbout;

"use client";
import styles from "@/styles/pages/Home.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

// Lib
import { PortableText } from "@portabletext/react";

// Image
import imgAboutBase from "@/public/home/about.svg";

const HomeAbout = ({ aboutData }: { aboutData: any }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <section className={styles.about}>
         <div className={`${styles.container} container`}>
            <div className={styles.wrapper}>
               {/* Image */}
               <div className={styles.image} onClick={() => setIsOpen(true)}>
                  <Image src={imgAboutBase} alt="AboutUS" />
               </div>

               {/* Modal Video */}
               <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="diTPUsqeG94?autoplay=0"
                  onClose={() => setIsOpen(false)}
               />

               {/* Content */}
               <div className={styles.content}>
                  <div className={`${styles.heading} portableText`}>
                     <PortableText value={aboutData.aboutHeading} />
                  </div>
                  <div className={`${styles.trustDescription} portableText`}>
                     <PortableText value={aboutData.aboutDescription} />
                  </div>
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

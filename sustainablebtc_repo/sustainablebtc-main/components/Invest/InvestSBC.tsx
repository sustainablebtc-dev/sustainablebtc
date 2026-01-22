"use client";

// Styles
import styles from "@/styles/pages/Invest.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// Image
import imgSbcIcon from "@/public/home/sbc-icon.svg";

const InvestSBC = ({ sbcData }: { sbcData: any }) => {
   // Initialize Particles
   const particlesInit = async (main: any) => {
      await loadFull(main);
   };

   return (
      <section className={styles.sbc}>

         <div className={`${styles.container} container`}>

            {/* Image Animation */}
            <div>
               <Particles
                  className={styles.sbcBg}
                  id="tsparticles"
                  init={particlesInit}
                  options={{
                     particles: {
                        number: {
                           value: 60,
                           density: {
                              enable: true,
                              value_area: 800,
                           },
                        },
                        color: {
                           value: "#ffffff",
                        },
                        shape: {
                           type: "circle",
                           stroke: {
                              width: 0,
                              color: "#000000",
                           },
                           polygon: {
                              nb_sides: 5,
                           },
                           image: {
                              src: "img/github.svg",
                              width: 100,
                              height: 100,
                           },
                        },
                        opacity: {
                           value: 0.1,
                           random: false,
                           anim: {
                              enable: false,
                              speed: 1,
                              opacity_min: 0.1,
                              sync: false,
                           },
                        },
                        size: {
                           value: 5,
                           random: true,
                           anim: {
                              enable: false,
                              speed: 40,
                              size_min: 0.1,
                              sync: false,
                           },
                        },
                        line_linked: {
                           enable: true,
                           distance: 120,
                           color: "#ffffff",
                           opacity: 0.2,
                           width: 1,
                        },
                        move: {
                           enable: true,
                           speed: 2,
                           direction: "none",
                           random: false,
                           straight: false,
                           out_mode: "out",
                           bounce: false,
                           attract: {
                              enable: false,
                              rotateX: 600,
                              rotateY: 1200,
                           },
                        },
                     },
                     interactivity: {
                        detect_on: "canvas",
                        events: {
                           onhover: {
                              enable: true,
                              mode: "grab",
                           },
                           onclick: {
                              enable: true,
                              mode: "push",
                           },
                           resize: true,
                        },
                        modes: {
                           grab: {
                              distance: 150,
                              line_linked: {
                                 opacity: 0.5,
                              },
                           },
                           bubble: {
                              distance: 400,
                              size: 40,
                              duration: 2,
                              opacity: 8,
                              speed: 3,
                           },
                           repulse: {
                              distance: 200,
                              duration: 0.4,
                           },
                           push: {
                              particles_nb: 4,
                           },
                           remove: {
                              particles_nb: 2,
                           },
                        },
                     },
                     fullScreen: { enable: false },
                     retina_detect: false,
                  }}
               />
            </div>


            {/* Sbc Image */}
            <div className={styles.sbcImageWrapper}>
               <div className={styles.sbcIcon}>
                  <Image src={imgSbcIcon} alt="SBC Icon" />
               </div>
            </div>

            {sbcData && (
               <>
                  {/* Heading */}
                  <div>
                     <div className={`${styles.sbcHeading} portableText`}>
                        <PortableText value={sbcData.sbcHeading} />
                     </div>
                  </div>

                  {/* whitespace */}
                  <div></div>

                  {/* Features */}
                  <ul className={styles.sbcFeatures}>
                     {sbcData.sbcFeatures.map((element: any, i: any) => (
                        <li key={i} className={styles.sbcFeatureCard}>
                           {element.featureImage && (
                              <Image src={urlFor(element.featureImage)
                                 .width(100)
                                 .url()} alt={element.featureImage.alt}
                                 width={100}
                                 height={100} 
                                 className={styles.featureImage}/>
                           )}

                           <div className={`portableText`}>
                              <PortableText value={element.featureName}/>
                           </div>
                        </li>
                     ))}
                  </ul>
               </>
            )}
         </div>
      </section>
   )
}

export default InvestSBC
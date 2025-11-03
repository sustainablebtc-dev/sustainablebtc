"use client";

// Styles
import styles from "@/styles/pages/HomeNew.module.scss";

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

export default function HomeSBC({ sbcData }: { sbcData: any }) {
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
               <h1 className="heading heading-2">Our Token</h1>
               <div className={styles.sbcIcon}>
                  <Image src={imgSbcIcon} alt="SBC Icon" />
               </div>
               <h1 className="heading heading-2">The SBC</h1>
            </div>

            {/* Line */}
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="679"
            height="1134"
            viewBox="0 0 679 1134"
            fill="none"
            className={styles.sbcIconLine}
         >
            <path
               opacity="0.5"
               d="M1.18488 1132.62C404.79 868.827 10.7976 368.696 585.161 -12.3958L585.293 -12.4824L677.631 -73.0506"
               stroke="url(#paint0_linear_612_10376)"
               strokeWidth="2"
            />
            <defs>
               <linearGradient
                  id="paint0_linear_612_10376"
                  x1="568.402"
                  y1="121.635"
                  x2="587.138"
                  y2="1059.89"
                  gradientUnits="userSpaceOnUse"
               >
                  <stop stop-color="#339DFF" />
                  <stop offset="0.35929" stop-color="#1E203F" />
                  <stop offset="0.499454" stop-color="#1E203F" />
                  <stop offset="0.995514" stop-color="#339DFF" />
               </linearGradient>
            </defs>
         </svg> */}

            {sbcData && (
               <>
                  {/* Heading */}
                  <div>
                     <div className={`${styles.sbcHeading} portableText`}>
                        <PortableText value={sbcData.sbcHeading} />
                     </div>
                     <div className={`${styles.sbcSubHeading} portableText`}>
                        <PortableText value={sbcData.sbcSubHeading} />
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
                                 .width(48)
                                 .url()} alt={element.featureImage.alt}
                                 width={48}
                                 height={48} />
                           )}

                           <h5 className="heading heading-5">{element.featureName}</h5>
                           <p className="para">{element.featureDescription}</p>
                        </li>
                     ))}
                  </ul>

                  {/* Description */}
                  {sbcData.sbcDescription &&
                     <div className={`${styles.sbcDescription} portableText`}>
                        <PortableText value={sbcData.sbcDescription} />
                     </div>
                  }

                  {/* CTA */}
                  {sbcData.sbcBtn1.sbcBtn1Visible && (
                     <Link
                        href={sbcData.sbcBtn1.sbcBtn1Slug}
                        className={`btn btn-${sbcData.sbcBtn1.sbcBtn1Type} ${styles.sbcBtn}`}
                     >
                        <span>{sbcData.sbcBtn1.sbcBtn1Text}</span>
                        {sbcData.sbcBtn1.sbcBtn1Icon !== "NA" ? (
                           <>
                              <i
                                 className={`bi bi-${sbcData.sbcBtn1.sbcBtn1Icon}`}
                              ></i>
                           </>
                        ) : (
                           <></>
                        )}
                     </Link>
                  )}
               </>
            )}
         </div>
      </section>
   );
}

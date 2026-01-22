"use client";

// Styles
import styles from "@/styles/pages/SBC.module.scss";

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

const SBCAbout = ({ aboutSbcData }: { aboutSbcData: any }) => {
   const particlesInit = async (main: any) => {
      await loadFull(main);
   };

   return (
      <section className={styles.sbc}>
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

         <div className={`${styles.container} container container-tight`}>
            {/* Sbc Image */}
            <div className={styles.sbcIcon}>
               <Image src={imgSbcIcon} alt="SBC Icon" />
            </div>

            {aboutSbcData && (
               <>
                  {/* Heading */}
                  <div>
                     <div className={`${styles.sbcHeading }  portableText`}>
                        <PortableText value={aboutSbcData.aboutSBCHeading} />
                     </div>
                     <div className={`${styles.sbcSubHeading} portableText`}>
                        <PortableText value={aboutSbcData.aboutSBCSubHeading} />
                     </div>
                  </div>

                  {/* Description */}
                  <div className={`${styles.sbcDescription } portableText`}>
                     <PortableText value={aboutSbcData.aboutSBCDescription} />
                  </div>

                  {/* CTA */}
                  <div className={styles.aboutSbcCTA}>
                     {aboutSbcData.aboutSBCCTA.map((cta: any, i: number) => (
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
               </>
            )}
         </div>
      </section>
   );
};

export default SBCAbout;

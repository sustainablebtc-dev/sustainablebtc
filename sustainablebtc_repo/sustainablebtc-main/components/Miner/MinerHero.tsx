"use client";

// Styles
import styles from "@/styles/pages/Miners.module.scss";
import "swiper/css";

// Next/React
import Link from "next/link";
import Image from "next/image";
import React from "react";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Image
import HeroImg from "@/public/miner/hero-img.png";

const MinerHero = ({ heroData }: { heroData: any }) => {
   return (
      <>
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container`}>
               {/* Clients */}
               <div
                  className={`${styles.heroClients} ${styles.heroClientsTop}`}
               >
                  {/* Heading */}
                  <div
                     className={`${styles.heroClientHeading} heading heading-5`}
                  >
                     <PortableText
                        value={heroData.heroClients.heroClientHeading}
                     />
                  </div>

                  {/* Slider */}
                  <Swiper
                     spaceBetween={24}
                     loop={true}
                     autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                     }}
                     speed={1200}
                     freeMode={true}
                     grabCursor={true}
                     breakpoints={{
                        100: {
                           slidesPerView: 4,
                           spaceBetween: 20,
                        },
                        768: {
                           slidesPerView: 6,
                           spaceBetween: 40,
                        },
                        1024: {
                           slidesPerView: 8,
                           spaceBetween: 50,
                        },
                     }}
                     modules={[Autoplay]}
                  >
                     {heroData.heroClients.heroClientLogos.map((image: any) => (
                        <>
                           <SwiperSlide className={styles.heroClientImage}>
                              <Image
                                 src={urlFor(image).url()}
                                 alt="Logo"
                                 width={300}
                                 height={100}
                              />
                           </SwiperSlide>
                        </>
                     ))}
                     {heroData.heroClients.heroClientLogos.map((image: any) => (
                        <>
                           <SwiperSlide className={styles.heroClientImage}>
                              <Image
                                 src={urlFor(image).url()}
                                 alt="Logo"
                                 width={300}
                                 height={100}
                              />
                           </SwiperSlide>
                        </>
                     ))}
                  </Swiper>
               </div>

               {/* Hero Wrapper */}
               <div className={styles.heroWrapper}>
                  {/* Left */}
                  <div className={styles.heroContent}>
                     {/* Heading */}
                     <div className={`${styles.heroHeading} heading heading-1`}>
                        <PortableText value={heroData.heroHeading} />
                     </div>
                     {/* Sub Heading */}
                     <div
                        className={`${styles.heroSubHeading} heading heading-6`}
                     >
                        <PortableText value={heroData.heroSubHeading} />
                     </div>
                     {/* Mining Flow */}
                     <ul className={styles.heroMiningFlow}>
                        {heroData.heroMiningFlow.map((item: string) => (
                           <>
                              <li>{item}</li>
                           </>
                        ))}
                     </ul>
                     {/* CTA */}
                     <div className={styles.heroCTA}>
                        {heroData.heroCTA.map((cta: any, i: number) => (
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
                  {/* Right */}
                  <div className={styles.heroImg}>
                     <Image src={HeroImg} alt="Hero Image" />
                  </div>
               </div>

               {/* Clients */}
               <div
                  className={`${styles.heroClients} ${styles.heroClientsBottom}`}
               >
                  {/* Heading */}
                  <div
                     className={`${styles.heroClientHeading} heading heading-5`}
                  >
                     <PortableText
                        value={heroData.heroClients.heroClientHeading}
                     />
                  </div>

                  {/* Slider */}
                  <Swiper
                     spaceBetween={24}
                     loop={true}
                     autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                     }}
                     speed={1200}
                     freeMode={true}
                     grabCursor={true}
                     breakpoints={{
                        100: {
                           slidesPerView: 4,
                           spaceBetween: 20,
                        },
                        768: {
                           slidesPerView: 6,
                           spaceBetween: 40,
                        },
                        1024: {
                           slidesPerView: 8,
                           spaceBetween: 50,
                        },
                     }}
                     modules={[Autoplay]}
                  >
                     {heroData.heroClients.heroClientLogos.map((image: any) => (
                        <>
                           <SwiperSlide className={styles.heroClientImage}>
                              <Image
                                 src={urlFor(image).url()}
                                 alt="Logo"
                                 width={300}
                                 height={100}
                              />
                           </SwiperSlide>
                        </>
                     ))}
                     {heroData.heroClients.heroClientLogos.map((image: any) => (
                        <>
                           <SwiperSlide className={styles.heroClientImage}>
                              <Image
                                 src={urlFor(image).url()}
                                 alt="Logo"
                                 width={300}
                                 height={100}
                              />
                           </SwiperSlide>
                        </>
                     ))}
                  </Swiper>
               </div>
            </div>
         </section>
      </>
   );
};

export default MinerHero;

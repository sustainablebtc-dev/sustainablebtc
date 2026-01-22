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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const HomeMiners = ({ minerData }: { minerData: any }) => {
   return (
      <section className={styles.miners}>
         <div className="container">
            {/* Clients */}
            <div
               className={`${styles.heroClients} ${styles.heroClientsBottom}`}
            >
               {/* Heading */}
               <div className={`${styles.heroClientHeading} heading heading-5`}>
                  <PortableText
                     value={minerData.heroClients.heroClientHeading}
                  />
               </div>

               {/* Slider */}
               <Swiper
                  className='swiper-smooth-transition'
                  spaceBetween={24}
                  loop={true}
                  autoplay={{
                     delay: 1,
                     disableOnInteraction: false,
                  }}
                  speed={2400}
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
                  {minerData.heroClients.heroClientLogos.map((image: any) => (
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
                  {minerData.heroClients.heroClientLogos.map((image: any) => (
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
   );
};

export default HomeMiners;

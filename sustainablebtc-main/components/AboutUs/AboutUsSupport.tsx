"use client";

// Styles
import styles from "@/styles/pages/About.module.scss";
import "swiper/css";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Image

const AboutUsSupport = ({ supportData }: { supportData: any }) => {
   return (
      <section className={styles.support}>
         <div className={`${styles.container} container`}>
            {/* Heading */}
            <div className={`${styles.supportHeading} portableText`}>
               <PortableText value={supportData.supportHeading} />
            </div>

            {/* Logo Slider */}
            <Swiper
               loop={true}
               autoplay={{
                  delay: 100,
                  disableOnInteraction: false,
               }}
               speed={2000}
               breakpoints={{
                  100: {
                     slidesPerView: 3,
                     spaceBetween: 16,
                  },
                  768: {
                     slidesPerView: 6,
                     spaceBetween: 16,
                  },
                  1024: {
                     slidesPerView: 7,
                     spaceBetween: 24,
                  },
               }}
               modules={[Autoplay]}
            >
               {supportData.supportCompany.map((image: any) => (
                  <>
                     <SwiperSlide
                        className={styles.supportCompanySlide}
                        title={image.alt}
                     >
                        <Image
                           src={urlFor(image).url()}
                           alt={image.alt}
                           width={300}
                           height={100}
                        />
                     </SwiperSlide>
                  </>
               ))}
               {supportData.supportCompany.map((image: any) => (
                  <>
                     <SwiperSlide
                        className={styles.supportCompanySlide}
                        title={image.alt}
                     >
                        <Image
                           src={urlFor(image).url()}
                           alt={image.alt}
                           width={300}
                           height={100}
                        />
                     </SwiperSlide>
                  </>
               ))}
            </Swiper>
         </div>
      </section>
   );
};

export default AboutUsSupport;

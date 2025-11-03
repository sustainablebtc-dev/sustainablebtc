"use client";

// Styles
import styles from "@/styles/pages/HomeNew.module.scss";
import "swiper/css";

// Next/React
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { PortableText } from "@portabletext/react";

// Image

export default function HomeTestimonials({
   testimonialData,
}: {
   testimonialData: any;
}) {
   const swiperRef = useRef<SwiperCore | null>(null);
   const duplicatedItems = [
      ...testimonialData.testimonialItems,
      ...testimonialData.testimonialItems,
   ];
   const [activeIndex, setActiveIndex] = useState(0);

   useEffect(() => {
      if (swiperRef.current) {
         swiperRef.current.on('slideChange', () => {
            setActiveIndex(swiperRef.current?.realIndex || 0);
         });
      }
   }, []);

   return (
      <section className={styles.testimonials}>
         <div className={`${styles.container} container`}>
            {testimonialData && (
               <div className={styles.testimonialWrapper}>
                  {/* Header */}
                  <div className={styles.testimonialHeadingWrapper}>
                     <div
                        className={`${styles.testimonialHeading} portableText`}
                     >
                        <PortableText
                           value={testimonialData.testimonialTitle}
                        />
                     </div>
                     <div className={styles.btnWrapper}>
                        <button
                           className={`btn btn-secondary btn-rounded`}
                           onClick={() => swiperRef.current?.slidePrev()}
                        >
                           <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                           className={`btn btn-secondary btn-rounded`}
                           onClick={() => swiperRef.current?.slideNext()}
                        >
                           <i className="bi bi-arrow-right"></i>
                        </button>
                     </div>
                  </div>
                  {/* Sliding */}
                  <div className={styles.testimonialSlider}>
                     <Swiper
                        autoplay={{
                           delay: 10000,
                           disableOnInteraction: false,
                        }}
                        loop={true}
                        spaceBetween={16}
                        slidesPerView="auto"
                        centeredSlides={false}
                        navigation={{
                           nextEl: ".swiper-button-next",
                           prevEl: ".swiper-button-prev",
                        }}
                        onSwiper={(swiper) => {
                           swiperRef.current = swiper;
                        }}
                        modules={[Autoplay, Navigation]}
                     >
                        {duplicatedItems.map((item: any, i: number) => (
                           <SwiperSlide
                              key={i}
                              className={`${styles.testimonialSlide}
                                          ${activeIndex === i ? styles.activeSlide : ''}`}
                           >
                              <div className={styles.testimonialSlideInner}>
                                 {/* Image */}
                                 {/* eslint-disable-next-line @next/next/no-img-element */}
                                 {item.testimonyImage && (
                                    <div className={styles.testimonialImageHeader}>
                                       <Image
                                          src={urlFor(item.testimonyImage)
                                             .width(400)
                                             .url()}
                                          alt={item.testimonyImage.alt}
                                          className={
                                             styles.testimonialTestimonyImage
                                          }
                                          width={400}
                                          height={400}
                                       />

                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       {item.testimonyCompanyLogo && (
                                          <>
                                             <Image
                                                src={urlFor(
                                                   item.testimonyCompanyLogo
                                                )
                                                   .width(300)
                                                   .url()}
                                                alt={item.testimonyCompanyLogo.alt}
                                                width={200}
                                                height={100}
                                                className={
                                                   styles.testimonialTestimonyCompanyLogo
                                                }
                                             />
                                          </>
                                       )}
                                    </div>
                                 )}

                                 {/* Content */}
                                 <div>
                                    <p className={styles.testimonialTestimony}>
                                       {`"${item.testimony}"`}
                                    </p>

                                    <hr />

                                    <div>
                                       <h3
                                          className={`${styles.testimonialTestimonyName}`}
                                       >
                                          {item.testimonyName}
                                       </h3>
                                    </div>
                                 </div>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
            )}
         </div>
      </section>
   );
}

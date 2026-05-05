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
import { Autoplay, Navigation, Grid } from "swiper/modules";
import { PortableText } from "@portabletext/react";

// Image

export default function HomeTestimonials({
   testimonialData,
}: {
   testimonialData: any;
}) {
   const swiperRef = useRef<SwiperCore | null>(null);
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
               <>
                  {/* Heading at top */}
                  <div className={styles.testimonialHeadingWrapper}>
                     <div
                        className={`${styles.testimonialHeading} portableText`}
                     >
                        <PortableText
                           value={testimonialData.testimonialTitle}
                        />
                     </div>
                  </div>

                  {/* Cards grid in middle */}
                  <div className={styles.testimonialSlider}>
                     <Swiper
                        autoplay={{
                           delay: 10000,
                           disableOnInteraction: false,
                        }}
                        loop={true}
                        spaceBetween={24}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        grid={{
                           rows: 1,
                           fill: 'row',
                        }}
                        breakpoints={{
                           768: {
                              slidesPerView: 2,
                              slidesPerGroup: 1,
                              spaceBetween: 24,
                           },
                           976: {
                              slidesPerView: 3,
                              slidesPerGroup: 1,
                              spaceBetween: 24,
                           },
                        }}
                        watchSlidesProgress={true}
                        observer={true}
                        observeParents={true}
                        onSwiper={(swiper) => {
                           swiperRef.current = swiper;
                        }}
                        modules={[Autoplay, Navigation, Grid]}
                     >
                        {testimonialData.testimonialItems.map((item: any, i: number) => (
                           <SwiperSlide
                              key={i}
                              className={styles.testimonialSlide}
                           >
                              <div className={styles.testimonialSlideInner}>
                                 {/* Image */}
                                 {item.testimonyImage && (
                                    <div className={styles.testimonialImageHeader}>
                                       <Image
                                          src={urlFor(item.testimonyImage)
                                             .width(400)
                                             .url()}
                                          alt={item.testimonyImage.alt || item.testimonyName}
                                          className={
                                             styles.testimonialTestimonyImage
                                          }
                                          width={400}
                                          height={400}
                                       />

                                       {/* Company Logo */}
                                       {item.testimonyCompanyLogo && (
                                          <Image
                                             src={urlFor(
                                                item.testimonyCompanyLogo
                                             )
                                                .width(300)
                                                .url()}
                                             alt={item.testimonyCompanyLogo.alt || "Company Logo"}
                                             width={200}
                                             height={100}
                                             className={
                                                styles.testimonialTestimonyCompanyLogo
                                             }
                                          />
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
                                          className={styles.testimonialTestimonyName}
                                       >
                                          {item.testimonyName}
                                       </h3>
                                       {item.testimonyDesignation && (
                                          <p className={styles.testimonialTestimonyDesignation}>
                                             {item.testimonyDesignation}
                                          </p>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>

                  {/* Navigation arrows below */}
                  <div className={styles.btnWrapper}>
                     <button
                        className={`btn btn-secondary btn-rounded btn-sm`}
                        onClick={() => swiperRef.current?.slidePrev()}
                     >
                        <i className="bi bi-arrow-left"></i>
                     </button>
                     <button
                        className={`btn btn-secondary btn-rounded btn-sm`}
                        onClick={() => swiperRef.current?.slideNext()}
                     >
                        <i className="bi bi-arrow-right"></i>
                     </button>
                  </div>
               </>
            )}
         </div>
      </section>
   );
}

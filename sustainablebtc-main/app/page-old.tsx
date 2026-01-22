"use client";

// Importing Styles
import styles from "@/styles/pages/Home.module.scss";
import "swiper/css";

// Importing Packages
import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { PortableText } from "@portabletext/react";

// Data Fetch
import { getHomePageData } from "@/sanity/sanity-utils";
import { urlFor } from "@/sanity/sanity-urlFor";

// Importing Images
import imgHeroBg from "@/public/home/hero-bg.png";
import imgHeroWindmill from "@/public/home/windmill.svg";
import imgHeroCloud from "@/public/home/cloud.svg";
import imgSbcIcon from "@/public/home/sbc-icon.svg";
import imgTestimonialLine from "@/public/home/testomonialLine.svg";
import Image from "next/image";

const metadata: Metadata = {
   title: "Sustainable Bitcoin Protocol | BTC Energy Consumption Solution",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

export default function Home() {
   const [homePageData, setHomePageData] = useState<any>();
   const [heroData, setHeroData] = useState<any>();
   const [sbcData, setSbcData] = useState<any>();
   const [testimonialData, setTestimonialData] = useState<any>();
   useEffect(() => {
      const setHomeData = async () => {
         setHomePageData(await getHomePageData());
      };
      console.log("api");
      setHomeData();
   }, []);
   useEffect(() => {
      if (homePageData) {
         setHeroData(homePageData.hero);
         setSbcData(homePageData.sbc);
         setTestimonialData(homePageData.testimonials);
      }
   }, [homePageData]);
   console.log(heroData);

   const particlesInit = async (main: any) => {
      console.log(main);

      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
   };
   return (
      <>
         {/* Hero Section */}
         <section className={styles.hero}>
            <div className={`${styles.container} container`}>
               {/* content */}
               <div>
                  {heroData && (
                     <>
                        {/* descriptive */}
                        <div className={styles.heroDescription}>
                           <h1 className={styles.heroHeading}>
                              <PortableText value={heroData.heroHeading} />
                           </h1>
                           <div className={styles.heroPara}>
                              <PortableText value={heroData.heroDesc} />
                           </div>
                           <div className={styles.heroBtnWrapper}>
                              {heroData.heroCTA1.heroBtn1Visible && (
                                 <a
                                    href="#"
                                    className={`btn btn-${heroData.heroCTA1.heroBtn1Type} ${styles.heroBtn}`}
                                 >
                                    <span>
                                       {heroData.heroCTA1.heroBtn1Text}
                                    </span>
                                    {heroData.heroCTA1.heroBtn1Icon !== "NA" ? (
                                       <>
                                          <i
                                             className={`bi bi-${heroData.heroCTA1.heroBtn1Icon}`}
                                          ></i>
                                       </>
                                    ) : (
                                       <></>
                                    )}
                                 </a>
                              )}
                              {heroData.heroCTA2.heroBtn2Visible && (
                                 <a
                                    href="#"
                                    className={`btn btn-${heroData.heroCTA2.heroBtn2Type} ${styles.heroBtn}`}
                                 >
                                    <span>
                                       {heroData.heroCTA2.heroBtn2Text}
                                    </span>
                                    {heroData.heroCTA2.heroBtn2Icon !== "NA" ? (
                                       <>
                                          <i
                                             className={`bi bi-${heroData.heroCTA2.heroBtn2Icon}`}
                                          ></i>
                                       </>
                                    ) : (
                                       <></>
                                    )}
                                 </a>
                              )}
                           </div>
                        </div>

                        {/* logos */}
                        <div className={styles.heroClient}>
                           <h3 className={styles.heroClientLogoTitle}>
                              {heroData.heroCompanyIconsTitle}
                           </h3>

                           <div className={styles.heroClientLogo}>
                              {heroData.heroCompanyImages.map(
                                 (item: any, i: number) => (
                                    <div key={i}>
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       <img
                                          src={urlFor(item).width(100).url()}
                                          alt={item.alt}
                                          width={`auto`}
                                          height={`auto`}
                                       />
                                    </div>
                                 )
                              )}
                              {/* <img
                                    src={urlFor(item.testimonyImage)
                                       .width(100)
                                       .url()}
                                    alt={item.testimonyImage.alt}
                                    width={100}
                                    height={100}
                                 /> */}
                           </div>
                        </div>
                     </>
                  )}
               </div>

               {/* Windmill */}
               <Image
                  src={imgHeroWindmill}
                  alt="Windmill"
                  className={styles.imgHeroWindmill}
                  loading="eager"
               />

               {/* Cloud */}
               <Image
                  src={imgHeroCloud}
                  alt="Windmill"
                  className={styles.imgHeroCloud}
                  loading="eager"
               />
            </div>

            {/* Background Image */}
            <Image
               src={imgHeroBg}
               alt="Hero Background"
               className={styles.imgHeroBg}
               objectFit="contain"
            />
         </section>

         {/* About SBC */}
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

            <div className={`${styles.container} container`}>
               {/* Sbc Image */}
               <div className={styles.sbcIcon}>
                  <Image src={imgSbcIcon} alt="SBC Icon" />
               </div>

               {/* Line */}
               <svg
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
               </svg>

               {sbcData && (
                  <>
                     {/* Heading */}
                     <div>
                        <h2
                           className={`${styles.sbcHeading} heading heading-2`}
                        >
                           {sbcData.sbcHeading}
                        </h2>
                        <h3
                           className={`${styles.sbcSubHeading} heading heading-4`}
                        >
                           {sbcData.sbcSubHeading}
                        </h3>
                     </div>

                     {/* Features */}
                     <ul className={styles.sbcFeatures}>
                        {sbcData.sbcFeatures.map((element: string) => (
                           <li key={element}>{element}</li>
                        ))}
                     </ul>

                     {/* Description */}
                     <div className={styles.sbcDescription}>
                        <PortableText value={sbcData.sbcDescription} />
                     </div>

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

         {/* Testimonials */}
         <section className={styles.testimonials}>
            <Image
               src={imgTestimonialLine}
               alt="Line"
               className={styles.testimonialLine}
            />

            <div className={`${styles.container} container`}>
               {testimonialData && (
                  <div className={styles.testimonialWrapper}>
                     {/* Header */}
                     <div>
                        <h2
                           className={`${styles.testimonialHeading} heading heading-3`}
                        >
                           {testimonialData.testimonialTitle}
                        </h2>
                     </div>
                     {/* Sliding */}
                     <div>
                        <Swiper
                           spaceBetween={50}
                           slidesPerView={1}
                           onSlideChange={() => console.log("slide change")}
                           onSwiper={(swiper) => console.log(swiper)}
                           autoplay={{
                              delay: 5000,
                              disableOnInteraction: true,
                           }}
                           loop={true}
                           navigation={true}
                           modules={[Autoplay, Navigation]}
                        >
                           {testimonialData.testimonialItems.map(
                              (item: any, i: number) => (
                                 <SwiperSlide
                                    key={i}
                                    className={styles.testimonialSlide}
                                 >
                                    {/* Image */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                       src={urlFor(item.testimonyImage)
                                          .width(100)
                                          .url()}
                                       alt={item.testimonyImage.alt}
                                       className={
                                          styles.testimonialTestimonyImage
                                       }
                                    />

                                    {/* Content */}
                                    <div>
                                       <p
                                          className={
                                             styles.testimonialTestimony
                                          }
                                       >
                                          {`"${item.testimony}"`}
                                       </p>

                                       <div>
                                          <h3
                                             className={`${styles.testimonialTestimonyName}`}
                                          >
                                             {item.testimonyName}
                                          </h3>
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                             src={urlFor(
                                                item.testimonyCompanyLogo
                                             )
                                                .width(100)
                                                .url()}
                                             alt={item.testimonyImage.alt}
                                             width={100}
                                             height={100}
                                             className={
                                                styles.testimonialTestimonyCompanyLogo
                                             }
                                          />
                                       </div>
                                    </div>
                                 </SwiperSlide>
                              )
                           )}
                        </Swiper>
                     </div>
                  </div>
               )}
            </div>
         </section>
      </>
   );
}

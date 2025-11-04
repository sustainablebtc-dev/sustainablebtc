"use client";

// Importing styles
import styles from "@/styles/components/Header.module.scss";

// Next/React Imports
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Lib
import { urlFor } from "@/sanity/sanity-urlFor";

// Images
import logo from "@/public/BitREC/bitrec-logo.png";
import sbcIcon from "@/public/sbc-icon.svg";

import { getBtcInfo } from "@/utils/livecoinwatch";
import { getSbcInfo } from "@/utils/sbp";

// components
import { usePathname } from "next/navigation";

const HeaderContent = ({
   navbarData,
   navbarGlobalLeadersData,
}: {
   navbarData: any;
   navbarGlobalLeadersData: any;
}) => {
   // =====================================================================
   // ! Get activelink
   const pathname = usePathname(); // Use useRouter to get the full path
   const [activeLink, setActiveLink] = useState<string>("");

   useEffect(() => {
      // do nothing if slug is "/"
      if (pathname === "/") setActiveLink(pathname);
      else setActiveLink(pathname.substring(1, pathname.length));
   }, [pathname]);
   // =====================================================================

   // =====================================================================
   // ! Navbar Data
   const [isNavbarToggled, setIsNavbarToggled] = useState<boolean>(false);
   // =====================================================================

   // =====================================================================
   // ! Scroll Behaviour
   const [clientWindowHeight, setClientWindowHeight] = useState<any>("");

   const handleScroll = () => {
      setClientWindowHeight(window.scrollY);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   });
   // =====================================================================

   // ! BTC Info
   const [btcInfo, setBtcInfo] = useState<any>(null);
   useEffect(() => {
      async function startFetchingBtcInfo() {
         const result = await getBtcInfo();

         result.delta.dayPercent = (
            100 -
            (result.rate / (result.rate * result.delta.day)) * 100
         ).toFixed(2);
         setBtcInfo(result);
      }

      const refreshInterval: number = parseInt(
         process.env.NEXT_PUBLIC_LIVECOINWATCH_REFRESH_INTREVAL || "15",
         10
      );

      startFetchingBtcInfo();
      const intervalID = setInterval(() => {
         startFetchingBtcInfo();
      }, refreshInterval * 1000);

      return () => {
         clearInterval(intervalID);
      };
   }, []);
   // =====================================================================

   // ! SBC Info
   const [sbcInfo, setSBCInfo] = useState<any>(null);
   useEffect(() => {
      async function startFetchingSbcInfo() {
         const result = await getSbcInfo();
         result.deltaDayPercent = (
            100 -
            (result.price / (result.price * result.deltaDay)) * 100
         ).toFixed(2);
         setSBCInfo(result);
      }

      startFetchingSbcInfo();
   }, []);
   // =====================================================================

   return (
      <>
         {/* Navigation Top Strip */}
         <aside className={`${styles.headerTopBar}`}>
            <div className={`${styles.container}`}>
               {/* Global Leaders */}
               <div className={styles.globalLeader}>
                  <h6 className={styles.globalLeaderHeading}>
                     Trusted by Global Leaders
                  </h6>
                  {/* Logo Slider */}
                  <div className={styles.globalLeaderSlider}>
                     {navbarGlobalLeadersData.map((image: any) =>
                     (
                        <div className={styles.globalLeaderSlide} title={image.alt} key={image.alt}>
                           <Image
                              src={urlFor(image).url()}
                              alt="leader name"
                              width={300}
                              height={100}
                              loading="eager"
                           />
                        </div>
                     ))}
                     <>
                        <div
                           className={`md:hidden ${styles.globalLeaderSlide} ${styles.price}`}
                        >
                           {btcInfo && (
                              <div className={styles.sbc}>
                                 <Image
                                    src={btcInfo.png64}
                                    alt="btcInfo"
                                    className={styles.sbcLogo}
                                    width={20}
                                    height={20}
                                    loading="eager"
                                 />
                                 <span className={styles.sbcValue}>
                                    {new Intl.NumberFormat("en-US", {
                                       style: "currency",
                                       currency: "USD",
                                    }).format(btcInfo.rate)}
                                 </span>
                                 <span
                                    className={`${styles.sbcValueChangeBy} ${btcInfo.delta.dayPercent >= 0
                                       ? styles.positive
                                       : styles.negative
                                       }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${btcInfo.delta.dayPercent >= 0
                                          ? "up"
                                          : "down"
                                          }`}
                                    ></i>
                                    <span>{btcInfo.delta.dayPercent}%</span>
                                 </span>
                              </div>
                           )}
                        </div>
                        <div
                           className={`md:hidden ${styles.globalLeaderSlide} ${styles.price} ${styles.price}`}
                        >
                           {sbcInfo && (
                              <div className={styles.sbc}>
                                 <Image
                                    src={sbcIcon}
                                    alt="SBC Token"
                                    className={styles.sbcLogo}
                                    width={20}
                                    height={20}
                                    loading="eager"
                                 />
                                 <span className={styles.sbcValue}>
                                    {new Intl.NumberFormat("en-US", {
                                       style: "currency",
                                       currency: "USD",
                                    }).format(sbcInfo.price)}
                                 </span>
                                 <span
                                    className={`${styles.sbcValueChangeBy} ${sbcInfo.deltaDayPercent >= 0
                                       ? styles.positive
                                       : styles.negative
                                       }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${sbcInfo.deltaDayPercent >= 0
                                          ? "up"
                                          : "down"
                                          }`}
                                    ></i>
                                    <span>{sbcInfo.deltaDayPercent}%</span>
                                 </span>
                              </div>
                           )}
                        </div>
                     </>

                     {navbarGlobalLeadersData.map((image: any) => (
                        <>
                           <div
                              className={styles.globalLeaderSlide}
                              title={image.alt}
                              key={image.alt}
                           >
                              <Image
                                 src={urlFor(image).url()}
                                 alt="our partners"
                                 width={300}
                                 height={100}
                                 loading="eager"
                              />
                           </div>
                        </>
                     ))}

                     <>
                        <div
                           className={`md:hidden ${styles.globalLeaderSlide} ${styles.price}`}
                        >
                           {btcInfo && (
                              <div className={styles.sbc}>
                                 <Image
                                    src={btcInfo.png64}
                                    alt="btcinfo"
                                    className={styles.sbcLogo}
                                    width={20}
                                    height={20}
                                    loading="eager"
                                 />
                                 <span className={styles.sbcValue}>
                                    {new Intl.NumberFormat("en-US", {
                                       style: "currency",
                                       currency: "USD",
                                    }).format(btcInfo.rate)}
                                 </span>
                                 <span
                                    className={`${styles.sbcValueChangeBy} ${btcInfo.delta.dayPercent >= 0
                                       ? styles.positive
                                       : styles.negative
                                       }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${btcInfo.delta.dayPercent >= 0
                                          ? "up"
                                          : "down"
                                          }`}
                                    ></i>
                                    <span>{btcInfo.delta.dayPercent}%</span>
                                 </span>
                              </div>
                           )}
                        </div>
                        <div
                           className={`md:hidden ${styles.globalLeaderSlide} ${styles.price} ${styles.price}`}
                        >
                           {sbcInfo && (
                              <div className={styles.sbc}>
                                 <Image
                                    src={sbcIcon}
                                    alt="SBC Token"
                                    className={styles.sbcLogo}
                                    width={20}
                                    height={20}
                                    loading="eager"
                                 />
                                 <span className={styles.sbcValue}>
                                    {new Intl.NumberFormat("en-US", {
                                       style: "currency",
                                       currency: "USD",
                                    }).format(sbcInfo.price)}
                                 </span>
                                 <span
                                    className={`${styles.sbcValueChangeBy} ${sbcInfo.deltaDayPercent >= 0
                                       ? styles.positive
                                       : styles.negative
                                       }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${sbcInfo.deltaDayPercent >= 0
                                          ? "up"
                                          : "down"
                                          }`}
                                    ></i>
                                    <span>{sbcInfo.deltaDayPercent}%</span>
                                 </span>
                              </div>
                           )}
                        </div>
                     </>
                  </div>
               </div>
               {/* BTC & SBC Values */}
               <div className={styles.ticker}>
                  {btcInfo && (
                     <>
                        <div className={styles.sbc}>
                           <Image
                              src={btcInfo.png64}
                              alt="biticon"
                              className={styles.sbcLogo}
                              width={20}
                              height={20}
                           />
                           <span className={styles.sbcValue}>
                              {new Intl.NumberFormat("en-US", {
                                 style: "currency",
                                 currency: "USD",
                              }).format(btcInfo.rate)}
                           </span>
                           <span
                              className={`${styles.sbcValueChangeBy} ${btcInfo.delta.dayPercent >= 0
                                 ? styles.positive
                                 : styles.negative
                                 }`}
                           >
                              <i
                                 className={`bi bi-arrow-${btcInfo.delta.dayPercent >= 0
                                    ? "up"
                                    : "down"
                                    }`}
                              ></i>
                              <span>{btcInfo.delta.dayPercent}%</span>
                           </span>
                        </div>
                     </>
                  )}
                  {sbcInfo && (
                     <>
                        <div className={styles.sbc}>
                           <Image
                              src={sbcIcon}
                              alt="SBC Token"
                              className={styles.sbcLogo}
                              width={20}
                              height={20}
                           />
                           <span className={styles.sbcValue}>
                              {new Intl.NumberFormat("en-US", {
                                 style: "currency",
                                 currency: "USD",
                              }).format(sbcInfo.price)}
                           </span>
                           <span
                              className={`${styles.sbcValueChangeBy} ${sbcInfo.deltaDayPercent >= 0
                                 ? styles.positive
                                 : styles.negative
                                 }`}
                           >
                              <i
                                 className={`bi bi-arrow-${sbcInfo.deltaDayPercent >= 0 ? "up" : "down"
                                    }`}
                              ></i>
                              <span>{sbcInfo.deltaDayPercent}%</span>
                           </span>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </aside>

         {/* Main Navigation */}
         <header
            className={`${styles.header} ${clientWindowHeight > 98 / 2 ? styles.fixToTop : ""
               }`}
         >
            <div className={`${styles.container} container`}>
               {/* Logo */}
               <div className={styles.logoWraooer}>
                  <Link href="/">
                     <Image src={logo} alt="Logo" />
                  </Link>
                  {/* Brand change notification */}
                  <div className={`${styles.brandChange}`}>
                     <div className={`${styles.marquee}`}>
                        <div className={styles.marqueeContent}>
                           <span className={`${styles.sbp}`}>Sustainable Bitcoin Protocol</span>
                           <span>is now</span>
                           <span className={`${styles.bitrec}`}>BitREC</span>
                        </div>
                        <div className={styles.marqueeContent}>
                           <span className={`${styles.sbp}`}>Sustainable Bitcoin Protocol</span>
                           <span>is now</span>
                           <span className={`${styles.bitrec}`}>BitREC</span>
                        </div>
                        <div className={styles.marqueeContent}>
                           <span className={`${styles.sbp}`}>Sustainable Bitcoin Protocol</span>
                           <span>is now</span>
                           <span className={`${styles.bitrec}`}>BitREC</span>
                        </div>
                        <div className={styles.marqueeContent}>
                           <span className={`${styles.sbp}`}>Sustainable Bitcoin Protocol</span>
                           <span>is now</span>
                           <span className={`${styles.bitrec}`}>BitREC</span>
                        </div>
                        <div className={styles.marqueeContent}>
                           <span className={`${styles.sbp}`}>Sustainable Bitcoin Protocol</span>
                           <span>is now</span>
                           <span className={`${styles.bitrec}`}>BitREC</span>
                        </div>
                        <div className={styles.marqueeContent}>
                           <span className={`${styles.sbp}`}>Sustainable Bitcoin Protocol</span>
                           <span>is now</span>
                           <span className={`${styles.bitrec}`}>BitREC</span>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </header>
      </>
   );
};

export default HeaderContent;

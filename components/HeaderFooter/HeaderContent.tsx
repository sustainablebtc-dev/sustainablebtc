"use client";

// Importing styles
import styles from "@/styles/components/Header.module.scss";

// Next/React Imports
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

// Lib
import { urlFor } from "@/sanity/sanity-urlFor";
import { PortableText } from "@portabletext/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Images
import logo from "@/public/logo.svg";
import sbcIcon from "@/public/sbc-icon.svg";
import bitcoinIcon from "@/public/bitcoin-icon.svg";

import { getBtcInfo } from "@/utils/livecoinwatch";
import { getSbcInfo } from "@/utils/sbp";

// components
import ModalWhitepaperEmail from "../Modals/ModalWhitepaperEmail";
import { useRouter, usePathname } from "next/navigation";

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

   // ! Modals variable
   const [modalIsOpen, setModalIsOpen] = useState(false);
   function openModal() {
      setModalIsOpen(true);
   }
   // =====================================================================

   // Hide header on /energyweb page
   if (pathname?.includes("/energyweb")) {
      return null;
   }

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
                                    className={`${styles.sbcValueChangeBy} ${
                                       btcInfo.delta.dayPercent >= 0
                                          ? styles.positive
                                          : styles.negative
                                    }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${
                                          btcInfo.delta.dayPercent >= 0
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
                                    className={`${styles.sbcValueChangeBy} ${
                                       sbcInfo.deltaDayPercent >= 0
                                          ? styles.positive
                                          : styles.negative
                                    }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${
                                          sbcInfo.deltaDayPercent >= 0
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
                                    className={`${styles.sbcValueChangeBy} ${
                                       btcInfo.delta.dayPercent >= 0
                                          ? styles.positive
                                          : styles.negative
                                    }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${
                                          btcInfo.delta.dayPercent >= 0
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
                                    className={`${styles.sbcValueChangeBy} ${
                                       sbcInfo.deltaDayPercent >= 0
                                          ? styles.positive
                                          : styles.negative
                                    }`}
                                 >
                                    <i
                                       className={`bi bi-arrow-${
                                          sbcInfo.deltaDayPercent >= 0
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
                              className={`${styles.sbcValueChangeBy} ${
                                 btcInfo.delta.dayPercent >= 0
                                    ? styles.positive
                                    : styles.negative
                              }`}
                           >
                              <i
                                 className={`bi bi-arrow-${
                                    btcInfo.delta.dayPercent >= 0
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
                              className={`${styles.sbcValueChangeBy} ${
                                 sbcInfo.deltaDayPercent >= 0
                                    ? styles.positive
                                    : styles.negative
                              }`}
                           >
                              <i
                                 className={`bi bi-arrow-${
                                    sbcInfo.deltaDayPercent >= 0 ? "up" : "down"
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
            className={`${styles.header} ${
               clientWindowHeight > 98 / 2 ? styles.fixToTop : ""
            }`}
         >
            <div className={`${styles.container} container`}>
               {/* Logo */}
               <div className={styles.logoWraooer}>
                  <Link href="/">
                     <Image src={logo} alt="Logo" />
                  </Link>

                  {/* Menu Toggle */}
                  <div
                     className={`${styles.btnNavToggle} 
                                 ${isNavbarToggled ? styles.open : ""}`}
                     onClick={() => setIsNavbarToggled(!isNavbarToggled)}
                  >
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>
               </div>

               {/* Primary nav */}
               <ul
                  className={`${styles.primaryNav} 
                              ${isNavbarToggled ? styles.open : ""}
                              ${isNavbarToggled ? "navbarOpen" : ""}`}
               >
                  {/* Primary Navigation
                      Conditions: Always Visible */}
                  {navbarData.primaryNavigation &&
                     navbarData.primaryNavigation.map(
                        (item: any, i: number) => {
                           const isActive =
                              activeLink === item.slug ||
                              (activeLink == null && item.slug === "/");

                           return (
                              <>
                                 <li
                                    className={isActive ? styles.active : ""}
                                    key={i}
                                 >
                                    {item.slug.includes("http") ? (
                                       <a
                                          href={`${item.slug}`}
                                          onClick={() =>
                                             window.innerWidth < 1440
                                                ? setIsNavbarToggled(
                                                     !isNavbarToggled
                                                  )
                                                : null
                                          }
                                       >
                                          <span>{item.name}</span>
                                       </a>
                                    ) : (
                                       // handling condition for dropdown
                                       <>
                                          {item.isDropdown ? (
                                             <div
                                                className={`${styles.navDropdown}`}
                                             >
                                                {/* Dropdown Toggle Checkbox */}
                                                <input
                                                   type="checkbox"
                                                   name={item.name}
                                                   id={item.name}
                                                   className={`${styles.navDropdownCheckbox}`}
                                                />

                                                {/* Main Link */}
                                                <label
                                                   htmlFor={item.name}
                                                   className={`${styles.navDropdownLabel}  `}
                                                >
                                                   <span>{item.name}</span>
                                                   <span>
                                                      <i
                                                         className={`bi bi-${item.iconName}`}
                                                      ></i>
                                                   </span>
                                                </label>

                                                {/* Dropdown Menu */}
                                                <ul
                                                   className={`${styles.navDropdownMenu}`}
                                                >
                                                   <>
                                                      {item.dropdownNavigation &&
                                                         item.dropdownNavigation.map(
                                                            (
                                                               dropdownItem: any,
                                                               j: number
                                                            ) => {
                                                               return (
                                                                  <>
                                                                     <li
                                                                        key={j}
                                                                     >
                                                                        {dropdownItem.slug.includes(
                                                                           "http"
                                                                        ) ? (
                                                                           <>
                                                                              {dropdownItem.slug ===
                                                                              "https://www.sustainablebtc.org/whitepaper.pdf" ? (
                                                                                 <>
                                                                                    <div
                                                                                       className={`${styles.navModalLink}`}
                                                                                       onClick={() => {
                                                                                          if (
                                                                                             window.innerWidth <
                                                                                             1440
                                                                                          ) {
                                                                                             setIsNavbarToggled(
                                                                                                !isNavbarToggled
                                                                                             );
                                                                                             openModal();
                                                                                          } else {
                                                                                             openModal();
                                                                                          }
                                                                                       }}
                                                                                    >
                                                                                       <span>
                                                                                          {
                                                                                             dropdownItem.name
                                                                                          }
                                                                                       </span>
                                                                                    </div>
                                                                                 </>
                                                                              ) : (
                                                                                 <>
                                                                                    <a
                                                                                       href={`${dropdownItem.slug}`}
                                                                                       onClick={() =>
                                                                                          window.innerWidth <
                                                                                          1440
                                                                                             ? setIsNavbarToggled(
                                                                                                  !isNavbarToggled
                                                                                               )
                                                                                             : null
                                                                                       }
                                                                                       className={
                                                                                          isActive
                                                                                             ? styles.active
                                                                                             : ""
                                                                                       }
                                                                                    >
                                                                                       <span>
                                                                                          {
                                                                                             dropdownItem.name
                                                                                          }
                                                                                       </span>
                                                                                    </a>
                                                                                 </>
                                                                              )}
                                                                           </>
                                                                        ) : (
                                                                           <>
                                                                              <Link
                                                                                 href={`/${dropdownItem.slug}`}
                                                                                 onClick={() =>
                                                                                    window.innerWidth <
                                                                                    1440
                                                                                       ? setIsNavbarToggled(
                                                                                            !isNavbarToggled
                                                                                         )
                                                                                       : null
                                                                                 }
                                                                                 className={
                                                                                    isActive
                                                                                       ? styles.active
                                                                                       : ""
                                                                                 }
                                                                              >
                                                                                 <span>
                                                                                    {
                                                                                       dropdownItem.name
                                                                                    }
                                                                                 </span>
                                                                              </Link>
                                                                           </>
                                                                        )}
                                                                     </li>
                                                                  </>
                                                               );
                                                            }
                                                         )}
                                                   </>
                                                </ul>
                                             </div>
                                          ) : (
                                             <>
                                                <Link
                                                   href={`/${item.slug}`}
                                                   onClick={() =>
                                                      window.innerWidth < 1440
                                                         ? setIsNavbarToggled(
                                                              !isNavbarToggled
                                                           )
                                                         : null
                                                   }
                                                >
                                                   <span>{item.name}</span>
                                                </Link>
                                             </>
                                          )}
                                       </>
                                    )}
                                 </li>
                              </>
                           );
                        }
                     )}

                  {/* Secondary Navigation
                      Condition: Visible only on toggle enabled state */}
                      <li>
                  <ul className={styles.secondaryInPrimary}>
                     <li>
                        <hr />
                     </li>
                     {navbarData.secondaryNavigation &&
                        navbarData.secondaryNavigation.map(
                           (item: any, i: number) => {
                              if (item.isButton === true) {
                                 return (
                                    <li key={i} className={styles.containBtn}>
                                       <Link
                                          href={`/${item.slug}`}
                                          className={`${styles.btn} "btn btn-primary btn-sm"`}
                                          onClick={() =>
                                             window.innerWidth < 1440
                                                ? setIsNavbarToggled(
                                                     !isNavbarToggled
                                                  )
                                                : null
                                          }
                                       >
                                          <span>{item.name}</span>
                                          <i
                                             className={`bi bi-${item.iconName}`}
                                          ></i>
                                       </Link>
                                    </li>
                                 );
                              } else {
                                 return (
                                    <li
                                       className={
                                          activeLink === item.slug
                                             ? styles.active
                                             : ""
                                       }
                                       key={i}
                                       onClick={() =>
                                          window.innerWidth < 1440
                                             ? setIsNavbarToggled(
                                                  !isNavbarToggled
                                               )
                                             : null
                                       }
                                    >
                                       <a href={`${item.slug}`}>
                                          <span>{item.name}</span>
                                       </a>
                                    </li>
                                 );
                              }
                           }
                        )}
                  </ul>
                  </li>
               </ul>

               {/* Scondary Nav 
                   Condition: Visible only on desktop and larger screen */}
               <ul className={styles.secondaryNav}>
                  {navbarData.secondaryNavigation &&
                     navbarData.secondaryNavigation.map(
                        (item: any, i: number) => {
                           if (item.isButton === true) {
                              return (
                                 <li className={styles.containBtn} key={i}>
                                    <Link
                                       href={`/${item.slug}`}
                                       className="btn btn-primary btn-sm"
                                    >
                                       <span>{item.name}</span>
                                       <i className={`bi bi-${item.iconName}`}></i>
                                    </Link>
                                 </li>
                              );
                           } else {
                              return (
                                 <li
                                    className={
                                       activeLink === item.slug
                                          ? styles.active
                                          : ""
                                    }
                                    key={i}
                                 >
                                    {item.slug.includes("http") ? (
                                       <a href={item.slug}>
                                          <span>{item.name}</span>
                                       </a>
                                    ) : (
                                       <Link href={`/${item.slug}`}>
                                          <span>{item.name}</span>
                                       </Link>
                                    )}
                                 </li>
                              );
                           }
                        }
                     )}
               </ul>
            </div>
         </header>
         
         {/* Modals */}
         <ModalWhitepaperEmail
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
         />
      </>
   );
};

export default HeaderContent;

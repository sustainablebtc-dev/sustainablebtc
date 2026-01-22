"use client";

// Importing styles
import styles from "@/styles/components/Header.module.scss";

// Next Imports
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

// Importing Schema utils
import { getNavbarData } from "@/sanity/sanity-utils";
import { Navbar } from "@/types/navbar";

// Images
import logo from "@/public/logo.svg";

const Header = () => {
   // Get activelink
   let activeLink = useSelectedLayoutSegment();
   // ===========

   // Navbar
   const [navbar, setNavbar] = useState<Navbar[]>();
   const [isNavbarToggled, setIsNavbarToggled] = useState<boolean>(false);

   // Scroll
   const [clientWindowHeight, setClientWindowHeight] = useState<any>("");

   const handleScroll = () => {
      setClientWindowHeight(window.scrollY);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   });

   useEffect(() => {
      const setNavbarData = async () => {
         setNavbar(await getNavbarData());
      };
      setNavbarData();
   }, []);

   return (
      <header
         className={`${styles.header} ${
            clientWindowHeight > 48 / 2 ? styles.fixToTop : ""
         }`}
      >
         <div className={`${styles.container} container`}>
            {/* Logo */}
            <div className={styles.logoWrapper}>
               <Link href="/">
                  <Image src={logo} alt="Logo" />
               </Link>

               {/* separator */}
               <div aria-hidden="true" className={styles.separator}></div>

               {/* Menu Toggle */}
               <div
                  className={`${styles.btnNavToggle} ${
                     isNavbarToggled ? styles.open : ""
                  }`}
                  onClick={() => setIsNavbarToggled(!isNavbarToggled)}
               >
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </div>

            {/* Primary nav */}
            <ul
               className={`${styles.primaryNav} ${
                  isNavbarToggled ? styles.open : ""
               }`}
            >
               {navbar &&
                  navbar.map((item: Navbar, i) => {
                     const isActive =
                        activeLink === item.slug ||
                        (activeLink == null && item.slug === "/");

                     if (!item.isSecondary) {
                        return (
                           <li
                              className={isActive ? styles.active : ""}
                              key={i}
                           >
                              <Link
                                 href={item.slug}
                                 onClick={() =>
                                    window.innerWidth < 1440
                                       ? setIsNavbarToggled(!isNavbarToggled)
                                       : null
                                 }
                              >
                                 <span>{item.name}</span>
                              </Link>
                           </li>
                        );
                     }
                  })}

               <ul className={styles.secondaryInPrimary}>
                  <li>
                     <hr />
                  </li>
                  {navbar &&
                     navbar.map((item: Navbar, i) => {
                        if (item.isSecondary) {
                           if (item.isButton) {
                              return (
                                 <li key={i}>
                                    <Link
                                       href={item.slug}
                                       className="btn btn-primary"
                                       onClick={() =>
                                          setIsNavbarToggled(!isNavbarToggled)
                                       }
                                    >
                                       <span>{item.name}</span>
                                       <i className={`bi bi-${item.iconName}`} aria-hidden="true"></i>
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
                                    <Link
                                       href={item.slug}
                                       onClick={() =>
                                          setIsNavbarToggled(!isNavbarToggled)
                                       }
                                    >
                                       <span>{item.name}</span>
                                    </Link>
                                 </li>
                              );
                           }
                        }
                     })}
               </ul>
            </ul>

            {/* Secondary Nav */}
            <ul className={styles.secondaryNav}>
               {navbar &&
                  navbar.map((item: Navbar, i) => {
                     if (item.isSecondary) {
                        if (item.isButton) {
                           return (
                              <li key={i}>
                                 <Link
                                    href={item.slug}
                                    className="btn btn-primary"
                                 >
                                    <span>{item.name}</span>
                                    <i className={`bi bi-${item.iconName}`} aria-hidden="true"></i>
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
                                 <Link href={item.slug}>
                                    <span>{item.name}</span>
                                 </Link>
                              </li>
                           );
                        }
                     }
                  })}
            </ul>
         </div>
      </header>
   );
};

export default Header;

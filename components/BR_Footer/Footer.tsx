"use client";

// Importing styles
import styles from "@/styles/components/Footer.module.scss";

// Next Imports
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PortableText } from "@portabletext/react";

// Importing Schema utils
import { getFooterData, getNavbarData } from "@/sanity/sanity-utils";
import { FooterType } from "@/types/footer-type";

// Custom Components
import ModalWhitepaperEmail from "../Modals/ModalWhitepaperEmail";

const Footer = () => {
   // Data
   const [footerData, setFooterData] = useState<FooterType>();
   const [navbarData, setNavbarData] = useState<any>();

   // ! Modals variable
   const [modalIsOpen, setModalIsOpen] = useState(false);
   function openModal() {
      setModalIsOpen(true);
   }

   useEffect(() => {
      const setFooter = async () => {
         setFooterData((await getFooterData())[0]);
         setNavbarData(await getNavbarData());
      };
      setFooter();
   }, []);

   return (
      <>
         <footer className={styles.footer}>

            {/* Top Footer */}
            <div className={styles.footerContent}>
               <div className={`${styles.container} container`}>
                  {/* Description */}
                  <div className={styles.footerAbout}>
                     {footerData?.logoURL && (
                        <>
                           <Image
                              src={footerData.logoURL}
                              alt="Harvestt Short Logo"
                              width={100}
                              height={40}
                           />
                        </>
                     )}
                     {footerData && <PortableText value={footerData.about} />}
                     {/* CTA */}
                     {/* <div className={styles.footerCTA}>
                        <a href="mailto:info@sustainablebtc.org">info@sustainablebtc.org</a>
                     </div> */}
                      {/* Social */}
                      <div className={styles.footerSocialMedia}>
                        {footerData &&
                           footerData.socialLinks.map(
                              (item: any, i: number) => {
                                 const socialMediaName = new URL(
                                    item.socialMedia
                                 ).hostname
                                    .replace("www.", "")
                                    .replace(".com", "")
                                    .toLowerCase();
                                 return (
                                    <>
                                       <a
                                          className="btn btn-primary btn-rounded btn-sm"
                                          href={item.socialMedia}
                                          target="_blank"
                                          key={i}
                                          aria-label={socialMediaName}
                                       >
                                          <i
                                             className={`bi bi-${socialMediaName}`}
                                          ></i>
                                       </a>
                                    </>
                                 );
                              }
                           )}
                     </div>
                  </div>

                  {/* Navigation Links */}
                  {/* <ul>
                     {navbarData &&
                        navbarData.primaryNavigation.map(
                           (item: any, i: number) => {
                              return (
                                 <>
                                    {!item.isDropdown && (
                                       <>
                                          <li key={i}>
                                             {item.slug.includes("http") ? (
                                                <a
                                                   href={item.slug}
                                                   className={styles.footerLink}
                                                >
                                                   <span>{item.name}</span>
                                                </a>
                                             ) : (
                                                <Link
                                                   href={`/${item.slug}`}
                                                   className={styles.footerLink}
                                                >
                                                   {item.name}
                                                </Link>
                                             )}
                                          </li>
                                       </>
                                    )}
                                 </>
                              );
                           }
                        )}
                  </ul> */}

                  {/* Dropdown Links */}
                  {/* <ul>
                     {navbarData &&
                        navbarData.primaryNavigation.map(
                           (item: any, i: number) => {
                              return (
                                 <>
                                    {item.isDropdown && (
                                       <>
                                          {item.dropdownNavigation &&
                                             item.dropdownNavigation.map(
                                                (
                                                   dropdownItem: any,
                                                   j: number
                                                ) => {
                                                   return (
                                                      <>
                                                         <li key={j}>
                                                            {dropdownItem.slug.includes(
                                                               "http"
                                                            ) ? (
                                                               <>
                                                                  {dropdownItem.slug ===
                                                                  "https://www.sustainablebtc.org/whitepaper.pdf" ? (
                                                                     <>
                                                                        <div
                                                                           className={`${styles.footerLink}`}
                                                                           onClick={() => {
                                                                              if (
                                                                                 window.innerWidth <
                                                                                 1440
                                                                              ) {
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
                                                                           className={
                                                                              styles.footerLink
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
                                                                     className={
                                                                        styles.footerLink
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
                                    )}
                                 </>
                              );
                           }
                        )}
                  </ul> */}

                  {/* Footer Links */}
                  <ul>
                     {footerData &&
                        footerData.footerLinks.slice(1).map((item: any, i: number) => {
                           return (
                              <>
                                 <li key={i}>
                                    <Link
                                       href={`/${item.footerLinkSlug}`}
                                       className={styles.footerLink}
                                    >
                                       {item.footerLinkName}
                                    </Link>
                                 </li>
                              </>
                           );
                        })}
                  </ul>
               </div>
            </div>
            {/* Copyright */}
            <div className={styles.copyright}>
               <div className={`${styles.container} container`}>
                  <p>{footerData?.copyright}</p>
               </div>
            </div>
         </footer>

         {/* Modals */}
         <ModalWhitepaperEmail
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
         />
      </>
   );
};

export default Footer;

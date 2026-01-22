"use client";

// React Packages
import { useRef, useState, useEffect } from "react";

// Styles
import styles from "@/styles/pages/News.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";
import Isotope from "isotope-layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// Images

const NewsHero = ({ newsPageData }: { newsPageData: any }) => {
   // * Implementing Isotope Library
   // init one ref to store the future isotope object
   const isotope = useRef<Isotope | null>();
   // store the filter keyword in a state
   const [filterKey, setFilterKey] = useState("*");
   const [isCategoryActive, setIsCategoryActive] = useState("*");

   // initialize an Isotope object with configs
   useEffect(() => {
      if (isCategoryActive !== "*") {
         isotope.current = new Isotope(".filter-container", {
            itemSelector: ".filter-item",
            layoutMode: "fitRows",
         });
         // cleanup
         return () => isotope.current?.destroy();
      }
   }, [isCategoryActive]);

   // handling filter key change
   useEffect(() => {
      if (isCategoryActive !== "*") {
         if (filterKey === "*") isotope.current?.arrange({ filter: `*` });
         else isotope.current?.arrange({ filter: `.${filterKey}` });
      }
   }, [filterKey, isCategoryActive]);
   const handleFilterKeyChange = (key: string) => () => {
      setFilterKey(key);
      setIsCategoryActive(key);
   };
   // END Isotope

   return (
      <>
         <section className={`${styles.hero} hero`}>
            <div className={`${styles.container} container`}>
               {/* Heading */}
               <div className={`${styles.heroHeading} heading heading-1`}>
                  SBP&nbsp;in the&nbsp;Media
               </div>
               {/* Sub Heading */}
               <div className={`${styles.heroSubHeading} heading heading-5`}>
                  {/* <PortableText value={heroData.heroSubHeading} /> */}
                  Stay up to date with the latest research & insights from{" "}
                  <br />
                  Sustainable Bitcoin Protocol
               </div>

               {/* Categories */}
               {/* <ul className={`${styles.categoryFilter}`}>
                  <li
                     className={`${
                        isCategoryActive == "*" ? styles.active : ""
                     }`}
                     onClick={handleFilterKeyChange("*")}
                  >
                     All Categories
                  </li>
                  {newsPageData.categories.map((category: any, i: number) => (
                     <>
                        {newsPageData.news.filter((article: any) =>
                           article.categories.some(
                              (cat: any) =>
                                 cat.categoryKey === category.categoryKey
                           )
                        ).length > 0 && (
                           <>
                              <li
                                 className={`${
                                    isCategoryActive == category.categoryKey
                                       ? styles.active
                                       : ""
                                 }`}
                                 onClick={handleFilterKeyChange(
                                    category.categoryKey
                                 )}
                              >
                                 {category.title}
                              </li>
                           </>
                        )}
                     </>
                  ))}
               </ul> */}

               {isCategoryActive === "*" && (
                  <>
                     <div>
                        {/* Top Card */}
                        <div className={`${styles.allCategoryHero}`}>
                           {newsPageData.news &&
                              newsPageData.news
                                 .slice(0, 4)
                                 .map((news: any, i: any) => {
                                    let category = news.categories
                                       .map(
                                          (category: any, i: number) =>
                                             category.categoryKey
                                       )
                                       .toString()
                                       .replace(",", " ");
                                    return (
                                       <>
                                          <div
                                             className={`${styles.articleCard}`}
                                             key={i}
                                          >
                                             {/* Image */}
                                             <div
                                                className={styles.articleImage}
                                             >
                                                <Link
                                                   href={`${
                                                      news.btnIsRedirect
                                                         ? news.url
                                                         : `news/${news.slug.current}`
                                                   }`}
                                                   target={`${
                                                      news.btnIsRedirect
                                                         ? "_blank"
                                                         : ""
                                                   }`}
                                                >
                                                   {news.imageURL && (
                                                      <Image
                                                         src={news.imageURL}
                                                         alt={news.image.alt}
                                                         // height={1280}
                                                         fill
                                                      />
                                                   )}

                                                   <label>Latest News</label>
                                                </Link>
                                             </div>

                                             <div className={styles.content}>
                                                {/* Title */}
                                                <h4
                                                   className={`${styles.articleTitle} heading heading-5`}
                                                   title={news.title}
                                                >
                                                   {news.title}
                                                </h4>

                                                {/* Categories & Dates */}
                                                <div
                                                   className={`${styles.articleInfoData}`}
                                                >
                                                   {/* <div
                                                      className={`${styles.articleCategories}`}
                                                   >
                                                      {news.categories.map(
                                                         (
                                                            category: any,
                                                            i: number
                                                         ) => (
                                                            <>
                                                               <div>
                                                                  {
                                                                     category.title
                                                                  }
                                                               </div>
                                                            </>
                                                         )
                                                      )}
                                                   </div> */}

                                                   {/* Publish Date */}
                                                   <p
                                                      className={
                                                         styles.articleDate
                                                      }
                                                   >
                                                      {new Date(
                                                         news.date
                                                      ).toLocaleDateString(
                                                         "en-US",
                                                         {
                                                            timeZone: "UTC",
                                                            month: "long",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                         }
                                                      )}
                                                   </p>
                                                </div>

                                                {/* Description */}
                                                <p
                                                   className={`${styles.articleDescription} para`}
                                                >
                                                   {news.description}
                                                </p>

                                                {/* CTA */}
                                                <Link
                                                   href={`${
                                                      news.btnIsRedirect
                                                         ? news.url
                                                         : `news/${news.slug.current}`
                                                   }`}
                                                   target={`${
                                                      news.btnIsRedirect
                                                         ? "_blank"
                                                         : ""
                                                   }`}
                                                   className="btn btn-secondary"
                                                >
                                                   <span>Read More</span>
                                                   <i className="bi bi-arrow-up-right-circle"></i>
                                                </Link>
                                             </div>
                                          </div>
                                       </>
                                    );
                                 })}
                        </div>

                        {newsPageData.categories.map(
                           (category: any, i: number) => (
                              <>
                                 {newsPageData.news.filter((article: any) =>
                                    article.categories.some(
                                       (cat: any) =>
                                          cat.categoryKey ===
                                          category.categoryKey
                                    )
                                 ).length > 0 && (
                                    <>
                                       {/* Sliders */}
                                       <div
                                          className={styles.categoryWiseSliders}
                                       >
                                          {/* Headers */}
                                          <div className={styles.sliderHeader}>
                                             {/* Title */}
                                             <h3
                                                className={`${styles.sliderHeading} heading heading-3`}
                                             >
                                                {category.title}
                                             </h3>

                                             {/* Right Content */}
                                             <div
                                                className={`${styles.sliderControl}`}
                                             >
                                                <span
                                                   className={
                                                      styles.sliderControlLink
                                                   }
                                                   onClick={handleFilterKeyChange(
                                                      category.categoryKey
                                                   )}
                                                >
                                                   View all {category.title}
                                                </span>

                                                <div
                                                   className={
                                                      styles.sliderControlBtns
                                                   }
                                                >
                                                   <button
                                                      className={`${category.categoryKey}-arrow-left`}
                                                      aria-label="previous"
                                                   >
                                                      <i className="bi bi-caret-left-fill"></i>
                                                   </button>
                                                   <button
                                                      className={`${category.categoryKey}-arrow-right`}
                                                      aria-label="next"
                                                   >
                                                      <i className="bi bi-caret-right-fill"></i>
                                                   </button>
                                                </div>
                                             </div>
                                          </div>
                                          {/* Slider */}
                                          <div className={styles.sliderBody}>
                                             <Swiper
                                                loop={true}
                                                spaceBetween={32}
                                                slidesPerView={3.5}
                                                modules={[FreeMode, Navigation]}
                                                navigation={{
                                                   nextEl: `.${category.categoryKey}-arrow-right`,
                                                   prevEl: `.${category.categoryKey}-arrow-left`,
                                                }}
                                             >
                                                {newsPageData.news &&
                                                   newsPageData.news
                                                      .filter((article: any) =>
                                                         article.categories.some(
                                                            (cat: any) =>
                                                               cat.categoryKey ===
                                                               category.categoryKey
                                                         )
                                                      )
                                                      .map(
                                                         (
                                                            news: any,
                                                            i: any
                                                         ) => {
                                                            let category =
                                                               news.categories
                                                                  .map(
                                                                     (
                                                                        category: any,
                                                                        i: number
                                                                     ) =>
                                                                        category.categoryKey
                                                                  )
                                                                  .toString()
                                                                  .replace(
                                                                     ",",
                                                                     " "
                                                                  );
                                                            return (
                                                               <>
                                                                  <SwiperSlide
                                                                     className={`
                                                                     filter-item 
                                                                     ${styles.articleCard}
                                                                     ${category}
                                                                     `}
                                                                     key={i}
                                                                  >
                                                                     {/* Image */}
                                                                     <div
                                                                        className={
                                                                           styles.articleImage
                                                                        }
                                                                     >
                                                                        <Link
                                                                           href={`${
                                                                              news.btnIsRedirect
                                                                                 ? news.url
                                                                                 : `news/${news.slug.current}`
                                                                           }`}
                                                                           target={`${
                                                                              news.btnIsRedirect
                                                                                 ? "_blank"
                                                                                 : ""
                                                                           }`}
                                                                        >
                                                                           {news.imageURL && (
                                                                              <Image
                                                                                 src={
                                                                                    news.imageURL
                                                                                 }
                                                                                 alt={
                                                                                    news
                                                                                       .image
                                                                                       .alt
                                                                                 }
                                                                                 // height={1280}
                                                                                 fill
                                                                              />
                                                                           )}
                                                                        </Link>
                                                                     </div>

                                                                     <div>
                                                                        {/* Title */}
                                                                        <Link
                                                                           href={`${
                                                                              news.btnIsRedirect
                                                                                 ? news.url
                                                                                 : `news/${news.slug.current}`
                                                                           }`}
                                                                           target={`${
                                                                              news.btnIsRedirect
                                                                                 ? "_blank"
                                                                                 : ""
                                                                           }`}
                                                                        >
                                                                           <h4
                                                                              className={`${styles.articleTitle} heading heading-5`}
                                                                              title={
                                                                                 news.title
                                                                              }
                                                                           >
                                                                              {
                                                                                 news.title
                                                                              }
                                                                           </h4>
                                                                        </Link>
                                                                     </div>
                                                                     <div
                                                                        className={`${styles.articleInfoData}`}
                                                                     >
                                                                        {/* <div
                                                                           className={`${styles.articleCategories}`}
                                                                        >
                                                                           {news.categories.map(
                                                                              (
                                                                                 category: any,
                                                                                 i: number
                                                                              ) => (
                                                                                 <>
                                                                                    <div>
                                                                                       {
                                                                                          category.title
                                                                                       }
                                                                                    </div>
                                                                                 </>
                                                                              )
                                                                           )}
                                                                        </div> */}

                                                                        {/* Publish Date */}
                                                                        <p
                                                                           className={
                                                                              styles.articleDate
                                                                           }
                                                                        >
                                                                           {new Date(
                                                                              news.date
                                                                           ).toLocaleDateString(
                                                                              "en-US",
                                                                              {
                                                                                 timeZone:
                                                                                    "UTC",
                                                                                 month: "long",
                                                                                 day: "2-digit",
                                                                                 year: "numeric",
                                                                              }
                                                                           )}
                                                                        </p>
                                                                     </div>

                                                                     {/* Description */}
                                                                     <p
                                                                        className={`${styles.articleDescription} para`}
                                                                     >
                                                                        {
                                                                           news.description
                                                                        }
                                                                     </p>

                                                                     {/* CTA */}
                                                                     <Link
                                                                        href={`${
                                                                           news.btnIsRedirect
                                                                              ? news.url
                                                                              : `news/${news.slug.current}`
                                                                        }`}
                                                                        target={`${
                                                                           news.btnIsRedirect
                                                                              ? "_blank"
                                                                              : ""
                                                                        }`}
                                                                        className="btn btn-secondary"
                                                                     >
                                                                        <span>
                                                                           Read
                                                                           More
                                                                        </span>
                                                                        <i className="bi bi-arrow-up-right-circle"></i>
                                                                     </Link>
                                                                  </SwiperSlide>
                                                               </>
                                                            );
                                                         }
                                                      )}
                                             </Swiper>
                                          </div>
                                       </div>
                                    </>
                                 )}
                              </>
                           )
                        )}
                     </div>
                  </>
               )}

               {isCategoryActive !== "*" && (
                  <>
                     <div className={`${styles.articles} filter-container`}>
                        {newsPageData.news &&
                           newsPageData.news.map((news: any, i: any) => {
                              let category = news.categories
                                 .map(
                                    (category: any, i: number) =>
                                       category.categoryKey
                                 )
                                 .toString()
                                 .replace(",", " ");
                              return (
                                 <>
                                    <div
                                       className={`
                                          filter-item 
                                          ${styles.articleCard}
                                          ${category}
                                          `}
                                       key={i}
                                    >
                                       {/* Image */}
                                       <div className={styles.articleImage}>
                                          <Link
                                             area-label="alt-link"
                                             href={`${
                                                news.btnIsRedirect
                                                   ? news.url
                                                   : `news/${news.slug.current}`
                                             }`}
                                             
                                             target={`${
                                                news.btnIsRedirect
                                                   ? "_blank"
                                                   : ""
                                             }`}
                                          >
                                             {news.imageURL && (
                                                <Image
                                                   src={news.imageURL}
                                                   alt={news.image.alt}
                                                   // height={1280}
                                                   fill
                                                />
                                             )}
                                          </Link>
                                       </div>

                                       <div>
                                          {/* Title */}
                                          <Link
                                             href={`${
                                                news.btnIsRedirect
                                                   ? news.url
                                                   : `news/${news.slug.current}`
                                             }`}
                                             target={`${
                                                news.btnIsRedirect
                                                   ? "_blank"
                                                   : ""
                                             }`}
                                          >
                                             <h4
                                                className={`${styles.articleTitle} heading heading-5`}
                                                title={news.title}
                                             >
                                                {news.title}
                                             </h4>
                                          </Link>
                                          {/* Publish Date */}
                                          <p className={styles.articleDate}>
                                             {new Date(
                                                news.date
                                             ).toLocaleDateString("en-US", {
                                                timeZone: "UTC",
                                                month: "long",
                                                day: "2-digit",
                                                year: "numeric",
                                             })}
                                          </p>
                                       </div>

                                       {/* Categories */}
                                       {/* <div
                                          className={`${styles.articleCategories}`}
                                       >
                                          {news.categories.map(
                                             (category: any, i: number) => (
                                                <>
                                                   <div>{category.title}</div>
                                                </>
                                             )
                                          )}
                                       </div> */}

                                       {/* Description */}
                                       <p
                                          className={`${styles.articleDescription} para`}
                                       >
                                          {news.description}
                                       </p>

                                       {/* CTA */}
                                       <Link
                                          href={`${
                                             news.btnIsRedirect
                                                ? news.url
                                                : `news/${news.slug.current}`
                                          }`}
                                          target={`${
                                             news.btnIsRedirect ? "_blank" : ""
                                          }`}
                                          className="btn btn-secondary"
                                       >
                                          <span>Read More</span>
                                          <i className="bi bi-arrow-up-right-circle"></i>
                                       </Link>
                                    </div>
                                 </>
                              );
                           })}
                     </div>
                  </>
               )}
            </div>
         </section>
      </>
   );
};

export default NewsHero;

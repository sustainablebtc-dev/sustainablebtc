"use client";
// Styles
import styles from "@/styles/pages/News.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";

// Images

const ArticleSidebar = ({ latestNewsData }: { latestNewsData: any }) => {
   const [latestRelatedPost, setLatestRelatedPost] = useState([]);

   useEffect(()=>{
      const latestPosts = latestNewsData.news
        .sort((a:any, b:any) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime())
        .slice(0, 5);

      setLatestRelatedPost(latestPosts);

   }, [latestNewsData])

   
   return (
      <aside className={styles.articleAside}>
         {/* Recent Posts */}
         <div className={`${styles.articleAsideCard} mt-12 lg:mt-0`}>
            <h3 className="heading heading-5">Recent Posts</h3>

            <ul className={styles.relatedList}>
               {latestNewsData &&
                  latestRelatedPost.map((news: any) => (
                     <>
                        <li>
                           {/* Image */}
                           {news.imageURL && (
                              <Image
                                 src={news.imageURL}
                                 alt={news.image.alt}
                                 width={1200}
                                 height={720}
                              />
                           )}
                           {/* Content */}
                           <div>
                              <Link 
                                 href={`${
                                    news.btnIsRedirect
                                       ? news.url
                                       : `../news/${news.slug.current}`
                                 }`}
                                 target={`${
                                    news.btnIsRedirect
                                       ? "_blank"
                                       : ""
                                 }`}   
                              >
                                 <h5 className={styles.relatedListHeading}>
                                    {news.title}
                                 </h5>
                              </Link>
                              <p></p>
                           </div>
                        </li>
                        <li className={styles.separator}></li>
                     </>
                  ))}
            </ul>
         </div>
      </aside>
   );
};

export default ArticleSidebar;

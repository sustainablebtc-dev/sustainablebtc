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

// Images

const ArticleContent = ({ articleData }: { articleData: any }) => {
   return (
      <>
         {/* SEO */}
         <title>{articleData.title}</title>
         <meta property="og:title" content={articleData.title} key="title" />
         <meta name="description" content={articleData.description} />

         {/* Content */}
         <div className={styles.articleContent}>
            {/* Title */}
            <h1 className={`${styles.articleTitle} heading heading-2`}>
               <span>{articleData.title}</span>
            </h1>

            {/* Image */}
            <div className={styles.articleImage}>
               {articleData.imageURL && (
                  <>
                     <Image
                        src={urlFor(articleData.imageURL).url()}
                        alt={articleData.image.alt}
                        width={1920}
                        height={1280}
                     />
                  </>
               )}
            </div>

            {/* MetaData */}

            {/* Content */}
            <div className={`${styles.articleBody} portableText`}>
               <PortableText value={articleData.content} />
            </div>
         </div>
      </>
   );
};

export default ArticleContent;

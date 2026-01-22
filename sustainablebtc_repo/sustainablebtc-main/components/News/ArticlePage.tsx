// Styles
import styles from "@/styles/pages/News.module.scss";

import ArticleContent from "./ArticleContent";
import ArticleSidebar from "./ArticleSidebar";

// import Sanity
import { getArticleData } from "@/sanity/sanity-utils";
import { getNewsPageData } from "@/sanity/sanity-utils";

export default async function ArticlePage({ slug }: { slug: string }) {
   const articleData = await getArticleData(slug);
   const latestNewsData = await getNewsPageData();

   return (
      <>
         <div className={styles.article}>
            <div className={`${styles.container} container`}>
               <ArticleContent articleData={articleData} />
               <ArticleSidebar latestNewsData={latestNewsData} />
            </div>
         </div>
      </>
   );
}

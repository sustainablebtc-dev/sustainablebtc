import React from 'react';

import LearningCentreHero from './LearningCentreHero';
import HomeWhitepaperDownload from '../HomeNew/HomeWhitepaperDownload';
import HomeFaq from '../HomeNew/HomeFaq';
import LearningCentreLesson from './LearningCentreLesson';

// import Sanity
import { getLearningCentrePageData, getHomePageData, getFaqPageData } from "@/sanity/sanity-utils";

export default async function LearningCentrePage() {
   const learningCentrePageData = await getLearningCentrePageData();
   const homePageData = await getHomePageData();
   const faqPageData = await getFaqPageData();
   const heroData = learningCentrePageData.hero || null;
   const whitepaperdownloadData = homePageData.whitepaperdownload || null;
   const faqData = homePageData.faq || null;
   const faqsData = faqPageData.faqs || [];
   const videoLessonData = learningCentrePageData.videoLessons || null;

  return (
   <>
      <LearningCentreHero heroData={heroData} />
      <LearningCentreLesson videoLessonData={videoLessonData}/>
      <HomeWhitepaperDownload whitepaperdownloadData={whitepaperdownloadData} />
      <HomeFaq faqData={faqData} faqsData={faqsData} />
   </>
  )
}
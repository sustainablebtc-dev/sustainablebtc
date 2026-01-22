"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { urlFor } from '@/sanity/sanity-urlFor';
import ModalVideo from "react-modal-video";

// Styles
import styles from "@/styles/pages/LearningCentre.module.scss";
import "react-modal-video/css/modal-video.css";
import { PortableText } from '@portabletext/react';

const LearningCentreLesson = ({ videoLessonData }: { videoLessonData: any }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [videoId, setVideoId] = useState("");

   function openVideoModal(videoId: any){
      setVideoId(videoId);
      setIsOpen(true);
   }

   return (
      <>
         <section className={styles.videoLesson}>
            <div className={`container ${styles.container}`}>
               {videoLessonData &&
                  <>
                     <div className={styles.videoWrapper}>
                        {videoLessonData.map((lesson: any, i: number) => (
                           <>
                              <div className={styles.videoItem} key={i}>
                                 {/* Image */}
                                 <div className={styles.videoItemImageWrapper} onClick={() => openVideoModal(lesson.videoLessonButton[0].btnOptions.btnSlug)}>
                                    <span className={styles.videoItemImageBubble}>Lesson {i + 1}</span>
                                    {lesson.videoLessonImage && (
                                       <Image
                                          src={urlFor(lesson.videoLessonImage)
                                             .width(1280)
                                             .url()}
                                          alt={lesson.videoLessonImage.alt}
                                          className={styles.videoItemImage}
                                          width={1280}
                                          height={720}
                                       />
                                    )}
                                 </div>

                                 {/* Content */}
                                 <div className={styles.videoItemContent}>
                                    {/* Title */}
                                    <div className={`portableText`}>
                                       <PortableText value={lesson.videoLessonTitle} />
                                    </div>
                                    {/* Tags & Duration */}
                                    <div className={styles.videoItemLabels}>
                                       <div className={styles.videoItemBubbles}>
                                          {lesson.videoLessonTags.map((item: any, i: number) => (
                                             <>
                                                <span key={i}>{item}</span>
                                             </>
                                          ))}
                                       </div>
                                       <div className={styles.videoItemDuration}>
                                          {lesson.videoLessonDuration}
                                       </div>
                                    </div>
                                    {/* Description */}
                                    <div className={`portableText`}>
                                       <PortableText value={lesson.videoLessonPara} />
                                    </div>
                                    {/* CTA */}
                                    <div className={styles.videoLessonButton}>
                                       {lesson.videoLessonButton.map((cta: any, i: number) => (
                                          <>
                                             {cta.btnOptions.btnVisible && (
                                                <>
                                                   {/* Button */}
                                                   <button
                                                      key={i}
                                                      // href={cta.btnOptions.btnSlug}
                                                      className={`btn btn-${cta.btnOptions.btnType}`}
                                                      onClick={() => openVideoModal(cta.btnOptions.btnSlug)}
                                                   >
                                                      <span>{cta.btnText}</span>
                                                      {cta.btnOptions.btnIcon !== "NA" && (
                                                         <i
                                                            className={`bi bi-${cta.btnOptions.btnIcon}`}
                                                         ></i>
                                                      )}
                                                   </button>
                                                </>
                                             )}
                                          </>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </>
                        ))}
                     </div>
                  </>
               }
            </div>

            {/* Modal Video */}
            <ModalVideo
               channel="youtube"
               isOpen={isOpen}
               videoId={videoId}
               onClose={() => setIsOpen(false)}
            />
         </section>
      </>
   )
}

export default LearningCentreLesson
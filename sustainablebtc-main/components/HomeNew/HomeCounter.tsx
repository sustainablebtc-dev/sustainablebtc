"use client";

// Styles
import styles from "@/styles/pages/HomeNew.module.scss";

// React Imports
import React, { useState, useEffect } from 'react'

// Lib
import { PortableText } from "@portabletext/react";
import emailjs from "@emailjs/browser";

const HomeCounter = ({ countdownData }: { countdownData: any }) => {

   // #region countdown
   // Defining states for countdown
   const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

   useEffect(() => {
      // timer function
      const timer = setInterval(() => {
         const targetDate: any = new Date(countdownData.countdownDate);
         const now: any = new Date();
         const difference = targetDate - now;

         // Handling edge condition if countdown is over
         if (difference <= 0) {
            clearInterval(timer);
            setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            return;
         }

         // Calculate remaining time
         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
         const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
         const minutes = Math.floor((difference / (1000 * 60)) % 60);
         const seconds = Math.floor((difference / 1000) % 60);

         setTimeLeft({
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
         });
      }, 1000);

      // cleanup function
      return () => clearInterval(timer);
   }, [countdownData.countdownDate])
   //#endregion

   // #region email collection form
   const [globalError, setGlobalError] = useState<string | null>(null);
   const [globalSuccess, setGlobalSuccess] = useState<string | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
      email: "",
      signUpForNewsletter: true,
   });

   const handleChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault();

      // Disable button on submit
      setIsSubmitting(true);

      // Validations
      if (!formData.email) {
         setGlobalError("Email is required!");
         setGlobalSuccess("");
         setIsSubmitting(false);
         return;
      }

      // Validate email format
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
         setGlobalError("Please enter a valid email address.");
         setGlobalSuccess("");
         setIsSubmitting(false);
         return;
      }

      const contactData = {
         "properties": {
            "email": formData.email,
            "customerpreference_signupfornewsletter": formData.signUpForNewsletter,
         },
      };

      // sbp@sustainablebtc.hs-inbox.com

      try {
         const response = await fetch("/api/submit-event-registration-to-hubspot", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
         });

         if (response.ok) {
            setGlobalError("");
            setGlobalSuccess("Thank you for submitting! You'll hear from us soon.");

            // Reset form
            setFormData({
               email: '',
               signUpForNewsletter: true
            });
         } else {
            let errorMessage = (await response.json()).message;
            setGlobalError(errorMessage);
            setGlobalSuccess("");
         }
      } catch (error: any) {
         setGlobalError(error.message);
      } finally {
         setIsSubmitting(false);
      }
   };
   // #endregion

   return (
      <section className={styles.countdown}>
         <div className={`container ${styles.container}`}>
            {/* Count down wrapper */}
            <div className={styles.countdownWrapper}>
               {/* Heading */}
               <div className={`${styles.countdownHeading} portableText`}>
                  <PortableText value={countdownData.countdownHeading} />
                  <span className={styles.icon}>
                     <i className="bi bi-arrow-right"></i>
                  </span>
               </div>

               {/* Countdown */}
               <div className={styles.countdownClock}>
                  <div className={styles.countdownClockBlock}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>{timeLeft.days}</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}>Days</div>
                  </div>
                  <div className={styles.countdownClockBlock}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>:</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}></div>
                  </div>
                  <div className={styles.countdownClockBlock}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>{timeLeft.hours}</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}>Hours</div>
                  </div>
                  <div className={styles.countdownClockBlock}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>:</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}></div>
                  </div>
                  <div className={styles.countdownClockBlock}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>{timeLeft.minutes}</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}>Minutes</div>
                  </div>
                  <div className={styles.countdownClockBlock}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>:</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}></div>
                  </div>
                  <div className={`${styles.countdownClockBlock} ${styles.gradientText}`}>
                     <h3 className={`heading heading-6 ${styles.countdownClockBlockHeading}`}>{timeLeft.seconds}</h3>
                     <div className={`para para-small ${styles.countdownClockBlockPara}`}>Seconds</div>
                  </div>
               </div>

               {/* SubHeading */}
               <div className={`${styles.countdownSubHeading} portableText`}>
                  <PortableText value={countdownData.countdownSubHeading} />
               </div>

               {/* Form */}
               <div className={styles.countdownForm}>
                  <form onSubmit={handleSubmit}>
                     <div className={styles.countdownFormInputs}>
                        <div className={`${styles.formGroup} form-group`}>
                           <input
                              type="text"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Enter Email *"
                              value={formData.email}
                              onChange={handleChange}
                           />
                           <span className="error"></span>
                        </div>
                        <button className={`${styles.formBtn} btn btn-primary`} disabled={isSubmitting}>
                           {!isSubmitting && (
                              <>
                                 <span>Submit</span>
                                 <i className="bi bi-arrow-right"></i>
                              </>
                           )}
                           {isSubmitting && <span>Submitting...</span>}
                        </button>
                     </div>

                     {globalError &&
                        <span className='text-red-500 mt-2'>
                           {globalError}
                        </span>
                     }
                     {globalSuccess &&
                        <span className='text-blue-500 mt-2'>
                           {globalSuccess}
                        </span>
                     }
                  </form>
               </div>
            </div>
         </div>
      </section>
   )
}

export default HomeCounter
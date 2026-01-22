"use client";

// Importing Libraries
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Image from "next/image";
import axios from "axios";
import validator from "validator";

// Importing styles
import styles from "@/styles/pages/Resources.module.scss";

// Importing Images
import imgModalBackdrop from "@/public/home/modalWhitepaperBackdrop.png";
import imgModalForeground from "@/public/home/modalWhitepaperForeground.png";

// Bind modal to the appElement
// Modal.setAppElement("#modalWhitepaperEmail");

const ModalWhitepaperEmail = () => {
   // Managing state variable of email
   const [email, setEmail] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);

   // Managing reference variables for email
   const emailForm = useRef(null);
   const emailError = useRef(null);

   // Function to handle form submit event
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      var emailErrorText: HTMLElement = emailError.current!;

      setIsDisabled(true);

      // If an input field is empty, don't submit the form
      if (!email) {
         emailErrorText.innerHTML = "Email is required!";
         setIsDisabled(false);
         return;
      } else {
         if (!validator.isEmail(email)) {
            emailErrorText.innerHTML = "Invalid Email!";
            setIsDisabled(false);
            return;
         }
         emailErrorText.innerHTML = "";
      }

      try {
         // Collect the response
         const hubspot_response = await submit_hubspot_form(email);

         // Error handling
         console.log(hubspot_response); // make sure it succeeded!

         if (
            hubspot_response.status === 200 ||
            hubspot_response.status === 201
         ) {
            // Download Whitepaper
            fetch("../whitepaper.pdf").then((response) => {
               response.blob().then((blob) => {
                  // Creating new object of PDF file
                  const fileURL = window.URL.createObjectURL(blob);

                  // Setting various property values
                  let alink = document.createElement("a");
                  alink.href = fileURL;
                  alink.target = "_blank";
                  // alink.download = "sbp-whitepaper.pdf";
                  alink.click();
               });
            });

            // Reset & Close Modals
            setTimeout(() => {
               (emailForm.current as any).reset();
               setEmail("");
               setIsDisabled(false);
            }, 1000);
         }
      } catch (error) {
         emailErrorText.innerHTML = "Something went wrong. Please try later!";
         setIsDisabled(false);
      }
   };

   // Send data to hubspot
   const submit_hubspot_form = async (email: string) => {
      const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION;
      const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_FORM_WHITEPAPER_ID;
      const config = {
         // important!
         headers: {
            "Content-Type": "application/json",
         },
      };

      const response = await axios.post(
         `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
         {
            region,
            portalId,
            formGuid,
            fields: [
               {
                  name: "email",
                  value: email,
               },
            ],
         },
         config
      );
      return response;
   };

   return (
      <>
         <div className={`${styles.downloadWhitepaper}`}>
            <div className={`container ${styles.container}`}>
               <div className={styles.modalWhitepaperEmail}>
                  {/* Actual Content */}
                  <div className={`${styles.content}`}>
                     <h3 className={`${styles.heading} heading heading-2`}>
                        Download SBP Whitepaper
                     </h3>
                     <p className={`${styles.para} para`}>
                        Thank you for your interest in SBP. <br />
                        Our whitepaper is available for free download.
                     </p>

                     <form
                        action="#"
                        className={`${styles.form}`}
                        onSubmit={handleSubmit}
                        ref={emailForm}
                     >
                        <div className={`${styles.formGroup} form-group`}>
                           <label htmlFor="email">
                              Email <span>*</span>
                           </label>
                           <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your email"
                              name="email"
                              onChange={(e) => setEmail(e.target.value)}
                           />
                           <span
                              className={`${styles.error} error`}
                              ref={emailError}
                           ></span>
                        </div>
                        <button
                           className={`${styles.formBtn} btn btn-dark`}
                           disabled={isDisabled}
                        >
                           <i className="bi bi-eye"></i>
                           <span>View Now</span>
                        </button>
                     </form>
                  </div>

                  {/* Design Elements */}
                  <div className={`${styles.designElem}`}>
                     {/* Backdrop Image */}
                     <Image
                        src={imgModalBackdrop}
                        alt="Hero Background"
                        className={styles.imgModalBackdrop}
                        objectFit="contain"
                        loading="eager"
                        priority
                     />

                     {/* Foredrop Image */}
                     <Image
                        src={imgModalForeground}
                        alt="Hero Background"
                        className={styles.imgModalForeground}
                        objectFit="contain"
                        loading="eager"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default ModalWhitepaperEmail;

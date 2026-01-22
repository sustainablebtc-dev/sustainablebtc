"use client";

// Importing styles
import styles from "@/styles/components/Footer.module.scss";

// Packages
import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Importing images
import imgFooterFormBg from "@/public/footer-form-bg.svg";
import Image from "next/image";

const FooterCareerForm = () => {
   // #region event registration form
   const [globalError, setGlobalError] = useState<string | null>(null);
   const [globalSuccess, setGlobalSuccess] = useState<string | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
      signUpForNewsletter: true,
      wantToPurchaseSBC: false,
      isMiner: false,
      curiousInGeneral: false,
      isInvestor: false,
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
      if (!formData.name || !formData.email) {
         setGlobalError("Name and Email are required fields.");
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
            "firstname": formData.name,
            "message": formData.message,
            "customerpreference_signupfornewsletter": formData.signUpForNewsletter,
            "customerpreference_wanttopurchasesbc": formData.wantToPurchaseSBC,
            "customerpreference_isminer": formData.isMiner,
            "customerpreference_isinvestor": formData.isInvestor,
            "customerpreference_curiousingeneral": formData.curiousInGeneral,
         },
      };

      // sbp@sustainablebtc.hs-inbox.com


      // Send email if message is not empty
      if (formData.message) {
         const contactData: any = {
            name: formData.name,
            email: formData.email,
            contact: "",
            service: "",
            company: "",
            message: formData.message,
         };

         try {
            // Send the form data using emailjs.send()
            await emailjs.send(
               process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY || "",
               process.env.NEXT_PUBLIC_EMAILJS_CONTACTFORM_TEMPLATE_KEY || "",
               contactData,
               process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
            setGlobalError(""); // Clear error if successful
         } catch (error: any) {
            setGlobalError("An error occurred while sending the form.");
         } finally {
            setIsSubmitting(false);
         }
      }

      try {
         const response = await fetch("/api/submit-event-registration-to-hubspot", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
         });

         if (response.ok) {
            // Reset form
            setFormData({
               name: '',
               email: '',
               message: '',
               signUpForNewsletter: true,
               wantToPurchaseSBC: false,
               isMiner: false,
               isInvestor: false,
               curiousInGeneral: false,
            });
            setGlobalError("");
            setGlobalSuccess("Thank you for submitting! You'll hear from us soon.");
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
      <div className={styles.careerForm}>
         <div className={`${styles.container} container`}>
            <div className={styles.careerContent}>
               <div className={styles.careerContentText}>
                  <h1 className={`${styles.heading}`}>Talk to our team</h1>
                  <p className={`${styles.para}`}>
                     Thanks for your interest in SBP.
                  </p>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className={styles.formGroupWrapper}>
                     <div className={`${styles.formGroup} form-group`}>
                        <input
                           type="text"
                           className="form-control"
                           name="name"
                           id="name"
                           placeholder="Enter Name *"
                           value={formData.name}
                           onChange={handleChange}
                        />
                        <span className="error"></span>
                     </div>
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
                     <div className={`${styles.formGroup} form-group`}>
                        <textarea
                           name="message"
                           id=""
                           className="form-control"
                           placeholder="Message"
                           value={formData.message}
                           onChange={handleChange}
                        ></textarea>
                        <span className="error"></span>
                     </div>
                  </div>
                  <div className={`${styles.formCheckboxGroupWrapper} form-group`}>
                     <label htmlFor='signUpForNewsletter' className={styles.formCheckboxGroup}>
                        <input
                           type="checkbox"
                           className="form-control"
                           name="signUpForNewsletter"
                           id="signUpForNewsletter"
                           checked={formData.signUpForNewsletter}
                           onChange={handleChange}
                        />
                        <span className={styles.checkmark}></span>
                        <div>{`Sign-up for our newsletter`}</div>
                     </label>
                     <label htmlFor='wantToPurchaseSBC' className={styles.formCheckboxGroup}>
                        <input
                           type="checkbox"
                           className="form-control"
                           name="wantToPurchaseSBC"
                           id="wantToPurchaseSBC"
                           checked={formData.wantToPurchaseSBC}
                           onChange={handleChange}
                        />
                        <span className={styles.checkmark}></span>
                        <div>{`I want to invest in SBC`}</div>
                     </label>
                     <label htmlFor='isMiner' className={styles.formCheckboxGroup}>
                        <input
                           type="checkbox"
                           className="form-control"
                           name="isMiner"
                           id="isMiner"
                           checked={formData.isMiner}
                           onChange={handleChange}
                        />
                        <span className={styles.checkmark}></span>
                        <div>{`I'm a miner`}</div>
                     </label>
                     <label htmlFor='curiousInGeneral' className={styles.formCheckboxGroup}>
                        <input
                           type="checkbox"
                           className="form-control"
                           name="curiousInGeneral"
                           id="curiousInGeneral"
                           checked={formData.curiousInGeneral}
                           onChange={handleChange}
                        />
                        <span className={styles.checkmark}></span>
                        <div>{`I'm curious in general`}</div>
                     </label>
                     <label htmlFor='isInvestor' className={styles.formCheckboxGroup}>
                        <input
                           type="checkbox"
                           className="form-control"
                           name="isInvestor"
                           id="isInvestor"
                           checked={formData.isInvestor}
                           onChange={handleChange}
                        />
                        <span className={styles.checkmark}></span>
                        <div>{`I'm an investor`}</div>
                     </label>


                     {globalError &&
                        <span className='text-red-500 mt-2 whitespace-normal'>
                           {globalError}
                        </span>
                     }
                     {globalSuccess &&
                        <span className='text-green-500 mt-2 whitespace-normal'>
                           {globalSuccess}
                        </span>
                     }
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
               </form>
            </div>

            {/* Image */}
            <Image
               src={imgFooterFormBg}
               alt="Background Career Form"
               className={styles.careerBg}
            />
         </div>
      </div>
   );
};

export default FooterCareerForm;

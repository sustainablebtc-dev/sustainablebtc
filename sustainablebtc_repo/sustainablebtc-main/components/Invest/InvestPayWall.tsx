"use client";
import { useState, useRef, useEffect } from "react";

// Styles
import styles from "@/styles/pages/Invest.module.scss";

// Lib
import { PortableText } from "@portabletext/react";

const InvestPayWall = ({ paywall }: { paywall: any }) => {

   // #region event registration form
   const [globalError, setGlobalError] = useState<string | null>(null);
   const [globalSuccess, setGlobalSuccess] = useState<string | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [hasAccess, setHasAccess] = useState(false);

   const [formData, setFormData] = useState({
      accessKey: "",
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
      if (!formData.accessKey) {
         setGlobalError("Access key is required.");
         setGlobalSuccess("");
         setIsSubmitting(false);
         return;
      }

      try {
         if(formData.accessKey == paywall.paywallAccessKey){
            setGlobalError("");
            setHasAccess(true);
         }else{
            setHasAccess(false);
            setGlobalError("Invalid access key!");
         }
      } catch (error: any) {
         setGlobalError(error.message);
      } finally {
         setIsSubmitting(false);
      }
   };
   // #endregion

   return (
      <section className={`${styles.paywall} ${hasAccess ? styles.hide : ''} paywall`}>
         <div className={`${styles.container} container`}>
            <div className={`${styles.heading} portableText`} >
               <PortableText value={paywall.paywallHeading} />
            </div>

            <form onSubmit={handleSubmit}>
               <div className={`${styles.formGroup} form-group`}>
                  <input
                     type="text"
                     className="form-control"
                     name="accessKey"
                     id="accessKey"
                     placeholder="Enter Access Key"
                     value={formData.accessKey}
                     onChange={handleChange}
                  />
                  <span className="error"></span>
               </div>

               {globalError &&
                  <span className='text-red-500 -mt-2 whitespace-normal'>
                     {globalError}
                  </span>
               }
               {globalSuccess &&
                  <span className='text-green-500 -mt-2 whitespace-normal'>
                     {globalSuccess}
                  </span>
               }
               <button className={`${styles.formBtn} btn btn-dark`} disabled={isSubmitting}>
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
      </section >
   )
}

export default InvestPayWall
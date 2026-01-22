"use client";

// Styles
import styles from "@/styles/pages/Miners.module.scss";

// Next/React
import { useRef } from "react";
import emailjs from "@emailjs/browser";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Image

const MinerQualifyForm = () => {
   const contactForm = useRef(null);
   const nameErr = useRef(null);
   const emailErr = useRef(null);
   const companyErr = useRef(null);
   const documentationErr = useRef(null);
   const submitBtn = useRef(null);
   const formMessage = useRef(null);

   const submitContactForm = (e: any) => {
      e.preventDefault();
      const { name, email, service, documentation, message } =
         e.target.elements;

      // Button Disable
      var submitBtnText: HTMLButtonElement = submitBtn.current!;
      submitBtnText.innerHTML = "Submitting...";
      submitBtnText.disabled = true;

      // Name validation
      var nameErrText: HTMLElement = nameErr.current!;
      if (name.value == "") {
         nameErrText.innerHTML = "Name is required!";
      } else {
         nameErrText.innerHTML = "";
      }

      // Email Validation
      var emailErrText: HTMLElement = emailErr.current!;
      if (email.value == "") {
         emailErrText.innerHTML = "Email is required!";
      } else {
         const validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
         if (!email.value.match(validRegex)) {
            emailErrText.innerHTML = "Invalid email address";
         } else {
            emailErrText.innerHTML = "";
         }
      }

      // Service Validaton
      var documentationErrText: HTMLElement = documentationErr.current!;
      if (documentation.value == "") {
         documentationErrText.innerHTML = "Required!";
      } else {
         documentationErrText.innerHTML = "";
      }

      // Message Validaton
      if (
         nameErrText.innerHTML == "" &&
         emailErrText.innerHTML == "" &&
         documentationErrText.innerHTML == ""
      ) {
         // Message
         message.value = `
               Hi, please let us know if our company qualifies for being a miner a not.
               clean energy documentation available: ${documentation.value}
               `;

         // Sending Mail
         emailjs
            .sendForm(
               process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY || "",
               process.env.NEXT_PUBLIC_EMAILJS_CONTACTFORM_TEMPLATE_KEY || "",
               contactForm.current || "",
               process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
               (result: any) => {
                  console.log(result.text);
               },
               (error: any) => {
                  console.log(error.text);
               }
            );
         // Mail Close

         // Showing Response
         var formMessageText: HTMLElement = formMessage.current!;
         formMessageText.innerHTML =
            "Thanks for showing your interest in SBP. Our team will get back to you soon";
         formMessageText.style.color = "greenyellow";
         formMessageText.style.fontWeight = "500";
         (contactForm.current as any).reset();

         setTimeout(function () {
            formMessageText.innerHTML = "";
         }, 8000);
         // Response Close

         // Button Enable
         submitBtnText.innerHTML = `<span>Submit</span><i class='bi bi-arrow-right'></i>`;
         submitBtnText.disabled = false;
         // Button Close
      } else {
         // Button Enable
         submitBtnText.innerHTML = `<span>Submit</span><i class='bi bi-arrow-right'></i>`;
         submitBtnText.disabled = false;
         // Button Close
      }
   };

   return (
      <section className={styles.qualifyForm} id="qualify">
         <div className={`${styles.container} container`}>
            <div className={styles.qualifyImage}></div>
            <div className={styles.qualifyFormWrapper}>
               {/* Heading */}
               <h2 className={`${styles.qualifyFormHeading} heading heading-2`}>
                  Do I qualify for SBC?
               </h2>
               {/* Form */}
               <form
                  className={styles.contactForm}
                  ref={contactForm}
                  onSubmit={submitContactForm}
               >
                  {/* About User */}
                  <div>
                     {/* heading */}
                     <h3 className={`heading heading-6`}>
                        Let&apos;s know more about you
                     </h3>
                     {/* form groups */}
                     <div className="grid-2">
                        <div className="form-group">
                           <label htmlFor="full-name"> </label>
                           <input
                              type="text"
                              id="full-name"
                              className="form-control"
                              placeholder="Full Name *"
                              name="name"
                           />
                           <span className="error" ref={nameErr}></span>
                          
                        </div>
                        <div className="form-group">
                           <label htmlFor="email"></label>
                           <input
                              type="text"
                              id="email"
                              className="form-control"
                              placeholder="Email *"
                              name="email"
                           />
                           <span className="error" ref={emailErr}></span>
                           
                        </div>
                     </div>
                     <div className="form-group">
                        <label htmlFor="company-name"></label>
                        <input
                           type="text"
                           id="company-name"
                           className="form-control"
                           placeholder="Company's Name"
                           name="company"
                        />
                        <span className="error" ref={companyErr}></span>
                        
                     </div>
                     {/* Message */}
                     <input type="hidden" name="message" />
                     <input type="hidden" name="service" value="Miner" />
                  </div>
                  {/* Help */}
                  <div>
                     {/* heading */}
                     <label className={`heading heading-6`} htmlFor="documentation-op">
                        Do you have clean energy documentation for your mining
                        operations?
                     </label>
                     {/* form groups */}
                     <div className="form-group">
                        <select
                           name="documentation"
                           id="documentation-op"
                           className="form-control"
                        >
                             
                           <option value="">----Select---- *</option>
                           <option value="Yes">Yes</option>
                           <option value="No">No</option>
                        </select>
                     <span className="error" ref={documentationErr}></span>
                     </div>
                  </div>
                  {/* CTA */}
                  <label htmlFor="documentation-button">
                  <button className="btn btn-primary" ref={submitBtn}>
                     <span>Submit</span>
                     <i className="bi bi-arrow-right"></i>
                  </button>
                  <span className="error text-center" ref={formMessage}></span>
                  </label>
               </form>
            </div>
         </div>
      </section>
   );
};

export default MinerQualifyForm;

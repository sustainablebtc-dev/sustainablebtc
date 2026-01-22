"use client";

// Styles
import styles from "@/styles/pages/Faq.module.scss";

// Next/React
import Image from "next/image";
import { useState, useRef } from "react";

// Lib
import { PortableText } from "@portabletext/react";
// import emailjs from "emailjs-com";

interface FaqQuestionsProps {
   question: any;
   answer: any;
}

function FaqQuestions({ question, answer }: FaqQuestionsProps) {
   const [showQA, setShowQA] = useState(false);
   const hasNoAnswer = !answer;

   const contactForm = useRef(null);
   const nameErr = useRef(null);
   const emailErr = useRef(null);
   const contactErr = useRef(null);
   const companyErr = useRef(null);
   const serviceErr = useRef(null);
   const submitBtn = useRef(null);
   const formMessage = useRef(null);

   const submitContactForm = (e: any) => {
      e.preventDefault();
      const { name, email, contact, service, message } = e.target.elements;

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

      // Contact Validation
      var contactErrText: HTMLElement = contactErr.current!;
      if (contact.value == "") {
         contactErrText.innerHTML = "contact no required!";
      } else {
         const contactRegex = /^[+]?\d+[\d\s]*$/;
         if (!contact.value.match(contactRegex)) {
            contactErrText.innerHTML = "Invalid contact number!";
         } else {
            contactErrText.innerHTML = "";
         }
      }

      // Message Validation
      if (
         nameErrText.innerHTML == "" &&
         emailErrText.innerHTML == "" &&
         contactErrText.innerHTML == ""
         ) {
            // Sending Mail - Disabled due to missing emailjs-com
            /*
            emailjs
               .sendForm(
                  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY || "",
                  process.env.NEXT_PUBLIC_EMAILJS_CONTACTFORM_TEMPLATE_KEY || "",
                  contactForm.current || "",
                  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
               )
               .then(
                  (result) => {
                     console.log(result.text);
                  },
                  (error) => {
                     console.log(error.text);
                  }
               );
            */

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

         // Button Enable
         submitBtnText.innerHTML = `<span>Submit</span><i class='bi bi-arrow-right'></i>`;
         submitBtnText.disabled = false;
         } else {
            // Button Enable
            submitBtnText.innerHTML = `<span>Submit</span><i class='bi bi-arrow-right'></i>`;
            submitBtnText.disabled = false;
         }
      };

   return (
      <>
         <div
            className={`${styles.faqQuestionAnswer} ${
               showQA ? styles.active : ""
            }`}
         >
            <div
               className={`${styles.faqQuestion} heading heading-5 ${hasNoAnswer ? styles.noAnswer : ''}`}
               onClick={() => setShowQA(!showQA)}
            >
               <span>{question}</span>
               <i className={`bi bi-arrow-${showQA ? "down" : "right"}`}></i>
            </div>
            <div className={`${styles.faqAnswer} portableText`}>
               {hasNoAnswer ? (
                  <div className={styles.formWrapper}>
                     <form
                        className={styles.contactForm}
                        onSubmit={submitContactForm}
                        ref={contactForm}
                     >
                        <div>
                           <div className="grid-2">
                              <div className="form-group">
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name *"
                                    name="name"
                                 />
                                 <span ref={nameErr} className="error"></span>
                              </div>
                              <div className="form-group">
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Contact Number"
                                    name="contact"
                                 />
                                 <span
                                    ref={contactErr}
                                    className="error"
                                 ></span>
                              </div>
                           </div>
                           <div className="form-group">
                              <input
                                 type="text"
                                 className="form-control"
                                 placeholder="Email *"
                                 name="email"
                              />
                              <span ref={emailErr} className="error"></span>
                           </div>
                        </div>
                        <div>
                           <div className="form-group">
                              <textarea
                                 name="message"
                                 className="form-control"
                                 placeholder="How we can help!!"
                              ></textarea>
                           </div>
                        </div>
                        <button className="btn btn-primary" ref={submitBtn}>
                           <span>Submit</span>
                           <i className="bi bi-arrow-right"></i>
                        </button>
                        <span
                           ref={formMessage}
                           className="error text-center"
                        ></span>
                     </form>
                  </div>
               ) : (
                  <PortableText value={answer} />
               )}
            </div>
         </div>
      </>
   );
}

export default FaqQuestions;

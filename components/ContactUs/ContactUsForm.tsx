"use client";

// Styles
import styles from "@/styles/pages/Contact.module.scss";

// Packages
import { useRef } from "react";
import emailjs from "@emailjs/browser";

// Next/React
import Link from "next/link";
import Image from "next/image";

const ContactUsForm = () => {
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

      // Service Validaton
      var serviceErrText: HTMLElement = serviceErr.current!;
      if (service.value == "") {
         serviceErrText.innerHTML = "Required!";
      } else {
         serviceErrText.innerHTML = "";
      }

      // Message Validaton
      if (
         nameErrText.innerHTML == "" &&
         emailErrText.innerHTML == "" &&
         serviceErrText.innerHTML == ""
      ) {
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
      <form
         className={styles.contactForm}
         ref={contactForm}
         onSubmit={submitContactForm}
      >
         {/* About User */}
         <div>
            {/* heading */}
            <h6 className={`heading heading-6`}>
               Let&apos;s know more about you
            </h6>

            {/* form groups */}
            <div className="grid-2">
               <div className="form-group">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Full Name *"
                     name="name"
                  />
                  <span className="error" ref={nameErr}></span>
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Contact Number"
                     name="contact"
                  />
                  <span className="error" ref={contactErr}></span>
               </div>
            </div>
            <div className="form-group">
               <input
                  type="text"
                  className="form-control"
                  placeholder="Email *"
                  name="email"
               />
               <span className="error" ref={emailErr}></span>
            </div>
            <div className="form-group">
               <input
                  type="text"
                  className="form-control"
                  placeholder="Company's Name"
                  name="company"
               />
               <span className="error" ref={companyErr}></span>
            </div>
         </div>
         {/* Help */}
         <div>
            {/* heading */}
            <h6 className={`heading heading-6`}>How can we help?</h6>

            {/* form groups */}
            <div className="form-group">
               <select name="service" id="" className="form-control">
                  <option value="">----Select---- *</option>
                  <option value="Miner">Miner</option>
                  <option value="Investor">Investor</option>
               </select>
               <span className="error" ref={serviceErr}></span>
            </div>
         </div>
         {/* Thoughts */}
         <div>
            {/* heading */}
            <h6 className={`heading heading-6`}>
               Anything else you&apos;d like to share
            </h6>

            {/* form groups */}
            <div className="form-group">
               <textarea
                  name="message"
                  id=""
                  className="form-control"
                  placeholder="Tell us what we can help you with"
               ></textarea>
            </div>
         </div>
         {/* CTA */}
         <button className="btn btn-primary" ref={submitBtn}>
            <span>Submit</span>
            <i className="bi bi-arrow-right"></i>
         </button>
         <span className="error text-center" ref={formMessage}></span>
      </form>
   );
};

export default ContactUsForm;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import styles from "@/styles/components/ModalAgeRestriction.module.scss";
import Link from "next/link";

type Variant = "prompt" | "denied";

export default function ModalAgeRestriction({
   isOpen,
   variant,
   onAccept,
   onReject,
   onReset,
}: {
   isOpen: boolean;
   variant: Variant;
   onAccept: () => void;
   onReject: () => void;
   onReset?: () => void;
}) {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
      // Accessibility: make screen readers ignore background content.
      try {
         Modal.setAppElement("body");
      } catch {
         // ignore
      }
   }, []);

   const customStyles = useMemo(
      () => ({
         content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            color: "#fafafa",
            maxWidth: "920px",
            width: "calc(100% - 100px)",
            padding: "2rem",
            borderRadius: "0",
         },
      }),
      []
   );

   if (!mounted) return null;

   return (
      <Modal
         isOpen={isOpen}
         // Age-gate requires an explicit action; don't allow ESC/overlay click.
         onRequestClose={() => { }}
         shouldCloseOnOverlayClick={false}
         shouldCloseOnEsc={false}
         style={customStyles}
         contentLabel="Age restriction confirmation"
      >
         <div className={styles.shell}>
            <button
               type="button"
               className={styles.closeBtn}
               onClick={variant === "denied" ? onReset : onReject}
               aria-label={variant === "denied" ? "Try again" : "Close modal"}
            >
               <i
                  className={variant === "denied" ? "bi bi-arrow-clockwise" : "bi bi-x-lg"}
               ></i>
            </button>
            <div className={styles.body}>
               <h2 className={styles.heading}>
                  {variant === "denied" ? (
                     <>Access denied !!</>
                  ) : (
                     <>
                        Restricted Access — Please Review Before Entering
                     </>
                  )}
               </h2>

               <div className={styles.textWrapper}>
                  <div className={styles.text}>
                     <p className="para">By accessing this website and any associated applications, you represent and warrant that:</p>
                     <ol className="list">
                        <li>You are at least 18 years of age (or the age of majority in your jurisdiction, whichever is greater).</li>
                        <li>You are not a resident of, located in, or otherwise subject to the jurisdiction of any country, territory, or region that is subject to comprehensive economic sanctions imposed by the United States (including OFAC), the European Union, the United Kingdom, or the United Arab Emirates.</li>
                        <li>You are not listed on any applicable sanctions list, including but not limited to the OFAC Specially Designated Nationals (SDN) List, the EU Consolidated List, or the UK Sanctions List.</li>
                        <li>Your access to and use of this website and its services does not violate any applicable laws or regulations in your jurisdiction.</li>
                        <li>You understand that the products and services described on this website may not be available in all jurisdictions, and nothing on this website constitutes an offer, solicitation, or recommendation in any jurisdiction where such activity would be unlawful.</li>
                     </ol>
                  </div>
               </div>

               {variant === "prompt" ? (
                  <>
                     <p className={`${styles.ctaLine} text-sm md:text-base`}>
                        <span>This website does not provide investment, legal, or tax advice. Digital assets involve significant risk, including the potential loss of principal. Past performance is not indicative of future results.</span>
                     </p>
                     <p className="text-xs md:text-sm text-center italic mt-4 mb-6">
                        <span>
                           <span>By clicking “I Agree — Enter Site” below, you acknowledge that you have read, understood, and agree to be bound by these terms and our </span>
                           <Link href="/page/terms-and-conditions" className="underline hover:no-underline">
                              Terms and Conditions
                           </Link>
                           <span>&nbsp; and &nbsp;</span>
                           <Link href="/page/privacy-policy" className="underline hover:no-underline">
                              Privacy Policy
                           </Link>.
                        </span>
                     </p>

                     <div className={styles.actions}>
                        <button
                           type="button"
                           className="btn btn-dark"
                           onClick={onAccept}
                        >
                           <span>I Agree — Enter Site</span>
                        </button>
                     </div>
                  </>
               ) : (
                  <div className={styles.actions}>
                     <p className={styles.deniedNote}>
                        You indicated you are under 18. Access to this website is
                        not permitted. Please close this browser window.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </Modal>
   );
}


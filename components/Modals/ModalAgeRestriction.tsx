"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import styles from "@/styles/components/ModalAgeRestriction.module.scss";

type Variant = "prompt" | "denied";

const LEGAL_TEXT =
   "Access to this website and apps is restricted to individuals who are 18 years of age or older. Users are prohibited from accessing or using the website or apps if they are subject to economic sanctions, trade restrictions, or are otherwise barred under applicable laws and regulations. The availability of certain products or services may be restricted or unavailable in specific jurisdictions, subject to local legal and regulatory requirements. Access may be denied where such offerings are not permitted by law.";

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
         onRequestClose={() => {}}
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
                        This website is <strong>18+ only</strong>
                     </>
                  )}
               </h2>

               <div className={styles.text}>
                  <p className="para">{LEGAL_TEXT}</p>
               </div>

               {variant === "prompt" ? (
                  <>
                     <p className={styles.ctaLine}>
                        <span>To enter this website you must be 18 or older</span>
                     </p>

                     <div className={styles.actions}>
                        <button
                           type="button"
                           className="btn btn-dark"
                           onClick={onAccept}
                        >
                           <span>I&apos;m 18 or older - enter</span>
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


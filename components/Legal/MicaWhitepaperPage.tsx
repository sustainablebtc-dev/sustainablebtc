"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "@/styles/pages/Legal.module.scss";

const MicaWhitepaperPage = () => {
   const shadowHostRef = useRef<HTMLDivElement>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchAndRender = async () => {
         try {
            const res = await fetch("/sbp-mica-whitepaper.xhtml");
            if (!res.ok) throw new Error("Failed to load whitepaper");

            const xhtmlText = await res.text();

            // Extract <style> content
            const styleMatch = xhtmlText.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
            let styleContent = styleMatch ? styleMatch[1] : "";

            // Remap html/body selectors to :host for Shadow DOM
            styleContent = styleContent
               .replace(/\bhtml\s*\{/g, ":host {")
               .replace(/\bbody\s*\{/g, ":host {")
               .replace(/\bbody\s*,/g, ":host,");

            // Extract <body> inner content
            const bodyMatch = xhtmlText.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            const bodyContent = bodyMatch ? bodyMatch[1] : "";

            if (!shadowHostRef.current) return;

            let shadowRoot = shadowHostRef.current.shadowRoot;
            if (!shadowRoot) {
               shadowRoot = shadowHostRef.current.attachShadow({ mode: "open" });
            }

            // Inject styles and content — override background to white
            shadowRoot.innerHTML = `
                    <style>
                        ${styleContent}
                        :host {
                            display: block;
                            background-color: #fff !important;
                            overflow-x: auto;
                            padding: 0 !important;
                            margin: 0 !important;
                        }
                        * {
                            max-width: 100% !important;
                            box-sizing: border-box;
                        }
                        table {
                            width: 100% !important;
                            table-layout: fixed;
                            word-wrap: break-word;
                        }
                    </style>
                    ${bodyContent}
                `;

            setIsLoading(false);
         } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setIsLoading(false);
         }
      };

      fetchAndRender();
   }, []);

   return (
      <div className={styles.legal}>
         {/* Hero Section */}
         <section className={styles.hero}>
            <div className={styles.container}>
               <div className={styles.heroContent}>
                  <h1 className={styles.heading}>
                     MiCA{" "}
                     <span className={styles.gradientText}>Whitepaper</span>
                  </h1>
                  <p className={styles.notification}>
                     This whitepaper was notified to the Central Bank of
                     Ireland in accordance with Regulation (EU) 2023/1114
                     on February 27th, 2026.
                  </p>
                  <a
                     href="/sbp-mica-whitepaper.xhtml"
                     download="sbp-mica-whitepaper.xhtml"
                     className={`${styles.fallbackLink} mt-6 lg:mt-8`}
                  >
                     <i className="bi bi-download mr-2"></i>
                     <span>Download the complete MiCA Whitepaper document</span>
                  </a>
               </div>
            </div>
         </section>

         {/* Embedded Whitepaper Content */}
         <section className={styles.contentSection}>
            <div className={styles.container}>
               <div className={styles.viewerWrapper}>
                  {isLoading && (
                     <div className={styles.loadingState}>
                        Loading whitepaper...
                     </div>
                  )}
                  {error && (
                     <div className={styles.errorState}>
                        <p>{error}</p>
                     </div>
                  )}
                  <div
                     ref={shadowHostRef}
                     className={styles.whitepaperContent}
                  />
               </div>
            </div>
         </section>
      </div>
   );
};

export default MicaWhitepaperPage;

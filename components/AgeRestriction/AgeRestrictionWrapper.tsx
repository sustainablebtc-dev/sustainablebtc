"use client";

import { useEffect, useState } from "react";
import ModalAgeRestriction from "../Modals/ModalAgeRestriction";

const COOKIE_NAME = "sbp_age_verified";
const COOKIE_EXPIRY_HOURS = 6; // 6 hour expiry as requested

function setCookie(name: string, value: string, hours: number) {
   try {
      const d = new Date();
      d.setTime(d.getTime() + hours * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
   } catch {
      // ignore
   }
}

function getCookie(name: string): string | null {
   try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
         let c = ca[i];
         while (c.charAt(0) === " ") c = c.substring(1, c.length);
         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
   } catch {
      // ignore
   }
   return null;
}

function deleteCookie(name: string) {
   try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
   } catch {
      // ignore
   }
}

export default function AgeRestrictionWrapper() {
   const [mounted, setMounted] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(true);
   const [variant, setVariant] = useState<"prompt" | "denied">("prompt");

   useEffect(() => {
      setMounted(true);

      try {
         const verified = getCookie(COOKIE_NAME) === "true";
         if (verified) {
            setIsModalOpen(false);
         } else {
            setVariant("prompt");
            setIsModalOpen(true);
         }
      } catch {
         // ignore
      }
   }, []);

   const onAccept = () => {
      // Set a cookie that lasts COOKIE_EXPIRY_HOURS hours.
      setCookie(COOKIE_NAME, "true", COOKIE_EXPIRY_HOURS);
      setIsModalOpen(false);
   };

   const onReject = () => {
      // Show the denied message and keep modal open
      setVariant("denied");
      setIsModalOpen(true);
   };

   const onReset = () => {
      // Clear verification cookie and return to prompt
      deleteCookie(COOKIE_NAME);
      setVariant("prompt");
      setIsModalOpen(true);
   };

   if (!mounted) return null;

   return (
      <ModalAgeRestriction
         isOpen={isModalOpen}
         variant={variant}
         onAccept={onAccept}
         onReject={onReject}
         onReset={onReset}
      />
   );
}


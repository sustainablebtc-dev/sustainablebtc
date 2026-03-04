import React from "react";

// Styles
import styles from "@/styles/pages/ReIntroducingSBP.module.scss";

// Components
import ReIntroducingSBPChange from "./ReIntroducingSBPChange";
import ReIntroducingSBPHero from "./ReIntroducingSBPHero";
import ReIntroducingSBPRepresentation from "./ReIntroducingSBPRepresentation";
import ReIntroducingSBPUnderstanding from "./ReIntroducingSBPUnderstanding";
import ReIntroducingSBPBitcoinFixing from "./ReIntroducingSBPBitcoinFixing";
import ReIntroducingSBPAnnouncement from "./ReIntroducingSBPAnnouncement";

export default async function ReIntroducingSBPPage() {

   return (
      <>
         <ReIntroducingSBPHero />
         <ReIntroducingSBPAnnouncement />
         <ReIntroducingSBPChange />
         <ReIntroducingSBPBitcoinFixing />
         <ReIntroducingSBPRepresentation />
         <ReIntroducingSBPUnderstanding />
      </>
   );
}

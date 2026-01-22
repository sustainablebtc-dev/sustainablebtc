import React from "react";

// import components
import OurTeam from "./OurTeam";

// import Sanity
import { getOurTeamPageData } from "@/sanity/sanity-utils";

export default async function AboutUsPage() {
   const ourTeamPageData = await getOurTeamPageData();
   const teamData = ourTeamPageData.team || null;

   return (
      <div>
         <OurTeam teamData={teamData} />
      </div>
   );
}

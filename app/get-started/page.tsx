import { Metadata } from "next";

// Import
import GetStartedPage from "@/components/GetStarted/GetStartedPage";

export const metadata: Metadata = {
   title: "Get Started | Sustainable Bitcoin Protocol",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

const investors = () => {
   return (
      <>
         <GetStartedPage />
      </>
   );
};

export default investors;

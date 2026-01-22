import { Metadata } from "next";

// Import
import ContactUsPage from "@/components/ContactUs/ContactUsPage";

export const metadata: Metadata = {
   title: "Contact Us | Sustainable Bitcoin Protocol",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};
const page = () => {
   return <ContactUsPage />;
};

export default page;

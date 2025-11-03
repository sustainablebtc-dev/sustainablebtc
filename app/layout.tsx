// Global Styles
import "@/styles/global.scss";

// Imports
import localFont from "@next/font/local";
import Script from "next/script";
import type { Metadata } from "next";

// Custom Components
import Header from "@/components/BR_Header/Header";
import Footer from "@/components/BR_Footer/Footer";
import Breadcrum from "@/components/Breadcrum";
import ProgressBar from "@/components/ProgressBar";

// Importing icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// Defining Fonts
const helveticaNowDisplay = localFont({
   src: [
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Thin.ttf",
         weight: "100",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-ExtLt.ttf",
         weight: "200",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Light.ttf",
         weight: "300",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Regular.ttf",
         weight: "400",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Medium.ttf",
         weight: "500",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Bold.ttf",
         weight: "700",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-ExtraBold.ttf",
         weight: "800",
         style: "normal",
      },
      {
         path: "../public/fonts/helvetica-now-display/HelveticaNowDisplay-Black.ttf",
         weight: "900",
         style: "normal",
      },
   ],
});

// Defining Metadata
export const metadata = {
   title: "Sustainable Bitcoin Protocol | Accelerating the Clean Energy Transition",
   description: "Discover how Sustainable Bitcoin Protocol (SBP) aligns Bitcoin mining with renewable energy to drive financial returns and climate impact. Learn about Sustainable Bitcoin Certificates (SBCs), a climate-positive asset and the groundbreaking solution for clean energy Bitcoin investments, methane mitigation, and environmental transparency. Explore how institutional investors can accelerate renewable energy adoption, decarbonize digital assets, and create a new class of appreciating environmental commodities.",
   openGraph: {
      title: "Sustainable Bitcoin Protocol | Accelerating the Clean Energy Transition",
      description: "Discover how Sustainable Bitcoin Protocol (SBP) aligns Bitcoin mining with renewable energy to drive financial returns and climate impact. Learn about Sustainable Bitcoin Certificates (SBCs), a climate-positive asset and the groundbreaking solution for clean energy Bitcoin investments, methane mitigation, and environmental transparency. Explore how institutional investors can accelerate renewable energy adoption, decarbonize digital assets, and create a new class of appreciating environmental commodities.",
      images: ["https://www.sustainablebtc.org/SBPthumbnail.png"],
      url: "https://www.sustainablebtc.org",
   },
   twitter: {
      card: "summary_large_image",
      title: "Sustainable Bitcoin Protocol | Accelerating the Clean Energy Transition",
      description: "Discover how Sustainable Bitcoin Protocol (SBP) aligns Bitcoin mining with renewable energy to drive financial returns and climate impact. Learn about Sustainable Bitcoin Certificates (SBCs), a climate-positive asset and the groundbreaking solution for clean energy Bitcoin investments, methane mitigation, and environmental transparency. Explore how institutional investors can accelerate renewable energy adoption, decarbonize digital assets, and create a new class of appreciating environmental commodities.",
      images: ["https://www.sustainablebtc.org/SBPthumbnail.png"],
   },
};

export default function RootLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode;
}) {
   return (
      <>
         <html lang="en" className={helveticaNowDisplay.className}>
            <body>
               {/* Progress Bar */}
               <ProgressBar />
               {/* Navbar */}
               <Header />
               {/* Breadcrumb */}
               <Breadcrum />
               {/* Main Content */}
               <main>{children}</main>
               {/* Footer */}
               <Footer />

               {/* Google Analytics */}
               <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
                  strategy="afterInteractive"
               />
               <Script id="google-analytics" strategy="afterInteractive">
                  {`
                     window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', '${process.env.GA_MEASUREMENT_ID}');
                  `}
               </Script>
            </body>
         </html>
      </>
   );
}

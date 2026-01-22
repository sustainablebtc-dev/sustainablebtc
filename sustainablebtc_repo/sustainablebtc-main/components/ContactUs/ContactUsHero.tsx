// Styles
import styles from "@/styles/pages/Contact.module.scss";

// Next/React
import Link from "next/link";
import Image from "next/image";

// Components
import ContactUsForm from "./ContactUsForm";

// Sanity
import { urlFor } from "@/sanity/sanity-urlFor";

// Lib
import { PortableText } from "@portabletext/react";

// Images
import imgHeroShape from "@/public/contact/shape.svg";

const ContactUsHero = ({ heroData }: { heroData: any }) => {
   return (
      <section className={`${styles.hero} hero`}>
         <div className={`${styles.container} container`}>
            {/* Image */}
            <Image
               src={imgHeroShape}
               alt="Hero Shape"
               className={styles.heroShape}
            />

            {/* Heading */}
            <div className={`${styles.heroHeading} portableText`}>
               <PortableText value={heroData.heroHeading} />
            </div>

            {/* Description */}
            <div className={`${styles.heroDescription} portableText`}>
               <PortableText value={heroData.heroDescription} />
            </div>

            {/* Contact Form */}
            <ContactUsForm />
         </div>
      </section>
   );
};

export default ContactUsHero;

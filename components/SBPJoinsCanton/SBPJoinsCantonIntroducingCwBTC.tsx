"use client";

import Image from "next/image";
import styles from "@/styles/pages/SBPJoinsCanton.module.scss";

const imgIcon1 = "https://www.figma.com/api/mcp/asset/22b863d1-e42a-4277-8a67-3856b891bc6b";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/f368cc71-3e67-4248-b465-c6506a349003";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/462292a7-6de6-461e-8d39-daf373809f9f";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/2e8db928-02c9-45f2-aaaa-7a9c0ffa1fa4";

const SBPJoinsCantonIntroducingCwBTC = () => {
	const features = [
		{ label: "Regulated Institutional Custody", icon: imgIcon1 },
		{ label: "Native On-Chain Liquidity", icon: imgIcon2 },
		{ label: "Verified Clean Energy Attributes", icon: imgIcon3 },
		{ label: "Privacy-Enabled Smart Contracts", icon: imgIcon4 },
	];

	return (
		<section className={`${styles.introducingCwBTC} introducingCwBTC`}>
			<div className={`${styles.container} container`}>
				<div>
               {/* Header Section */}
               <div className={styles.cwbtcHeader}>
                  {/* Section Label */}
                  <div className={styles.sectionLabel}>
                     <div className={styles.labelLine}></div>
                     <span className={styles.labelText}>Introducing cwBTC</span>
                     <div className={styles.labelLine}></div>
                  </div>
                  {/* Heading */}
                  <h2 className={styles.cwbtcHeading}>Clean Wrapped Bitcoin</h2>
               </div>
               {/* Features Grid */}
               <div className={styles.featuresGrid}>
                  {features.map((feature, index) => (
                     <div key={index} className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                           <Image alt={feature.label} src={feature.icon} width={24} height={24} unoptimized />
                        </div>
                        <p className={styles.featureText}>{feature.label}</p>
                     </div>
                  ))}
               </div>
            </div>

				{/* Quote Section */}
				<div className={styles.quoteSection}>
					<p className={styles.quoteText}>
						&ldquo;cwBTC enables asset managers with sustainability mandates to gain Bitcoin exposure with auditable environmental verification, without compromising liquidity or altering core holdings.&rdquo;
					</p>
				</div>

				{/* Additional Text */}
				<p className={styles.additionalText}>
					<span>This </span>
					<span className={styles.gradientText}>validator</span>
					<span> approval positions SBP directly within the institutional infrastructure layer where regulated digital asset markets are being built.</span>
				</p>
			</div>
		</section>
	);
};

export default SBPJoinsCantonIntroducingCwBTC;

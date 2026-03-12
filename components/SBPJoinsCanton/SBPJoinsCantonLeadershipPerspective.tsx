"use client";

import Image from "next/image";
import styles from "@/styles/pages/SBPJoinsCanton.module.scss";

const imgGroup = "https://www.figma.com/api/mcp/asset/cb2b3873-d62e-4766-abf8-93ae5ab51d9a";

const SBPJoinsCantonLeadershipPerspective = () => {
	return (
		<section className={`${styles.leadershipPerspective} leadershipPerspective`}>
			<div className={`${styles.container} container`}>
				<div className={styles.leadershipContainer}>
					{/* Section Label */}
					<div className={styles.sectionLabel}>
						<div className={styles.labelLine}></div>
						<span className={styles.labelText}>Leadership Perspective</span>
						<div className={styles.labelLine}></div>
					</div>

					{/* Quote */}
					<p className={styles.leadershipQuote}>
						<span>{`"Institutional capital does not move on narratives — it moves on infrastructure, verification, and risk management. By building on `}</span>
						<span className={styles.gradientText}>Canton</span>
						<span>{`, we're delivering a Bitcoin instrument that aligns with regulatory expectations, sustainability mandates, and institutional operational standards — without compromising liquidity or exposure."`}</span>
					</p>

					{/* Author Info */}
					<div className={styles.authorInfo}>
						<p className={styles.authorName}>Matt Twomey</p>
						<p className={styles.authorTitle}>Co-Founder & Head of Institutional, Sustainable Bitcoin Protocol</p>
					</div>

					{/* Background Image */}
					<div className={styles.bgImage}>
						<Image alt="Background decoration" src={imgGroup} width={362} height={292} unoptimized />
					</div>
				</div>
			</div>
		</section>
	);
};

export default SBPJoinsCantonLeadershipPerspective;

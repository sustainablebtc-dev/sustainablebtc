"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/pages/SBPJoinsCanton.module.scss";

const SBPJoinsCantonCTA = () => {
	return (
		<section className={`${styles.cta} cta`}>
			<div className={`${styles.container} container container-tight`}>
				<div className={styles.ctaContent}>
					<div className={styles.iconContainer}>
						<i className="bi bi-lightbulb"></i>
					</div>

					<p className={styles.ctaText}>
						Further product details will follow in the coming weeks.
					</p>

					<div className={styles.divider} />

					<div className={styles.buttonGroup}>
						<Link href="/learn/faq" className={`${styles.button} ${styles.buttonSecondary}`}>
							<span>Explore FAQs</span>
							<i className="bi bi-arrow-right"></i>
						</Link>
						<Link href="/learn/download-whitepaper" className={`${styles.button} ${styles.buttonPrimary}`}>
							<span>Read Whitepaper</span>
							<i className="bi bi-arrow-right"></i>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SBPJoinsCantonCTA;

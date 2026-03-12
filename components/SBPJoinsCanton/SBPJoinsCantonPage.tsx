import styles from "@/styles/pages/SBPJoinsCanton.module.scss";
import SBPJoinsCantonHero from "./SBPJoinsCantonHero";
import SBPJoinsCantonAbout from "./SBPJoinsCantonAbout";
import SBPJoinsCantonLeadershipPerspective from "./SBPJoinsCantonLeadershipPerspective";
import SBPJoinsCantonIntroducingCwBTC from "./SBPJoinsCantonIntroducingCwBTC";
import SBPJoinsCantonCTA from "./SBPJoinsCantonCTA";

export default async function SBPJoinsCantonPage() {
	return (
		<>
			<SBPJoinsCantonHero />
			<SBPJoinsCantonAbout />
			<SBPJoinsCantonLeadershipPerspective />
			<SBPJoinsCantonIntroducingCwBTC />
			<SBPJoinsCantonCTA />
		</>
	);
}

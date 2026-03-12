import type { Metadata } from "next";
import SBPJoinsCantonPage from "@/components/SBPJoinsCanton/SBPJoinsCantonPage";

export const metadata: Metadata = {
	title: "SBP Joins Canton - Sustainable Bitcoin Protocol",
	description: "Sustainable Bitcoin Protocol joins Canton validator network",
};

export default function Page() {
	return <SBPJoinsCantonPage />;
}

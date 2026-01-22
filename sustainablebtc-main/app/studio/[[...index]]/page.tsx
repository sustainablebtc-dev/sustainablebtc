"use client";

import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/navigation";

export default function StudioPage() {
   return <NextStudio config={config} />;
}

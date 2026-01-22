// Global Styles
import "@/styles/global.scss";

// Importing icons
import "bootstrap-icons/font/bootstrap-icons.css";

import { useRouter } from "next/navigation";

export default function RootLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode;
}) {
   return <>{children}</>;
}

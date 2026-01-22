import ArticlePage from "@/components/News/ArticlePage";
import { Metadata } from "next";


export const metadata: Metadata = {
   title: " SBP in the Media | Sustainable Bitcoin Protocol",
   description:
      "Sustainable Bitcoin Protocol helps accelerate the bitcoin network's transition to clean energy.",
};

type Props = {
   params: {
      slug: string;
   };
};

const page = ({ params: { slug } }: Props) => {
   return <ArticlePage slug={slug} />;
};

export default page;

import MiscPage from "@/components/Misc/MiscPage";

type Props = {
   params: {
      slug: string;
   };
};

const page = ({ params: { slug } }: Props) => {
   return <MiscPage slug={slug} />;
};

export default page;

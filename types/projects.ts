import { PortableTextBlock } from "sanity";

export type projects = {
   _id: string;
   _createdAt: Date;
   name: string;
   slug: string;
   image: string;
   url: string;
   content: PortableTextBlock[]; //for rich text block
};

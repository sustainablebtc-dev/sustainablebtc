import { PortableTextBlock } from "sanity";
import { List } from "sanity/desk";

export type FooterType = {
   _id: string;
   _createdAt: Date;
   name: string;
   logoURL: string;
   about: PortableTextBlock[];
   footerLinks: any;
   socialLinks: any;
   copyright: string;
};

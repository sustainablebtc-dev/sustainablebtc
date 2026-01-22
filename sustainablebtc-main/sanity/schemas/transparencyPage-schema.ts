import btn from "../components/btn-schema";

const transparencyPage = {
   name: "transparencyPage",
   title: "Transparency Page",
   type: "document",
   fields: [
      {
         name: "pageTitle",
         title: "Page Title",
         type: "string",
      },
      {
         name: "hero",
         title: "Hero",
         type: "document",
         fields: [
            {
               name: "heroHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroSubHeading",
               title: "SubHeading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroType",
               title: "Types",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "heroTypeHeading",
                           title: "Type Heading",
                           type: "array",
                           of: [{ type: "block" }],
                        },
                        {
                           name: "heroTypeImage",
                           title: "Type Image",
                           type: "image",
                           options: { hotspot: true },
                           fields: [
                              {
                                 name: "alt",
                                 title: "Alt",
                                 type: "string",
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
            {
               name: "heroDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
      },
   ],
};

export default transparencyPage;

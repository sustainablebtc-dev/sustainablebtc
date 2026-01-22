import btn from "../components/btn-schema";

const getStartedPage = {
   name: "getStartedPage",
   title: "Get Started Page",
   type: "document",
   fields: [
      {
         name: "pageTitle",
         title: "Page Title",
         type: "string",
      },
      // Hero
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
               title: "Sub Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroLoginType",
               title: "Login Type",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "heroLoginTypeHeading",
                           title: "Heading",
                           type: "string",
                        },
                        {
                           name: "heroLoginTypeDescription",
                           title: "Description",
                           type: "array",
                           of: [{ type: "block" }],
                        },
                        {
                           name: "heroLoginTypeCTA",
                           title: "Call to Actions",
                           type: "document",
                           fields: btn,
                        },
                        {
                           name: "heroLoginTypeImage",
                           title: "Image",
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
         ],
      },
   ],
};

export default getStartedPage;

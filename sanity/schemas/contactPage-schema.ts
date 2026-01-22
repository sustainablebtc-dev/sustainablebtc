import btn from "../components/btn-schema";

const contactPage = {
   name: "contactPage",
   title: "Home Page",
   type: "document",
   fields: [
      {
         name: "title",
         title: "pageTitle",
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
               name: "heroDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
      },
   ],
};

export default contactPage;

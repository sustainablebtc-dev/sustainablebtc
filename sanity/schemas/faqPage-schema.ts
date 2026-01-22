import btn from "../components/btn-schema";

const faqPage = {
   name: "faqPage",
   title: "FAQs Page",
   type: "document",
   fields: [
      {
         name: "pageTitle",
         title: "Page Title",
         type: "string",
      },
      // Hero
      {
         name: "faqs",
         title: "FAQs",
         type: "array",
         
         of: [
            {
               type: "document",
               fields: [
                  {
                     name: "faqQuestion",
                     title: "Question",
                     type: "string",
                  },
                  {
                     name: "faqAnswer",
                     title: "Answer",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "faqAvailableOnHomePage",
                     title: "Is available on Home Page?",
                     type: "boolean",
                     initialValue: false,
                  },
               ],
            },
         ],
      },
   ],
};

export default faqPage;

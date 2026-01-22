import { title } from "process";
import btn from "../components/btn-schema";

const sbcPage2025 = {
   name: "sbcPage2025",
   title: "Home Page",
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
               name: "heroSubHeading",
               title: "SubHeading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroHeading",
               title: "Title",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroPara",
               title: "Para",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
      },
      // SBC
      {
         name: "whatSBC",
         title: "What is SBC",
         type: "document",
         fields: [
            {
               name: "whatSBCHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "whatSBCDescription",
               title: "Content",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "benefitsCTA",
               title: "Call to Actions",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: btn,
                  },
               ],
            },
            {
               name: "whatSBCTable",
               title: "Table",
               type: "document",
               fields: [
                  {
                     name: "whatSBCTableHeadings",
                     title: "Table Heading",
                     type: "array",
                     of: [{type: "string"}]
                  },
                  {
                     name: "whatSBCTableRows",
                     title: "Table Rows",
                     type: "array",
                     of: [
                       {
                         type: "object",
                         fields: [
                           {
                             name: "columns",
                             title: "Row Columns",
                             type: "array",
                             of: [{ type: "string" }]
                           }
                         ]
                       }
                     ]
                   }
               ],
            }
         ],
      },
      // Benefits
      {
         name: "keyFeatures",
         title: "Key Features of SBC",
         type: "document",
         fields: [
            {
               name: "keyFeaturesHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "keyFeaturesItems",
               title: "Key Features Items",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "keyFeaturesItemImage",
                           title: "Image",
                           type: "string",
                        },
                        {
                           name: "keyFeaturesItemTitle",
                           title: "Title",
                           type: "string",
                        },
                        {
                           name: "keyFeaturesItemDescription",
                           title: "Description",
                           type: "string",
                        },
                     ],
                  },
               ],
            }
         ],
      },
      // Problems & Solution
      {
         name: "problemAndSolution",
         title: "Problem & Solution",
         type: "document",
         fields: [
            {
               name: "problemsHeading",
               title: "Problem Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "problems",
               title: "Problems",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "solutionHeading",
               title: "Soluiton Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "solution",
               title: "Solutions",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
      },
      // How SBCs are created
      {
         name: "howSBC",
         title: "How SBC",
         type: "document",
         fields: [
            {
               name: "howSBCHeading",
               title: "How SBC Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "howSBCItems",
               title: "Questions",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "howSBCItemQuestion",
                           title: "Question",
                           type: "string",
                        },
                        {
                           name: "howSBCItemAnswer",
                           title: "Answer",
                           type: "array",
                           of: [{ type: "block" }],
                        },
                     ],
                  },
               ]
            }
         ],
      },
      // Schedule a Call
      {
         name: "scheduleCall",
         title: "Schedule a Call",
         type: "document",
         fields: [
            {
               name: "scheduleCallHeading",
               title: "Schedule Call Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "scheduleCallHeadingCTA",
               title: "CTA",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: btn,
                  },
               ],
            },
         ]
      },
      // Benefits of SBC
      {
         name: "benefitsOfSBC",
         title: "Benefits of SBC",
         type: "document",
         fields: [
            {
               name: "benefitsOfSBCHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "benefitsOfSBCItems",
               title: "SBC Item",
               type: "array",
               of: [
                  {
                     type: "string",
                  },
               ],
            },
         ]
      },
   ],
};

export default sbcPage2025;

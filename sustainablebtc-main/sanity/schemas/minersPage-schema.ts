import btn from "../components/btn-schema";

const minersPage = {
   name: "minersPage",
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
               name: "heroMiningFlow",
               title: "Mining Flow",
               type: "array",
               of: [{ type: "string" }],
            },
            {
               name: "heroCTA",
               title: "CTA",
               type: "array",
               of: [{ type: "document", fields: btn }],
            },
            {
               name: "heroClients",
               title: "Clients",
               type: "document",
               fields: [
                  {
                     name: "heroClientHeading",
                     title: "Heading",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "heroClientLogos",
                     title: "Client Logos",
                     type: "array",
                     of: [{ type: "image" }],
                     options: {
                        layout: "grid",
                        hotspot: true,
                     },
                  },
               ],
            },
         ],
      },
      // Use
      {
         name: "use",
         title: "Clean Enerygy Usage",
         type: "document",
         fields: [
            {
               name: "useHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "useDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "useFeatures",
               title: "Features",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "useFeatureHeading",
                           title: "Heading",
                           type: "string",
                        },
                        {
                           name: "useFeatureDescription",
                           title: "Description",
                           type: "array",
                           of: [{ type: "block" }],
                        },
                     ],
                  },
               ],
            },
            {
               name: "useCTA",
               title: "CTA",
               type: "array",
               of: [{ type: "document", fields: btn }],
            },
         ],
      },
      // Requirement
      {
         name: "requirement",
         title: "Requirements",
         type: "document",
         fields: [
            {
               name: "requirementHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "requirementImage",
               title: "Requirement Image",
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
            {
               name: "requirementNotes",
               title: "Notes",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
      },
      // qualify
      {
         name: "qualify",
         title: "Qualify",
         type: "document",
         fields: [
            {
               name: "qualifyHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "qualifyPractices",
               title: "procurement Practices",
               type: "array",
               of: [{ type: "string" }],
            },
         ],
      },
   ],
};

export default minersPage;

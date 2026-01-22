import btn from "../components/btn-schema";

const sbcPage = {
   name: "sbcPage",
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
               title: "Title",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroSubHeading",
               title: "Sub Heading",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
      },
      // Benefits
      {
         name: "benefits",
         title: "Benefits",
         type: "document",
         fields: [
            {
               name: "benefitsHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "benefitsItems",
               title: "Benefits Items",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "benefitsItemImage",
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
                        {
                           name: "benefitsItemTitle",
                           title: "Title",
                           type: "string",
                        },
                     ],
                  },
               ],
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
         ],
      },
      // Comparison
      {
         name: "comparison",
         title: "Comparison",
         type: "document",
         fields: [
            {
               name: "comparisonTitle",
               title: "Title",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "comparisonFeatures",
               title: "Comparison Features",
               type: "array",
               of: [{ type: "string" }],
            },
            {
               name: "comparisonImageGreen",
               title: "Image Showing Sustainable Environment",
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
               name: "comparisonImageDark",
               title: "Image Showing Dark Environment",
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
      // About
      {
         name: "aboutSBC",
         title: "About SBC",
         type: "document",
         fields: [
            {
               name: "aboutSBCHeading",
               title: "SBC Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "aboutSBCSubHeading",
               title: "SBC Sub Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "aboutSBCDescription",
               title: "SBC Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "aboutSBCCTA",
               title: "Call to Actions",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: btn,
                  },
               ],
            },
         ],
      },
      // Bitcoin Miners
      {
         name: "bitcoinMiners",
         title: "Bitcoin Miners",
         type: "document",
         fields: [
            {
               name: "bitcoinMinersHeading",
               title: "Bitcoin Miner's Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "bitcoinMinersFeatures",
               title: "Bitcoin Miner's Features",
               type: "array",
               of: [{ type: "string" }],
            },
            {
               name: "heroCompanyImages",
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
};

export default sbcPage;

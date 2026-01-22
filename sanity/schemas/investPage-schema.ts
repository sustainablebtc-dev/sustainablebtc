import btn from "../components/btn-schema";

const investPage = {
   name: "investPage",
   title: "Invest Page",
   type: "document",
   fields: [
      {
         name: "pageTitle",
         title: "Page Title",
         type: "string",
      },
      // Password
      {
         name: "paywall",
         title: "Pay Wall",
         type: "document",
         fields: [
            {
               name: "paywallAccessKey",
               title: "Access Key",
               type: "string",
            },
            {
               name: "paywallHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
         ],
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
               name: "heroYoutubVideo",
               title: "Youtube Video",
               type: "string",
            },
            {
               name: "heroVideo",
               title: "Upload Video",
               type: 'file',
               options: {
                  accept: 'video/*',
               },
            }
         ],
      },
      // SBC
      {
         name: "sbc",
         title: "Invest SBC",
         type: "document",
         fields: [
            {
               name: "sbcHeading",
               title: "SBC Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "sbcFeatures",
               title: "SBC Features",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "featureName",
                           title: "Feature Name",
                           type: "array",
                           of: [{ type: "block" }],
                        },
                        {
                           name: "featureImage",
                           title: "Feature's Image",
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
               ]
            }
         ],
      },
      // Use Cases
      {
         name: "useCase",
         title: "Use Cases",
         type: "document",
         fields: [
            {
               name: "useCaseHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "useCaseScenerio",
               title: "Scenerio",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "useCaseScenerioItem",
                           title: "Scenerio",
                           type: "string",
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
   ],
};

export default investPage;

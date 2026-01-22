import btn from "../components/btn-schema";

const homePage = {
   name: "homePage",
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
               name: "heroDesc",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroCTA1",
               title: "Button 1",
               type: "document",
               fields: [
                  {
                     name: "heroBtn1Visible",
                     title: "Is Visible?",
                     type: "boolean",
                     initialValue: false,
                  },
                  {
                     name: "heroBtn1Type",
                     title: "Button Type",
                     type: "string",
                     options: {
                        list: [
                           {
                              title: "Primary",
                              value: "primary",
                           },
                           {
                              title: "Secondary",
                              value: "secondary",
                           },
                        ],
                     },
                  },
                  {
                     name: "heroBtn1Text",
                     title: "Button Text",
                     type: "string",
                  },
                  {
                     name: "heroBtn1Icon",
                     title: "Icon",
                     type: "string",
                  },
                  {
                     name: "heroBtn1Slug",
                     title: "Slug",
                     type: "string",
                  },
               ],
            },
            {
               name: "heroCTA2",
               title: "Button 2",
               type: "document",
               fields: [
                  {
                     name: "heroBtn2Visible",
                     title: "Is Visible?",
                     type: "boolean",
                     initialValue: false,
                  },
                  {
                     name: "heroBtn2Type",
                     title: "Button Type",
                     type: "string",
                     options: {
                        list: [
                           {
                              title: "Primary",
                              value: "primary",
                           },
                           {
                              title: "Secondary",
                              value: "secondary",
                           },
                        ],
                     },
                  },
                  {
                     name: "heroBtn2Text",
                     title: "Button Text",
                     type: "string",
                  },
                  {
                     name: "heroBtn2Icon",
                     title: "Icon",
                     type: "string",
                  },
                  {
                     name: "heroBtn2Slug",
                     title: "Slug",
                     type: "string",
                  },
               ],
            },

            // Slider
            {
               name: "heroCompanyIconsTitle",
               title: "Company Icons Title",
               type: "string",
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
      // Countdown
      {
         name: "countdown",
         title: "Count Down",
         type: "document",
         fields: [
            {
               name: "countdownHeading",
               title: "Countdown Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "countdownSubHeading",
               title: "Countdown SubHeading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "countdownDate",
               title: "Countdown Date",
               type: "datetime",
            },
         ]
      },
      // SBC
      {
         name: "sbc",
         title: "About SBC",
         type: "document",
         fields: [
            {
               name: "sbcHeading",
               title: "SBC Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "sbcSubHeading",
               title: "SBC Sub Heading",
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
                           type: "string",
                        },
                        {
                           name: "featureDescription",
                           title: "Feature Description",
                           type: "string",
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
            },
            {
               name: "sbcDescription",
               title: "SBC Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "sbcBtn1",
               title: "Button 1",
               type: "document",
               fields: [
                  {
                     name: "sbcBtn1Visible",
                     title: "Is Visible?",
                     type: "boolean",
                     initialValue: false,
                  },
                  {
                     name: "sbcBtn1Type",
                     title: "Button Type",
                     type: "string",
                     options: {
                        list: [
                           {
                              title: "Primary",
                              value: "primary",
                           },
                           {
                              title: "Secondary",
                              value: "secondary",
                           },
                        ],
                     },
                  },
                  {
                     name: "sbcBtn1Text",
                     title: "Button Text",
                     type: "string",
                  },
                  {
                     name: "sbcBtn1Icon",
                     title: "Icon",
                     type: "string",
                  },
                  {
                     name: "sbcBtn1Slug",
                     title: "Slug",
                     type: "string",
                  },
               ],
            },
         ],
      },
      //about
      {
         name: "about",
         title: "About",
         type: "document",
         fields: [
            {
               name: "aboutHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "aboutDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "aboutCTA",
               title: "CTA",
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
      // Testimonials
      {
         name: "testimonials",
         title: "Testimonials",
         type: "document",
         fields: [
            {
               name: "testimonialTitle",
               title: "Testimonial Title",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "testimonialItems",
               title: "Testimonial Items",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "testimonyName",
                           title: "Testimony Name",
                           type: "string",
                        },
                        {
                           name: "testimonyCompany",
                           title: "Testimoniy's Company",
                           type: "string",
                        },
                        {
                           name: "testimony",
                           title: "Testimony",
                           type: "string",
                        },
                        {
                           name: "testimonyImage",
                           title: "Testimony's Image",
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
                           name: "testimonyCompanyLogo",
                           title: "Testimony's Company Logo",
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
      // Trust
      {
         name: "trust",
         title: "Trust",
         type: "document",
         fields: [
            {
               name: "trustHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "trustDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "trustCTA",
               title: "CTA",
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
      // Download Whitepaper
      {
         name: "whitepaperdownload",
         title: "WhitepaperDownload",
         type: "document",
         fields: [
            {
               name: "whitepaperdownloadHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "whitepaperdownloadDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "whitepaperdownloadCTA",
               title: "CTA",
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
      // FAQs
      {
         name: "faq",
         title: "Faq",
         type: "document",
         fields: [
            {
               name: "faqHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "faqCTA",
               title: "CTA",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: btn,
                  },
               ],
            },
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

         ],
      },
      
      
   ],
};

export default homePage;

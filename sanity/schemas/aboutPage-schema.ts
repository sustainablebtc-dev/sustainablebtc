import btn from "../components/btn-schema";

const aboutPage = {
   name: "aboutPage",
   title: "Home Page",
   type: "document",
   fields: [
      {
         name: "title",
         title: "pageTitle",
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
               name: "heroDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroCTA",
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
      // SBP
      {
         name: "sbp",
         title: "Sustainable Bitcoin Protocol",
         type: "document",
         fields: [
            {
               name: "sbpHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "sbpDescription",
               title: "Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "sbpVision",
               title: "Vision",
               type: "document",
               fields: [
                  {
                     name: "sbpVisionHeading",
                     title: "Heading",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "sbpVisionDescription",
                     title: "Description",
                     type: "array",
                     of: [{ type: "block" }],
                  },
               ],
            },
            {
               name: "sbpMission",
               title: "Mission",
               type: "document",
               fields: [
                  {
                     name: "sbpMissionHeading",
                     title: "Heading",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "sbpMissionDescription",
                     title: "Description",
                     type: "array",
                     of: [{ type: "block" }],
                  },
               ],
            },
         ],
      },
      // Commitment
      {
         name: "commitment",
         title: "Commitments",
         type: "document",
         fields: [
            {
               name: "commitmentHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "commitmentItems",
               title: "Commitments",
               type: "array",
               of: [
                  {
                     type: "document",
                     fields: [
                        {
                           name: "commitmentItemHeading",
                           title: "Heading",
                           type: "string",
                        },
                        {
                           name: "commitmentItemDescription",
                           title: "Description",
                           type: "string",
                        },
                        {
                           name: "commitmentItemBlockDescription",
                           title: "Description",
                           type: "array",
                           of: [{ type: "block" }],
                        },
                     ],
                  },
               ],
            },
         ],
      },
      // Team
      {
         name: "team",
         title: "Team",
         type: "document",
         fields: [
            // SBP Team
            {
               name: "sbpTeam",
               title: "SBP Team",
               type: "document",
               fields: [
                  {
                     name: "sbpTeamHeading",
                     title: "Heading",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "sbpTeamMember",
                     title: "Members",
                     type: "array",
                     of: [
                        {
                           type: "document",
                           fields: [
                              // Image
                              {
                                 name: "sbpTeamMemberImage",
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
                              // Name
                              {
                                 name: "sbpTeamMemberName",
                                 title: "Name",
                                 type: "string",
                              },
                              // Designation
                              {
                                 name: "sbpTeamMemberDesignation",
                                 title: "Designation",
                                 type: "string",
                              },
                              // Experience
                              {
                                 name: "sbpTeamMemberExperience",
                                 title: "Companies experienced in",
                                 type: "array",
                                 of: [
                                    {
                                       type: "image",
                                       fields: [
                                          {
                                             name: "alt",
                                             title: "Alt",
                                             type: "string",
                                          },
                                       ],
                                    },
                                 ],
                                 options: {
                                    layout: "grid",
                                    hotspot: true,
                                 },
                              },
                              // Linkedin
                              {
                                 name: "sbpTeamMemberLinkedIn",
                                 title: "LinkedIn URL",
                                 type: "url",
                              },
                           ],
                        },
                     ],
                  },
               ],
            },

            // SBP Advisors
            {
               name: "sbpAdvisors",
               title: "SBP Team",
               type: "document",
               fields: [
                  {
                     name: "sbpAdvisorsHeading",
                     title: "Heading",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "sbpAdvisorsMember",
                     title: "Members",
                     type: "array",
                     of: [
                        {
                           type: "document",
                           fields: [
                              // Image
                              {
                                 name: "sbpAdvisorsMemberImage",
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
                              // Name
                              {
                                 name: "sbpAdvisorsMemberName",
                                 title: "Name",
                                 type: "string",
                              },
                              // Designation
                              {
                                 name: "sbpAdvisorsMemberDesignation",
                                 title: "Designation",
                                 type: "string",
                              },
                              // Experience
                              {
                                 name: "sbpAdvisorsMemberExperience",
                                 title: "Companies experienced in",
                                 type: "array",
                                 of: [
                                    {
                                       type: "image",
                                       fields: [
                                          {
                                             name: "alt",
                                             title: "Alt",
                                             type: "string",
                                          },
                                       ],
                                    },
                                 ],
                                 options: {
                                    layout: "grid",
                                    hotspot: true,
                                 },
                              },
                              // Linkedin
                              {
                                 name: "sbpAdvisorsMemberLinkedIn",
                                 title: "LinkedIn URL",
                                 type: "url",
                              },
                           ],
                        },
                     ],
                  },
               ],
            },
         ],
      },
      // Support
      {
         name: "support",
         title: "Supporting Companies",
         type: "document",
         fields: [
            {
               name: "supportHeading",
               title: "Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "supportCompany",
               title: "Supported By",
               type: "array",
               of: [
                  {
                     type: "image",
                     fields: [
                        {
                           name: "alt",
                           title: "Alt",
                           type: "string",
                        },
                     ],
                  },
               ],
               options: {
                  layout: "grid",
                  hotspot: true,
               },
            },
         ],
      },
   ],
};

export default aboutPage;

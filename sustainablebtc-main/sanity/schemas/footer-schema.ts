const footer = {
   name: "footer",
   title: "Footer",
   type: "document",
   fields: [
      {
         name: "name",
         title: "Name",
         type: "string",
      },
      {
         name: "logo",
         title: "Logo",
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
         name: "about",
         title: "About",
         type: "array",
         of: [{ type: "block" }],
      },
      {
         name: "footerLinks",
         title: "Footer Links",
         type: "array",
         of: [
            {
               name: "footerLink",
               title: "Footer Link",
               type: "document",
               fields: [
                  {
                     name: "footerLinkName",
                     title: "Name",
                     type: "string",
                  },
                  {
                     name: "footerLinkSlug",
                     title: "Slug",
                     type: "string",
                  },
               ],
            },
         ],
      },
      {
         name: "socialLinks",
         title: "Social Links",
         type: "array",
         of: [
            {
               name: "socialMedia",
               title: "Social Media URL",
               type: "document",
               fields: [
                  {
                     name: "socialMedia",
                     title: "Social Media URL",
                     type: "url",
                  },
               ],
            },
         ],
      },
      {
         name: "copyright",
         title: "Copyright",
         type: "string",
      },
   ],
};

export default footer;

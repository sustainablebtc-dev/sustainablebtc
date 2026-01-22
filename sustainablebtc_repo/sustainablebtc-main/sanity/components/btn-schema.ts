const btn = [
   {
      name: "btnText",
      title: "Button Text",
      type: "string",
   },
   {
      name: "btnOptions",
      title: "Options",
      type: "document",
      fields: [
         {
            name: "btnType",
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
            name: "btnIcon",
            title: "Icon",
            type: "string",
         },
         {
            name: "btnSlug",
            title: "Slug",
            type: "string",
         },
         {
            name: "btnVisible",
            title: "Is Visible?",
            type: "boolean",
            initialValue: false,
         },
      ],
   },
];

export default btn;

// Navbar Item Fiels
const navbarItemFields = [
   {
      name: "name",
      title: "Name",
      type: "string",
   },
   {
      name: "slug",
      title: "Slug",
      type: "string",
   },
   {
      name: "isButton",
      title: "Is Button?",
      type: "boolean",
      initialValue: false,
   },
   {
      name: "isDropdown",
      title: "Is Dropdown?",
      type: "boolean",
      initialValue: false,
   },
   {
      name: "iconName",
      title: "Icon Name",
      type: "string",
   },
   {
      name: "dropdownNavigation",
      title: "Dropdown Navigation",
      type: "array",
      of: [
         {
            type: "document",
            fields: [
               {
                  name: "name",
                  title: "Name",
                  type: "string",
               },
               {
                  name: "slug",
                  title: "Slug",
                  type: "string",
               },
            ],
         },
      ],
   },
];

// Navbar Schema
const navbar = {
   name: "navbar",
   title: "Navbar",
   type: "document",
   fields: [
      {
         name: "componentTitle",
         title: "Component Title",
         type: "string",
      },
      {
         name: "primaryNavigation",
         title: "Primary Navigation",
         type: "array",
         of: [
            {
               type: "document",
               fields: navbarItemFields,
            },
         ],
      },
      {
         name: "secondaryNavigation",
         title: "Secondary Navigation",
         type: "array",
         of: [
            {
               type: "document",
               fields: navbarItemFields,
            },
         ],
      },
   ],
};

export default navbar;

const blogCategories = {
   name: "blogCategories",
   title: "Category",
   type: "document",
   fields: [
      {
         name: "categoryKey",
         title: "Key",
         type: "string",
      },
      {
         name: "title",
         title: "Title",
         type: "string",
      },
      {
         name: "description",
         title: "Description",
         type: "text",
      },
   ],
};

export default blogCategories;

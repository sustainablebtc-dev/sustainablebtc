const miscellaneousPage = {
   name: "miscellaneousPage",
   title: "Miscellaneous Page",
   type: "document",
   fields: [
      {
         name: "pageTitle",
         title: "Title",
         type: "string",
      },
      {
         name: "slug",
         title: "Slug",
         type: "slug",
         options: { source: "pageTitle" },
      },
      {
         name: "content",
         title: "Content",
         type: "array",
         of: [{ type: "block" }],
      },
   ],
};

export default miscellaneousPage;

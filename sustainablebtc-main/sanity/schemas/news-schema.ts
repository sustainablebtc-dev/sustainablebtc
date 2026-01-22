const news = {
   name: "news",
   title: "news",
   type: "document",
   fields: [
      {
         name: "title",
         title: "Title",
         type: "string",
      },
      {
         name: "url",
         title: "URL",
         type: "url",
      },
      {
         name: "slug",
         title: "Slug",
         type: "slug",
         options: { source: "title" },
      },
      {
         name: "categories",
         title: "Categories",
         type: "array",
         of: [
            {
               type: "reference",
               name: "newsArticleCategory",
               title: "Category",
               to: [{ type: "blogCategories" }],
            },
         ],
      },
      {
         name: "btnIsRedirect",
         title: "Is news available outside of our website?",
         type: "boolean",
         initialValue: false,
      },
      {
         name: "date",
         title: "Date of Published",
         type: "date",
      },
      {
         name: "description",
         title: "Description",
         type: "string",
      },
      {
         name: "image",
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
         name: "content",
         title: "Content",
         type: "array",
         of: [{ type: "block" }],
      },
   ],
};

export default news;

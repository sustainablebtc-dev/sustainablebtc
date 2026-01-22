import btn from "../components/btn-schema";

const learningCentrePage = {
   name: "learningCentrePage",
   title: "Learning Centre",
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
         name: "hero",
         title: "Hero",
         type: "document",
         fields: [
            {
               name: "heroHeading",
               title: "Hero Heading",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroDescription",
               title: "Hero Description",
               type: "array",
               of: [{ type: "block" }],
            },
            {
               name: "heroTags",
               title: "Hero Tags",
               type: "array",
               of: [{type: "string"}]
            }
         ]
      },
      {
         name: "videoLessons",
         title: "Video Lessons",
         type: "array",
         of: [
            {
               type: "document",
               fields: [
                  {
                     name: "videoLessonDocumentTitle",
                     title: "Document Title",
                     type: "string",
                  },
                  {
                     name: "videoLessonImage",
                     title: "Thumbnail",
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
                     name: "videoLessonTitle",
                     title: "Title",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "videoLessonPara",
                     title: "Description",
                     type: "array",
                     of: [{ type: "block" }],
                  },
                  {
                     name: "videoLessonDuration",
                     title: "Duration",
                     type: "string",
                  },
                  {
                     name: "videoLessonTags",
                     title: "Tags",
                     type: "array",
                     of: [{type: "string"}]
                  },
                  {
                     name: "videoLessonButton",
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
            }
         ]
      },
   ],
};

export default learningCentrePage;

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas/";

// Actions available for singleton document
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
// singleton document types
const singletonTypes = new Set([
   "navbar",
   "homePage",
   "sbcPage",
   "sbcPage2025",
   "investorsPage",
   "minersPage",
   "transparencyPage",
   "aboutPage",
   "getStartedPage",
   "contactPage",
   "faqPage",
   "investPage",
   "learningCentrePage",
   "brHomePage"
]);

const config = defineConfig({
   projectId: "6e7plt23",
   dataset: "production",
   title: "Studio | Sustainable Bitcoin Protocol",
   apiVersion: "2023-03-04",
   basePath: "/studio",
   useCdn: true, // make sure to make it true once we are done
   plugins: [
      deskTool({
         structure: (S) =>
            S.list()
               .title("Website Content")
               .items([
                  // BitREC
                  S.listItem()
                     .title("BitREC / Home")
                     .id("brHomePage")
                     .child(
                        S.document()
                           .schemaType("brHomePage")
                           .documentId("brHomePage")
                     ),

                  // Our singleton type has a list item with a custom child
                  S.listItem()
                     .title("Page / Home")
                     .id("homePage")
                     .child(
                        S.document()
                           .schemaType("homePage")
                           .documentId("homePage")
                     ),
                  S.listItem()
                     .title("Page / SBC")
                     .id("sbcPage")
                     .child(
                        S.document().schemaType("sbcPage").documentId("sbcPage")
                     ),
                  S.listItem()
                     .title("Page / SBC2025")
                     .id("sbcPage2025")
                     .child(
                        S.document().schemaType("sbcPage2025").documentId("sbcPage2025")
                     ),
                  S.listItem()
                     .title("Page / Investors")
                     .id("investorsPage")
                     .child(
                        S.document()
                           .schemaType("investorsPage")
                           .documentId("investorsPage")
                     ),
                  S.listItem()
                     .title("Page / Miners")
                     .id("minersPage")
                     .child(
                        S.document()
                           .schemaType("minersPage")
                           .documentId("minersPage")
                     ),
                  S.listItem()
                     .title("Page / Transparency")
                     .id("transparencyPage")
                     .child(
                        S.document()
                           .schemaType("transparencyPage")
                           .documentId("transparencyPage")
                     ),
                  S.listItem()
                     .title("Page / About")
                     .id("aboutPage")
                     .child(
                        S.document()
                           .schemaType("aboutPage")
                           .documentId("aboutPage")
                     ),
                  S.listItem()
                     .title("Page / Get Started")
                     .id("getStartedPage")
                     .child(
                        S.document()
                           .schemaType("getStartedPage")
                           .documentId("getStartedPage")
                     ),
                  S.listItem()
                     .title("Page / Contact Us")
                     .id("contactPage")
                     .child(
                        S.document()
                           .schemaType("contactPage")
                           .documentId("contactPage")
                     ),
                  S.listItem()
                     .title("Page / FAQs")
                     .id("faqPage")
                     .child(
                        S.document().schemaType("faqPage").documentId("faqPage")
                     ),
                  S.listItem()
                     .title("Page / Invest")
                     .id("investPage")
                     .child(
                        S.document()
                           .schemaType("investPage")
                           .documentId("investPage")
                     ),

                  // Blog
                  S.documentTypeListItem("blogCategories").title(
                     "Blog / Categories"
                  ),
                  S.documentTypeListItem("news").title("Blog / Articles"),

                  // Learning Centre
                  S.listItem()
                     .title("Page / Learning Centre")
                     .id("learningCentrePage")
                     .child(
                        S.document()
                           .schemaType("learningCentrePage")
                           .documentId("learningCentrePage")
                     ),

                  // Regular Documents
                  S.documentTypeListItem("miscellaneousPage").title(
                     "Miscellaneous Pages"
                  ),

                  // Header & Footer
                  S.listItem()
                     .title("Component / Navbar")
                     .id("navbar")
                     .child(
                        S.document().schemaType("navbar").documentId("navbar")
                     ),
                  S.documentTypeListItem("footer").title("Component / Footer"),
               ]),
      }),
   ],
   schema: {
      types: schemas,

      // Filter out singleton types from the global “New document” menu options
      templates: (templates) =>
         templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
   },
   document: {
      // For singleton types, filter out actions that are not explicitly included
      // in the `singletonActions` list defined above
      actions: (input, context) =>
         singletonTypes.has(context.schemaType)
            ? input.filter(
                 ({ action }) => action && singletonActions.has(action)
              )
            : input,
   },
});

export default config;

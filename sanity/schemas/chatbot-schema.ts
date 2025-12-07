import btn from "../components/btn-schema";

const chatBot = {
   name: "chatBot",
   title: "SBP-AI Chat Bot",
   type: "document",
   fields: [
      {
         name: "title",
         title: "Component Title",
         type: "string",
      },
      {
         name: "chatbotFloatingSuggestions",
         title: "Chatbot Floating Suggestions",
         type: "array",
         of: [
            {
               type: "document",
               fields: [
                  {
                     name: "suggestion",
                     title: "Suggestion",
                     type: "string",
                  },
                  {
                     name: "question",
                     title: "Question",
                     type: "string",
                  }
               ]
            }
         ],
         description:
            "Suggestions that appear in the chatbot floating button. Recommended to have 3-5 suggestions.", 
      }
   ],
};

export default chatBot;

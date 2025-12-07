import React, { useState, useEffect } from 'react';

import { getChatbotData } from '@/sanity/sanity-utils';
import ChatbotContainer from './ChatbotContainer';

export default async function Chatbot() {

   // Data
   const chatbotData = await getChatbotData();

   
   return (
      <>
         <ChatbotContainer chatbotData={chatbotData} />
      </>
   )
}
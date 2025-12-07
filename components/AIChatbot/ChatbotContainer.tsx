"use client";

import React, { useState, useEffect } from 'react'
import { ChatToggleButton } from '@/components/AIChatbot/ChatToggleButton';
import { ChatbotWindow } from '@/components/AIChatbot/ChatbotWindow';

interface Message {
   id: string;
   text: string;
   sender: 'user' | 'bot';
   timestamp: Date;
   links?: Array<{ text: string; url: string }>;
   buttons?: Array<{ text: string; onClick: () => void }>;
}

const ChatbotContainer = ({ chatbotData }: { chatbotData: any }) => {

   const [isChatOpen, setIsChatOpen] = useState(false);
   const [showPulse, setShowPulse] = useState(true);
   const [initialQuestion, setInitialQuestion] = useState<string | undefined>(undefined);
   const [messages, setMessages] = useState<Message[] | null>(null);
   const [scrollPosition, setScrollPosition] = useState(0);
   const [unreadCount, setUnreadCount] = useState(0);
   const [lastReadMessageId, setLastReadMessageId] = useState<string | null>(null);

   // Stop pulse animation after 5 seconds
   useEffect(() => {
      const timer = setTimeout(() => {
         setShowPulse(false);
      }, 5000);
      return () => clearTimeout(timer);
   }, []);

   const handleSuggestionClick = (question: string) => {
      setInitialQuestion(question);
      setIsChatOpen(true);
   };

   const handleChatClose = () => {
      setIsChatOpen(false);
      setInitialQuestion(undefined);
      // Mark current last message as read when closing
      if (messages && messages.length > 0) {
         setLastReadMessageId(messages[messages.length - 1].id);
      }
   };

   const handleChatOpen = () => {
      setIsChatOpen(true);
      // Clear unread count when opening
      setUnreadCount(0);
   };

   // Track new bot messages when chat is closed
   useEffect(() => {
      if (!isChatOpen && messages && messages.length > 0) {
         const lastMessage = messages[messages.length - 1];
         // Only count bot messages that are newer than last read message
         if (lastMessage.sender === 'bot' && lastMessage.id !== lastReadMessageId) {
            const newBotMessages = messages.filter(msg => 
               msg.sender === 'bot' && 
               msg.id !== lastReadMessageId &&
               messages.indexOf(msg) > messages.findIndex(m => m.id === lastReadMessageId)
            ).length;
            setUnreadCount(newBotMessages);
         }
      }
   }, [messages, isChatOpen, lastReadMessageId]);

   return (
      <>

         {/* Chatbot - positioned at bottom-right with 2rem spacing */}
         {isChatOpen && (
            <div className="fixed bottom-8 right-8 w-[420px] max-h-[calc(100vh-4rem)] z-50">
               {/* Attention-grabbing glow effect */}
               {showPulse && (
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#2ca5f6] via-[#0EC1D3] to-[#16d563] rounded-[28px] opacity-30 animate-pulse blur-xl" />
               )}
               {/* Subtle shadow animation */}
               <div className="absolute -inset-2 bg-gradient-to-br from-[#2ca5f6]/20 to-[#0EC1D3]/20 rounded-[24px] animate-pulse" style={{ animationDuration: '3s' }} />
               {/* Main chatbot */}
               <div className="relative animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-500 h-full">
                  <ChatbotWindow 
                     onClose={handleChatClose} 
                     initialMessage={initialQuestion} 
                     chatbotData={chatbotData}
                     messages={messages}
                     setMessages={setMessages}
                     scrollPosition={scrollPosition}
                     setScrollPosition={setScrollPosition}
                     isChatOpen={isChatOpen}
                  />
               </div>
            </div>
         )}

         {/* Floating Chat Button - shown when chat is closed */}
         {!isChatOpen && (
            <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-300">
               <ChatToggleButton
                  onClick={handleChatOpen}
                  onSuggestionClick={handleSuggestionClick}
                  hasUnread={unreadCount > 0}
                  unreadCount={unreadCount}
                  chatbotData={chatbotData}
               />
            </div>
         )}
      </>
   )
}

export default ChatbotContainer
import React, { useState, useEffect } from "react";

// import schema utils
import { getChatbotData } from '@/sanity/sanity-utils';

interface ChatToggleButtonProps {
   onClick: () => void;
   onSuggestionClick?: (question: string) => void;
   hasUnread?: boolean;
   unreadCount?: number;
   chatbotData: Awaited<ReturnType<typeof getChatbotData>>;
}

export function ChatToggleButton({ onClick, onSuggestionClick, hasUnread = false, unreadCount = 0, chatbotData }: ChatToggleButtonProps) {

   // Randomize suggestions on mount
   const [suggestions] = useState(() => {
      const items = chatbotData?.chatbotFloatingSuggestions || [];
      return [...items].sort(() => Math.random() - 0.5);
   });

   const [currentSuggestion, setCurrentSuggestion] = useState(0);
   const [isVisible, setIsVisible] = useState(true);
   const [showSuggestions, setShowSuggestions] = useState(true);

   useEffect(() => {
      if (!showSuggestions) return;

      const cycleInterval = setInterval(() => {
         setIsVisible(false);
         setTimeout(() => {
            setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
            setIsVisible(true);
         }, 500);
      }, 5000);

      return () => clearInterval(cycleInterval);
   }, [suggestions.length, showSuggestions]);

   const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowSuggestions(false);
   };

   const handleSuggestionClick = () => {
      if (onSuggestionClick) {
         onSuggestionClick(suggestions[currentSuggestion].question);
      } else {
         onClick();
      }
   };

   return (
      <div className="relative">
         {/* Floating suggestion bubble */}
         {showSuggestions && (
            <div
               className={`absolute bottom-full right-11 mb-5 transition-all duration-500 w-[250px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
            >
               <div
                  onClick={handleSuggestionClick}
                  className="bg-white rounded-2xl rounded-br-sm px-5 py-3 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] border border-[#2ca5f6]/20 w-full cursor-pointer hover:shadow-[0_15px_50px_-5px_rgba(44,165,246,0.4)] transition-all group/bubble relative"
               >
                  <p className="text-[14px] text-[#1e203f] leading-relaxed font-medium group-hover/bubble:text-[#2ca5f6] transition-colors pr-2">
                     {suggestions[currentSuggestion].suggestion}
                  </p>

                  {/* Close button - shows on hover */}
                  <button
                     onClick={handleDismiss}
                     className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-[#2ca5f6] flex items-center justify-center opacity-0 group-hover/bubble:opacity-100 transition-all"
                     aria-label="Dismiss suggestions"
                  >
                     <span className="grid place-content-center w-4 h-4">
                        <i className="bi bi-x-lg text-xs text-gray-600 group-hover:text-white"></i>
                     </span>
                  </button>

                  {/* Small triangle pointer */}
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-[#2ca5f6]/20 transform rotate-45" />
               </div>
            </div>
         )}

         <button
            onClick={onClick}
            className="size-[72px] rounded-full bg-gradient-to-br from-[#339DFF] to-[#16d563] hover:to-[#2ca5f6] hover:from-[#16d563] shadow-2xl hover:shadow-[0_0_40px_rgba(44,165,246,0.5)] transition-all duration-300 flex items-center justify-center group relative"
            aria-label="Open chat"
         >
            {/* Pulsing ring effect */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#2ca5f6] to-[#0EC1D3] opacity-30 animate-ping" style={{ animationDuration: '2s' }} />

            <span className="grid place-content-center w-[4.5rem] h-[4.5rem]">
               <i className="bi bi-chat text-3xl text-white group-hover:scale-110 transition-transform relative z-10"></i>
            </span>

            {/* Unread indicator - shown when there are unread messages */}
            {hasUnread && unreadCount > 0 ? (
               <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-3 border-white shadow-lg animate-pulse z-20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold relative z-10">{unreadCount}</span>
                  <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
               </div>
            ) : (
               /* Online indicator - shown when no unread messages */
               <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#16d563] rounded-full border-3 border-white shadow-lg animate-pulse z-20">
                  <div className="absolute inset-0 rounded-full bg-[#16d563] animate-ping" />
               </div>
            )}

            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#339DFF] to-[#0EC1D3] opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-300" />
         </button>
      </div>
   );
}
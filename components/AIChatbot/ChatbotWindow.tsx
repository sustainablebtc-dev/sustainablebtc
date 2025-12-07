import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ModalWhitepaperEmail from '@/components/Modals/ModalWhitepaperEmail';

interface Message {
   id: string;
   text: string;
   sender: 'user' | 'bot';
   timestamp: Date;
   links?: Array<{ text: string; url: string }>;
   buttons?: Array<{ text: string; onClick: () => void }>;
}

interface ChatbotProps {
   onClose?: () => void;
   initialMessage?: string;
   chatbotData: any;
   messages: Message[] | null;
   setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
   scrollPosition: number;
   setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
   isChatOpen: boolean;
}

export function ChatbotWindow({ onClose, initialMessage, chatbotData, messages, setMessages, scrollPosition, setScrollPosition, isChatOpen }: ChatbotProps) {
   const pathname = usePathname();
   const [quickActions] = useState(() => {
      const allSuggestions = chatbotData?.chatbotFloatingSuggestions?.map((item: any) => item.question).filter((question: string) => question.split(' ').length <= 6) || [];
      return allSuggestions.sort(() => Math.random() - 0.5).slice(0, 3);
   });
   const [isWhitepaperModalOpen, setIsWhitepaperModalOpen] = useState(false);
   const [loadingLink, setLoadingLink] = useState<string | null>(null);

   // Initialize messages if null (first time)
   useEffect(() => {
      if (messages === null) {
         setMessages([
            {
               id: '1',
               text: 'Hi! **Hal** here 👋\nI\'m your guide to making Bitcoin cleaner and clearer. Ask me anything!\n\nOr start with:',
               sender: 'bot',
               timestamp: new Date(),
               buttons: quickActions.map((action: string) => ({
                  text: action,
                  onClick: () => handleQuickAction(action)
               })),
            },
         ]);
      }
   }, [messages, setMessages, quickActions]);
   const [inputValue, setInputValue] = useState('');
   const [isTyping, setIsTyping] = useState(false);
   const [showScrollButton, setShowScrollButton] = useState(false);
   const [showResources, setShowResources] = useState(true);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const messagesContainerRef = useRef<HTMLDivElement>(null);
   const lastMessageRef = useRef<HTMLDivElement>(null);
   const previousMessagesLength = useRef(messages?.length || 0);

   // Set initial message if provided
   useEffect(() => {
      if (initialMessage) {
         setInputValue(initialMessage);
      }
   }, [initialMessage]);

   // Reset loading link when pathname changes (navigation complete)
   useEffect(() => {
      setLoadingLink(null);
   }, [pathname]);

   // Restore scroll position only on initial mount
   const hasRestoredScroll = useRef(false);
   useEffect(() => {
      if (messagesContainerRef.current && scrollPosition > 0 && !hasRestoredScroll.current) {
         messagesContainerRef.current.scrollTop = scrollPosition;
         hasRestoredScroll.current = true;
      }
   }, [scrollPosition]);

   // Save scroll position on scroll
   const handleScroll = () => {
      if (messagesContainerRef.current) {
         const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
         const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
         setShowScrollButton(!isNearBottom);
         
         // Save scroll position
         setScrollPosition(scrollTop);
      }
   };

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   // Scroll to the start of new message when added
   useEffect(() => {
      if (messages && messages.length > previousMessagesLength.current) {
         // Scroll to the start of the last message, keeping it at the top of viewport
         lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
         previousMessagesLength.current = messages.length;
      }
   }, [messages]);

   const handleSend = async () => {
      if (!inputValue.trim()) return;

      const userQuestion = inputValue;
      const newMessage: Message = {
         id: Date.now().toString(),
         text: userQuestion,
         sender: 'user',
         timestamp: new Date(),
      };

      setMessages((prev) => [...(prev || []), newMessage]);
      setInputValue('');
      setIsTyping(true);

      try {
         // Call the chatbot API
         const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userQuestion }),
         });

         const data = await response.json();

         if (response.ok && data.reply) {
            const botResponse: Message = {
               id: (Date.now() + 1).toString(),
               text: data.reply,
               sender: 'bot',
               timestamp: new Date(),
               links: data.links || undefined, // Include links from API response
            };
            setMessages((prev) => [...(prev || []), botResponse]);
         } else {
            throw new Error('Failed to get response');
         }
      } catch (error) {
         console.error('Chatbot API error:', error);
         const errorResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: 'Sorry, I encountered an error. Please try again.',
            sender: 'bot',
            timestamp: new Date(),
         };
         setMessages((prev) => [...(prev || []), errorResponse]);
      } finally {
         setIsTyping(false);
      }
   };

   const getBotResponse = (userInput: string): Message => {
      const input = userInput.toLowerCase();

      const baseResponse = {
         id: (Date.now() + 1).toString(),
         sender: 'bot' as const,
         timestamp: new Date(),
      };

      if (input.includes('certificate') || input.includes('sbc')) {
         return {
            ...baseResponse,
            text: 'Sustainable Bitcoin Certificates (SBC) are environmental commodity units that represent Bitcoin mining powered by clean energy. Each certificate is backed by verifiable renewable energy sources and can be traded on-chain.',
            links: [
               { text: 'Learn More About SBC', url: '#' },
               { text: 'View Certificate Details', url: '#' },
            ],
         };
      } else if (input.includes('invest') || input.includes('investment')) {
         return {
            ...baseResponse,
            text: 'Our protocol allows you to align your Bitcoin investments with the clean energy transition. We provide transparent, verifiable certificates that prove your Bitcoin is sustainably mined. Key benefits include:\n\n• Environmental impact verification\n• On-chain transparency\n• Tradeable certificates\n• Global market access',
            links: [
               { text: 'Explore Investment Options', url: '#' },
            ],
         };
      } else if (input.includes('how') || input.includes('work')) {
         return {
            ...baseResponse,
            text: 'Our system works in three simple steps:\n\n1. Miners register their renewable energy sources\n2. We verify energy credentials through independent audits\n3. Certificates are issued and can be traded on-chain\n\nThis ensures complete transparency and accountability throughout the process.',
            links: [
               { text: 'Technical Documentation', url: '#' },
            ],
         };
      } else if (input.includes('price') || input.includes('cost')) {
         return {
            ...baseResponse,
            text: 'Pricing varies based on the volume of certificates and specific requirements. We offer flexible pricing models to accommodate different investment sizes. Please connect with our team to discuss pricing options tailored to your needs.',
            links: [
               { text: 'Request Pricing', url: '#' },
               { text: 'Schedule Consultation', url: '#' },
            ],
         };
      } else if (input.includes('contact') || input.includes('connect') || input.includes('team')) {
         return {
            ...baseResponse,
            text: 'I\'d be happy to connect you with our team! You can reach us through:\n\n• Click "Let\'s Connect" on the homepage\n• Email: contact@sustainablebitcoin.com\n• Schedule a call with our specialists\n\nOur team typically responds within 24 hours.',
            links: [
               { text: 'Contact Form', url: '#' },
            ],
         };
      } else if (input.includes('miner') || input.includes('mining')) {
         return {
            ...baseResponse,
            text: 'We work with Bitcoin miners worldwide who use renewable energy sources. Our verification process ensures that only sustainably-mined Bitcoin receives our certificates. Miners benefit from:\n\n• Premium pricing for green Bitcoin\n• Marketing advantages\n• Verified environmental credentials',
            links: [
               { text: 'Partner With Us', url: '#' },
            ],
         };
      } else if (input.includes('transparency') || input.includes('verify')) {
         return {
            ...baseResponse,
            text: 'Transparency is at the core of our protocol. All certificates are:\n\n• Independently audited\n• Verified on-chain\n• Publicly accessible\n• Backed by renewable energy certificates\n\nYou can verify any certificate through our blockchain explorer.',
            links: [
               { text: 'View Blockchain Explorer', url: '#' },
            ],
         };
      } else {
         return {
            ...baseResponse,
            text: 'Thank you for your question! The Sustainable Bitcoin Protocol is the only environmental commodity specific to Bitcoin. I can help you learn about:\n\n• Sustainable Bitcoin Certificates\n• Investment opportunities\n• How our system works\n• Verification & transparency\n• Contacting our team\n\nWhat would you like to know more about?',
         };
      }
   };

   const handleResetChat = () => {
      setMessages([
         {
            id: '1',
            text: 'Hi! **Hal** here 👋\nI\'m your guide to making Bitcoin cleaner and clearer. Ask me anything!\n\nOr start with:',
            sender: 'bot',
            timestamp: new Date(),
            buttons: quickActions.map((action: string) => ({
               text: action,
               onClick: () => handleQuickAction(action)
            })),
         },
      ]);
   };

   const handleQuickAction = (action: string) => {
      setInputValue(action);
   };

   return (
      <div className="flex flex-col h-[100vh] md:h-[90vh] md:max-h-[650px] bg-white rounded-[24px] overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] border border-[#2ca5f6]/20">
         {/* Header */}
         <div className="bg-[#1e203f] px-5 py-4 flex items-center justify-between border-b-2 border-[#2ca5f6]/30">
            <div className="flex items-center gap-2.5">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#339DFF] to-[#0EC1D3] flex items-center justify-center shadow-lg">
                  <span className="text-white">
                     <i className="bi bi-chat"></i>
                  </span>
               </div>
               <div>
                  <h3 className="text-white text-[16px] font-semibold">SBC Assistant</h3>
                  <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-[#16d563] animate-pulse" />
                     <p className="text-[#6DFFDC] text-[13px]">Online</p>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-1">
               <button
                  onClick={handleResetChat}
                  className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 grid place-content-center rounded-lg w-6 h-6"
                  aria-label="Reset chat"
                  title="Start new conversation"
               >
                  <i className="bi bi-arrow-repeat text-lg"></i>
               </button>
               <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 grid place-content-center rounded-lg w-6 h-6"
                  aria-label="Close chat"
               >
                  <i className="bi bi-x-lg text-lg"></i>
               </button>
            </div>
         </div>

         {/* Messages */}
         <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 relative"
         >
            {messages?.map((message, index) => (
               <div
                  key={message.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  className={`flex gap-2.5 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
               >
                  {/* Avatar - only for bot messages */}
                  {message.sender === 'bot' && (
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#339DFF] to-[#0EC1D3] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                        <span className=" text-white">
                           <i className="bi bi-robot"></i>
                        </span>
                     </div>
                  )}

                  <div
                     className={`max-w-[75%] rounded-2xl px-4 py-3 ${message.sender === 'user'
                        ? 'bg-[#2ca5f6] text-white rounded-tr-sm shadow-md'
                        : 'bg-[#f3f3f5] text-[#1e203f] rounded-tl-sm shadow-sm'
                        }`}
                  >
                     <div
                        className="text-[15px] leading-[1.6] prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                           __html: message.text
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/\n/g, '<br/>')
                              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#2ca5f6] hover:text-[#0EC1D3] underline" target="_blank" rel="noopener noreferrer">$1</a>')
                              .replace(/```([\s\S]*?)```/g, '<pre class="bg-[#1e203f] text-white p-3 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                              .replace(/`([^`]+)`/g, '<code class="bg-[#1e203f]/10 text-[#2ca5f6] px-1.5 py-0.5 rounded text-sm">$1</code>')
                              .replace(/^#{1,6}\s+(.*)$/gm, (match, text) => {
                                 const hashMatch = match.match(/^#+/);
                                 const level = hashMatch ? hashMatch[0].length : 1;
                                 return `<h${level} class="font-bold mt-2 mb-1">${text}</h${level}>`;
                              })
                              .replace(/^[-*+]\s+(.*)$/gm, '<li class="ml-4">$1</li>')
                              .replace(/^(\d+)\.\s+(.*)$/gm, '<li class="ml-4 list-decimal">$2</li>')
                              .replace(/(<li.*<\/li>)/s, '<ul class="space-y-1">$1</ul>')
                              .replace(/>\s+</g, '><')
                        }}
                     />

                     {/* Links */}
                     {message.links && message.links.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                           {message.links.map((link, idx) => {
                              // Check if link is external (starts with http:// or https://)
                              const isExternal = /^https?:\/\//i.test(link.url);
                              
                              if (isExternal) {
                                 // Use <a> tag for external links
                                 return (
                                    <a
                                       key={idx}
                                       href={link.url}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex items-center gap-1.5 text-[14px] text-[#2ca5f6] hover:text-[#0EC1D3] transition-colors font-medium"
                                    >
                                       <span className="">
                                          <i className="bi bi-box-arrow-up-right"></i>
                                       </span>
                                       {link.text}
                                    </a>
                                 );
                              } else {
                                 // Use <Link> for internal navigation - show spinner while loading
                                 const isLoading = loadingLink === link.url;
                                 
                                 return (
                                    <Link
                                       key={idx}
                                       href={link.url}
                                       onClick={() => {
                                          // Don't show loading if clicking same page
                                          if (link.url === pathname) {
                                             return;
                                          }
                                          setLoadingLink(link.url);
                                          // Fallback: reset after 2 seconds if navigation doesn't complete
                                          setTimeout(() => setLoadingLink(null), 2000);
                                       }}
                                       className="flex items-center gap-1.5 text-[14px] text-[#2ca5f6] hover:text-[#0EC1D3] transition-colors font-medium"
                                    >
                                       <span className="inline-block">
                                          {isLoading ? (
                                             <i className="bi bi-arrow-repeat animate-spin inline-block"></i>
                                          ) : (
                                             <i className="bi bi-arrow-right"></i>
                                          )}
                                       </span>
                                       {link.text}
                                    </Link>
                                 );
                              }
                           })}
                        </div>
                     )}

                     {/* Buttons */}
                     {message.buttons && message.buttons.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                           {message.buttons.map((button, idx) => (
                              <button
                                 key={idx}
                                 onClick={() => handleQuickAction(button.text)}
                                 className="text-sm text-left font-normal px-2 py-1 bg-[#2ca5f6]/10 hover:bg-gradient-to-br hover:from-[#2ca5f6] hover:to-[#0EC1D3] hover:text-white text-[#2ca5f6] rounded-lg transition-all border border-[#2ca5f6]/30 hover:border-transparent"
                              >
                                 {button.text}
                              </button>
                           ))}
                        </div>
                     )}

                     <span className={`text-[12px] mt-1.5 block ${message.sender === 'user' ? 'text-white/70' : 'text-[#717182]'
                        }`}>
                        {message.timestamp.toLocaleTimeString([], {
                           hour: '2-digit',
                           minute: '2-digit',
                        })}
                     </span>
                  </div>

                  {/* Avatar - only for user messages */}
                  {message.sender === 'user' && (
                     <div className="w-8 h-8 rounded-full bg-[#1e203f] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                        <span className=" text-white">
                           <i className="bi bi-person"></i>
                        </span>
                     </div>
                  )}
               </div>
            ))}

            {isTyping && (
               <div className="flex gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#339DFF] to-[#0EC1D3] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                     <span className=" text-white">
                        <i className="bi bi-robot"></i>
                     </span>
                  </div>
                  <div className="bg-[#f3f3f5] text-[#1e203f] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                     <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#717182] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-[#717182] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-[#717182] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                     </div>
                  </div>
               </div>
            )}

            <div ref={messagesEndRef} />

            {/* Scroll to bottom button */}
            {showScrollButton && (
               <button
                  onClick={scrollToBottom}
                  className="sticky bottom-4 left-[calc(100%-3.5rem)] w-11 h-11 rounded-full bg-gradient-to-br from-[#2ca5f6] to-[#0EC1D3] hover:from-[#0EC1D3] hover:to-[#2ca5f6] shadow-lg hover:shadow-xl flex items-center justify-center transition-all z-10"
                  aria-label="Scroll to bottom"
               >
                  <span className=" text-white">
                     <i className="bi bi-arrow-down"></i>
                  </span>
               </button>
            )}
         </div>

         {/* Quick Actions */}
         {/* {messages.length <= 2 && (
            <div className="px-5 pb-2">
               <div className="flex flex-wrap gap-1">
                  <p className="text-xs mr-2 text-[#717182] w-full px-1">Explore:</p>
                  {quickActions.map((action, index) => (
                     <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="text-[12px] text-left font-normal px-3 py-1 bg-[#2ca5f6]/10 hover:bg-gradient-to-br hover:from-[#2ca5f6] hover:to-[#0EC1D3] hover:text-white text-[#2ca5f6] rounded-full transition-all border border-[#2ca5f6]/30 hover:border-transparent"
                     >
                        {action}
                     </button>
                  ))}
               </div>
            </div>
         )} */}

         {/* Helpful Resources - shown after conversation starts */}
         {messages && messages.length > 3 && (
            <div className="px-5 pb-3 border-t border-[#e9ebef] pt-3">
                  <button
                     onClick={() => setShowResources(!showResources)}
                     className="text-[#717182] text-[13px] flex items-center gap-1.5 font-medium w-full transition-colors"
                  >
                     <span className="">
                        <i className="bi bi-file-earmark-text"></i>
                     </span>
                     <span className="flex-1 text-left">Helpful Resources</span>
                     <span className={`transition-transform duration-300 hover:text-[#2ca5f6] ${showResources ? 'rotate-180' : ''}`}>
                        <i className="bi bi-chevron-up"></i>
                     </span>
                  </button>
               <div 
                  className={`space-y-1.5 overflow-hidden transition-all duration-300 ${
                     showResources ? 'max-h-[100px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
               >
                  <button
                     onClick={() => setIsWhitepaperModalOpen(true)}
                     className="text-[13px] text-[#2ca5f6] hover:text-[#0EC1D3] transition-colors block font-medium cursor-pointer text-left"
                  >
                     → Download SBC Whitepaper
                  </button>
                  <a
                     href="https://calendly.com/bradford_vanvoorhees"
                     target="_blank"
                     className="text-[13px] text-[#2ca5f6] hover:text-[#0EC1D3] transition-colors block font-medium"
                  >
                     → Schedule a Call
                  </a>
                    <Link
                      href="/contact-us"
                      onClick={(e) => {
                        setTimeout(() => {
                          onClose?.();
                        }, 100);
                      }}
                      className="text-[13px] text-[#2ca5f6] hover:text-[#0EC1D3] transition-colors block font-medium"
                    >
                      → Contact Team
                    </Link>
               </div>
            </div>
         )}

         {/* Whitepaper Modal */}
         <ModalWhitepaperEmail
            modalIsOpen={isWhitepaperModalOpen}
            setModalIsOpen={setIsWhitepaperModalOpen}
         />

         {/* Input */}
         <div className="border-t-2 border-[#e9ebef] px-5 py-4 bg-[#fafafa]">
            <div className="flex items-center gap-2.5">
               <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                     }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white border-2 border-[#e9ebef] rounded-full text-[#1e203f] text-[15px] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#2ca5f6] focus:border-transparent transition-all shadow-sm"
               />
               <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2ca5f6] to-[#0EC1D3] hover:from-[#0EC1D3] hover:to-[#2ca5f6] disabled:from-[#cbced4] disabled:to-[#cbced4] disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                  aria-label="Send message"
               >
                  <span className=" text-white">
                     <i className="bi bi-send text-lg"></i>
                  </span>
               </button>
            </div>
         </div>
      </div>
   );
}
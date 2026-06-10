import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faqData, defaultUnknownAnswer } from './FaqData.js';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from '@/hooks/useAuth';
import { createChatbotInquiry } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef(null);
  const { userId, userEmail, userName } = useAuth();
  const { toast } = useToast();

  const botAvatar = "https://horizons-cdn.hostinger.com/d6072fa7-128b-46a4-ab77-ba22abd6dbeb/d9cf61f11dcd07d73de72f199860c2ac.jpg";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initialMessages = [
    {
      type: "text",
      content: "Hello! I'm the REX Education Scholarship AI Assistant. How can I help you today? You can click on a common question below or type your own.",
      sender: "bot",
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setMessages(initialMessages);
      setShowOptions(true);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput === '') return;

    const userMessage = {
      type: 'text',
      content: trimmedInput,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowOptions(false);
    
    const matchedQuestion = Object.keys(faqData).find(q => q.toLowerCase().includes(trimmedInput.toLowerCase()));
    
    let botResponse;
    if (matchedQuestion) {
      botResponse = faqData[matchedQuestion];
    } else {
      botResponse = defaultUnknownAnswer;
      if (userId) {
        const { error } = await createChatbotInquiry({
          user_id: userId,
          inquiry_text: trimmedInput,
          email: userEmail,
          full_name: userName,
        });
        if (error) {
          console.error("Error saving inquiry:", error);
          toast({
            title: "Error",
            description: "Could not save your question for follow-up.",
            variant: "destructive",
          });
        }
      }
    }

    const botMessage = {
      type: 'text',
      content: botResponse,
      sender: 'bot',
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
      setShowOptions(true);
    }, 1000);
  };
  
  const handleOptionClick = (question) => {
    const answer = faqData[question];
    const userMessage = {
      type: 'text',
      content: question,
      sender: 'user',
    };
    const botMessage = {
      type: 'text',
      content: answer,
      sender: 'bot',
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowOptions(true); 
  };
  
  const toggleChat = () => setIsOpen(!isOpen);

  const FaqOptions = () => (
    <div className="p-4 pt-0 border-t border-slate-200 bg-slate-50">
       <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="font-semibold text-slate-700 hover:no-underline py-3">Frequently Asked Questions</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-start gap-2 pt-2">
              {Object.keys(faqData).map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  className="w-full text-left justify-start h-auto whitespace-normal text-red-900 border-red-200 hover:bg-red-50"
                  onClick={() => handleOptionClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="rounded-full w-16 h-16 bg-red-700 hover:bg-red-800 shadow-lg flex items-center justify-center text-white"
          aria-label="Toggle Chatbot"
        >
          <AnimatePresence>
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 180, scale: 0 }}>
                <X size={32} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -180, scale: 0 }}>
                <MessageSquare size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            <div className="p-4 bg-red-700 text-white font-bold text-lg text-center rounded-t-2xl shadow-md">
              REX Education Scholarship Assistant
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={cn("flex items-end gap-2", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                    {msg.sender === 'bot' && (
                      <img src={botAvatar} alt="Bot Avatar" className="w-8 h-8 rounded-full" />
                    )}
                    <div className={cn("max-w-[75%] rounded-2xl px-4 py-2", msg.sender === 'user' ? 'bg-red-700 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none')}>
                      {msg.type === 'image' ? (
                        <img src={msg.content} alt={msg.alt || 'Chat image'} className="max-w-full rounded-lg" />
                      ) : (
                        <p className="text-sm">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {showOptions && <FaqOptions />}

            <div className="p-2 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} className="bg-red-700 hover:bg-red-800">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

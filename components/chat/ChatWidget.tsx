"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import {
  ChatMessage,
  ChatMessageGroup,
  MachineState,
  ChatAction,
} from "@/lib/chat/chatTypes";
import { INITIAL_STATE, getInitialMessages, processChatAction } from "@/lib/chat/chatMachine";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatOptions from "./ChatOptions";
import RestartButton from "./RestartButton";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [machineState, setMachineState] = useState<MachineState>(INITIAL_STATE);
  const [groups, setGroups] = useState<ChatMessageGroup[]>([]);
  
  // Pending messages for typewriter effect
  const [pendingMessages, setPendingMessages] = useState<Omit<ChatMessage, "id" | "timestamp">[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tooltip trigger
  useEffect(() => {
    if (hasInteracted) return;
    
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // When opened, mark as interacted
  useEffect(() => {
    if (isOpen) {
      setHasInteracted(true);
      setShowTooltip(false);
    }
  }, [isOpen]);

  // Initialize
  useEffect(() => {
    if (isOpen && groups.length === 0 && pendingMessages.length === 0 && !isTyping) {
      setPendingMessages(getInitialMessages());
    }
  }, [isOpen, groups.length, pendingMessages.length, isTyping]);

  const firstPendingMessage = pendingMessages[0];

  // Handle typing effect queue
  useEffect(() => {
    if (!firstPendingMessage) {
      if (isTyping) setIsTyping(false);
      return;
    }

    const delay = firstPendingMessage.sender === "bot" ? 500 + Math.random() * 200 : 0;

    setIsTyping(true);

    const timer = setTimeout(() => {
      addMessage(firstPendingMessage);
      setPendingMessages((prev) => prev.slice(1));
      setIsTyping(false);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstPendingMessage]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groups, isTyping]);

  // API Call on COMPLETE
  useEffect(() => {
    if (machineState.currentState === "COMPLETE") {
      const sendLead = async () => {
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(machineState.userData),
          });
        } catch (error) {
          console.error("Failed to send lead", error);
        }
      };
      sendLead();
    }
  }, [machineState.currentState, machineState.userData]);

  const addMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...msg,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };

    setGroups((prevGroups) => {
      if (msg.sender === "system") {
        return [
          ...prevGroups,
          { id: Math.random().toString(36).substring(7), sender: "system", messages: [newMessage] },
        ];
      }

      const lastGroup = prevGroups[prevGroups.length - 1];
      if (lastGroup && lastGroup.sender === msg.sender) {
        return [
          ...prevGroups.slice(0, -1),
          { ...lastGroup, messages: [...lastGroup.messages, newMessage] },
        ];
      } else {
        return [
          ...prevGroups,
          { id: Math.random().toString(36).substring(7), sender: msg.sender, messages: [newMessage] },
        ];
      }
    });
  };

  const dispatch = useCallback((action: ChatAction) => {
    if (action.type === "RESTART") {
      setGroups([]);
      setPendingMessages([]);
      setIsTyping(false);
    }

    const { nextState, newMessages } = processChatAction(machineState, action);
    setMachineState(nextState);
    setPendingMessages((prev) => [...prev, ...newMessages]);
  }, [machineState]);

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;
    
    dispatch({ type: "SUBMIT_TEXT", value: inputRef.current.value });
    inputRef.current.value = "";
  };

  const lastGroup = groups[groups.length - 1];
  const lastMessage = lastGroup?.messages[lastGroup.messages.length - 1];
  const options = lastMessage?.options;
  
  // Only show options if we are not typing, and the last message has options
  const showOptions = !isTyping && pendingMessages.length === 0 && options && options.length > 0;
  
  // Show input if no options and waiting for user
  const needsInput = !isTyping && pendingMessages.length === 0 && 
    ["ASK_NAME", "ASK_COMPANY", "ASK_EMAIL", "ASK_PHONE"].includes(machineState.currentState);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 max-md:bottom-4 max-md:right-4">
            <AnimatePresence>
              {showTooltip && !hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-xl border border-gray-100 mb-1"
                >
                  👋 Hi there! Need help?
                  {/* Small triangle pointer */}
                  <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white border-b border-r border-gray-100"></div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowTooltip(false); setHasInteracted(true); }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors focus:outline-none"
                    aria-label="Close tooltip"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={() => setIsOpen(true)}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white shadow-[0_4px_20px_rgba(90,187,74,0.35)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(90,187,74,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 max-md:h-12 max-md:w-12"
              aria-label="Open chat widget"
            >
              <MessageCircle className="h-7 w-7 max-md:h-6 max-md:w-6" />
              
              {/* Notification Badge */}
              {showTooltip && !hasInteracted && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm ring-2 ring-white">
                  1
                </span>
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="main"
            aria-label="Chatbot dialog"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[10000] flex h-[600px] max-h-[85vh] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100"
          >
            <ChatHeader onClose={() => setIsOpen(false)} />
            
            <div className="flex flex-1 flex-col overflow-hidden bg-[#F9FAFB]">
              <div 
                className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth"
                aria-live="polite"
              >
                <ChatMessages groups={groups} isTyping={isTyping} />
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area / Options / Footer */}
              <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-4">
                {showOptions && (
                  <ChatOptions 
                    options={options!} 
                    onSelect={(val) => dispatch({ type: "SELECT_OPTION", value: val })} 
                  />
                )}

                {needsInput && (
                  <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      aria-label="Send message"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                  </form>
                )}
                
                <RestartButton onRestart={() => dispatch({ type: "RESTART" })} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

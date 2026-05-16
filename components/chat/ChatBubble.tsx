import { motion } from "framer-motion";
import { ChatMessage } from "@/lib/chat/chatTypes";

interface ChatBubbleProps {
  message: ChatMessage;
  isFirst: boolean;
  isLast: boolean;
}

export default function ChatBubble({ message, isFirst, isLast }: ChatBubbleProps) {
  const isBot = message.sender === "bot";

  // Radius logic for grouping
  let borderRadius = "rounded-2xl";
  if (isBot) {
    if (isFirst && isLast) borderRadius = "rounded-2xl rounded-bl-sm";
    else if (isFirst) borderRadius = "rounded-2xl rounded-bl-sm";
    else if (isLast) borderRadius = "rounded-2xl rounded-tl-sm rounded-bl-sm";
    else borderRadius = "rounded-2xl rounded-l-sm";
  } else {
    if (isFirst && isLast) borderRadius = "rounded-2xl rounded-br-sm";
    else if (isFirst) borderRadius = "rounded-2xl rounded-br-sm";
    else if (isLast) borderRadius = "rounded-2xl rounded-tr-sm rounded-br-sm";
    else borderRadius = "rounded-2xl rounded-r-sm";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${borderRadius} ${
        isBot ? "bg-white text-gray-800 border border-gray-100" : "bg-primary-500 text-white"
      }`}
    >
      <div 
        className="whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={typeof message.text === 'string' ? { __html: message.text } : undefined}
      >
        {typeof message.text !== 'string' ? message.text : null}
      </div>
      
      {/* Timestamp */}
      <div 
        className={`mt-1 flex items-center text-[10px] ${
          isBot ? "text-gray-400 justify-start" : "text-gray-300 justify-end"
        }`}
      >
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </motion.div>
  );
}

import { ChatMessageGroup } from "@/lib/chat/chatTypes";
import ChatBubble from "./ChatBubble";

interface MessageGroupProps {
  group: ChatMessageGroup;
}

export default function MessageGroup({ group }: MessageGroupProps) {
  if (group.sender === "system") {
    return (
      <div className="flex w-full justify-center py-2">
        {group.messages.map((msg) => (
          <span key={msg.id} className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
            {msg.text}
          </span>
        ))}
      </div>
    );
  }

  const isBot = group.sender === "bot";

  return (
    <div className={`flex w-full ${isBot ? "justify-start" : "justify-end"}`}>
      <div className={`flex max-w-[85%] items-end gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
        
        {/* Avatar for Bot */}
        {isBot && (
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8"></path>
              <rect x="4" y="8" width="16" height="12" rx="2"></rect>
              <path d="M2 14h2"></path>
              <path d="M20 14h2"></path>
              <path d="M15 13v2"></path>
              <path d="M9 13v2"></path>
            </svg>
          </div>
        )}

        {/* Messages */}
        <div className={`flex flex-col gap-1 ${isBot ? "items-start" : "items-end"}`}>
          {group.messages.map((msg, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === group.messages.length - 1;
            
            return (
              <ChatBubble 
                key={msg.id} 
                message={msg} 
                isFirst={isFirst} 
                isLast={isLast} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

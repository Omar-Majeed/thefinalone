import { ChatMessageGroup } from "@/lib/chat/chatTypes";
import MessageGroup from "./MessageGroup";

interface ChatMessagesProps {
  groups: ChatMessageGroup[];
  isTyping: boolean;
}

export default function ChatMessages({ groups, isTyping }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <MessageGroup key={group.id} group={group} />
      ))}
      
      {isTyping && (
        <div className="flex items-end gap-2">
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
          <div className="flex h-[38px] w-14 items-center justify-center rounded-2xl rounded-bl-sm bg-white border border-gray-100 shadow-sm">
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

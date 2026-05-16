import { X } from "lucide-react";
import { chatConfig } from "@/lib/chat/chatConfig";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white overflow-hidden">
          {/* Avatar SVG fallback if image not configured or fails */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"></path>
            <rect x="4" y="8" width="16" height="12" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{chatConfig.botName}</h3>
          <p className="text-xs text-gray-500">Typically replies instantly</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-label="Close chat"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

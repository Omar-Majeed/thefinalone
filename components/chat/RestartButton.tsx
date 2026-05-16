import { RotateCcw } from "lucide-react";

interface RestartButtonProps {
  onRestart: () => void;
}

export default function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <div className="mt-3 flex w-full justify-center">
      <button
        data-testid="chat-restart-conversation"
        onClick={onRestart}
        className="flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-sm px-2 py-1"
        aria-label="Restart conversation"
      >
        <RotateCcw className="h-3 w-3" />
        <span>Restart conversation</span>
      </button>
    </div>
  );
}

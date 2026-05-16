import { motion } from "framer-motion";

interface ChatOptionsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2 pb-3">
      {options.map((option, idx) => (
        <motion.button
          key={option}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: idx * 0.1 }}
          onClick={() => onSelect(option)}
          className="rounded-full border border-primary-500 bg-white px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          aria-label={`Select option: ${option}`}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}

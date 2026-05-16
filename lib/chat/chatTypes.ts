export type ChatState =
  | "WELCOME"
  | "CHOICE"
  | "SERVICES"
  | "GENERAL_INFO"
  | "ASK_NAME"
  | "ASK_EMAIL"
  | "ASK_COMPANY"
  | "ASK_PHONE"
  | "COMPLETE";

export type MessageSender = "bot" | "user" | "system";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string | React.ReactNode;
  options?: string[];
  timestamp: number;
}

export interface ChatMessageGroup {
  id: string;
  sender: MessageSender;
  messages: ChatMessage[];
}

export type ChatAction =
  | { type: "SELECT_OPTION"; value: string }
  | { type: "SUBMIT_TEXT"; value: string }
  | { type: "RESTART" };

export interface UserData {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
}

export interface MachineState {
  currentState: ChatState;
  userData: Partial<UserData>;
}

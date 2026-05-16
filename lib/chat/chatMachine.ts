import { ChatAction, ChatState, MachineState, ChatMessage } from "./chatTypes";
import { chatConfig } from "./chatConfig";

export const INITIAL_STATE: MachineState = {
  currentState: "WELCOME",
  userData: {},
};

export function getInitialMessages(): Omit<ChatMessage, "id" | "timestamp">[] {
  return [
    { sender: "bot", text: "Welcome to Jarvis!" },
    {
      sender: "bot",
      text: "Are you interested in specific technology services or looking for general information?",
      options: ["Exploring Services", "General Information"],
    },
  ];
}

export function processChatAction(
  state: MachineState,
  action: ChatAction
): { nextState: MachineState; newMessages: Omit<ChatMessage, "id" | "timestamp">[] } {
  if (action.type === "RESTART") {
    return {
      nextState: INITIAL_STATE,
      newMessages: [
        { sender: "system", text: "Conversation restarted" },
        ...getInitialMessages(),
      ],
    };
  }

  const { currentState, userData } = state;
  const newMessages: Omit<ChatMessage, "id" | "timestamp">[] = [];
  const nextUserData = { ...userData };
  let nextState: ChatState = currentState;

  if (action.type === "SELECT_OPTION") {
    const value = action.value;
    newMessages.push({ sender: "user", text: value });

    switch (currentState) {
      case "WELCOME":
        if (value === "Exploring Services") {
          nextState = "SERVICES";
          newMessages.push({
            sender: "bot",
            text: "Great! Which area interests you the most?",
            options: [
              "AI Integration",
              "Backend & API",
              "Digital Marketing",
              "Mobile App",
              "SEO Services",
              "UI/UX Design",
              "Web Development",
              "Web Scraping",
              "Other"
            ],
          });
        } else if (value === "General Information") {
          nextState = "GENERAL_INFO";
          newMessages.push({
            sender: "bot",
            text: "Please choose below:",
            options: ["Learn about us"],
          });
        }
        break;

      case "SERVICES":
        nextUserData.interest = value;
        nextState = "ASK_NAME";
        newMessages.push({ sender: "bot", text: "Could I have your name?" });
        break;

      case "GENERAL_INFO":
        nextUserData.interest = value;
        nextState = "ASK_NAME";
        newMessages.push({ sender: "bot", text: "Could I have your name?" });
        break;
    }
  } else if (action.type === "SUBMIT_TEXT") {
    const text = action.value.trim();
    if (!text) return { nextState: state, newMessages: [] };

    newMessages.push({ sender: "user", text });

    switch (currentState) {
      case "ASK_NAME":
        nextUserData.name = text;
        if (userData.interest === "Learn about us") {
          nextState = "ASK_EMAIL";
          newMessages.push({ sender: "bot", text: "May I have your email address?" });
        } else {
          nextState = "ASK_COMPANY";
          newMessages.push({ sender: "bot", text: "What's your company's name?" });
        }
        break;

      case "ASK_COMPANY":
        nextUserData.company = text;
        nextState = "ASK_EMAIL";
        newMessages.push({ sender: "bot", text: "May I have your email address?" });
        break;

      case "ASK_EMAIL":
        nextUserData.email = text;
        if (userData.interest === "Learn about us") {
          nextState = "COMPLETE";
          newMessages.push({
            sender: "bot",
            text: `You can learn more on our <a href="${chatConfig.aboutLink}" class="text-primary-600 underline">About page</a>. ${chatConfig.companyDescription}`,
          });
          newMessages.push({
            sender: "bot",
            text: `If you have any further questions, please contact us at <a href="mailto:${chatConfig.companyEmail}" class="text-primary-600 underline">${chatConfig.companyEmail}</a>`,
          });
        } else {
          nextState = "ASK_PHONE";
          newMessages.push({
            sender: "bot",
            text: "Could you give us your phone number for more personalized assistance?",
          });
        }
        break;

      case "ASK_PHONE":
        nextUserData.phone = text;
        nextState = "COMPLETE";
        newMessages.push({
          sender: "bot",
          text: `Thank you! One of our representatives will reach out to you shortly.\nContact: <a href="mailto:${chatConfig.companyEmail}" class="text-primary-600 underline">${chatConfig.companyEmail}</a>`,
        });
        break;
    }
  }

  return {
    nextState: { currentState: nextState, userData: nextUserData },
    newMessages,
  };
}

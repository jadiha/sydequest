export type QuestCategory = "adventure" | "food" | "social" | "learning" | "wild";

export interface Quest {
  id: string;
  title: string;
  emoji: string;
  completed: boolean;
  completedAt?: string;
  category: QuestCategory;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  addedBy: string;
  interestedFriendIds: string[];
  createdAt: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface WorkDay {
  hoursWorked: number;
  dailyGoal: number;
  questWindowLabel: string;
  questWindowReady: boolean;
}

// Style slot assigned per quest index — funky but cohesive
export const QUEST_STYLES = [
  { color: "#e05a82", size: "27px", weight: 700, italic: false },  // rose, big bold kalam
  { color: "#7b5ea7", size: "21px", weight: 400, italic: false },  // violet, normal caveat
  { color: "#3a8c7a", size: "25px", weight: 700, italic: true  },  // teal, big italic kalam
  { color: "#d97706", size: "19px", weight: 700, italic: false },  // amber, medium bold
  { color: "#3b6cb8", size: "23px", weight: 400, italic: false },  // cobalt, medium normal
  { color: "#5a8a5a", size: "28px", weight: 700, italic: false },  // sage, large bold
  { color: "#c0394a", size: "20px", weight: 400, italic: true  },  // crimson, italic
  { color: "#6b5b2e", size: "22px", weight: 700, italic: false },  // brown, medium bold
] as const;

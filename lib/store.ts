"use client";
import { createContext, useContext } from "react";
import type { Quest, Friend, WorkDay } from "./types";

export interface StoreState {
  quests: Quest[];
  friends: Friend[];
  workDay: WorkDay;
  userName: string;
  addQuest: (q: Omit<Quest, "id" | "createdAt" | "completed" | "interestedFriendIds">) => void;
  toggleComplete: (id: string) => void;
  toggleInterest: (questId: string, friendId: string) => void;
  deleteQuest: (id: string) => void;
}

export const StoreContext = createContext<StoreState | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

// ── Seed data ──────────────────────────────────────────────
export const SEED_QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Dress up as grannies and go bowling",
    emoji: "👵",
    completed: false,
    category: "wild",
    difficulty: "medium",
    addedBy: "jadiha",
    interestedFriendIds: ["f1", "f2", "f3"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "q2",
    title: "Visit the grad house + snacks",
    emoji: "",
    completed: false,
    category: "adventure",
    difficulty: "easy",
    addedBy: "jadiha",
    interestedFriendIds: ["f1", "f2"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "q3",
    title: "Bike to St. Jacobs Market",
    emoji: "🚲",
    completed: false,
    category: "adventure",
    difficulty: "easy",
    addedBy: "jadiha",
    interestedFriendIds: ["f2"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "q4",
    title: "Go to the movies in PJ's",
    emoji: "🎬",
    completed: false,
    category: "wild",
    difficulty: "easy",
    addedBy: "jadiha",
    interestedFriendIds: ["f1", "f3"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "q5",
    title: "Host a Tonka Jahari pizza party",
    emoji: "🍕",
    completed: false,
    category: "wild",
    difficulty: "easy",
    addedBy: "jadiha",
    interestedFriendIds: ["f1", "f2", "f3"],
    createdAt: new Date().toISOString(),
  },
];

export const SEED_FRIENDS: Friend[] = [
  { id: "f1", name: "priya", avatar: "🌸", color: "#ffd6e8" },
  { id: "f2", name: "sara",  avatar: "🌊", color: "#d6e8ff" },
  { id: "f3", name: "alex",  avatar: "🌿", color: "#e0f5e0" },
];

export const SEED_WORKDAY: WorkDay = {
  hoursWorked: 5.5,
  dailyGoal: 8,
  questWindowLabel: "4:00 PM",
  questWindowReady: false,
};

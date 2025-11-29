export type Tag = 
  | "Wheelchair User" 
  | "Upper Body" 
  | "Strength" 
  | "Arm Strength" 
  | "Back" 
  | "Posture" 
  | "Core" 
  | "Hemiplegia" 
  | "Stroke Recovery" 
  | "Grip" 
  | "Balance" 
  | "Lower Body" 
  | "Bed-Bound" 
  | "Chronic Fatigue" 
  | "Recovery" 
  | "Sensory Sensitivity" 
  | "Autism/ADHD" 
  | "Legs" 
  | "Anxiety" 
  | "Mobility" 
  | "Cardio" 
  | "Stress Relief" 
  | "Coordination" 
  | "Fun"
  | "General Fitness"
  | "Mental Health";

export interface Exercise {
  id: string;
  title: string;
  cat: string;
  tags: Tag[];
  mins: number;
  cal: number;
  ins: string[];
}

export interface Recipe {
  id: string;
  title: string;
  price: number;
  img: string;
  desc: string;
  ing: string[];
}

export interface UserProfile {
  name: string;
  disabilities: Tag[];
  goal: string;
  exp: "Beginner" | "Intermediate" | "Advanced";
}

export interface HistoryEntry {
  date: string;
  minutes: number;
}

export interface AppState {
  user: UserProfile | null;
  streak: number;
  hydration: number; // cups
  history: HistoryEntry[];
  inventory: string[]; // Recipe IDs
  shoppingList: string[];
  highContrast: boolean;
}
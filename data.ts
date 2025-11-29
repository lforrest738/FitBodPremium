import { Exercise, Recipe } from './types';

export const EXERCISES: Exercise[] = [
  // --- SEATED STRENGTH ---
  { id: "ssp", title: "Seated Shoulder Press", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Strength"], mins: 5, cal: 45, ins: ["Sit upright, core engaged.", "Press weights overhead.", "Lower with control to ear level."] },
  { id: "sbc", title: "Seated Bicep Curls", cat: "Strength", tags: ["Wheelchair User", "Upper Body", "Arm Strength"], mins: 5, cal: 35, ins: ["Hold weights at sides.", "Curl upwards, squeezing biceps.", "Lower slowly."] },
  { id: "srb", title: "Resistance Band Rows", cat: "Strength", tags: ["Wheelchair User", "Back", "Posture"], mins: 5, cal: 50, ins: ["Loop band around a sturdy point.", "Pull elbows back.", "Squeeze shoulder blades together."] },
  { id: "wc_crunch", title: "Seated Crunches", cat: "Core", tags: ["Wheelchair User", "Core"], mins: 5, cal: 30, ins: ["Lock wheelchair brakes.", "Cross arms over chest.", "Crunch forward towards knees.", "Return upright."] },
  
  // --- REHAB & NEURO ---
  { id: "uni_grip", title: "Unilateral Grip Squeeze", cat: "Rehab", tags: ["Hemiplegia", "Stroke Recovery", "Grip"], mins: 3, cal: 15, ins: ["Use a stress ball or towel.", "Squeeze firmly with affected hand.", "Hold for 5s, release."] },
  { id: "wt_shift", title: "Supported Weight Shifts", cat: "Balance", tags: ["Stroke Recovery", "Balance", "Lower Body"], mins: 5, cal: 25, ins: ["Stand holding a counter.", "Shift weight slowly to left leg.", "Hold 3s.", "Shift to right leg."] },
  
  // --- BED / CHRONIC FATIGUE ---
  { id: "bed_pump", title: "Supine Ankle Pumps", cat: "Mobility", tags: ["Bed-Bound", "Chronic Fatigue", "Recovery"], mins: 3, cal: 10, ins: ["Lie on back, legs straight.", "Point toes down.", "Pull toes up towards shins.", "Repeat rhythmically."] },
  { id: "bed_angel", title: "Bed Angels", cat: "Mobility", tags: ["Bed-Bound", "Chronic Fatigue", "Upper Body"], mins: 5, cal: 20, ins: ["Lie flat.", "Slide arms out and up like a snow angel.", "Return arms to sides."] },
  
  // --- SENSORY FRIENDLY ---
  { id: "wall_sit", title: "Quiet Wall Sit", cat: "Strength", tags: ["Sensory Sensitivity", "Autism/ADHD", "Legs"], mins: 2, cal: 40, ins: ["Lean back against a wall.", "Slide down until knees are bent.", "Hold the position silently.", "Breathe deeply."] },
  { id: "tai_chi", title: "Energy Push", cat: "Mindfulness", tags: ["Sensory Sensitivity", "Anxiety", "Mobility"], mins: 5, cal: 20, ins: ["Stand or sit comfortably.", "Inhale, pulling hands to chest.", "Exhale, pushing palms slowly forward."] },
  
  // --- CARDIO ---
  { id: "box_seat", title: "Seated Shadow Boxing", cat: "Cardio", tags: ["Wheelchair User", "Cardio", "Stress Relief"], mins: 10, cal: 90, ins: ["Punch forward (Jab/Cross).", "Maintain a rhythm.", "Keep core tight."] },
  { id: "balloon", title: "Balloon Taps", cat: "Cardio", tags: ["Coordination", "Fun", "Upper Body"], mins: 10, cal: 60, ins: ["Keep a balloon in the air.", "Use hands, head, or elbows.", "Do not let it touch the floor."] }
];

export const RECIPES: Recipe[] = [
  { id: "r1", title: "Power Protein Oats", price: 0.99, img: "https://picsum.photos/400/300", desc: "Sustained energy release.", ing: ["Rolled Oats", "Protein Powder", "Chia Seeds", "Almond Milk", "Blueberries"] },
  { id: "r2", title: "Green Recovery Smoothie", price: 0.99, img: "https://picsum.photos/400/301", desc: "Anti-inflammatory blend.", ing: ["Spinach", "Frozen Banana", "Vanilla Protein", "Coconut Water"] },
  { id: "r3", title: "Quinoa Energy Bowl", price: 0.99, img: "https://picsum.photos/400/302", desc: "Complete plant protein.", ing: ["Quinoa", "Chickpeas", "Avocado", "Lemon Dressing", "Cucumber"] },
  { id: "r4", title: "Golden Lentil Stew", price: 0.99, img: "https://picsum.photos/400/303", desc: "Warm & comforting.", ing: ["Red Lentils", "Carrots", "Turmeric", "Vegetable Broth"] }
];

export const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Your pace is the best pace.",
  "Movement is medicine.",
  "Small steps, every single day.",
  "Focus on what your body can do."
];

export const SPONSORS: Record<string, { name: string; code: string; color: string }> = {
  "Protein Powder": { name: "ProteinPlus", code: "PRO20", color: "#E3F2FD" },
  "Rolled Oats": { name: "WholeGrainz", code: "OAT5", color: "#F1F8E9" }
};
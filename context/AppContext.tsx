
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AppState, UserProfile, HistoryEntry, Exercise } from '../types';
import { EXERCISES } from '../data';

interface AppContextType extends AppState {
  currentPlan: Exercise[];
  updateUser: (user: UserProfile) => void;
  toggleHighContrast: () => void;
  incrementHydration: () => void;
  addToHistory: (entry: HistoryEntry) => void;
  purchaseRecipe: (id: string, ingredients: string[]) => void;
  toggleShoppingItem: (item: string) => void;
  refreshPlan: () => void;
  upgradeToPremium: () => void;
  resetState: () => void;
}

const defaultState: AppState = {
  user: null,
  streak: 3,
  hydration: 2,
  history: [],
  inventory: [],
  shoppingList: [],
  highContrast: false,
  isPremium: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('fitbod_state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  const [currentPlan, setCurrentPlan] = useState<Exercise[]>([]);

  useEffect(() => {
    localStorage.setItem('fitbod_state', JSON.stringify(state));
  }, [state]);

  // Generate a plan based on user profile
  const generatePlan = useCallback((user: UserProfile | null): Exercise[] => {
    if (!user) return [];

    let candidates = EXERCISES.filter(ex => {
        // 1. Safety Filter (Exclusions)
        const hasExclusion = (user.disabilities.includes("Bed-Bound") && !ex.tags.includes("Bed-Bound")) ||
                             (user.disabilities.includes("Wheelchair User") && !ex.tags.includes("Wheelchair User") && !ex.tags.includes("Upper Body") && !ex.tags.includes("Cardio"));
        if (hasExclusion) return false;
        
        // 2. Inclusion Logic
        const matchesDisability = user.disabilities.some(d => ex.tags.includes(d));
        const matchesGoal = ex.tags.includes(user.goal as any) || ex.cat === user.goal;
        
        return matchesDisability || matchesGoal;
    });

    if (candidates.length === 0) candidates = EXERCISES;

    // Shuffle and pick 3-4
    return candidates.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, []);

  // Initial plan generation
  useEffect(() => {
    if (state.user && currentPlan.length === 0) {
      setCurrentPlan(generatePlan(state.user));
    }
  }, [state.user, generatePlan]);

  const refreshPlan = () => {
    setCurrentPlan(generatePlan(state.user));
  };

  const updateUser = (user: UserProfile) => {
    setState(prev => ({ ...prev, user }));
    setCurrentPlan(generatePlan(user));
  };
  
  const toggleHighContrast = () => setState(prev => ({ ...prev, highContrast: !prev.highContrast }));
  
  const incrementHydration = () => setState(prev => ({ 
    ...prev, 
    hydration: prev.hydration >= 8 ? 8 : prev.hydration + 1 
  }));

  const addToHistory = (entry: HistoryEntry) => setState(prev => ({
    ...prev,
    history: [...prev.history, entry],
    streak: prev.streak + 1
  }));

  const purchaseRecipe = (id: string, ingredients: string[]) => setState(prev => {
    const newItems = ingredients.filter(i => !prev.shoppingList.includes(i));
    return {
      ...prev,
      inventory: [...prev.inventory, id],
      shoppingList: [...prev.shoppingList, ...newItems]
    };
  });

  const toggleShoppingItem = (item: string) => {
    setState(prev => ({
      ...prev,
      shoppingList: prev.shoppingList.filter(i => i !== item)
    }));
  };

  const upgradeToPremium = () => {
    setState(prev => ({ ...prev, isPremium: true }));
  };

  const resetState = () => {
    setState(defaultState);
    setCurrentPlan([]);
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      currentPlan,
      updateUser, 
      toggleHighContrast, 
      incrementHydration, 
      addToHistory,
      purchaseRecipe,
      toggleShoppingItem,
      refreshPlan,
      upgradeToPremium,
      resetState
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

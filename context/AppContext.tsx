import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, HistoryEntry } from '../types';

interface AppContextType extends AppState {
  updateUser: (user: UserProfile) => void;
  toggleHighContrast: () => void;
  incrementHydration: () => void;
  addToHistory: (entry: HistoryEntry) => void;
  purchaseRecipe: (id: string, ingredients: string[]) => void;
  toggleShoppingItem: (item: string) => void; // For checking off items
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
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('fitbod_state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('fitbod_state', JSON.stringify(state));
  }, [state]);

  const updateUser = (user: UserProfile) => setState(prev => ({ ...prev, user }));
  
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
    // In a real app, we might have a 'checked' state object. 
    // Here we'll just remove it to simulate "done".
    setState(prev => ({
      ...prev,
      shoppingList: prev.shoppingList.filter(i => i !== item)
    }));
  };

  const resetState = () => setState(defaultState);

  return (
    <AppContext.Provider value={{ 
      ...state, 
      updateUser, 
      toggleHighContrast, 
      incrementHydration, 
      addToHistory,
      purchaseRecipe,
      toggleShoppingItem,
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
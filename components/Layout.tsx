
import React from 'react';
import { Home, Dumbbell, Utensils, BarChart2, User, Gift, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { highContrast } = useApp();

  const navItems = [
    { id: 'home', icon: <Home size={22} />, label: 'Home' },
    { id: 'workout', icon: <Dumbbell size={22} />, label: 'Train' },
    { id: 'coach', icon: <Sparkles size={22} />, label: 'Coach' }, // New AI Coach Tab
    { id: 'food', icon: <Utensils size={22} />, label: 'Food' },
    { id: 'partners', icon: <Gift size={22} />, label: 'Perks' },
    { id: 'stats', icon: <BarChart2 size={22} />, label: 'Stats' },
    { id: 'settings', icon: <User size={22} />, label: 'Profile' },
  ];

  const bgColor = highContrast ? 'bg-black' : 'bg-gray-50';
  const navColor = highContrast ? 'bg-black border-t-2 border-yellow-400' : 'bg-white/90 backdrop-blur-lg border-t border-slate-200';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <main className="max-w-md mx-auto min-h-screen p-6 relative">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 w-full z-50 ${navColor} pb-safe overflow-x-auto no-scrollbar`}>
        <div className="max-w-md mx-auto flex justify-between items-center p-3 min-w-max md:min-w-0 md:justify-around gap-4 md:gap-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  relative flex flex-col items-center gap-1 p-2 transition-all duration-300 min-w-[50px]
                  ${isActive 
                    ? (highContrast ? 'text-yellow-400 -translate-y-1' : 'text-indigo-600 -translate-y-1') 
                    : (highContrast ? 'text-gray-500' : 'text-slate-400')
                  }
                `}
              >
                {/* Active Indicator Dot (Standard Only) */}
                {!highContrast && isActive && (
                  <span className="absolute -top-1 w-1 h-1 rounded-full bg-indigo-600 mb-1" />
                )}
                {item.icon}
                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

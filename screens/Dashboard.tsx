
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, ScreenTitle, Button } from '../components/UI';
import { Droplet, Flame, Trophy, Play, RotateCw, Crown, Sparkles } from 'lucide-react';
import { QUOTES } from '../data';
import { getQuickTip } from '../utils/ai';

export const Dashboard: React.FC<{ onStartWorkout: () => void; onUpgrade: () => void }> = ({ onStartWorkout, onUpgrade }) => {
  const { user, streak, hydration, incrementHydration, highContrast, currentPlan, refreshPlan, isPremium } = useApp();
  const [dailyQuote, setDailyQuote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [loadingTip, setLoadingTip] = useState(false);

  // Determine total duration of current plan
  const totalMins = currentPlan.reduce((acc, ex) => acc + ex.mins, 0);

  const handleAiTip = async () => {
    setLoadingTip(true);
    const tip = await getQuickTip();
    if (tip) setDailyQuote(tip);
    setLoadingTip(false);
  };

  return (
    <div className="pb-24">
      <ScreenTitle title={`Hi, ${user?.name}`} subtitle="Ready to move?" />

      {/* PREMIUM BANNER */}
      {!isPremium && (
          <div onClick={onUpgrade} className={`cursor-pointer mb-8 p-4 rounded-2xl flex items-center justify-between ${highContrast ? 'bg-black text-yellow-400 border-4 border-black' : 'bg-gradient-to-r from-indigo-900 to-indigo-800 text-white shadow-lg'}`}>
              <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg"><Crown size={20}/></div>
                  <div>
                      <h4 className="font-bold text-sm">FitBod Premium</h4>
                      <p className="text-xs opacity-80">Unlock Pro Stats & Partners</p>
                  </div>
              </div>
              <span className="text-xs font-bold bg-white text-indigo-900 px-3 py-1 rounded-full">UPGRADE</span>
          </div>
      )}

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Streak Card */}
        <Card className="flex flex-col justify-between aspect-square">
           <div className={`p-3 w-fit rounded-full mb-2 ${highContrast ? 'bg-yellow-400 text-black' : 'bg-orange-100 text-orange-600'}`}>
             <Flame size={24} />
           </div>
           <div>
             <span className="text-4xl font-bold block">{streak}</span>
             <span className="text-sm font-medium opacity-70">Day Streak</span>
           </div>
        </Card>

        {/* Hydration Card */}
        <Card 
            className="relative overflow-hidden cursor-pointer active:scale-95 transition-transform" 
            onClick={incrementHydration}
        >
            {/* Liquid Fill Animation Background (CSS trick) */}
            {!highContrast && (
                <div 
                    className="absolute bottom-0 left-0 w-full bg-blue-100 transition-all duration-700 ease-out" 
                    style={{ height: `${(hydration / 8) * 100}%` }} 
                />
            )}
            
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`p-3 w-fit rounded-full mb-2 ${highContrast ? 'bg-white text-black' : 'bg-blue-50 text-blue-600'}`}>
                    <Droplet size={24} />
                </div>
                <div>
                    <span className={`text-4xl font-bold block ${highContrast ? 'text-white' : 'text-slate-900'}`}>
                      {hydration}<span className={`text-lg ${highContrast ? 'text-gray-300' : 'text-slate-400'}`}>/8</span>
                    </span>
                    <span className={`text-sm font-medium opacity-70 ${highContrast ? 'text-gray-300' : 'text-slate-600'}`}>Cups Water</span>
                </div>
            </div>
            {highContrast && (
                <div className="absolute bottom-0 left-0 h-2 bg-yellow-400 transition-all" style={{ width: `${(hydration / 8) * 100}%` }} />
            )}
        </Card>
      </div>

      {/* Daily Insight with AI Refresh */}
      <Card className={`mb-6 relative ${highContrast ? 'bg-black text-white border-4 border-yellow-400' : 'bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-none'}`}>
        <div className="flex items-start gap-4">
          <Trophy className={`shrink-0 mt-1 ${highContrast ? 'text-yellow-400' : 'text-yellow-300'}`} />
          <div>
            <h3 className={`font-bold text-lg mb-1 ${highContrast ? 'text-yellow-400' : 'text-white'}`}>Daily Insight</h3>
            <p className={`${highContrast ? 'text-white' : 'text-indigo-100'} leading-relaxed italic pr-6`}>"{dailyQuote}"</p>
          </div>
        </div>
        <button 
          onClick={handleAiTip}
          disabled={loadingTip}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${highContrast ? 'hover:bg-gray-800' : 'hover:bg-white/10'}`}
        >
          <Sparkles size={18} className={loadingTip ? "animate-spin" : ""} />
        </button>
      </Card>

      {/* Start Workout Action */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className={`font-bold text-xl ${highContrast ? 'text-black bg-yellow-400 px-2' : 'text-slate-800'}`}>Today's Plan</h3>
            <button 
                onClick={refreshPlan}
                className={`p-2 rounded-full flex items-center gap-2 text-xs font-bold transition-colors ${highContrast ? 'bg-black text-yellow-400 hover:bg-gray-800 ring-2 ring-black' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
            >
                <RotateCw size={14} /> Shuffle
            </button>
        </div>
        
        <Card className="flex items-center justify-between group cursor-pointer" onClick={onStartWorkout}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${highContrast ? 'bg-black text-yellow-400' : 'bg-green-100 text-green-600'}`}>
                    <Play fill="currentColor" size={20} className="ml-1" />
                </div>
                <div>
                    <h4 className="font-bold text-lg">Daily Adaptive Mix</h4>
                    <p className="text-sm opacity-70">{totalMins} min • {currentPlan.length} Exercises</p>
                </div>
            </div>
            {!highContrast && (
                 <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    →
                 </div>
            )}
        </Card>

        {/* Workout Preview List */}
        <div className="space-y-2">
            {currentPlan.map((ex, i) => (
                <div key={ex.id} className={`flex items-center gap-3 p-3 rounded-xl border ${highContrast ? 'bg-white border-black ring-2 ring-black' : 'bg-white border-slate-100'}`}>
                     <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${highContrast ? 'bg-black text-white' : 'bg-slate-100 text-slate-500'}`}>{i + 1}</span>
                     <div className="flex-1">
                         <p className="font-bold text-sm text-slate-900">{ex.title}</p>
                         <p className="text-xs opacity-60 text-slate-600">{ex.cat}</p>
                     </div>
                     <span className="text-xs font-bold opacity-50 text-slate-800">{ex.mins}m</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

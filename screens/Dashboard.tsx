import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, ScreenTitle, Button } from '../components/UI';
import { Droplet, Flame, Trophy, Play } from 'lucide-react';
import { QUOTES } from '../data';

export const Dashboard: React.FC<{ onStartWorkout: () => void }> = ({ onStartWorkout }) => {
  const { user, streak, hydration, incrementHydration, highContrast } = useApp();
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="pb-24">
      <ScreenTitle title={`Hi, ${user?.name}`} subtitle="Ready to move?" />

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
                    <span className="text-4xl font-bold block">{hydration}<span className="text-lg text-slate-400">/8</span></span>
                    <span className="text-sm font-medium opacity-70">Cups Water</span>
                </div>
            </div>
            {highContrast && (
                <div className="absolute bottom-0 left-0 h-2 bg-yellow-400 transition-all" style={{ width: `${(hydration / 8) * 100}%` }} />
            )}
        </Card>
      </div>

      {/* Daily Insight */}
      <Card className="mb-6 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white border-none">
        <div className="flex items-start gap-4">
          <Trophy className="shrink-0 mt-1 text-yellow-300" />
          <div>
            <h3 className="font-bold text-lg mb-1">Daily Insight</h3>
            <p className="text-indigo-100 leading-relaxed italic">"{quote}"</p>
          </div>
        </div>
      </Card>

      {/* Start Workout Action */}
      <div className="space-y-4">
        <h3 className={`font-bold text-xl ${highContrast ? 'text-black uppercase' : 'text-slate-800'}`}>Today's Plan</h3>
        <Card className="flex items-center justify-between group cursor-pointer" onClick={onStartWorkout}>
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${highContrast ? 'bg-black text-yellow-400' : 'bg-green-100 text-green-600'}`}>
                    <Play fill="currentColor" size={20} className="ml-1" />
                </div>
                <div>
                    <h4 className="font-bold text-lg">Daily Adaptive Mix</h4>
                    <p className="text-sm opacity-70">15 min • {user?.disabilities[0]}</p>
                </div>
            </div>
            {!highContrast && (
                 <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    →
                 </div>
            )}
        </Card>
      </div>
    </div>
  );
};
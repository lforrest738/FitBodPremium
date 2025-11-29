
import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenTitle, Card, Button } from '../components/UI';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Lock, Crown } from 'lucide-react';

export const Stats: React.FC<{ onUpgrade: () => void }> = ({ onUpgrade }) => {
  const { history, highContrast, isPremium } = useApp();

  // 1. DATA PREP FOR CHARTS
  const activityData = useMemo(() => {
     if (history.length === 0) return Array.from({length: 7}, (_, i) => ({ date: `Day ${i+1}`, minutes: 0 }));
     return history.slice(-7); // Last 7 entries
  }, [history]);

  // 2. RADAR DATA (Spider Web) - Aggregating categories
  const radarData = useMemo(() => {
    const counts = { Strength: 0, Cardio: 0, Mobility: 0, Mind: 0, Rehab: 0 };
    history.forEach(h => {
        h.categories.forEach(c => {
            if (c === 'Strength') counts.Strength += 1;
            else if (c === 'Cardio') counts.Cardio += 1;
            else if (c === 'Mobility' || c === 'Balance') counts.Mobility += 1;
            else if (c === 'Mindfulness') counts.Mind += 1;
            else if (c === 'Rehab') counts.Rehab += 1;
        });
    });
    
    // If no data, provide baseline for chart shape
    if (history.length === 0) return [
        { subject: 'Strength', A: 40, fullMark: 150 },
        { subject: 'Cardio', A: 60, fullMark: 150 },
        { subject: 'Mobility', A: 30, fullMark: 150 },
        { subject: 'Mind', A: 50, fullMark: 150 },
        { subject: 'Rehab', A: 40, fullMark: 150 },
    ];

    return Object.keys(counts).map(key => ({
        subject: key,
        A: (counts[key as keyof typeof counts] || 1) * 10 + 20, // Scale for visual
        fullMark: 150
    }));
  }, [history]);

  // 3. GAMIFICATION LEVEL
  const totalMinutes = history.reduce((acc, curr) => acc + curr.minutes, 0);
  const level = Math.floor(totalMinutes / 60) + 1;
  const nextLevel = (level * 60);
  const progress = ((totalMinutes % 60) / 60) * 100;

  // VISUAL STYLES
  const chartColor = highContrast ? '#FFD700' : '#4F46E5';
  const gridColor = highContrast ? '#333' : '#e2e8f0';
  const textColor = highContrast ? '#000' : '#64748b';

  return (
    <div className="pb-24">
      <ScreenTitle title="Performance" subtitle="Infographics & Trends" />
      
      {/* LEVEL CARD */}
      <Card className="mb-6 relative overflow-hidden">
         <div className="flex justify-between items-end mb-2 relative z-10">
             <div>
                 <span className={`text-xs font-bold uppercase ${highContrast ? 'text-yellow-400' : 'text-indigo-500'}`}>Current Rank</span>
                 <h2 className="text-4xl font-black">Lvl {level}</h2>
             </div>
             <div className="text-right">
                 <span className="text-xs font-bold opacity-60">{totalMinutes} / {nextLevel} min</span>
             </div>
         </div>
         {/* Progress Bar */}
         <div className={`w-full h-3 rounded-full mt-2 ${highContrast ? 'bg-gray-800' : 'bg-slate-100'}`}>
             <div 
                className={`h-full rounded-full transition-all duration-1000 ${highContrast ? 'bg-yellow-400' : 'bg-indigo-500'}`} 
                style={{ width: `${progress}%` }} 
             />
         </div>
      </Card>

      {/* RADAR CHART (PREMIUM) */}
      <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-bold text-lg ${highContrast ? 'text-black' : 'text-slate-800'}`}>Fitness Balance</h3>
            {!isPremium && <Lock size={16} className="text-slate-400" />}
          </div>
          
          <div className={`h-64 relative rounded-3xl ${highContrast ? 'bg-white border-4 border-black' : 'bg-white shadow-lg'}`}>
              {!isPremium && (
                  <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/30 flex flex-col items-center justify-center rounded-3xl">
                      <Crown size={40} className="text-indigo-600 mb-2" />
                      <p className="font-bold text-slate-800">Premium Feature</p>
                      <Button variant="secondary" className="mt-2 scale-75" onClick={onUpgrade}>Unlock Visuals</Button>
                  </div>
              )}
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke={gridColor} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: highContrast ? '#000' : '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="My Stats"
                        dataKey="A"
                        stroke={highContrast ? '#000' : '#4F46E5'}
                        fill={highContrast ? '#FFD700' : '#818cf8'}
                        fillOpacity={0.6}
                    />
                </RadarChart>
              </ResponsiveContainer>
          </div>
      </div>

      {/* ACTIVITY TREND (AREA CHART) */}
      <div className="mb-6">
        <h3 className={`font-bold text-lg mb-4 ${highContrast ? 'text-black' : 'text-slate-800'}`}>Activity Trend</h3>
        <div className={`h-60 w-full p-4 rounded-3xl ${highContrast ? 'bg-black border-4 border-white' : 'bg-white shadow-xl'}`}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                    <defs>
                        <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="date" 
                        tick={{fill: highContrast ? '#fff' : '#64748b', fontSize: 10}} 
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', backgroundColor: highContrast ? '#000' : '#fff', color: highContrast ? '#FFD700' : '#000' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="minutes" 
                        stroke={chartColor} 
                        fillOpacity={1} 
                        fill="url(#colorMin)" 
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

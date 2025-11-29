import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenTitle } from '../components/UI';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const Stats: React.FC = () => {
  const { history, highContrast } = useApp();

  // Process data or use dummy data if empty
  const data = history.length > 0 ? history : Array.from({ length: 7 }, (_, i) => ({
      date: `Day ${i + 1}`,
      minutes: Math.floor(Math.random() * 45) + 5
  }));

  const barColor = highContrast ? '#FFD700' : '#4F46E5';
  const bgColor = highContrast ? '#000000' : '#ffffff';
  const textColor = highContrast ? '#ffffff' : '#1e293b';

  return (
    <div className="pb-24">
      <ScreenTitle title="Progress" subtitle="Your activity log." />
      
      <div className={`h-80 w-full p-4 rounded-3xl mb-8 ${highContrast ? 'bg-black border-4 border-white' : 'bg-white shadow-xl'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis 
                    dataKey="date" 
                    tick={{fill: textColor, fontSize: 12}} 
                    tickLine={false} 
                    axisLine={false} 
                />
                <Tooltip 
                    contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        backgroundColor: highContrast ? '#fff' : '#fff',
                        color: '#000'
                    }} 
                />
                <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColor} />
                    ))}
                </Bar>
            </BarChart>
          </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className={`p-6 rounded-3xl ${highContrast ? 'bg-white text-black' : 'bg-indigo-50 text-indigo-900'}`}>
              <span className="block text-4xl font-bold mb-1">{history.length}</span>
              <span className="text-sm font-medium opacity-70">Total Workouts</span>
          </div>
          <div className={`p-6 rounded-3xl ${highContrast ? 'bg-yellow-400 text-black' : 'bg-green-50 text-green-900'}`}>
              <span className="block text-4xl font-bold mb-1">{history.reduce((a,b) => a + b.minutes, 0)}</span>
              <span className="text-sm font-medium opacity-70">Minutes Active</span>
          </div>
      </div>
    </div>
  );
};
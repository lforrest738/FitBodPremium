import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Card, ScreenTitle } from '../components/UI';
import { EXERCISES } from '../data';
import { Exercise } from '../types';
import { ArrowRight, CheckCircle, Volume2 } from 'lucide-react';

export const Workout: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { user, highContrast, addToHistory } = useApp();
  const [plan, setPlan] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Logic from original Python script to filter exercises
    if (!user) return;
    
    let candidates = EXERCISES.filter(ex => {
        const hasExclusion = (user.disabilities.includes("Bed-Bound") && !ex.tags.includes("Bed-Bound")) ||
                             (user.disabilities.includes("Wheelchair User") && !["Wheelchair User", "Upper Body", "Cardio"].some(t => ex.tags.includes(t as any)));
        if (hasExclusion) return false;
        
        // Scoring (Simplified inclusion for now)
        return user.disabilities.some(d => ex.tags.includes(d)) || ex.tags.includes(user.goal as any);
    });

    // Fallback if strict filtering leaves nothing
    if (candidates.length === 0) candidates = EXERCISES;

    // Shuffle and pick 3
    setPlan(candidates.sort(() => 0.5 - Math.random()).slice(0, 3));
  }, [user]);

  const handleNext = () => {
    if (currentIndex < plan.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      addToHistory({
        date: new Date().toISOString().split('T')[0],
        minutes: plan.reduce((acc, curr) => acc + curr.mins, 0)
      });
    }
  };

  const currentExercise = plan[currentIndex];

  if (!currentExercise && !isCompleted) return <div>Loading personalized plan...</div>;

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6 animate-fade-in">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${highContrast ? 'bg-black text-yellow-400' : 'bg-green-100 text-green-600'}`}>
            <CheckCircle size={48} />
        </div>
        <h1 className="text-3xl font-bold">Workout Complete!</h1>
        <p className="opacity-70 max-w-xs mx-auto">Great job. Your personalized stats have been updated.</p>
        <Button onClick={onComplete}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-6">
        <ScreenTitle title="Workout" subtitle={`Exercise ${currentIndex + 1} of ${plan.length}`} />
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${highContrast ? 'bg-black text-white' : 'bg-slate-200 text-slate-600'}`}>
            {currentExercise.mins} MIN
        </span>
      </div>

      <Card className="min-h-[400px] flex flex-col relative overflow-hidden">
         {/* Progress Bar */}
         <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
            <div 
                className={`h-full transition-all duration-300 ${highContrast ? 'bg-black' : 'bg-indigo-600'}`} 
                style={{ width: `${((currentIndex + 1) / plan.length) * 100}%` }} 
            />
         </div>

         <div className="mt-6 flex-1">
             <div className="flex justify-between items-start mb-4">
                 <span className={`text-xs font-bold uppercase tracking-wider ${highContrast ? 'text-black' : 'text-indigo-600'}`}>
                    {currentExercise.cat}
                 </span>
                 {highContrast && <Volume2 className="cursor-pointer" size={24} />}
             </div>
             
             <h2 className="text-3xl font-bold mb-6 leading-tight">{currentExercise.title}</h2>
             
             <div className="space-y-4">
                 {currentExercise.ins.map((step, idx) => (
                     <div key={idx} className="flex gap-4">
                         <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${highContrast ? 'bg-black text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                             {idx + 1}
                         </div>
                         <p className="text-lg leading-relaxed opacity-90">{step}</p>
                     </div>
                 ))}
             </div>
         </div>

         <div className="mt-8 pt-6 border-t border-gray-100">
             <Button fullWidth onClick={handleNext} className="flex items-center justify-center gap-2">
                 {currentIndex === plan.length - 1 ? 'Finish' : 'Next Exercise'}
                 <ArrowRight size={20} />
             </Button>
         </div>
      </Card>
    </div>
  );
};
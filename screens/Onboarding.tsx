import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, Input, Card } from '../components/UI';
import { Tag } from '../types';
import { Check, Accessibility, Activity, Brain } from 'lucide-react';

const DISABILITY_OPTIONS: { label: string; value: Tag; icon: React.ReactNode }[] = [
  { label: "Wheelchair User", value: "Wheelchair User", icon: <Accessibility className="w-6 h-6"/> },
  { label: "Mobility Limited", value: "Lower Body", icon: <Activity className="w-6 h-6"/> },
  { label: "Hemiplegia", value: "Hemiplegia", icon: <Activity className="w-6 h-6"/> },
  { label: "Chronic Fatigue", value: "Chronic Fatigue", icon: <Brain className="w-6 h-6"/> },
  { label: "Sensory Sensitive", value: "Sensory Sensitivity", icon: <Brain className="w-6 h-6"/> },
  { label: "General Fitness", value: "General Fitness", icon: <Activity className="w-6 h-6"/> },
];

export const Onboarding: React.FC = () => {
  const { updateUser, highContrast } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedDisabilities, setSelectedDisabilities] = useState<Tag[]>([]);
  const [goal, setGoal] = useState("General");
  
  const toggleDisability = (tag: Tag) => {
    if (selectedDisabilities.includes(tag)) {
      setSelectedDisabilities(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedDisabilities(prev => [...prev, tag]);
    }
  };

  const finish = () => {
    updateUser({
      name,
      disabilities: selectedDisabilities.length > 0 ? selectedDisabilities : ["General Fitness"],
      goal,
      exp: "Beginner"
    });
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center p-6 ${highContrast ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="max-w-md mx-auto w-full">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
             <div className="text-center space-y-2">
                <span className="text-4xl">🥑</span>
                <h1 className="text-4xl font-black text-slate-900">FitBod</h1>
                <p className="text-slate-500">Fitness designed for <i className="text-indigo-600 font-serif">every</i> body.</p>
             </div>
             <Input 
                placeholder="What's your name?" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                label="Let's get started"
             />
             <Button fullWidth onClick={() => name && setStep(2)}>Next</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
             <div>
               <h2 className="text-2xl font-bold mb-2">How can we adapt?</h2>
               <p className="text-slate-500 text-sm">Select all that apply. We tailor exercises based on this.</p>
             </div>
             
             <div className="grid grid-cols-2 gap-3">
               {DISABILITY_OPTIONS.map((opt) => {
                 const isSelected = selectedDisabilities.includes(opt.value);
                 return (
                   <button
                     key={opt.value}
                     onClick={() => toggleDisability(opt.value)}
                     className={`
                        p-4 rounded-2xl flex flex-col items-center gap-3 transition-all
                        ${highContrast 
                          ? (isSelected ? 'bg-black text-yellow-400 ring-4 ring-yellow-400' : 'bg-white text-black border-4 border-black')
                          : (isSelected ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg scale-[1.02]' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300')
                        }
                     `}
                   >
                     {opt.icon}
                     <span className="text-xs font-bold">{opt.label}</span>
                     {isSelected && <div className="absolute top-2 right-2"><Check size={14}/></div>}
                   </button>
                 )
               })}
             </div>
             
             <Button fullWidth onClick={() => setStep(3)}>Next</Button>
          </div>
        )}

        {step === 3 && (
            <div className="space-y-6 animate-fade-in">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Primary Goal</h2>
                    <p className="text-slate-500 text-sm">What are you focusing on today?</p>
                </div>

                {["Mobility", "Strength", "Cardio", "Mental Health"].map(g => (
                    <Card 
                        key={g} 
                        className={`cursor-pointer transition-all flex items-center justify-between ${goal === g ? (highContrast ? 'bg-black text-yellow-400' : 'ring-2 ring-indigo-500 bg-indigo-50') : ''}`}
                        onClick={() => setGoal(g)}
                    >
                        <span className="font-bold text-lg">{g}</span>
                        {goal === g && <Check className="w-6 h-6" />}
                    </Card>
                ))}

                <Button fullWidth onClick={finish}>Start Journey</Button>
            </div>
        )}
      </div>
    </div>
  );
};
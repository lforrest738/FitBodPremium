
import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenTitle, Card, Button } from '../components/UI';
import { Crown, CheckCircle, Zap, Shield } from 'lucide-react';

export const Premium: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { upgradeToPremium, isPremium, highContrast } = useApp();

  const handleUpgrade = () => {
      upgradeToPremium();
      // In a real app, this would trigger a payment flow
  };

  const features = [
      "Unlimited Workout Shuffles",
      "Advanced Infographic Stats",
      "Exclusive 'Partners' Discounts",
      "Priority Adaptive Algorithms",
      "Ad-Free Experience"
  ];

  return (
    <div className="pb-24 min-h-screen flex flex-col">
      <div className="flex-1">
        <button onClick={onBack} className="mb-4 text-sm font-bold opacity-50">← Back</button>
        <div className="text-center mb-8">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${highContrast ? 'bg-black text-yellow-400' : 'bg-indigo-100 text-indigo-600'}`}>
                <Crown size={40} />
            </div>
            <h1 className="text-4xl font-black mb-2">FitBod PRO</h1>
            <p className="opacity-60">Unlock your full potential.</p>
        </div>

        <div className="space-y-4 mb-8">
            {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm">
                    <div className="p-1 bg-green-100 text-green-600 rounded-full"><CheckCircle size={16}/></div>
                    <span className="font-bold text-slate-700">{f}</span>
                </div>
            ))}
        </div>
      </div>

      <div className={`p-6 rounded-t-3xl ${highContrast ? 'bg-black border-t-4 border-yellow-400' : 'bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)]'}`}>
         {isPremium ? (
             <div className="text-center">
                 <h3 className={`text-xl font-bold mb-2 ${highContrast ? 'text-yellow-400' : 'text-slate-900'}`}>You are a PRO Member</h3>
                 <p className="opacity-60 mb-4">Thank you for supporting inclusive fitness.</p>
                 <Button fullWidth onClick={onBack}>Return Home</Button>
             </div>
         ) : (
             <>
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className={`text-sm font-bold decoration-line-through opacity-50 block ${highContrast ? 'text-white' : ''}`}>£9.99</span>
                        <span className={`text-3xl font-black ${highContrast ? 'text-yellow-400' : 'text-indigo-600'}`}>£4.99<span className="text-lg text-slate-500 font-medium">/mo</span></span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">50% OFF</span>
                    </div>
                </div>
                <Button fullWidth onClick={handleUpgrade}>Upgrade Now</Button>
                <p className="text-center text-xs opacity-50 mt-4">Cancel anytime. Secure payment processing.</p>
             </>
         )}
      </div>
    </div>
  );
};

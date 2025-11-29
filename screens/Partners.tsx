// Force Git Update

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenTitle, Card, Button } from '../components/UI';
import { PARTNERS } from '../data';
import { Copy, Check, ExternalLink } from 'lucide-react';

export const Partners: React.FC = () => {
  const { highContrast } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pb-24">
      <ScreenTitle title="Partners Hub" subtitle="Exclusive Member Perks" />
      
      <div className="grid gap-6">
        {PARTNERS.map(partner => (
            <div key={partner.id} className={`relative overflow-hidden rounded-3xl ${highContrast ? 'bg-white border-4 border-black' : 'bg-white shadow-xl'}`}>
                {/* Brand Header */}
                <div className="h-24 relative" style={{ backgroundColor: highContrast ? '#000' : partner.color }}>
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-2xl shadow-lg">
                        {partner.logo}
                    </div>
                    {!highContrast && <div className="absolute inset-0 bg-white/10" />}
                </div>

                {/* Content */}
                <div className="p-6 pt-8">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-xl">{partner.company}</h3>
                            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 uppercase">{partner.category}</span>
                        </div>
                    </div>
                    
                    <p className={`text-lg font-medium mb-6 ${highContrast ? 'text-black' : 'text-slate-600'}`}>
                        {partner.offer}
                    </p>

                    <div className={`p-4 rounded-xl flex items-center justify-between ${highContrast ? 'bg-black text-white' : 'bg-slate-50 border border-slate-200'}`}>
                        <div className="font-mono text-lg tracking-widest font-bold">
                            {partner.code}
                        </div>
                        <button 
                            onClick={() => handleCopy(partner.code, partner.id)}
                            className={`p-2 rounded-full transition-colors ${highContrast ? 'bg-yellow-400 text-black' : 'bg-white shadow-sm hover:text-indigo-600'}`}
                        >
                            {copiedId === partner.id ? <Check size={18}/> : <Copy size={18}/>}
                        </button>
                    </div>
                    
                    <div className="mt-4 text-center">
                        <button className="text-xs font-bold flex items-center justify-center gap-1 opacity-50 hover:opacity-100 transition-opacity mx-auto">
                            Visit Website <ExternalLink size={12}/>
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button, ScreenTitle, Card } from '../components/UI';
import { RECIPES, SPONSORS } from '../data';
import { ShoppingBag, Check, Camera, Loader2 } from 'lucide-react';
import { analyzeFoodImage, blobToBase64 } from '../utils/ai';

export const Nutrition: React.FC = () => {
  const { inventory, shoppingList, purchaseRecipe, toggleShoppingItem, highContrast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setAnalyzing(true);
      setAnalysisResult(null);

      try {
          const base64 = await blobToBase64(file);
          const result = await analyzeFoodImage(base64);
          setAnalysisResult(result);
      } catch (err) {
          setAnalysisResult("Failed to analyze image.");
      } finally {
          setAnalyzing(false);
      }
  };

  return (
    <div className="pb-24">
      <ScreenTitle title="Nutrition Market" subtitle="Adaptive recipes for recovery." />

      {/* AI FOOD SCANNER */}
      <Card className="mb-8 border-dashed border-2 !bg-transparent flex flex-col items-center justify-center p-6 text-center">
          <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageUpload}
          />
          
          {analyzing ? (
              <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-indigo-600" size={32} />
                  <p className="text-sm font-bold">Analyzing food...</p>
              </div>
          ) : analysisResult ? (
              <div className="w-full text-left">
                  <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold flex items-center gap-2"><Camera size={16}/> Analysis Result</h4>
                      <button onClick={() => setAnalysisResult(null)} className="text-xs underline opacity-60">Clear</button>
                  </div>
                  <div className={`p-4 rounded-xl text-sm whitespace-pre-line ${highContrast ? 'bg-black text-yellow-400' : 'bg-indigo-50 text-indigo-900'}`}>
                      {analysisResult}
                  </div>
              </div>
          ) : (
              <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer group">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${highContrast ? 'bg-black text-yellow-400' : 'bg-indigo-100 text-indigo-600'}`}>
                      <Camera size={24} />
                  </div>
                  <h4 className="font-bold">AI Food Scanner</h4>
                  <p className="text-xs opacity-60">Upload a photo to estimate calories & macros.</p>
              </div>
          )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {RECIPES.map(recipe => {
            const owned = inventory.includes(recipe.id);
            return (
                <div key={recipe.id} className={`group relative rounded-3xl overflow-hidden flex flex-col ${highContrast ? 'border-4 border-black bg-white' : 'shadow-lg bg-white'}`}>
                    <div className="h-48 overflow-hidden bg-gray-200 relative">
                        <img 
                            src={recipe.img} 
                            alt={recipe.title} 
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${highContrast ? 'grayscale contrast-125' : ''}`}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl leading-tight">{recipe.title}</h3>
                            <span className="font-bold">£{recipe.price}</span>
                        </div>
                        <p className="text-sm opacity-70 mb-4 flex-1">{recipe.desc}</p>
                        
                        <div className="mt-auto">
                          {owned ? (
                              <div className={`w-full py-3 font-bold text-center rounded-xl flex items-center justify-center gap-2 ${highContrast ? 'bg-black text-yellow-400 border-2 border-black' : 'bg-green-100 text-green-700'}`}>
                                  <Check size={18} /> Owned
                              </div>
                          ) : (
                              <Button fullWidth onClick={() => purchaseRecipe(recipe.id, recipe.ing)}>
                                  Purchase
                              </Button>
                          )}
                        </div>
                    </div>
                </div>
            )
        })}
      </div>

      <div className={`p-6 rounded-3xl ${highContrast ? 'bg-black text-white border-4 border-yellow-400' : 'bg-white shadow-xl'}`}>
          <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className={highContrast ? 'text-yellow-400' : 'text-indigo-600'} />
              <h2 className="text-2xl font-bold">Smart List</h2>
          </div>
          
          {shoppingList.length === 0 ? (
              <p className="opacity-50 text-center py-4">Your list is empty. Purchase recipes to auto-fill.</p>
          ) : (
              <ul className="space-y-3">
                  {shoppingList.map((item, idx) => {
                      const sponsor = Object.keys(SPONSORS).find(k => item.includes(k));
                      const sponsorData = sponsor ? SPONSORS[sponsor] : null;

                      return (
                        <li key={`${item}-${idx}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => toggleShoppingItem(item)}
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${highContrast ? 'border-white' : 'border-slate-300'}`}
                                >
                                    <div className="w-3 h-3 rounded-full bg-transparent hover:bg-current" />
                                </button>
                                <span className={highContrast ? 'text-white' : 'text-slate-800'}>{item}</span>
                            </div>
                            {sponsorData && (
                                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${highContrast ? 'bg-yellow-400 text-black' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {sponsorData.name}
                                </span>
                            )}
                        </li>
                      )
                  })}
              </ul>
          )}
      </div>
    </div>
  );
};

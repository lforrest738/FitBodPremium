
import React from 'react';
import { useApp } from '../context/AppContext';
import { Button, ScreenTitle } from '../components/UI';
import { RECIPES, SPONSORS } from '../data';
import { ShoppingBag, Check } from 'lucide-react';

export const Nutrition: React.FC = () => {
  const { inventory, shoppingList, purchaseRecipe, toggleShoppingItem, highContrast } = useApp();

  return (
    <div className="pb-24">
      <ScreenTitle title="Nutrition Market" subtitle="Adaptive recipes for recovery." />

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


import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Onboarding } from './screens/Onboarding';
import { Dashboard } from './screens/Dashboard';
import { Workout } from './screens/Workout';
import { Nutrition } from './screens/Nutrition';
import { Stats } from './screens/Stats';
import { Partners } from './screens/Partners';
import { Premium } from './screens/Premium';
import { ScreenTitle, Button, Card } from './components/UI';
import { Eye, RotateCcw, Crown } from 'lucide-react';

// Wrapper component to handle routing logic inside the Provider
const AppContent: React.FC = () => {
  const { user, highContrast, toggleHighContrast, resetState, isPremium } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  // MOVED UP: Hooks must be executed in the same order every render. 
  // Cannot be after the conditional return (!user).
  const [showPremium, setShowPremium] = useState(false);

  if (!user) {
    return <Onboarding />;
  }

  // Override view if user clicks "Upgrade"
  if (showPremium) {
      return <Premium onBack={() => setShowPremium(false)} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Dashboard onStartWorkout={() => setActiveTab('workout')} onUpgrade={() => setShowPremium(true)} />;
      case 'workout': return <Workout onComplete={() => setActiveTab('home')} />;
      case 'food': return <Nutrition />;
      case 'partners': return <Partners />;
      case 'stats': return <Stats onUpgrade={() => setShowPremium(true)} />;
      case 'settings': return (
        <div>
            <ScreenTitle title="Settings" subtitle="Customize your experience." />
            
            <div className="space-y-6">
                {!isPremium && (
                    <Card className="flex items-center justify-between border-2 border-indigo-100" onClick={() => setShowPremium(true)}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                                <Crown size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Upgrade to Pro</h3>
                                <p className="text-sm opacity-70">Unlock everything</p>
                            </div>
                        </div>
                        <Button className="scale-75">GO</Button>
                    </Card>
                )}

                <Card className="flex items-center justify-between" onClick={toggleHighContrast}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${highContrast ? 'bg-white text-black' : 'bg-slate-100'}`}>
                            <Eye size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">High Contrast</h3>
                            <p className="text-sm opacity-70">For visual impairments</p>
                        </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${highContrast ? 'bg-yellow-400' : 'bg-slate-200'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </Card>

                <Button variant="secondary" fullWidth onClick={resetState} className="text-red-500 border-red-100 hover:bg-red-50">
                    <RotateCcw size={18} /> Reset Profile
                </Button>
            </div>
        </div>
      );
      default: return <Dashboard onStartWorkout={() => setActiveTab('workout')} onUpgrade={() => setShowPremium(true)} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="animate-fade-in">
        {renderScreen()}
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Onboarding } from './screens/Onboarding';
import { Dashboard } from './screens/Dashboard';
import { Workout } from './screens/Workout';
import { Nutrition } from './screens/Nutrition';
import { Stats } from './screens/Stats';
import { ScreenTitle, Button, Card } from './components/UI';
import { Eye, RotateCcw } from 'lucide-react';

// Wrapper component to handle routing logic inside the Provider
const AppContent: React.FC = () => {
  const { user, highContrast, toggleHighContrast, resetState } = useApp();
  const [activeTab, setActiveTab] = useState('home');

  if (!user) {
    return <Onboarding />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Dashboard onStartWorkout={() => setActiveTab('workout')} />;
      case 'workout': return <Workout onComplete={() => setActiveTab('home')} />;
      case 'food': return <Nutrition />;
      case 'stats': return <Stats />;
      case 'settings': return (
        <div>
            <ScreenTitle title="Settings" subtitle="Customize your experience." />
            
            <div className="space-y-6">
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
      default: return <Dashboard onStartWorkout={() => setActiveTab('workout')} />;
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
import { useState } from 'react';
import { IdentityDashboard } from './pages/IdentityDashboard';
import { HighlightsHistory } from './pages/HighlightsHistory';
import { EffortBreakdownPage } from './pages/EffortBreakdownPage';
import { mockUserPaid, mockUserFree } from './mockData/userProfile';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'history' | 'effort-breakdown'>('dashboard');
  const [isPaidUser, setIsPaidUser] = useState(true);
  const user = isPaidUser ? mockUserPaid : mockUserFree;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      {/* Lifted State Toggle for demo purposses */}
      <button
        onClick={() => setIsPaidUser(!isPaidUser)}
        className="fixed top-20 right-4 z-[60] bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-50 hover:opacity-100"
      >
        Toggle {isPaidUser ? 'Free' : 'Paid'}
      </button>

      {currentView === 'dashboard' ? (
        <IdentityDashboard
          user={user}
          onNavigateHistory={() => setCurrentView('history')}
          onNavigateEffort={() => setCurrentView('effort-breakdown')}
        />
      ) : currentView === 'history' ? (
        <HighlightsHistory
          user={user}
          onBack={() => setCurrentView('dashboard')}
        />
      ) : (
        <EffortBreakdownPage
          user={user}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
    </div>
  );
}

export default App;

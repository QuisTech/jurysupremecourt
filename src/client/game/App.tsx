
import React, { useState, useMemo, useEffect } from 'react';
import CaseDisplay from './components/CaseDisplay';
import ResultsDisplay from './components/ResultsDisplay';
import CaseSubmission from './components/CaseSubmission';
import { HistoryList } from './components/HistoryList';
import { CASES } from './data/seedData';
import { getUGCForToday, getHistory } from './services/storageService';
import { DirectorOverlay } from './components/DirectorOverlay';
import { generateAiCase } from './services/caseService';
import { CaseData, HistoryItem } from './types';
import { isDevvitEnvironment } from './services/devvitBridge';

const App: React.FC = () => {
  const [view, setView] = useState<'today' | 'history' | 'submit'>('today');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const [appResetKey, setAppResetKey] = useState(0);
  const [loadingAiCase, setLoadingAiCase] = useState(false);
  const [isInitializing, setIsInitializing] = useState(isDevvitEnvironment());
  const [currentCase, setCurrentCase] = useState<CaseData>(CASES[0] || {} as CaseData);

  const today = new Date();
  const dateKey = today.toDateString();

  // Listen for Reddit Backend Sync (Daily Challenge from Redis)
  useEffect(() => {
    if (isDevvitEnvironment()) {
      const handleSync = (event: MessageEvent) => {
        if (event.data.type === 'INIT_STATE') {
          if (event.data.payload?.dailyCase) {
             setCurrentCase(event.data.payload.dailyCase);
          }
          setIsInitializing(false);
        }
      };
      
      try {
        window.addEventListener('message', handleSync);
        // Request state from Reddit Parent
        window.parent.postMessage({ type: 'GET_INIT_STATE' }, '*');
      } catch (e) {
        console.warn("Security blocked postMessage, falling back to local init", e);
        finalizeLocalInit();
      }
      
      // Safety Timeout: If Reddit doesn't respond in 3s, assume standalone/broken bridge
      const timeoutId = setTimeout(() => {
        console.warn("Devvit Init Timeout. Falling back to standalone mode.");
        finalizeLocalInit();
      }, 3000);

      return () => {
        window.removeEventListener('message', handleSync);
        clearTimeout(timeoutId);
      };
    } else {
      finalizeLocalInit();
    }
  }, [appResetKey]);

  function finalizeLocalInit() {
      // Standard local behavior
      const ugcCase = getUGCForToday();
      if (ugcCase) {
        setCurrentCase(ugcCase);
        setIsInitializing(false);
      } else {
        // Instead of a fixed daily case from CASES, fetch a fresh random one from server
        // This unlocks the full 100+ offline library and randomizes start
        // This unlocks the full 100+ offline library and randomizes start
        void fetchNewAiCase().then(() => {
             setIsInitializing(false);
        });
      }
  }

  const fetchNewAiCase = async () => {
    setLoadingAiCase(true);
    const newCase = await generateAiCase();
    if (newCase) {
      setCurrentCase(newCase);
      setView('today');
    }
    setLoadingAiCase(false);
  };

  const handleResetForDirector = () => {
    setView('today');
    localStorage.removeItem(`votes_${dateKey}_${currentCase.id}`);
    localStorage.removeItem(`user_vote_${dateKey}_${currentCase.id}`);
    setAppResetKey(prev => prev + 1);
  };

  const history = useMemo(() => getHistory(), [view, appResetKey]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#DAE0E6] flex flex-col items-center justify-center p-6 text-center">
         <div className="w-16 h-16 bg-[#FF4500] rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl animate-bounce mb-6">⚖️</div>
         <h1 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-2 italic">Connecting to High Court</h1>
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse mb-8">Synchronizing Daily Docket via Reddit Redis...</p>
         
         {/* Manual Override for stuck users */}
         <button 
           onClick={() => setIsInitializing(false)}
           className="text-[9px] font-bold text-gray-500 underline decoration-dotted hover:text-[#FF4500] cursor-pointer"
         >
           Taking too long? Enter Courtroom Manually
         </button>
      </div>
    );
  }

  return (
    <div key={appResetKey} className="min-h-screen bg-[#DAE0E6] flex flex-col items-center py-6 px-4 selection:bg-[#FF4500] selection:text-white">
      <DirectorOverlay onResetApp={handleResetForDirector} currentCase={currentCase} />

      <div className="w-full max-w-md space-y-4">
        
        {/* Branding */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF4500] rounded-xl flex items-center justify-center text-white text-xl shadow-[0_4px_0_rgb(180,50,0)] font-black italic">⚖️</div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-gray-900 italic uppercase leading-none">Reddit Jury</h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Supreme Court Live
              </p>
            </div>
          </div>
          <button 
            onClick={fetchNewAiCase}
            disabled={loadingAiCase}
            className="bg-white hover:bg-gray-50 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border-b-2 border-gray-200 active:border-b-0 active:translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {loadingAiCase ? 'Summoning...' : 'Fresh Case'} <span>✨</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex bg-white/80 backdrop-blur-md sticky top-4 z-50 rounded-2xl p-1.5 shadow-xl border border-white/20">
             <button 
                id="nav-today"
                onClick={() => { setView('today'); setSelectedHistoryItem(null); }}
                className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'today' ? 'bg-[#FF4500] text-white shadow-[0_4px_0_rgb(180,50,0)]' : 'text-gray-500 hover:bg-gray-100'}`}
             >
                Daily Court
             </button>
             <button 
                onClick={() => { setView('history'); setSelectedHistoryItem(null); }}
                className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'history' ? 'bg-[#0079D3] text-white shadow-[0_4px_0_rgb(0,80,150)]' : 'text-gray-500 hover:bg-gray-100'}`}
             >
                Archives
             </button>
             <button 
                onClick={() => { setView('submit'); setSelectedHistoryItem(null); }}
                className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'submit' ? 'bg-black text-white shadow-[0_4px_0_rgb(50,50,50)]' : 'text-gray-500 hover:bg-gray-100'}`}
             >
                New Docket
             </button>
        </div>

        {/* Main Feed */}
        <main className="min-h-[600px] pb-12">
            {view === 'today' && <CaseDisplay caseData={currentCase} dateKey={dateKey} />}
            
            {view === 'history' && !selectedHistoryItem && (
                <HistoryList 
                    history={history} 
                    onSelect={(item) => setSelectedHistoryItem(item)} 
                />
            )}
            
            {view === 'history' && selectedHistoryItem && (
                <div className="space-y-4">
                    <button 
                        onClick={() => setSelectedHistoryItem(null)}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2 mb-2 hover:text-black transition-colors"
                    >
                        ← Back to Archive
                    </button>
                    <ResultsDisplay 
                        caseData={selectedHistoryItem.caseData} 
                        results={selectedHistoryItem.results} 
                        aiAnalysis={selectedHistoryItem.aiAnalysis || null}
                        onClose={() => setSelectedHistoryItem(null)} 
                    />
                </div>
            )}

            {view === 'submit' && <CaseSubmission onBack={() => setView('today')} />}
        </main>

        <footer className="py-8 text-center space-y-2 opacity-50">
            <div className="flex items-center justify-center gap-3">
               <div className="h-px w-8 bg-gray-400"></div>
               <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Justice is Daily</p>
               <div className="h-px w-8 bg-gray-400"></div>
            </div>
        </footer>

      </div>
    </div>
  );
};

export default App;

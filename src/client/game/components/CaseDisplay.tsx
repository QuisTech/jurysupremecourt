import React, { useState, useEffect, useRef } from 'react';
import { CaseData, VoteType, UserStats, VoteCounts } from '../types';
import { EvidenceBoard } from './EvidenceBoard';
import { GavelMiniGame } from './GavelMiniGame';
import { submitVote, getUserVote, getVotesForCase, getUserStats, saveToHistory, updateHistoryWithAi } from '../services/storageService';
import { generateCaseBriefing } from '../services/videoService';
import ResultsDisplay from './ResultsDisplay';


interface CaseDisplayProps {
  caseData: CaseData;
  dateKey: string;
}

type TrialPhase = 'DISCOVERY' | 'DELIBERATION' | 'GAVEL' | 'SENTENCED';

const CaseDisplay: React.FC<CaseDisplayProps> = ({ caseData, dateKey }) => {
  const [phase, setPhase] = useState<TrialPhase>('DISCOVERY');
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);
  const [localResults, setLocalResults] = useState<VoteCounts | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  
  const [briefing, setBriefing] = useState<{image: string, audio: string, subtitles: string} | null>(null);
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const s = getUserStats();
    setStats(s);
    setBriefing(null);
    // setIsPlaying(false);
    
    const existing = getUserVote(caseData.id, dateKey);
    if (existing) {
      setPhase('SENTENCED');
    } else {
        setPhase('DISCOVERY');
    }
  }, [caseData.id, dateKey]);

  const playBriefingAudio = async (base64Audio: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    audioContextRef.current = ctx;
    try {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        const dataInt16 = new Int16Array(bytes.buffer);
        const float32Data = new Float32Array(dataInt16.length);
        for (let i = 0; i < dataInt16.length; i++) {
          const val = dataInt16[i];
          if (val !== undefined) {
             float32Data[i] = val / 32768.0;
          }
        }
        const buffer = ctx.createBuffer(1, float32Data.length, 24000);
        buffer.getChannelData(0).set(float32Data);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        // source.onended = () => setIsPlaying(false);
        source.start();
        // setIsPlaying(true);
    } catch (e) {
        // setIsPlaying(false);
    }
  };

    const generateJudicialOpinion = async (vote: VoteType, cData: CaseData) => {
    setLoadingAI(true);
    try {
        // CALLING BACKEND VIA FETCH (Bridge)
        const response = await fetch('/api/verdict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vote: vote.replace('_', ' '),
                caseTitle: cData.title
            }),
        });
        
        const data = await response.json();
        
        if (data.analysis) {
             setAiAnalysis(data.analysis);
             updateHistoryWithAi(cData.id, data.analysis);
        } else {
             setAiAnalysis("The Court is in recess. (API Error)");
        }
    } catch (error) {
        setAiAnalysis("The Court is in recess. Justice remains blind.");
    }
    setLoadingAI(false);
  };

  const handleBriefingGen = async () => {
    setLoadingBriefing(true);
    const data = await generateCaseBriefing(caseData.title, caseData.scenario);
    if (data) {
        setBriefing(data);
        void playBriefingAudio(data.audio);
    }
    setLoadingBriefing(false);
  };

  const handleVerdictSelection = (vote: VoteType) => {
    setSelectedVote(vote);
    setPhase('GAVEL');
  };

  const handleGavelComplete = (_score: number) => {
    if (selectedVote) {
      const updatedVotes = submitVote(caseData.id, dateKey, selectedVote);
      setLocalResults(updatedVotes);
      setStats(getUserStats());
      
      saveToHistory({
        caseData: caseData,
        userVote: selectedVote,
        timestamp: Date.now(),
        results: updatedVotes
      });

      setPhase('SENTENCED');
      void generateJudicialOpinion(selectedVote, caseData);
    }
  };

  if (!stats) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l.395.072 4 1.2A1 1 0 0116 6.538V10h2a1 1 0 110 2h-2v3.462a1 1 0 01-.605.915l-4 1.2-.395.072V18a1 1 0 11-2 0v-1.323l-.395-.072-4-1.2A1 1 0 014 14.462V11H2a1 1 0 110-2h2V6.538a1 1 0 01.605-.915l4-1.2.395-.072V3a1 1 0 011-1z" clipRule="evenodd" /></svg>
        </div>
        <div className="flex items-center gap-3 z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white">
            {stats.level[0]}
          </div>
          <div>
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Judge Rank</div>
            <div className="text-sm font-black text-gray-800 leading-none">{stats.level}</div>
          </div>
        </div>
        <div className="flex gap-4 z-10">
           <div className="text-right">
             <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Karma</div>
             <div className="text-sm font-black text-[#FF4500] leading-none">+{stats.karma}</div>
           </div>
           <div className="text-right">
             <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Streak</div>
             <div className="text-sm font-black text-gray-800 leading-none flex items-center justify-end gap-1">
               {stats.streak} <span className="text-orange-500 text-xs">🔥</span>
             </div>
           </div>
        </div>
      </div>

      {phase !== 'SENTENCED' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative">
          <div className="flex items-center gap-2 mb-3">
              <span className="bg-black text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">Case #{caseData.id}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">{dateKey}</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2 tracking-tight">{caseData.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">{caseData.scenario}</p>

          {!briefing && !loadingBriefing && (
            <button 
                id="opening-statement-btn"
                onClick={() => void handleBriefingGen()}
                className="mt-4 w-full text-[10px] font-black uppercase tracking-widest text-[#FF4500] hover:bg-orange-50 px-3 py-3 rounded-lg border border-orange-200 transition-colors flex items-center justify-center gap-2"
            >
                🎥 Present Opening Statement
            </button>
          )}

          {loadingBriefing && (
            <div className="mt-4 bg-gray-50 rounded-lg p-3 flex items-center justify-center gap-3 border border-gray-100 shadow-inner">
                <div className="w-4 h-4 border-2 border-[#FF4500] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase animate-pulse">Drafting Judicial Portfolio...</span>
            </div>
          )}

          {briefing && (
            <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 bg-black shadow-lg animate-in zoom-in duration-500 relative">
                <img src={briefing.image} alt="Case Sketch" className="w-full aspect-video object-cover opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-12">
                   <p className="text-white text-xs font-medium text-center leading-relaxed italic">"{briefing.subtitles}"</p>
                </div>
            </div>
          )}
        </div>
      )}

      {phase === 'DISCOVERY' && (
        <EvidenceBoard evidence={caseData.evidence} onComplete={() => setPhase('DELIBERATION')} />
      )}

      {phase === 'DELIBERATION' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-4">
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Phase 2: Deliberation</h3>
          </div>
          <div className="grid gap-3">
            {/* GUILTY / OPTION 0 */}
            <button 
                id="vote-guilty" 
                onClick={() => handleVerdictSelection('guilty')} 
                className="w-full flex items-center justify-between
                        bg-[#DC2626] hover:bg-[#B91C1C]
                        text-white p-5 rounded-2xl font-black
                        shadow-[0_4px_0_0_#991B1B]
                        active:shadow-none active:translate-y-1
                        transition-all"
            >
                <span className="text-xl tracking-tight uppercase">{caseData.verdictOptions?.[0] || 'Guilty'}</span>
                <span className="text-2xl">�</span>
            </button>

            {/* NOT GUILTY / OPTION 1 */}
            <button 
                onClick={() => handleVerdictSelection('not_guilty')} 
                className="w-full flex items-center justify-between
                        bg-[#16A34A] hover:bg-[#15803D]
                        text-white p-5 rounded-2xl font-black
                        shadow-[0_4px_0_0_#14532D]
                        active:shadow-none active:translate-y-1
                        transition-all"
            >
                <span className="text-xl tracking-tight uppercase">{caseData.verdictOptions?.[1] || 'Not Guilty'}</span>
                <span className="text-2xl">🕊️</span>
            </button>

            {/* ABSTAIN / OPTION 2 */}
            <button 
                onClick={() => handleVerdictSelection('abstain')} 
                className="w-full flex items-center justify-between
                        bg-[#E5E7EB] hover:bg-[#D1D5DB]
                        text-[#374151] p-5 rounded-2xl font-black
                        shadow-[0_4px_0_0_#9CA3AF]
                        active:shadow-none active:translate-y-1
                        transition-all"
            >
                <span className="text-xl tracking-tight uppercase">{caseData.verdictOptions?.[2] || 'Abstain'}</span>
                <span className="text-2xl">🤷</span>
            </button>
          </div>
        </div>
      )}

      {phase === 'GAVEL' && (
        <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-orange-500 animate-in zoom-in duration-300">
          <GavelMiniGame intensity={0.6} onComplete={handleGavelComplete} />
        </div>
      )}

      {phase === 'SENTENCED' && (
        <ResultsDisplay 
          caseData={caseData} 
          results={localResults || getVotesForCase(caseData.id, dateKey)} 
          onClose={() => {}} 
          aiAnalysis={aiAnalysis}
          isLoadingAI={loadingAI}
        />
      )}
    </div>
  );
};

export default CaseDisplay;

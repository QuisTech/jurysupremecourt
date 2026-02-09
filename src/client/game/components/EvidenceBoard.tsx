import React, { useState } from 'react';
import { Evidence } from '../types';

interface EvidenceBoardProps {
  evidence: Evidence[];
  onComplete: () => void;
}

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ evidence, onComplete }) => {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleReveal = (id: string) => {
    if (revealedIds.includes(id)) return;
    setRevealedIds([...revealedIds, id]);
  };

  const allRevealed = revealedIds.length === evidence.length;

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Phase 1: Discovery</h2>
        <p className="text-[10px] text-gray-500 font-bold uppercase">Tap cards to review the official exhibits</p>
      </div>

      <div className="grid gap-3">
        {evidence.map((ev, index) => {
          const isRevealed = revealedIds.includes(ev.id);
          return (
            <div 
              key={ev.id}
              id={`ev-${index}`}
              onClick={() => handleReveal(ev.id)}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer shadow-sm
                ${isRevealed 
                  ? 'bg-white border-gray-200 p-4' 
                  : 'bg-white border-gray-200 h-20 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
              {isRevealed ? (
                <div className="animate-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{ev.icon}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{ev.label}</span>
                  </div>
                  <p className="text-sm text-gray-900 font-medium leading-snug">{ev.text}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 opacity-60">
                   <span className="text-2xl">🔒</span>
                   <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Examine Exhibit {index + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="space-y-4 pt-2">
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-700 ${allRevealed ? 'bg-orange-500' : 'bg-indigo-500'}`}
            style={{ width: `${(revealedIds.length / evidence.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {revealedIds.length} / {evidence.length} Exhibits Fully Scrutinized
            </p>

            {allRevealed && (
                <button 
                    id="proceed-btn"
                    onClick={onComplete}
                    className="w-full bg-[#FF4500] text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl animate-in slide-in-from-bottom-2 duration-300 hover:bg-[#ff5a1a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    Proceed to Deliberation <span className="text-lg">⚖️</span>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
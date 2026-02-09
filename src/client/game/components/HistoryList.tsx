import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
        <div className="text-4xl mb-4 opacity-50">📜</div>
        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">The Archives are Empty</h3>
        <p className="text-xs text-gray-500 font-bold uppercase mt-2">Go hand out some justice first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-in fade-in duration-500">
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Judicial Archive</h3>
        <span className="text-[10px] font-bold text-[#FF4500]">{history.length} Cases Closed</span>
      </div>

      {history.map((item, index) => (
        <button
          key={`${item.caseData.id}-${index}`}
          onClick={() => onSelect(item)}
          className="w-full bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm transition-all text-left flex items-center justify-between group active:scale-[0.98]"
        >
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                item.userVote === 'guilty' ? 'bg-red-100 text-red-600' : 
                item.userVote === 'not_guilty' ? 'bg-green-100 text-green-600' : 
                'bg-gray-100 text-gray-600'
              }`}>
                {item.userVote.replace('_', ' ')}
              </span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
            </div>
            <h4 className="text-sm font-black text-gray-800 truncate group-hover:text-[#FF4500] transition-colors">
              {item.caseData.title}
            </h4>
          </div>
          <div className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

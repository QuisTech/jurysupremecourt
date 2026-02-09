import React, { useState } from 'react';
import { CaseData, VoteCounts } from '../types';

interface ResultsDisplayProps {
  caseData: CaseData;
  results: VoteCounts;
  onClose: () => void;
  aiAnalysis?: string | null;
  isLoadingAI?: boolean;
}

// Simple text formatter to handle bolding from markdown (e.g. **text**)
const FormattedText = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-black text-gray-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ caseData, results, onClose, aiAnalysis, isLoadingAI }) => {
  const [copied, setCopied] = useState(false);

  const getPercent = (val: number) => {
    if (results.total === 0) return 0;
    return Math.round((val / results.total) * 100);
  };

  const guiltyPercent = getPercent(results.guilty);
  const notGuiltyPercent = getPercent(results.not_guilty);
  const abstainPercent = getPercent(results.abstain);

  const winner = Math.max(results.guilty, results.not_guilty, results.abstain);
  let verdictText = "JURY HUNG";
  let verdictColor = "text-gray-500";
  let verdictBg = "bg-gray-100";
  
  if (winner === results.guilty) {
    verdictText = "GUILTY";
    verdictColor = "text-red-600";
    verdictBg = "bg-red-50";
  } else if (winner === results.not_guilty) {
    verdictText = "NOT GUILTY";
    verdictColor = "text-green-600";
    verdictBg = "bg-green-50";
  }

  const handleShare = () => {
    const text = `⚖️ Reddit Jury | Case #${caseData.id}\nVerdict: ${verdictText}\n\nI cast my vote. Can you slam the gavel better?`;
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. CASE CONTEXT HEADER (Restored) */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
         <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-black text-gray-900 leading-tight">{caseData.title}</h2>
            {onClose.name !== 'mockConstructor' && ( 
               // Simple check to see if this is the "History" view (passed a real close function)
               <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold uppercase">Archived</span>
            )}
         </div>
         <p className="text-sm text-gray-600 leading-relaxed">{caseData.scenario}</p>
      </div>

      {/* 2. OFFICIAL RULING CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="p-5">
           <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest text-center mb-4">Official Ruling</h3>
           
           <div className={`flex flex-col items-center justify-center py-6 rounded-2xl ${verdictBg} mb-6 border border-gray-100`}>
              <div className={`text-4xl font-black ${verdictColor} tracking-tighter mb-1`}>{verdictText}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Community Verdict</div>
           </div>

           {/* Progress Bars */}
           <div className="space-y-3">
              <div className="group">
                  <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                      <span>Guilty</span>
                      <span>{guiltyPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${guiltyPercent}%` }}></div>
                  </div>
              </div>
              <div className="group">
                  <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                      <span>Not Guilty</span>
                      <span>{notGuiltyPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${notGuiltyPercent}%` }}></div>
                  </div>
              </div>
              <div className="group">
                  <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">
                      <span>Abstain</span>
                      <span>{abstainPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-gray-300 h-full rounded-full transition-all duration-1000" style={{ width: `${abstainPercent}%` }}></div>
                  </div>
              </div>
           </div>
        </div>

        {/* Stats Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Debate Live</span>
            </div>
            <div className="flex gap-4">
                <div className="text-xs font-bold text-gray-600 flex items-center gap-1">
                    <span>💬</span> {results.total * 3 + 12} <span className="hidden sm:inline">Comments</span>
                </div>
                <div className="text-xs font-bold text-gray-600 flex items-center gap-1">
                    <span>⚖️</span> {results.total} <span className="hidden sm:inline">Votes</span>
                </div>
            </div>
        </div>
      </div>

      {/* 3. TOP COMMENT (Restored) */}
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9L9.91688 15.6852C11.9689 15.015 13.5016 13.157 13.6554 10.965C13.8091 8.77303 12.5606 6.69937 10.5113 5.76691C8.46205 4.83446 6.02683 5.2289 4.39828 6.75628C2.76974 8.28366 2.27481 10.6358 3.15546 12.6593L3.15552 12.6594C3.47596 13.3957 3.3289 14.2562 2.76817 14.8562L2.01705 15.6597C1.65655 16.0454 1.83934 16.6857 2.34864 16.8213C3.45668 17.1162 4.09341 18.2575 3.79328 19.3667C3.49316 20.476 2.36881 21.1396 1.25852 20.8549C0.219826 20.5885 -0.329882 19.4678 0.170624 18.5252C0.170624 18.5252 0.170627 18.5252 0.170631 18.5251C0.970289 17.0201 1.25597 15.2892 0.985929 13.5937C0.715886 11.8982 1.00694 10.1691 1.83856 8.65345C2.67018 7.13783 3.99025 5.92985 5.61715 5.20164C7.24405 4.47343 9.0763 4.29813 10.8415 4.70425C12.6068 5.11037 14.1956 6.07172 15.3854 7.45262C16.5752 8.83353 17.3005 10.5516 17.4524 12.3553C17.6042 14.159 17.1724 15.9529 16.2201 17.472C15.2678 18.9912 13.8471 20.1472 12.1644 20.7818L11.233 21.1328C10.7027 21.3328 10.3603 21.8406 10.3603 22.3999L10.3603 24L14.017 21Z" /></svg>
        </div>
        <div className="flex items-center gap-2 mb-2 relative z-10">
            <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-wider shadow-sm">Top Comment</span>
            <span className="text-xs text-gray-500 font-bold">u/{caseData.mockTopComment.author} • {caseData.mockTopComment.score} pts</span>
        </div>
        <p className="text-sm text-gray-800 italic leading-relaxed relative z-10">"{caseData.mockTopComment.text}"</p>
      </div>

      {/* 4. SUPREME COURT OPINION CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative animate-in slide-in-from-bottom-6 duration-700 delay-100">
         <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700"></div>
         <div className="p-6">
            <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
               <span className="text-2xl">🏛️</span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Supreme Court of the Internet</span>
            </div>
            
            {isLoadingAI ? (
               <div className="space-y-3 py-4 animate-pulse">
                  <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6 mx-auto"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
               </div>
            ) : aiAnalysis ? (
               <div className="font-serif text-sm leading-relaxed text-gray-800 space-y-4">
                  <div className="whitespace-pre-wrap text-justify">
                    <FormattedText text={aiAnalysis} />
                  </div>
               </div>
            ) : (
               <p className="text-center text-gray-400 text-xs italic">The Court is currently in recess.</p>
            )}
         </div>
         <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
             <p className="text-[9px] text-gray-400 font-mono uppercase">Case ID: {caseData.id} // 2024</p>
         </div>
      </div>

      {/* 5. ENGAGEMENT ACTIONS */}
      <div className="grid grid-cols-2 gap-3">
          <button 
              id="share-btn" // Added ID for automation
              onClick={handleShare}
              className="bg-[#FF4500] hover:bg-[#FF5714] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
              {copied ? 'Copied!' : 'Share Verdict'}
              {!copied && <span className="text-lg">📋</span>}
          </button>
          <button 
              className="bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
              Read Comments
              <span className="text-lg">💬</span>
          </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;

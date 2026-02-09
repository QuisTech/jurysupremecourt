import React, { useState } from 'react';
import { saveUGC } from '../services/storageService';

const CaseSubmission: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [scenario, setScenario] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveUGC({
      title,
      scenario,
      author: 'CurrentJudge',
      timestamp: Date.now()
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-200 animate-in zoom-in duration-300 shadow-xl">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Docket Received</h2>
        <p className="text-gray-600 mb-6">Your case has been submitted to the High Court mods for review.</p>
        <button onClick={onBack} className="bg-[#0079D3] text-white px-6 py-2 rounded-full font-bold">Return to Court</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-900 p-4 text-white flex items-center gap-3">
        <button onClick={onBack} className="p-1 hover:bg-gray-700 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h2 className="font-bold">Submit a Moral Dilemma</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title of the Dispute</label>
          <input 
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0079D3] outline-none"
            placeholder="e.g. The Mystery of the Stolen Sandwich"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Scenario Details</label>
          <textarea 
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0079D3] outline-none"
            placeholder="Describe the moral dilemma in detail..."
            value={scenario}
            onChange={e => setScenario(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-[#FF4500] hover:bg-[#ff5722] text-white py-3 rounded-full font-bold transition-colors">
          Submit to the Jury
        </button>
      </form>
    </div>
  );
};

export default CaseSubmission;

import React, { useState, useRef } from 'react';
import { generatePromoMaterial } from '../services/directorService';
import { CaseData } from '../types';

interface DirectorOverlayProps {
  onResetApp: () => void;
  currentCase: CaseData;
}

export const DirectorOverlay: React.FC<DirectorOverlayProps> = ({ onResetApp, currentCase }) => {
  const [status, setStatus] = useState<'IDLE' | 'GENERATING' | 'READY' | 'RECORDING' | 'FINISHED'>('IDLE');
  const [script, setScript] = useState<string>("");
  const [audioData, setAudioData] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const prepareDemo = async () => {
    setStatus('GENERATING');
    try {
      const data = await generatePromoMaterial(currentCase);
      setScript(data.script);
      setAudioData(data.audio);
      setStatus('READY');
    } catch (e) {
      console.error(e);
      setStatus('IDLE');
    }
  };

  const moveCursorTo = (id: string): Promise<void> => {
    return new Promise((resolve) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        setCursorPos({ 
          x: rect.left + rect.width / 2, 
          y: rect.top + rect.height / 2 
        });
      }
      setTimeout(resolve, 800); // Wait for cursor transition to finish
    });
  };

  const simulateClick = async (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      await moveCursorTo(id);
      setIsClicking(true);
      setTimeout(() => {
        el.click();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-yellow-400', 'ring-offset-2', 'scale-105', 'z-[100]');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-yellow-400', 'ring-offset-2', 'scale-105');
          setIsClicking(false);
        }, 800);
      }, 200);
    }
  };

  const waitForAndClick = async (id: string, maxRetries = 10): Promise<boolean> => {
    for (let i = 0; i < maxRetries; i++) {
      const el = document.getElementById(id);
      if (el) {
        await simulateClick(id);
        return true;
      }
      await new Promise(r => setTimeout(r, 500));
    }
    return false;
  };

  const playAudio = async (base64: string): Promise<void> => {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = ctx;
      
      // Force resume if suspended (fixes "no audio" bug)
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        const val = int16[i];
        if (val !== undefined) {
           float32[i] = val / 32768.0;
        }
      }
      
      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      
      // Resolve promise only when audio ends
      source.onended = () => {
        resolve();
      };
      
      source.start(0);
    });
  };

  const executeSequence = async () => {
    setStatus('RECORDING');

    // 1. Reset App & Clear UI
    onResetApp();
    await new Promise(r => setTimeout(r, 2000));

    // 2. Start Narrative (Intro) - AWAIT THIS so it doesn't overlap
    if (audioData) {
       await playAudio(audioData); 
       // Short pause for dramatic effect after intro
       await new Promise(r => setTimeout(r, 500));
    }

    // 3. Scripted Judicial Walkthrough
    await simulateClick('nav-today');
    await new Promise(r => setTimeout(r, 1500));
    
    // 4. Trigger Opening Statement (Briefing)
    const statementBtnFound = await waitForAndClick('opening-statement-btn', 6);
    if (statementBtnFound) {
       // Wait for generation (~4s) and audio playback (~6s)
       // CaseDisplay plays this audio, we just wait for it to be done
       await new Promise(r => setTimeout(r, 11000));
    }

    // Discovery Phase
    await simulateClick('ev-0');
    await new Promise(r => setTimeout(r, 2500));
    await simulateClick('ev-1');
    await new Promise(r => setTimeout(r, 2500));
    await simulateClick('ev-2'); // Exhibit 3
    
    // DELIBERATE PAUSE: Give time to read the final evidence
    await new Promise(r => setTimeout(r, 6000));
    
    // Robust transition: Ensure the "Proceed" button is there before moving cursor
    const proceedSuccess = await waitForAndClick('proceed-btn');
    if (!proceedSuccess) console.error("Could not find proceed-btn");

    await new Promise(r => setTimeout(r, 2000));
    await simulateClick('vote-guilty');
    
    await new Promise(r => setTimeout(r, 1500));
    await simulateClick('gavel-slam-btn');

    // Wait for the gavel animation and opinion rendering
    await new Promise(r => setTimeout(r, 6000));
    await simulateClick('share-btn');

    // Cinematic wrap
    setTimeout(() => {
        finishRecording();
    }, 4000);
  };

  const startDirectorMode = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: { displaySurface: "browser", frameRate: 60 }, 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      // CRITICAL CHECK: Did the user share audio?
      if (stream.getAudioTracks().length === 0) {
        stream.getTracks().forEach(t => t.stop());
        setErrorMsg("AUDIO MISSING! You must check 'Share system audio' or 'Also share tab audio' in the browser popup.");
        return;
      }

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus") 
        ? "video/webm;codecs=vp9,opus" 
        : "video/webm";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = saveVideo;
      mediaRecorder.start();
      
      void executeSequence();

    } catch (err) {
      console.error(err);
      setErrorMsg("Recording cancelled or not supported.");
    }
  };

  const finishRecording = () => {
     if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
     }
     setStatus('FINISHED');
  };

  const saveVideo = () => {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reddit-jury-official-trailer.webm`;
    a.click();
  };

  if (status === 'IDLE') {
    return (
      <button 
        onClick={prepareDemo}
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-transform z-50 border-2 border-white shadow-2xl flex items-center gap-2 group"
      >
        <span className="group-hover:rotate-12 transition-transform">📽️</span> Director's Mode
      </button>
    );
  }

  if (status === 'RECORDING') {
      return (
          <>
            {/* High-Fidelity Virtual Cursor */}
            <div 
                className={`fixed w-10 h-10 pointer-events-none z-[9999] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${isClicking ? 'scale-75' : 'scale-100'}`}
                style={{ 
                    left: cursorPos.x, 
                    top: cursorPos.y, 
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                {/* Cursor Body */}
                <div className={`w-full h-full bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.6)] border-2 border-black flex items-center justify-center text-xl transition-all duration-200
                   ${isClicking ? 'bg-yellow-400' : 'bg-white'}`}>
                    👆
                </div>
                {/* Click Ripple */}
                {isClicking && (
                  <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-ping"></div>
                )}
            </div>

            <div className="fixed inset-x-0 bottom-0 z-[100] pointer-events-none p-8 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/90 via-black/40 to-transparent h-96">
                <div className="text-white text-center max-w-2xl animate-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        <div className="text-[10px] font-black uppercase text-red-500 tracking-[0.4em] drop-shadow-lg">Official Judicial Narration</div>
                    </div>
                    <p className="text-xl font-bold drop-shadow-2xl leading-relaxed bg-black/40 px-8 py-4 rounded-3xl backdrop-blur-xl border border-white/10 italic">
                        "{script}"
                    </p>
                </div>
            </div>
          </>
      );
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0b]/95 z-[100] flex flex-col items-center justify-center text-white backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="bg-gradient-to-b from-gray-900 to-black p-10 rounded-[2.5rem] border border-white/10 max-w-md w-full text-center space-y-8 shadow-[0_0_80px_rgba(255,69,0,0.15)]">
        <div className="w-24 h-24 bg-[#FF4500] rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-2xl rotate-3 hover:rotate-0 transition-transform">⚖️</div>
        
        {status === 'GENERATING' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Drafting Portfolio...</h2>
            <div className="text-[10px] text-orange-500 font-black uppercase tracking-[0.3em] animate-pulse">Preparing Official Courtroom Recording Assets</div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-1/3 animate-[loading_1.5s_infinite]"></div>
            </div>
            <style>{`@keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }`}</style>
          </div>
        )}

        {status === 'READY' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">Trailer Assets Finalized</h2>
            
            {/* Instructions Box */}
            <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-xl text-left space-y-2">
                <div className="flex items-center gap-2 text-blue-300 font-bold uppercase text-[10px] tracking-widest">
                    <span>⚠️</span> Important Recording Instructions
                </div>
                <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
                    <li>Select <strong>Chrome Tab</strong> (Best Quality)</li>
                    <li>Toggle <strong>"Share Audio"</strong> (Bottom Left corner of popup)</li>
                    <li>Do not switch tabs during recording.</li>
                </ul>
            </div>

            {errorMsg && (
                <div className="bg-red-500/20 border border-red-500 p-3 rounded-xl text-red-200 text-xs font-bold animate-pulse">
                    {errorMsg}
                </div>
            )}
            
            <div className="space-y-3">
                <button 
                    onClick={() => void startDirectorMode()}
                    className="w-full bg-[#FF4500] hover:bg-[#FF5714] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-95 text-xs border-b-4 border-orange-800"
                >
                    <span className="text-lg animate-pulse">🔴</span> Record Performance
                </button>
                <button 
                    onClick={() => setStatus('IDLE')}
                    className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors py-2"
                >
                    Dismiss Court
                </button>
            </div>
          </div>
        )}

        {status === 'FINISHED' && (
          <div className="space-y-8 animate-in zoom-in duration-500">
            <div className="text-6xl">🎬</div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Production Complete.</h2>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your judicial trailer has been exported to your downloads.</p>
            <button 
              onClick={() => setStatus('IDLE')}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl text-xs"
            >
              Return to Chambers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

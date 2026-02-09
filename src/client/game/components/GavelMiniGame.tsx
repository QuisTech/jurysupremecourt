import React, { useState, useEffect, useRef } from 'react';

interface GavelMiniGameProps {
  onComplete: (score: number) => void;
  intensity: number; // 0.1 to 1.0
}

export const GavelMiniGame: React.FC<GavelMiniGameProps> = ({ onComplete, intensity }) => {
  const [meterPos, setMeterPos] = useState(0);
  const [isSlashing, setIsSlashing] = useState(false);
  const [isHit, setIsHit] = useState(false);
  const requestRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);

  // Meter speed based on intensity (controversy)
  const speed = 0.003 + (intensity * 0.004);

  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const progress = time - startTimeRef.current;
    
    // Oscillate between 0 and 100
    const val = (Math.sin(progress * speed) + 1) * 50;
    setMeterPos(val);
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [intensity]);

  const handleSlam = () => {
    if (isSlashing) return;
    
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setIsSlashing(true);
    
    // Calculate score (0-100, 100 is center)
    const accuracy = 100 - Math.abs(50 - meterPos) * 2;
    
    // Animation sequence
    setTimeout(() => {
      setIsHit(true);
      // Trigger completion
      setTimeout(() => {
        onComplete(Math.round(accuracy));
      }, 600);
    }, 250);
  };

  return (
    <div className={`relative w-full py-8 flex flex-col items-center justify-center transition-all duration-75 ${isHit ? 'animate-bounce' : ''}`}>
      
      {/* The Meter */}
      <div className="w-full max-w-[280px] h-8 bg-gray-200 rounded-full border-4 border-gray-300 relative overflow-hidden mb-8 shadow-inner">
        {/* Center Zone */}
        <div className="absolute inset-y-0 left-1/2 -ml-6 w-12 bg-green-500/30 blur-sm"></div>
        <div className="absolute inset-y-0 left-1/2 -ml-0.5 w-1 bg-green-600 z-10"></div>
        
        {/* The Moving Indicator */}
        <div 
          className="absolute top-0 bottom-0 w-3 bg-red-500 shadow-md z-20 rounded-full"
          style={{ left: `${meterPos}%`, transform: 'translateX(-50%)' }}
        />
      </div>

      {/* The Gavel Visual */}
      <div className="relative h-40 w-full flex justify-center items-end">
        <div 
          className={`text-8xl transition-all duration-200 transform origin-bottom-right drop-shadow-xl
            ${isSlashing ? 'rotate-[100deg] translate-y-8 scale-110' : 'rotate-0'}
            ${isHit ? 'scale-125' : ''}
          `}
        >
          🔨
        </div>
        {/* Sound Block */}
        <div className="absolute bottom-2 w-24 h-6 bg-[#8B4513] rounded-lg shadow-lg border-b-4 border-[#5D2906]"></div>
      </div>

      <button
        id="gavel-slam-btn" // Added ID for automation
        onClick={handleSlam}
        disabled={isSlashing}
        className={`mt-6 px-12 py-4 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-xl
          ${isSlashing ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#FF4500] text-white hover:scale-105 active:scale-95 hover:bg-[#ff5a1a]'}
        `}
      >
        {isSlashing ? 'JUDGING...' : 'SLAM!'}
      </button>

      <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        Tap center for max authority
      </p>
    </div>
  );
};
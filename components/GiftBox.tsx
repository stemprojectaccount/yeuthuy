import React from 'react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-10 relative">
      <div className="relative group cursor-pointer" onClick={onClick}>
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-pink-400 rounded-full opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500 animate-pulse"></div>
        
        {/* Box */}
        <div className="relative bg-white/20 backdrop-blur-sm p-8 rounded-3xl border-2 border-pink-200 shadow-[0_0_30px_rgba(236,72,153,0.3)] transform transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <Gift size={80} className="text-pink-500 animate-bounce" />
        </div>
      </div>
      
      <p className="mt-8 text-xl md:text-2xl font-ancient text-purple-900 animate-pulse text-center px-4">
        Một món quà dành riêng cho Thùy 🎁 <br/>
        <span className="text-sm font-sans text-purple-600/80">(chạm để mở)</span>
      </p>
    </div>
  );
};

export default GiftBox;
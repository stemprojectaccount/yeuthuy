import React, { useState, useRef, useEffect } from 'react';
import { Heart, Music, Volume2, VolumeX, Sparkles, Scroll } from 'lucide-react';
import FallingPetals from './components/FallingPetals';
import GiftBox from './components/GiftBox';
import { HERO_INFO, POEM_CONTENT } from './constants';

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenGift = () => {
    setIsOpened(true);
    // Attempt to play music on interaction
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio autoplay prevented", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAccept = () => {
    setShowConfetti(true);
    setAccepted(true);
    // Simple vibration if on mobile
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-slate-800 relative font-sans selection:bg-pink-200">
      {/* Background Effects */}
      <FallingPetals />
      
      {/* Audio Element (Using a royalty free track suitable for anime/ambient) */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Control */}
      {isOpened && (
        <button 
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 p-3 bg-white/40 backdrop-blur-md rounded-full shadow-lg border border-white/50 text-purple-700 hover:bg-white/60 transition-all"
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      )}

      {/* Intro Stage */}
      {!isOpened ? (
        <div className={`transition-opacity duration-1000 ${isOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <GiftBox onClick={handleOpenGift} />
        </div>
      ) : (
        /* Main Content Stage */
        <main className="relative z-10 container mx-auto px-4 py-12 max-w-2xl animate-fade-in-up">
          
          {/* Header / Intro */}
          <section className="mb-16 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-pink-300 blur-xl opacity-30 rounded-full"></div>
              <img 
                src={HERO_INFO.avatarUrl} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl relative z-10 object-cover mx-auto"
              />
            </div>
            <h1 className="text-4xl font-ancient text-purple-900 mb-2">{HERO_INFO.introTitle}</h1>
            <div className="flex justify-center gap-4 text-purple-700/80 font-semibold">
              <span className="bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/40">✨ {HERO_INFO.name}</span>
              <span className="bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/40">🎂 {HERO_INFO.dob}</span>
              <span className="bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/40">🌸 {HERO_INFO.hobby}</span>
            </div>
          </section>

          {/* Poem Section */}
          <section className="mb-16 relative">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-lg shadow-2xl transform -rotate-1"></div>
            <div className="relative bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-inner border-y-4 border-double border-pink-200 text-center">
              <Scroll className="mx-auto text-pink-400 mb-6 opacity-80" size={32} />
              <div className="font-poetic text-2xl md:text-3xl leading-relaxed text-slate-800 space-y-4">
                {POEM_CONTENT.map((line, index) => (
                  <p key={index} className={line === "" ? "h-4" : ""}>{line}</p>
                ))}
              </div>
              <div className="mt-8 flex justify-center opacity-50">
                <Sparkles className="text-purple-400" />
              </div>
            </div>
          </section>

          {/* Question Section */}
          <section className="text-center py-12 pb-24">
            {!accepted ? (
              <div className="space-y-8 animate-pulse-slow">
                <button 
                  onClick={handleAccept}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                   <Heart className="mr-2 animate-bounce" fill="currentColor" />
                   Em có nguyện cùng anh song hành không?
                   <div className="absolute -inset-3 rounded-full bg-pink-400 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-200"></div>
                </button>
              </div>
            ) : (
              <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-pink-200 shadow-xl animate-pop-in">
                 <h2 className="text-3xl md:text-4xl font-poetic text-pink-600 mb-4">
                   Anh chờ câu trả lời của em 💕
                 </h2>
                 <p className="text-purple-800 font-ancient italic">
                   "Nguyện cùng nàng, nắm tay hết xuân xanh."
                 </p>
                 <div className="mt-6 flex justify-center gap-2">
                    {[1,2,3].map(i => <Heart key={i} className="text-red-500 animate-ping" size={24} fill="currentColor" />)}
                 </div>
              </div>
            )}
          </section>

        </main>
      )}
      
      {/* Styles for simple CSS animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.5s ease-out forwards;
        }
        @keyframes pop-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Fullscreen Confetti overlay on accept */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
             <div
               key={i}
               className="absolute text-red-500"
               style={{
                 left: `${Math.random() * 100}vw`,
                 top: `${Math.random() * 100}vh`,
                 opacity: 0,
                 animation: `confetti 1s ease-out forwards ${Math.random() * 1}s`
               }}
             >
               <Heart size={Math.random() * 20 + 10} fill="currentColor" />
             </div>
          ))}
          <style>{`
            @keyframes confetti {
               0% { opacity: 0; transform: scale(0) translateY(0); }
               50% { opacity: 1; transform: scale(1.2) translateY(-20px); }
               100% { opacity: 0; transform: scale(1) translateY(50px); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default App;
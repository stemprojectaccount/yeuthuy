import React, { useEffect, useState } from 'react';

const FallingPetals: React.FC = () => {
  const [petals, setPetals] = useState<number[]>([]);

  useEffect(() => {
    // Generate static array of petals to avoid re-rendering loop
    const petalCount = 20;
    setPetals(Array.from({ length: petalCount }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((i) => (
        <div
          key={i}
          className="absolute text-pink-200/60 animate-fall"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `-20px`,
            fontSize: `${Math.random() * 20 + 10}px`,
            animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          🌸
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0px); opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FallingPetals;
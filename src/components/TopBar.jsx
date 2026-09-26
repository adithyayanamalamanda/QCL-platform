import { useState, useEffect } from 'react';

export default function TopBar() {
  const [stats, setStats] = useState({ hearts: 5, streak: 12, gems: 450 });
  const [animateHeart, setAnimateHeart] = useState(false);
  const [animateGem, setAnimateGem] = useState(false);

  useEffect(() => {
    const loadStats = () => {
      const saved = localStorage.getItem('quantumStats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.hearts !== stats.hearts) { setAnimateHeart(true); setTimeout(() => setAnimateHeart(false), 1000); }
        if (parsed.gems !== stats.gems) { setAnimateGem(true); setTimeout(() => setAnimateGem(false), 1000); }
        setStats(parsed);
      } else {
        localStorage.setItem('quantumStats', JSON.stringify({ hearts: 5, streak: 12, gems: 450 }));
      }
    };
    loadStats();
    window.addEventListener('stats-updated', loadStats);
    return () => window.removeEventListener('stats-updated', loadStats);
  }, [stats.hearts, stats.gems]);

  return (
    <div className="top-bar">
      <style>{`
        @keyframes pop {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.5); filter: brightness(1.5) drop-shadow(0 0 10px currentColor); }
          100% { transform: scale(1); filter: brightness(1); }
        }
        .anim-pop { animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .stat-icon { font-variation-settings: "'FILL' 1"; transition: transform 0.2s; }
        .stat-pill:hover .stat-icon { transform: scale(1.1); }
      `}</style>
      <div /> {/* Spacer for flex-between */}
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div className="stat-pill" style={{ color: '#ef4444' }}>
          <span className={`material-symbols-outlined stat-icon ${animateHeart ? 'anim-pop' : ''}`}>favorite</span> {stats.hearts}
        </div>
        <div className="stat-pill" style={{ color: '#f97316' }}>
          <span className="material-symbols-outlined stat-icon">local_fire_department</span> {stats.streak}
        </div>
        <div className="stat-pill" style={{ color: '#3b82f6' }}>
          <span className={`material-symbols-outlined stat-icon ${animateGem ? 'anim-pop' : ''}`}>diamond</span> {stats.gems}
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Star, Lock, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

import { LEVELS_JSON } from '../quantumEngine';

export default function Map() {
  const navigate = useNavigate();
  const [levels, setLevels] = useState(() => {
    const saved = localStorage.getItem('quantumQuestLevels');
    let parsed = saved ? JSON.parse(saved) : [];
    
    // If local storage is empty or contains the old 5-level format, rebuild it
    if (parsed.length !== LEVELS_JSON.length) {
      parsed = LEVELS_JSON.map((l, i) => ({
        id: l.id,
        title: l.title,
        status: i === 0 ? 'current' : 'locked'
      }));
      localStorage.setItem('quantumQuestLevels', JSON.stringify(parsed));
    }
    return parsed;
  });

  const handleLevelClick = (level) => {
    if (level.status !== 'locked') {
      navigate(`/level/${level.id}`);
    }
  };

  const MODULES = [
    { id: 'm1', title: 'FOUNDATION', levels: ['1', '2', '3', '4', '5', '6', '7'] },
    { id: 'm2', title: 'QUANTUM FOUNDATIONS', levels: ['8', '9', '10', '11', '12', '13', '14'] },
    { id: 'm3', title: 'QUANTUM GATES', levels: ['15', '16', '17', '18', '19', '20', '21'] },
    { id: 'm4', title: 'QUANTUM CIRCUITS', levels: ['22', '23', '24', '25', '26'] },
    { id: 'm5', title: 'QUANTUM ALGORITHMS', levels: ['27', '28', '29', '30', '31', '32', '33'] },
  ];

  const getModuleProgress = (moduleLevels) => {
    const moduleLevelObjs = levels.filter(l => moduleLevels.includes(l.id));
    const completed = moduleLevelObjs.filter(l => l.status === 'done').length;
    return Math.round((completed / moduleLevelObjs.length) * 100);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <h1 className="gradient-text">Quantum Map</h1>
        <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Star color="gold" size={20} />
          <span style={{ fontWeight: 'bold' }}>150 XP</span>
        </div>
      </header>

      <div className="map-container">
        {MODULES.map((mod, modIdx) => {
          const progress = getModuleProgress(mod.levels);
          return (
            <div key={mod.id} style={{ width: '100%', marginBottom: '4rem' }}>
              <div style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h2 style={{ color: 'var(--text-main)', margin: 0 }}>{mod.title}</h2>
                  <span style={{ fontWeight: 'bold', color: progress === 100 ? '#22c55e' : 'var(--text-muted)' }}>{progress}%</span>
                </div>
                <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? '#22c55e' : 'var(--primary)', transition: 'width 0.5s ease' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {mod.levels.map((levelId, index) => {
                  const level = levels.find(l => l.id === levelId);
                  if (!level) return null;
                  
                  // Continuous winding across all modules
                  const globalIndex = levels.findIndex(l => l.id === levelId);
                  const offset = Math.sin(globalIndex * 1.5) * 80;
                  const isLastInModule = index === mod.levels.length - 1;
                  
                  return (
                    <div key={level.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', transform: `translateX(${offset}px)` }}>
                      <div 
                        className={`level-node ${level.status}`}
                        onClick={() => handleLevelClick(level)}
                      >
                        {level.status === 'locked' && <Lock size={32} />}
                        {level.status === 'done' && <Star size={32} fill="currentColor" />}
                        {level.status === 'current' && <Play size={32} fill="currentColor" />}
                      </div>
                      
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ 
                          color: level.status === 'locked' ? 'var(--text-muted)' : 'var(--text-main)',
                          marginBottom: '0.25rem'
                        }}>
                          Level {globalIndex + 1}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                          {level.title}
                        </p>
                      </div>
                      
                      {(!isLastInModule || modIdx < MODULES.length - 1) && (() => {
                        const nextOffset = Math.sin((globalIndex + 1) * 1.5) * 80;
                        const dx = nextOffset - offset;
                        return (
                          <svg width="4" height="40" style={{ margin: '0.5rem 0', overflow: 'visible' }}>
                            <path 
                              d={`M 2 0 C 2 20, ${dx + 2} 20, ${dx + 2} 40`} 
                              fill="none" 
                              stroke={level.status === 'done' ? 'var(--primary)' : '#334155'} 
                              strokeWidth="4" 
                              strokeLinecap="round"
                            />
                          </svg>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import CircuitBuilder from './CircuitBuilder';
import { runCircuit, LEVELS_JSON } from '../quantumEngine';

export default function Level() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [phase, setPhase] = useState('predict'); // predict -> run -> result
  const [prediction, setPrediction] = useState(null);
  const [result, setResult] = useState(null);

  const levelData = LEVELS_JSON.find(l => l.id === id) || LEVELS_JSON[0];
  const isCircuitLevel = parseInt(id) >= 15; // Only levels 15+ use the circuit builder

  const currentOptions = levelData.options || ['Option A', 'Option B', 'Option C'];
  const progressPercent = Math.round((parseInt(id) / 33) * 100);

  const handleRun = (gates) => {
    // Run the actual quantum engine
    const simResult = runCircuit(levelData.qubits, gates);
    
    const success = prediction === levelData.correctGuess;
    
    setResult({
      success,
      explanation: success 
        ? `Correct! ${levelData.explanation}` 
        : `Let's look closer. ${levelData.explanation}`,
      xp: levelData.xp,
      simResult
    });
    setPhase('result');
    
      if (success) {
        const savedStats = localStorage.getItem('quantumStats');
        const stats = savedStats ? JSON.parse(savedStats) : { hearts: 5, streak: 12, gems: 450 };
        stats.hearts += 1;
        stats.gems += levelData.xp;
        localStorage.setItem('quantumStats', JSON.stringify(stats));
        window.dispatchEvent(new Event('stats-updated'));

        const saved = localStorage.getItem('quantumQuestLevels');
        if (saved) {
          const levels = JSON.parse(saved);
          const currIndex = levels.findIndex(l => l.id === id);
          if (currIndex !== -1) {
            levels[currIndex].status = 'done';
            if (currIndex + 1 < levels.length && levels[currIndex + 1].status === 'locked') {
              levels[currIndex + 1].status = 'current';
            }
            localStorage.setItem('quantumQuestLevels', JSON.stringify(levels));
          }
        }
      } else {
        const savedStats = localStorage.getItem('quantumStats');
        const stats = savedStats ? JSON.parse(savedStats) : { hearts: 5, streak: 12, gems: 450 };
        if (stats.hearts > 0) stats.hearts -= 1;
        localStorage.setItem('quantumStats', JSON.stringify(stats));
        window.dispatchEvent(new Event('stats-updated'));
      }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes pulseGlow { 0% { box-shadow: 0 0 5px rgba(99,102,241,0.2); } 50% { box-shadow: 0 0 20px rgba(99,102,241,0.6); } 100% { box-shadow: 0 0 5px rgba(99,102,241,0.2); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 75% { transform: translateX(-10px); } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fillBar { from { width: 0; } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes shine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        
        .anim-slide-up { animation: slideInUp 0.6s ease-out forwards; }
        .anim-stagger-1 { animation: slideInRight 0.5s ease-out forwards 0.1s; opacity: 0; }
        .anim-stagger-2 { animation: slideInRight 0.5s ease-out forwards 0.2s; opacity: 0; }
        .anim-stagger-3 { animation: slideInRight 0.5s ease-out forwards 0.3s; opacity: 0; }
        .anim-stagger-4 { animation: slideInRight 0.5s ease-out forwards 0.4s; opacity: 0; }
        .anim-pulse { animation: pulseGlow 2s infinite; }
        .anim-shake { animation: shake 0.4s ease-in-out; }
        .anim-pop { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .anim-float { animation: float 4s ease-in-out infinite; }
        .progress-fill { animation: fillBar 1s ease-out; }
        
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
        .hover-lift:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .btn-shine {
          background: linear-gradient(90deg, var(--primary) 0%, #818cf8 50%, var(--primary) 100%);
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          className="hover-lift"
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          onClick={() => navigate('/map')}
        >
          <ArrowLeft size={20} /> Back to Map
        </button>
        <div style={{ width: '200px', height: '10px', background: '#1e293b', borderRadius: '5px', overflow: 'hidden' }}>
          <div className="progress-fill" style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--primary)' }} />
        </div>
      </div>

      <header className="anim-slide-up" style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text anim-float" style={{ display: 'inline-block' }}>Level {id}: {levelData.title}</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
          {levelData.explanation}
        </p>
      </header>

      {phase === 'predict' && (
        <div className="card anim-slide-up" style={{ marginBottom: '2rem', animationDelay: '0.1s' }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: 1.4 }}>
            <BrainCircuit color="var(--accent)" style={{ flexShrink: 0, marginTop: '4px', animation: 'float 3s infinite' }} /> 
            {levelData.question || 'Make Your Prediction'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentOptions.map((opt, i) => (
              <button 
                key={i}
                className={`btn hover-lift anim-stagger-${i + 1}`}
                style={{ 
                  background: prediction === i ? 'var(--primary)' : 'transparent',
                  border: '2px solid var(--primary)',
                  textAlign: 'left',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onClick={() => setPrediction(i)}
              >
                {opt}
              </button>
            ))}
          </div>
          {prediction !== null && (
            <div className="anim-pop" style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button 
                className="btn btn-shine hover-lift anim-pulse" 
                onClick={() => isCircuitLevel ? setPhase('run') : handleRun([])}
                style={{ border: 'none' }}
              >
                {isCircuitLevel ? 'Confirm & Build Circuit' : 'Submit Answer'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'run' && (
        <CircuitBuilder qubits={levelData.qubits} onRun={handleRun} />
      )}

      {phase === 'result' && result && (
        <div className={`card ${result.success ? 'anim-pop' : 'anim-shake'}`} style={{ textAlign: 'center', padding: '3rem', border: `2px solid ${result.success ? '#22c55e' : '#ef4444'}` }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: result.success ? '#22c55e' : '#ef4444', animation: 'bounce 2s infinite' }}>
            {result.success ? 'Level Complete!' : 'Not Quite...'}
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            {result.explanation}
          </p>
          
          {isCircuitLevel && result.simResult && (
            <div style={{ background: '#020617', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', textAlign: 'left' }}>
              <h4 style={{ color: 'var(--text-muted)' }}>Simulation Output:</h4>
              <pre style={{ color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                {result.simResult.raw}
              </pre>
            </div>
          )}

          {result.success && (
            <div className="anim-pop" style={{ color: 'gold', fontWeight: 'bold', fontSize: '2rem', marginBottom: '2rem', textShadow: '0 0 20px gold' }}>
              +{result.xp} XP
            </div>
          )}
          <button className={`btn hover-lift ${result.success ? 'btn-shine' : ''}`} onClick={() => navigate('/map')}>
            {result.success ? 'Next Level' : 'Back to Map'}
          </button>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Shield, Brain, Zap, Target, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CircuitBuilder from './CircuitBuilder';

export default function Practice() {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('quantumQuestLevels');
    if (saved) {
      const levels = JSON.parse(saved);
      // Find highest unlocked level
      const highestUnlockedIndex = levels.reduce((max, lvl, idx) => 
        lvl.status !== 'locked' ? Math.max(max, idx) : max, 0);
      // Module 3 starts at Level 15 (index 14)
      if (highestUnlockedIndex >= 14) {
        setIsLocked(false);
      }
    }
  }, []);
  const handleRun = (gates) => {
    console.log("Playground ran with gates: ", gates);
    alert("Circuit executed in Playground!");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Quantum Playground</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
          Experiment with quantum gates and build your own circuits.
        </p>
      </header>

      {isLocked ? (
        <div className="card anim-slide-up" style={{ textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem' }}>
          <Lock size={64} color="var(--text-muted)" style={{ margin: '0 auto 2rem', animation: 'float 3s infinite' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Playground Locked</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            You need to reach <strong>Module 3: Quantum Gates (Level 15)</strong> to unlock the Quantum Playground. 
            Build your foundation first!
          </p>
          <button className="btn btn-shine hover-lift" onClick={() => navigate('/map')}>
            Return to Map
          </button>
        </div>
      ) : (
        <div className="anim-slide-up" style={{ display: 'grid', gridTemplateColumns: '250px 1fr 300px', gap: '2rem' }}>
          
          {/* LEFT: Gate Library */}
          <div className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Basic Gates</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {['X', 'Y', 'Z', 'H', 'S', 'T'].map(g => (
                  <div key={g} className="hover-lift" style={{ background: '#334155', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: 'bold', cursor: 'grab' }}>{g}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Controlled</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {['CNOT', 'CZ'].map(g => (
                  <div key={g} className="hover-lift" style={{ background: '#334155', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: 'bold', cursor: 'grab' }}>{g}</div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: Circuit Builder */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CircuitBuilder qubits={2} onRun={handleRun} />
          </div>

          {/* RIGHT: Circuit Information */}
          <div className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Circuit Info</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Qubits</span>
              <span style={{ fontWeight: 'bold' }}>2</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Gates</span>
              <span style={{ fontWeight: 'bold' }}>0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Depth</span>
              <span style={{ fontWeight: 'bold' }}>0</span>
            </div>
            
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginTop: '1rem' }}>Results</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
              Run the circuit to view probabilities.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

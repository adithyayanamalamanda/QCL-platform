import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', textAlign: 'center',
      padding: '2rem'
    }}>
      <Zap size={64} color="var(--primary)" style={{ marginBottom: '2rem' }} />
      <h1 className="gradient-text" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        QuantumQuest
      </h1>
      <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
        Master quantum computing through gamified, interactive puzzles. Build circuits, predict outcomes, and level up your skills.
      </p>
      <button className="btn" onClick={() => navigate('/intro')} style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}>
        Start Learning
      </button>
    </div>
  );
}

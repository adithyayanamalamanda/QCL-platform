import { User as UserIcon, Award, Zap, BookOpen } from 'lucide-react';

export default function Profile() {
  const stats = [
    { label: 'Lessons Completed', value: '12' },
    { label: 'Accuracy', value: '85%' },
    { label: 'Circuits Built', value: '24' },
    { label: 'Total XP', value: '1,450' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header Profile Card */}
      <div className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--primary)', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <UserIcon size={60} color="white" />
        </div>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Alice Q.</h1>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '0 0 1rem 0' }}>Quantum Explorer • Level 8</h2>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Zap size={18} color="gold" /> 1,450 XP</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Award size={18} color="#f97316" /> 30 Day Streak</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left Column: Learning Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} color="var(--primary)" /> Learning Progress
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Quantum Basics</span>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>100%</span>
                </div>
                <div style={{ background: '#334155', height: '8px', borderRadius: '4px' }}>
                  <div style={{ width: '100%', height: '100%', background: '#22c55e', borderRadius: '4px' }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Quantum Gates</span>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>60%</span>
                </div>
                <div style={{ background: '#334155', height: '8px', borderRadius: '4px' }}>
                  <div style={{ width: '60%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Algorithms</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>0%</span>
                </div>
                <div style={{ background: '#334155', height: '8px', borderRadius: '4px' }}>
                  <div style={{ width: '0%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {stats.map(stat => (
                <div key={stat.label} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stat.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ color: '#22c55e' }}>✓</div>
                <div>Completed <strong>Superposition</strong></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ color: '#22c55e' }}>✓</div>
                <div>Built <strong>Bell State</strong></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ color: 'gold' }}>★</div>
                <div>Earned <strong>First Qubit</strong> Achievement</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

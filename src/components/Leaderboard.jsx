import { Trophy, Flame, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

const mockLeaderboard = [
  { rank: 1, name: 'Alice Q.', xp: 2450, streak: 30, level: 8 },
  { rank: 2, name: 'Bob S.', xp: 2210, streak: 12, level: 7 },
  { rank: 3, name: 'Charlie B.', xp: 1980, streak: 8, level: 6 },
  { rank: 4, name: 'David M.', xp: 1750, streak: 5, level: 5 },
  { rank: 5, name: 'Eve H.', xp: 1600, streak: 14, level: 5 },
];

export default function Leaderboard() {
  const [tab, setTab] = useState('GLOBAL');

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Trophy size={40} color="gold" />
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', margin: 0 }}>Leaderboard</h1>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #1e293b' }}>
        {['GLOBAL', 'COLLEGE', 'FRIENDS', 'WEEKLY'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'none',
              border: 'none',
              color: tab === t ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: tab === t ? '4px solid var(--primary)' : '4px solid transparent',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: '0' }}>
        {mockLeaderboard.map((user, idx) => (
          <div key={idx} style={{ 
            display: 'grid', 
            gridTemplateColumns: '50px 50px 1fr 100px 80px', 
            alignItems: 'center',
            padding: '1.5rem',
            borderBottom: idx < mockLeaderboard.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            background: idx === 0 ? 'rgba(255, 215, 0, 0.05)' : 'transparent'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: idx < 3 ? ['gold', 'silver', '#cd7f32'][idx] : 'var(--text-muted)' }}>
              {user.rank}
            </div>
            <div style={{ background: '#334155', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={20} />
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{user.xp} XP</div>
            <div style={{ color: '#f97316', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Flame size={16} fill="currentColor" /> {user.streak}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

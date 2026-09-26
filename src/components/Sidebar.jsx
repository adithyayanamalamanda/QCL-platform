import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'LEARN', path: '/map', icon: 'home' },
    { name: 'PRACTICE', path: '/practice', icon: 'shield' },
    { name: 'LEADERBOARD', path: '/leaderboard', icon: 'emoji_events' },
    { name: 'PROFILE', path: '/profile', icon: 'person' },
  ];

  return (
    <div className="sidebar">
      <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem', paddingLeft: '1rem' }}>QuantumQuest</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                border: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                borderRadius: '1rem',
                color: isActive ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{item.icon}</span>
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

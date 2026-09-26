import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Learn', icon: 'school' },
    { to: '/playground', label: 'Playground', icon: 'science' },
    { to: '/exams', label: 'Exams & Katas', icon: 'assignment' },
    { to: '/leaderboard', label: 'Leaderboard', icon: 'military_tech' },
    { to: '/profile', label: 'Profile', icon: 'account_circle' }
  ];

  return (
    <aside className="w-64 bg-white border-r-2 border-slate-200 min-h-screen p-4 flex flex-col justify-between sticky top-0 h-screen z-30 select-none">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-duo-green flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">science</span>
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 block leading-tight">
              Quantum<span className="text-duo-green">Quest</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quantum Learning
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all border-2 ${
                  isActive
                    ? 'bg-duo-blueLight border-duo-blue text-duo-blueDark shadow-sm'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:border-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-2xl ${
                      isActive ? 'text-duo-blue' : 'text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Pro / Help Box at Bottom */}
      <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="material-symbols-outlined text-duo-purple text-lg">auto_awesome</span>
          <span>IBM Quantum Aligned</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          Qiskit-compatible interactive statevector simulations and katas.
        </p>
      </div>
    </aside>
  );
}

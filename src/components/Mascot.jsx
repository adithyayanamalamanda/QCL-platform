export default function Mascot({ mood = 'happy', message = '', size = 'md' }) {
  // mood: 'happy' | 'thinking' | 'celebrating' | 'explaining' | 'sad'

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36'
  };

  return (
    <div className="flex items-center gap-3">
      {/* Quarky SVG Avatar */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 animate-bounce-subtle`}>
        {/* Quantum Orbital Ring Animation */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin-slow" />
        <div className="absolute -inset-1 rounded-full border border-purple-500/30 animate-pulse" />

        {/* Mascot Body SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>

          {/* Particle Core / Body */}
          <circle cx="50" cy="52" r="36" fill="url(#bodyGrad)" />

          {/* Owl Ear Tufts / Antennae */}
          <polygon points="25,24 35,34 20,38" fill="#7c3aed" />
          <polygon points="75,24 65,34 80,38" fill="#0891b2" />

          {/* White Eye Sockets */}
          <circle cx="36" cy="48" r="14" fill="#ffffff" />
          <circle cx="64" cy="48" r="14" fill="#ffffff" />

          {/* Expressive Pupils based on Mood */}
          {mood === 'celebrating' ? (
            <>
              {/* Star / Happy Arch Eyes */}
              <path d="M 28 50 Q 36 40 44 50" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 56 50 Q 64 40 72 50" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="40" cy="44" r="7" fill="url(#eyeGlow)" />
              <circle cx="68" cy="44" r="7" fill="url(#eyeGlow)" />
              <circle cx="42" cy="42" r="2.5" fill="#ffffff" />
              <circle cx="70" cy="42" r="2.5" fill="#ffffff" />
            </>
          ) : mood === 'sad' ? (
            <>
              <circle cx="36" cy="52" r="7" fill="#64748b" />
              <circle cx="64" cy="52" r="7" fill="#64748b" />
              <path d="M 44 68 Q 50 62 56 68" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              {/* Standard Happy Focused Eyes */}
              <circle cx="38" cy="48" r="7.5" fill="url(#eyeGlow)" />
              <circle cx="62" cy="48" r="7.5" fill="url(#eyeGlow)" />
              <circle cx="40" cy="46" r="2.5" fill="#ffffff" />
              <circle cx="64" cy="46" r="2.5" fill="#ffffff" />
            </>
          )}

          {/* Little Beak / Quantum Core */}
          <polygon points="50,55 45,63 55,63" fill="#f59e0b" />

          {/* Blush Cheeks */}
          <circle cx="24" cy="58" r="5" fill="#f472b6" opacity="0.6" />
          <circle cx="76" cy="58" r="5" fill="#f472b6" opacity="0.6" />

          {/* Tiny Belly Feathers (Qubit Ket Symbol) */}
          <text x="50" y="78" textAnchor="middle" fill="#ffffff" opacity="0.8" fontSize="10" fontWeight="bold" fontFamily="monospace">
            |ψ⟩
          </text>
        </svg>
      </div>

      {/* Speech Bubble */}
      {message && (
        <div className="relative bg-slate-900/90 text-slate-100 text-sm p-3.5 rounded-2xl border border-indigo-500/30 shadow-lg backdrop-blur-md max-w-sm">
          {/* Arrow */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-slate-900 border-b-8 border-b-transparent" />
          <p className="leading-snug">{message}</p>
        </div>
      )}
    </div>
  );
}

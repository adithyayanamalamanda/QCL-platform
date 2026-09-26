export default function BasicsIntro({ onDone }) {
  return (
    <div style={{
      maxWidth: '500px', margin: '4rem auto', textAlign: 'center',
      display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem'
    }}>
      <div>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to QuantumQuest
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
          Let's build your quantum knowledge from the ground up.
        </p>
      </div>

      <div className="card" style={{ padding: '3rem', background: 'rgba(30, 41, 59, 0.5)' }}>
        <div style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>
          STEP 1
        </div>
        <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', marginTop: 0 }}>
          Computer Fundamentals
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Start with the smallest building blocks of computing.
        </p>

        <button 
          className="btn" 
          onClick={onDone}
          style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}
        >
          START LEARNING
        </button>
      </div>
    </div>
  );
}

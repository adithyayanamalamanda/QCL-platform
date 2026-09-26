import { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your Quantum AI Tutor. I can explain concepts, help debug your circuits, or give you hints. What do you need help with?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "That's a great question! Since this is an educational demo mode, I'm currently simulating a response. But normally, I would look at the circuit you just built or the lesson you're reading to give you a personalized, context-aware hint!" }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            border: 'none', borderRadius: '50%', width: '60px', height: '60px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
            zIndex: 1000, transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Sparkles color="white" size={28} />
        </button>
      )}

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '350px', height: '500px',
          background: 'var(--bg-darker)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '1rem', display: 'flex', flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)', zIndex: 1000, overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ background: 'var(--primary)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 'bold' }}>
              <Sparkles size={20} /> Quantum AI Tutor
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--primary)' : '#334155',
                padding: '0.75rem 1rem', borderRadius: '1rem',
                borderBottomRightRadius: msg.role === 'user' ? '0' : '1rem',
                borderBottomLeftRadius: msg.role === 'assistant' ? '0' : '1rem',
                maxWidth: '85%', fontSize: '0.9rem', lineHeight: 1.4
              }}>
                {msg.content}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem' }}>
            <input 
              value={input} onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a hint..."
              style={{ flex: 1, background: '#1e293b', border: 'none', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', outline: 'none' }}
            />
            <button onClick={handleSend} style={{ background: 'var(--primary)', border: 'none', borderRadius: '0.5rem', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={18} color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

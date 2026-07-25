import { useState } from 'react'

const SUGGESTED = [
  'Can you walk me through her technical skills and capabilities?',
  'Tell me about her EHR experience and how she has worked with these systems.',
  'Why is her path into health tech an advantage, not a gap?',
]

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m trained on Samantha\'s resume and projects. Ask me anything or try one of the questions below.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (text) => {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await response.json()
      const reply = data.reply || 'Something went wrong. Please try again.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <section style={{
        paddingTop: '9rem',
        paddingRight: '2rem',
        paddingBottom: '20rem',
        paddingLeft: '2rem',
        maxWidth: '1000px',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '0.75rem',
        }}>
          Ask Samantha's AI
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '2rem',
        }}>
          Have a question? Ask.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}>
          <div style={{
            background: 'rgba(13, 15, 22, 0.97)',
            border: '0.5px solid rgba(212, 160, 176, 0.12)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '320px',
              overflowY: 'auto',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'none',
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role === 'user' ? 'var(--accent)' : 'rgba(212, 160, 176, 0.08)',
                    border: msg.role === 'user' ? 'none' : '0.5px solid rgba(212, 160, 176, 0.12)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: msg.role === 'user' ? 'var(--bg)' : 'var(--text-primary)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '12px 12px 12px 2px',
                    background: 'rgba(212, 160, 176, 0.08)',
                    border: '0.5px solid rgba(212, 160, 176, 0.12)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}>
                    thinking...
                  </div>
                </div>
              )}
            </div>
            <div style={{
              borderTop: '0.5px solid rgba(212, 160, 176, 0.1)',
              padding: '10px 14px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                }}
              />
              <button
                onClick={() => send(input)}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: loading ? 'var(--text-muted)' : 'var(--accent)',
                  padding: '0',
                }}
              >
                →
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SUGGESTED.map((q, i) => (
              <button
                key={i}
                onClick={() => send(q)}
                disabled={loading}
                style={{
                  background: 'rgba(212, 160, 176, 0.04)',
                  border: '0.5px solid rgba(212, 160, 176, 0.12)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 160, 176, 0.35)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212, 160, 176, 0.12)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
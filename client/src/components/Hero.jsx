import { useState, useEffect } from 'react'

const NAME = "Hi, I'm"
const LAST = "Samantha"

const stats = [
  { value: '10+', label: 'Years in regulated healthcare' },
  { value: '60%', label: 'Audit readiness improvement' },
  { value: '45%', label: 'Reporting error reduction' },
  { value: '40+', label: 'Users managed multi site' },
]

export default function Hero() {
  const [displayedName, setDisplayedName] = useState('')
  const [displayedLast, setDisplayedLast] = useState('')
  const [phase, setPhase] = useState('name')

  useEffect(() => {
    if (phase === 'name') {
      if (displayedName.length < NAME.length) {
        const t = setTimeout(() => {
          setDisplayedName(NAME.slice(0, displayedName.length + 1))
        }, 120)
        return () => clearTimeout(t)
      } else {
        setTimeout(() => setPhase('last'), 150)
      }
    }

    if (phase === 'last') {
      if (displayedLast.length < LAST.length) {
        const t = setTimeout(() => {
          setDisplayedLast(LAST.slice(0, displayedLast.length + 1))
        }, 120)
        return () => clearTimeout(t)
      } else {
        setPhase('done')
      }
    }

    if (phase === 'done') {
      const t = setTimeout(() => {
        setDisplayedName('')
        setDisplayedLast('')
        setPhase('name')
      }, 6000)
      return () => clearTimeout(t)
    }
  }, [displayedName, displayedLast, phase])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1.5rem 3rem',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{
        background: 'rgba(9, 10, 12, 0.38)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(212, 160, 176, 0.12)',
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
        maxWidth: '860px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'left',
      }}>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '1.2rem',
        }}>
          IT Compliance · Operations · Development
        </p>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          marginBottom: '1.2rem',
          minHeight: '2.4em',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>{displayedName}</span>
          {displayedName.length === NAME.length && (
            <>
              <br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{displayedLast}</span>
            </>
          )}
          <span style={{
            display: 'inline-block',
            width: '3px',
            height: '0.8em',
            background: 'var(--accent)',
            marginLeft: '3px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
          }} />
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.7,
          marginBottom: '0.1rem',
        }}>
          A decade of knowing what's at stake.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          color: 'var(--accent)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          Now I have the tools to act on it.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          <a href="#projects" style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'var(--accent)',
            color: 'var(--bg)',
            padding: '0.65rem 1.8rem',
            borderRadius: '2px',
            textDecoration: 'none',
            transition: 'background 0.3s ease',
          }}>
            View My Work
          </a>
          <a href="/resume.pdf" download style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'transparent',
            color: 'var(--accent)',
            padding: '0.65rem 1.8rem',
            borderRadius: '2px',
            border: '1px solid var(--accent)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}>
            Download Resume
          </a>
        </div>

        <div style={{
          borderTop: '1px solid rgba(212, 160, 176, 0.12)',
          paddingTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
        }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                color: 'var(--accent)',
                fontWeight: 600,
                marginBottom: '0.2rem',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
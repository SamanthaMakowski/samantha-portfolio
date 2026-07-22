export default function About() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{
        maxWidth: '860px',
        width: '100%',
        margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '1.5rem',
        }}>
          A bit about me
        </p>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 600,
          lineHeight: 1.15,
          marginBottom: '2rem',
          maxWidth: '680px',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>I knew the stakes before</span><br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>I knew the stack.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--accent-light)',
          lineHeight: 1.9,
          maxWidth: '620px',
          marginBottom: '1.5rem',
        }}>
          Most developers learn to code and then find an industry. I did it vice versa. A decade in healthcare compliance taught me what breaks, what costs people, and what actually matters. Then I learned to build.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.9,
          maxWidth: '620px',
          marginBottom: '2.5rem',
        }}>
          The technical skills followed. The stakes were always clear.
        </p>
        <a href="https://www.linkedin.com/in/samantha-makowski-a07498341/" target="_blank" rel="noreferrer" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--accent)',
          paddingBottom: '2px',
          transition: 'color 0.3s ease',
        }}>
          Connect on LinkedIn →
        </a>
      </div>
    </section>
  )
}
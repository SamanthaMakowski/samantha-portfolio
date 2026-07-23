import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.2rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(9, 10, 12, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <a href="#hero" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.3rem',
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
          textDecoration: 'none',
        }}>
          SM
        </a>

        <ul style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }} className="nav-desktop">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: active === link.href.replace('#', '') ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'color 0.3s ease',
                paddingBottom: '2px',
                borderBottom: active === link.href.replace('#', '') ? '1px solid var(--accent)' : '1px solid transparent',
                textDecoration: 'none',
              }}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" download style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '0.5rem 1.2rem',
              borderRadius: '2px',
              transition: 'background 0.3s ease',
              textDecoration: 'none',
            }}>
              Resume
            </a>
          </li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
          aria-label="Toggle menu"
        >
          <span style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            background: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
          }} />
          <span style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            background: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block',
            width: '22px',
            height: '1.5px',
            background: 'var(--text-primary)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
          }} />
        </button>
      </nav>

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '70%',
        maxWidth: '320px',
        background: 'rgba(9, 10, 12, 0.97)',
        backdropFilter: 'blur(20px)',
        borderLeft: '0.5px solid rgba(212, 160, 176, 0.15)',
        zIndex: 99,
        padding: '6rem 2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 600,
            color: active === link.href.replace('#', '') ? 'var(--accent)' : 'var(--text-primary)',
            textDecoration: 'none',
            fontStyle: active === link.href.replace('#', '') ? 'italic' : 'normal',
            transition: 'color 0.3s ease',
          }}>
            {link.label}
          </a>
        ))}
        <a href="/resume.pdf" download onClick={() => setMenuOpen(false)} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--bg)',
          background: 'var(--accent)',
          padding: '0.75rem 1.5rem',
          borderRadius: '2px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: 'auto',
        }}>
          Download Resume
        </a>
      </div>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed',
          inset: 0,
          zIndex: 98,
          background: 'rgba(0,0,0,0.4)',
        }} />
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
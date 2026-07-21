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

  return (
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
      }}>
        SM
      </a>

      <ul style={{
        display: 'flex',
        gap: '2.5rem',
        listStyle: 'none',
        alignItems: 'center',
      }}>
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
          }}>
            Resume
          </a>
        </li>
      </ul>
    </nav>
  )
}
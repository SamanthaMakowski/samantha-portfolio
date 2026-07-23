import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setSending(true)
    try {
      await emailjs.send(
        'portfolio_service',
        'template_jhhexaf',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        'HbgatGUuok9Aj4zVB'
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      alert('Something went wrong. Please try emailing me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 2rem 6rem',
      marginTop: '-4rem',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{
        background: 'rgba(9, 10, 12, 0.5)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(212, 160, 176, 0.12)',
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        maxWidth: '560px',
        width: '100%',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '0.75rem',
        }}>
          Contact
        </p>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          lineHeight: 1.1,
        }}>
          Let's connect!
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          color: 'var(--text-muted)',
          marginBottom: '1.75rem',
        }}>
          I actually read these...
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              color: 'var(--accent)',
              fontStyle: 'italic',
              marginBottom: '0.5rem',
            }}>
              Message sent.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
            }}>
              I'll be in touch soon.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(212, 160, 176, 0.06)',
                  border: errors.name ? '0.5px solid rgba(212, 100, 100, 0.5)' : '0.5px solid rgba(212, 160, 176, 0.15)',
                  borderRadius: '4px',
                  padding: '10px 12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {errors.name && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(212,100,100,0.8)', marginTop: '4px', letterSpacing: '0.1em' }}>{errors.name}</p>}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(212, 160, 176, 0.06)',
                  border: errors.email ? '0.5px solid rgba(212, 100, 100, 0.5)' : '0.5px solid rgba(212, 160, 176, 0.15)',
                  borderRadius: '4px',
                  padding: '10px 12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {errors.email && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(212,100,100,0.8)', marginTop: '4px', letterSpacing: '0.1em' }}>{errors.email}</p>}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={e => handleChange('message', e.target.value)}
                rows={5}
                style={{
                  width: '100%',
                  background: 'rgba(212, 160, 176, 0.06)',
                  border: errors.message ? '0.5px solid rgba(212, 100, 100, 0.5)' : '0.5px solid rgba(212, 160, 176, 0.15)',
                  borderRadius: '4px',
                  padding: '10px 12px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
              {errors.message && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(212,100,100,0.8)', marginTop: '4px', letterSpacing: '0.1em' }}>{errors.message}</p>}
            </div>

            <button
              onClick={handleSubmit}
              disabled={sending}
              style={{
                width: '100%',
                padding: '11px',
                background: sending ? 'rgba(212, 160, 176, 0.5)' : 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: sending ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s ease',
                marginTop: '4px',
              }}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </>
        )}

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '0.5px solid rgba(212, 160, 176, 0.1)',
          flexWrap: 'wrap',
        }}>
          <a href="mailto:samantha.makowskit@gmail.com" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}>
            Email →
          </a>
          <a href="https://www.linkedin.com/in/samantha-makowski-a07498341/" target="_blank" rel="noreferrer" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}>
            LinkedIn →
          </a>
          <a href="https://github.com/SamanthaMakowski" target="_blank" rel="noreferrer" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}>
            GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
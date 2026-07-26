import { useState, useRef, useEffect } from 'react'
import sideEye from '../assets/side-eye-terminal.avif'
import archerSlap from '../assets/archer-slap.gif'

const COMMANDS = {
  whoami: [
    'A decade in healthcare compliance will either break you or sharpen you. For me it was the latter.',
    'I work hard, learn fast, and hit differently under pressure. The kind of environment most people avoid is exactly where I find my footing.',
    'Now I build the tools I once had to work around.',
    'Healthcare IT professional. Full stack developer. Manhattan based. Remote only.',
  ],
  why: [
    'Bear with me through the beginning of this because I promise it lands.',
    'If I\'m being completely honest, a decade of compliance in healthcare has its cons. Cons that burn genuine people out and we push through it. It\'s an oversaturated, understaffed environment with no room for error that doesn\'t come with a moment to allow yourself a breath, piled with constant expectations of shortcuts that are not always truly aligned with proper ethics. You can\'t overstep it, you can\'t understep it. You just go and lead with morals because the system often leverages itself and leaves you to figure it out. Healthcare is a passion and a drive and we don\'t allow ourselves to become engulfed in it regardless of circumstance because the cost of even a single moment spaced out, let alone a shortcut, isn\'t abstract. So we show up every day, figure out what\'s coming at us next, and take care of the people who need it most.',
    'My move into health tech isn\'t a pivot away from that. It\'s a pivot toward it. I\'ve seen these systems in depth and what drives me is making a change, adapting workflows to be functional. Now I have the tools to be part of a team that\'s able to lift some of that for healthcare workers through technology. Whether it\'s a company automating systems to see lower error rates, AI caching data that drives new research developments, reducing the friction when clients reach out to providers, or helping optimize provider workflows so they can put that extra time into the patients who need it most.',
    'I\'m excited to be part of how it can be optimized and I\'m ready for the ride because health tech is nowhere close to its peak. I\'m genuinely looking forward to being part of the growth that might just hold the most gravity in the tech industry and growing with it. I thrive in environments where analytical skills drive my daily performance and I\'m looking forward to contributing within a team that makes a difference.',
  ],
  approach: [
    'I assess every problem from every angle before I touch it. Find what I recognize, sort by what makes the most sense next, then move. I don\'t panic and I won\'t blindly guess. When something breaks I retrace every step until I find exactly where it started. I think outside the box not because it sounds impressive but because I\'ve seen what happens when linear thinking hits its ceiling and someone has to figure it out anyway. I analyze fast, find the fault, and pivot. Perceiving errors as a challenge rather than a stressor.',
  ],
  life: [
    'When I\'m not working through a new script I\'m usually decompressing with classic lit. Dostoevsky and Kafka are both favorites but if you ask me to compare them I\'d have to politely decline. That\'d be just about as ambiguous as geopolitics... As a Manhattan local I\'m either trying to snag a reservation at whatever\'s hot right now or standing in a gallery somewhere endlessly staring, trying to work out the dichotomy of a piece. My knack for information is versatile although I love a sprinkle of mental gymnastics at work as well.',
  ],
  contact: [
    'Email: samantha.makowskit@gmail.com',
    'LinkedIn: linkedin.com/in/samantha-makowski-a07498341',
    'GitHub: github.com/SamanthaMakowski',
  ],
  help: [
    'Available commands:',
    'whoami     — who I am and what I do',
    'why        — why I made the pivot',
    'approach   — how I work and think',
    'life       — outside of work',
    'contact    — how to reach me',
    'clear      — clear the terminal',
  ],
}

const BOUNCE_HEIGHTS = [22, 18, 15, 12, 9, 7, 5, 3]

export default function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [booted, setBooted] = useState(false)
  const [bounceY, setBounceY] = useState(0)
  const [showBubble, setShowBubble] = useState(false)
  const [showExitPrompt, setShowExitPrompt] = useState(false)
  const [showSlap, setShowSlap] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && !booted) {
      setLines([{ type: 'system', text: 'Hey! Type help to see available commands and get to know me better.' }])
      setBooted(true)
    }
  }, [open])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (open) return

    const runBounce = () => {
      BOUNCE_HEIGHTS.forEach((height, i) => {
        setTimeout(() => {
          setBounceY(-height)
          if (i === 2) setShowBubble(true)
          setTimeout(() => setBounceY(0), 200)
        }, i * 400)
      })
      setTimeout(() => {
        setShowBubble(false)
        setBounceY(0)
      }, BOUNCE_HEIGHTS.length * 400 + 300)
    }

    const timeout = setTimeout(runBounce, 2000)
    const interval = setInterval(runBounce, 5000 + BOUNCE_HEIGHTS.length * 400 + 300)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [open])

  const handleClose = () => {
    setShowExitPrompt(true)
  }

  const handleExitYes = () => {
    setShowExitPrompt(false)
    setOpen(false)
  }

  const handleExitNo = () => {
    setShowExitPrompt(false)
    setShowSlap(true)
    setTimeout(() => {
      setShowSlap(false)
      setOpen(false)
    }, 2500)
  }

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines = []

    newLines.push({ type: 'input', text: trimmed })

    if (trimmed === 'clear') {
      setLines([])
      return
    }

    if (COMMANDS[trimmed]) {
      COMMANDS[trimmed].forEach(line => {
        newLines.push({ type: 'output', text: line })
      })
    } else {
      newLines.push({ type: 'error', text: `command not found: ${trimmed}. Type help for available commands.` })
    }

    newLines.push({ type: 'spacer' })
    setLines(prev => [...prev, ...newLines])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      runCommand(input)
      setInput('')
    }
  }

  return (
    <>
      {showExitPrompt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
        }}>
          <div style={{
            background: 'rgba(9, 10, 12, 0.98)',
            border: '0.5px solid rgba(212, 160, 176, 0.2)',
            borderRadius: '12px',
            overflow: 'hidden',
            width: 'min(480px, calc(100vw - 3rem))',
            textAlign: 'center',
          }}>
            <img
              src={sideEye}
              alt="side eye"
              style={{ width: '100%', display: 'block' }}
            />
            <div style={{ padding: '16px' }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                letterSpacing: '0.05em',
              }}>
                did you try all the prompts?
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={handleExitYes}
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 24px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  y
                </button>
                <button
                  onClick={handleExitNo}
                  style={{
                    background: 'transparent',
                    color: 'var(--accent)',
                    border: '0.5px solid rgba(212, 160, 176, 0.35)',
                    borderRadius: '4px',
                    padding: '8px 24px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  n
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSlap && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
        }}>
          <img
            src={archerSlap}
            alt="archer slap"
            style={{
              maxWidth: 'min(480px, calc(100vw - 3rem))',
              width: '90%',
              borderRadius: '12px',
            }}
          />
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 200 }}>
        {showBubble && !open && (
          <div style={{
            position: 'absolute',
            bottom: '54px',
            left: '0',
            background: 'white',
            color: '#090a0c',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            padding: '6px 10px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            over here, don't forget to select me
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              left: '14px',
              width: '10px',
              height: '10px',
              background: 'white',
              transform: 'rotate(45deg)',
            }} />
          </div>
        )}
        <button
          onClick={() => open ? handleClose() : setOpen(true)}
          style={{
            width: '44px',
            height: '44px',
            background: open ? 'var(--accent)' : 'rgba(212, 160, 176, 0.12)',
            border: '0.5px solid rgba(212, 160, 176, 0.3)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateY(${bounceY}px)`,
          }}
          aria-label="Toggle terminal"
        >
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: open ? 'var(--bg)' : 'var(--accent)',
          }}>
            {open ? '✕' : '>_'}
          </span>
        </button>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '5rem',
        left: '1.5rem',
        zIndex: 199,
        width: 'min(480px, calc(100vw - 3rem))',
        background: 'rgba(9, 10, 12, 0.98)',
        border: '0.5px solid rgba(212, 160, 176, 0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        transform: open ? 'translateY(0)' : 'translateY(20px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
      }}>
        <div style={{
          background: 'rgba(212, 160, 176, 0.08)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '0.5px solid rgba(212, 160, 176, 0.1)',
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'rgba(212, 160, 176, 0.5)',
          }}>
            SAMANTHA.SH
          </span>
          <div style={{ width: '24px' }} />
        </div>

        <div
          ref={bodyRef}
          style={{
            height: '260px',
            overflowY: 'auto',
            padding: '14px',
            scrollbarWidth: 'none',
          }}
        >
          {lines.map((line, i) => {
            if (line.type === 'spacer') return <br key={i} />
            if (line.type === 'system') return (
              <div key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--accent)',
                marginBottom: '4px',
                lineHeight: 1.7,
              }}>
                {line.text}
              </div>
            )
            if (line.type === 'input') return (
              <div key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                marginBottom: '2px',
                lineHeight: 1.7,
              }}>
                <span style={{ color: 'var(--accent)' }}>samantha@portfolio</span>
                <span style={{ color: 'var(--text-muted)' }}>:~$ </span>
                <span style={{ color: 'var(--text-primary)' }}>{line.text}</span>
              </div>
            )
            if (line.type === 'error') return (
              <div key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'rgba(212, 100, 100, 0.8)',
                marginBottom: '2px',
                lineHeight: 1.7,
              }}>
                {line.text}
              </div>
            )
            return (
              <div key={i} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                marginBottom: '2px',
                lineHeight: 1.7,
              }}>
                {line.text}
              </div>
            )
          })}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 14px',
          borderTop: '0.5px solid rgba(212, 160, 176, 0.1)',
          gap: '8px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--accent)',
            whiteSpace: 'nowrap',
          }}>
            samantha@portfolio:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>
    </>
  )
}
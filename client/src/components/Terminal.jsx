import { useState, useRef, useEffect } from 'react'

const COMMANDS = {
  whoami: [
    'Healthcare IT professional and developer.',
    'A decade in compliance. Now I have the tools to act on it.',
    'Targeting GRC, IAM, and Healthcare IT roles. Remote only. New York based.',
  ],
  why: [
    'Bear with me through the beginning of this because I promise it lands.',
    'If I\'m being completely honest, a decade of compliance in healthcare has its cons. Cons that burn genuine people out and we push through it. It\'s an oversaturated, understaffed environment with no room for error that doesn\'t come with a moment to allow yourself a breath, piled with constant expectations of shortcuts that are not always truly aligned with proper ethics. You can\'t overstep it, you can\'t understep it. You just go and lead with morals because the system often leverages itself and leaves you to figure it out. Healthcare is a passion and a drive and we don\'t allow ourselves to become engulfed in it regardless of circumstance because the cost of even a single moment spaced out, let alone a shortcut, isn\'t abstract. So we show up every day, figure out what\'s coming at us next, and take care of the people who need it most.',
    'My move into health tech isn\'t a pivot away from that. It\'s a pivot toward it. I\'ve seen these systems in depth and what drives me is making a change, adapting workflows to be functional. Now I have the tools to be part of a team that\'s able to lift some of that for healthcare workers through technology. Whether it\'s a company automating systems to see lower error rates, AI caching data that drives new research developments, reducing the friction when clients reach out to providers, or helping optimize provider workflows so they can put that extra time into the patients who need it most.',
    'I\'m excited to be part of how it can be optimized and I\'m ready for the ride because health tech is nowhere close to its peak. I\'m genuinely looking forward to being part of the growth that might just hold the most gravity in the tech industry and growing with it. I thrive in environments where analytical skills drive my daily performance and I\'m looking forward to contributing within a team that makes a difference.',
  ],
  approach: [
    'I prefer to find calculated research before I build, even when I already know the answer. Understanding something and knowing how it actually behaves under pressure are two entirely different things and often the reason we find ourselves fixing them. After it\'s mapped it\'s executed thoroughly. In healthcare skipping steps is just not negotiable because the cost of it isn\'t abstract. When something breaks I work backwards, document everything, and find exactly where it started. I don\'t believe in walls. I believe in problems I haven\'t located yet.',
  ],
  life: [
    'When I\'m not working through a new script I\'m usually decompressing with classic lit. Dostoevsky and Kafka are both favorites but if you ask me to compare them I\'d have to politely decline. That\'d be just about as ambiguous as geopolitics. As a Manhattan local I\'m either trying to snag a reservation at whatever\'s hot right now or standing in a gallery somewhere endlessly staring, trying to work out the dichotomy of a piece. My knack for information is versatile although I love a sprinkle of mental gymnastics at work as well.',
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
          onClick={() => setOpen(!open)}
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
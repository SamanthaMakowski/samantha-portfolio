import { useEffect, useRef } from 'react'

export default function BinaryBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 16
    const cols = Math.floor(window.innerWidth / fontSize)
    const drops = Array.from({ length: cols }, () => Math.random() * -50)
    const sequences = Array.from({ length: cols }, () =>
      Array.from({ length: 30 }, () => Math.round(Math.random()))
    )

    const tailLength = 8

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const seq = sequences[i]
        const headY = drops[i]

        for (let j = 0; j < seq.length; j++) {
          const y = (headY - j) * fontSize
          if (y < 0 || y > canvas.height) continue

          let opacity
          if (j === 0) {
            opacity = 1
          } else if (j < tailLength) {
            opacity = 1 - j / tailLength
          } else {
            continue
          }

          ctx.fillStyle = `rgba(212, 160, 176, ${opacity})`
          ctx.fillText(seq[j].toString(), i * fontSize, y)
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
          sequences[i] = Array.from({ length: 30 }, () => Math.round(Math.random()))
        }
        drops[i] += 0.15
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
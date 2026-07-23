import { useState, useEffect } from 'react'

export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [direction, setDirection] = useState('up')
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setDirection(current > prevScrollY ? 'down' : 'up')
      setPrevScrollY(current)
      setScrollY(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [prevScrollY])

  return { scrollY, direction }
}
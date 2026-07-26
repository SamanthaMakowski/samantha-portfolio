import { useEffect } from 'react'

export default function useAnalytics(page) {
  useEffect(() => {
    const data = {
      page,
      referrer: document.referrer,
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      timestamp: new Date().toISOString(),
    }

    fetch('https://samantha-p-analytics-server.onrender.com/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {})

    const interval = setInterval(() => {
      fetch('https://samantha-p-analytics-server.onrender.com/api/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, timestamp: new Date().toISOString() }),
      }).catch(() => {})
    }, 30000)

    return () => clearInterval(interval)
  }, [page])
}
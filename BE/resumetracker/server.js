require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let downloadCount = 0

app.get('/api/resume', (req, res) => {
  downloadCount++
  console.log(`Resume downloaded. Total: ${downloadCount}`)
  res.json({ ok: true, downloads: downloadCount })
})

app.get('/api/resume/count', (req, res) => {
  const { secret } = req.query
  if (secret !== process.env.ANALYTICS_SECRET) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  res.json({ downloads: downloadCount })
})

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`Resume tracker running on port ${PORT}`))
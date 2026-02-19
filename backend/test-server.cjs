require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/scholarhunter'

app.use(cors())
app.use(express.json())

let db

MongoClient.connect(MONGODB_URI).then(client => {
  db = client.db()
  console.log('MongoDB connected')
}).catch(err => console.error('MongoDB error:', err))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body
  const result = await db.collection('users').insertOne({ email, password, name })
  res.json({ user: { id: result.insertedId, email, name } })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.collection('users').findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid' })
  res.json({ user: { id: user._id, email: user.email, name: user.name } })
})

app.listen(PORT, () => console.log(`Server on ${PORT}`))

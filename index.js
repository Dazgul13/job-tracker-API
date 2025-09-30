const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')
const app = express()
require('dotenv').config()

// ✅ Allow all origins with *
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// Middleware
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

// ✅ Fix small bug: use process.env.PORT (uppercase)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.log(err))

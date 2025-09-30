const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const jobRoutes = require('./routes/jobRoutes')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.port | 4000, () => console.log('Server running')))
  .catch(err => console.log(err))
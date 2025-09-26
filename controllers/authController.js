const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body)
    const token = createToken(user._id)
    res.json({ token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ error: 'Invalid credentials' })

  const token = createToken(user._id)
  res.json({ token })
}
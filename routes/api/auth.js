const express = require('express')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()

// @route   GET api/auth
// @desc    Get user profile
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @route   POST api/auth
// @desc    Authenticate User and return jwt
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // check correct data was sent in body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // pull data from body
    const { email, password } = req.body

    // check if user already exists
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid Credentials' })
    }

    // return jwt
    const payload = {
      user: {
        id: user.id
      }
    }
    await jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error
        res.json(token)
      }
    )
  }
)

module.exports = router

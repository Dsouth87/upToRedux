const express = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = express.Router()

// @route   POST api/user
// @desc    Create new user
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password must be greater than 5 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // check correct data was sent in body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // pull data from body
    const { name, email, password } = req.body

    // check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'That email is already in use' }] })
    }

    // get avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    // create new user object
    user = new User({
      name,
      email,
      password,
      avatar
    })

    // hash password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // save to database
    await user.save()

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

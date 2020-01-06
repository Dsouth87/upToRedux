const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get('/', auth, (req, res) => {
  res.send(req.user)
})

module.exports = router

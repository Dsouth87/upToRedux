const jwt = require('jsonwebtoken')
const config = require('config')

const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) {
      return res.status(400).json({ msg: 'No auth token provided' })
    }
    await jwt.verify(
      req.header('x-auth-token'),
      config.get('jwtSecret'),
      (error, decoded) => {
        if (error) {
          console.log(error)
          return res.status(400).json({ msg: 'Invalid token' })
        }
        req.user = decoded.user
        next()
      }
    )
  } catch (err) {
    console.error(err.message)
    console.log('Error in auth middleware')
    return res.status(500).send('Server Error')
  }
}

module.exports = auth

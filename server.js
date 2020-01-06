const express = require('express')
const connectDB = require('./config/db')
const app = express()

const PORT = process.env.PORT || 8888

connectDB()

app.use(express.json())

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

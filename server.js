const express = require('express')
const connectDB = require('./config/db')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 8888

connectDB()

app.use(express.json())

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

//Serve static assets in production

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const express = require('express')
const connectDB = require('./config/db')
const app = express()

const PORT = process.env.PORT || 8888

connectDB()

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

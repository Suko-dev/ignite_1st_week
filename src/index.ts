import express from 'express'
require('dotenv').config()

const app = express()

app.listen(process.env.PORT)

app.get('/', (request, response) => {
  return response.json({ message: 'Hello, mundo!' })
})

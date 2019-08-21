const express = require('express')
const bodyParser = require('body-parser')
const router = require ('./route')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)
app.listen(9000, () => {
  console.log('9000 is running')
})
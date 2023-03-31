const express = require('express')
const app = express()

app.use(express.json())

app.get('/', function (req, res) {
  res.json({message: 'Olá QAx'})
})

app.listen(5000)
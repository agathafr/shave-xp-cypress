const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Olá QAx')
})

app.listen(5000)
const bcrypt = require('bcrypt')
const express = require('express')
const app = express()

app.use(express.json())

const { deleteUser } = require('./db')

app.get('/', function (req, res) {
    res.json({ message: 'Olá QAx' })
})

app.delete('/user/:email', async function (req, res) {
    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})

app.post('/user', async function (req, res) {
    console.log(req.body)

    const { name, email, password, is_shaver } = req.body

    const hashPass = await bcrypt.hash(password, 8)

    console.log(hashPass)

    res.status(200).end()
})

app.listen(5000)
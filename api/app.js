const bcrypt = require('bcrypt')
const express = require('express')
const app = express()

app.use(express.json())

const { deleteUser, insertUser } = require('./db')

app.get('/', function (req, res) {
    res.json({ message: 'Olá QAx' })
})

app.delete('/user/:email', async function (req, res) {
    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})

app.post('/user', async function (req, res) {
    const { name, email, password, is_shaver } = req.body
    const hashPass = await bcrypt.hash(password, 8)

    const user = {
        name: name,
        email: email,
        password: hashPass,
        is_shaver: is_shaver
    }

    if (!user.name) {
        return res.status(400).json({ message: 'Name is required.' })
    }

    if (!user.email) {
        return res.status(400).json({ message: 'Email is required.' })
    }

    if (!user.password) {
        return res.status(400).json({ message: 'Password is required.' })
    }

    if (!user.is_shaver) {
        return res.status(400).json({ message: 'Shaver is required.' })
    }

    console.log(user)

    try {
        const id = await insertUser(user)

        res.status(201).json({ user_id: id })
    } catch {
        res.status(500).json({ error: 'Ocorreu um erro desconhecido.' })
    }
})

app.listen(5000)
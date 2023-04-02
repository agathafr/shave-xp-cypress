const bcrypt = require('bcrypt')
const Joi = require('joi')
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

    console.log(user)

    try {
        const id = await insertUser(user)

        res.status(201).json({ user_id: id })
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro desconhecido.', stack: error })
    }
})

app.listen(5000)
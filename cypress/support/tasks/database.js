const { Pool } = require('pg')
require('dotenv/config')

const dbConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_NAME,
  port: Number(process.env.POSTGRES_PORT),
  ssl: { rejectUnauthorized: false }   // obrigatório no Aiven
}

module.exports = {
  removeUser(email) {
    return new Promise((resolve, reject) => {
      const pool = new Pool(dbConfig)
      pool.query('DELETE FROM users WHERE email = $1', [email], (error, result) => {
        pool.end()
        if (error) return reject(error)
        resolve({ success: true })
      })
    })
  }
}
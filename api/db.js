const { Pool } = require('pg')

const dbConfig = {
    host: 'motty.db.elephantsql.com',
    user: 'ukubjzju',
    password: 'fNWQk7e4z760FlJrjOTZSBqVke0kf23T',
    database: 'ukubjzju',
    port: 5432
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {

}

module.exports = {
    deleteUser
}
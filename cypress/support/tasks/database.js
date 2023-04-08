const { Pool } = require('pg')

const dbConfig = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_NAME,
    port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
            const pool = new Pool(dbConfig)

            pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
                if (error) {
                    throw error
                }
                resolve({ success: result })
            })
        })
    }
}
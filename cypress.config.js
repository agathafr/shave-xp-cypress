const { defineConfig } = require("cypress");

const { Pool } = require('pg')

const dbConfig = {
  host: 'motty.db.elephantsql.com',
  user: 'ukubjzju',
  password: 'fNWQk7e4z760FlJrjOTZSBqVke0kf23T',
  database: 'ukubjzju',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        removeUser(email) {
          const pool = new Pool(dbConfig)

          pool.query('DELETE FROM users WHERE email = $1', [email], function(error, result){
            if (error) {
              throw error
            }
          })
        }
      })
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:3000'
  },
});
